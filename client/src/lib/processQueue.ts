import { getQueue, dequeue } from "./syncQueue";

export async function processQueue() {
  if (!navigator.onLine) return;

  const items = await getQueue();

  for (const item of items) {
    try {
      await postPage(item.payload); // your API call

      await dequeue(item.id!);
    } catch (error) {
      console.error("Sync failed, stopping...", error);
      break; // stop if network fails
    }
  }
}

async function postPage(payload: object) {
  // your API call
  console.log("postPage", payload);
}
