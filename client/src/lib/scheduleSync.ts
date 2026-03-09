import { enqueue } from "./syncQueue";
import { processQueue } from "./processQueue";

const timers = new Map<string, ReturnType<typeof setTimeout>>();

export function scheduleSync(
  entityId: string,
  type: "UPDATE_PAGE" | "UPDATE_META" | "DELETE_PAGE",
  payload: object,
) {
  if (timers.has(entityId)) {
    clearTimeout(timers.get(entityId)!);
  }

  const timer = setTimeout(async () => {
    await enqueue({
      entityId,
      type,
      payload,
    });

    processQueue();

    timers.delete(entityId);
  }, 10000); // 10 seconds after last update

  timers.set(entityId, timer);
}
