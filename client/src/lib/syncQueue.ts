import { db, type SyncQueueItem } from "./db";

export async function enqueue(item: Omit<SyncQueueItem, "id" | "createdAt">) {
  // Remove older pending entry for same entity
  await db.syncQueue.where("entityId").equals(item.entityId).delete();

  await db.syncQueue.add({
    ...item,
    createdAt: Date.now(),
  });
}

export async function getQueue() {
  return await db.syncQueue.orderBy("createdAt").toArray()
}

export async function dequeue(id: number) {
  await db.syncQueue.delete(id)
}

export async function clearQueue() {
  await db.syncQueue.clear()
}