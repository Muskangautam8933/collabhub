import Dexie, { type Table } from "dexie";

export interface SyncQueueItem {
  id?: number;
  entityId: string;
  type: "UPDATE_PAGE" | "UPDATE_META" | "DELETE_PAGE";
  payload: object;
  createdAt: number;
}

class CollabHubDB extends Dexie {
  syncQueue!: Table<SyncQueueItem>;

  constructor() {
    super("collabhubDB");

    this.version(1).stores({
      syncQueue: "++id, entityId, type, createdAt",
    });
  }
}

export const db = new CollabHubDB();
