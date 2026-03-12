import React from "react";
import chalk from "chalk";
import * as idb from "@/lib/editorDB";
import { SOCKET_EVENTS } from "@/socket.events.constants";
import { useSocketContext } from "@/contexts/socket.context";
import { useMessanger } from "./use-messanger";
import { processQueue } from "@/lib/processQueue";
import { scheduleSync } from "@/lib/scheduleSync";
import { useLoaderData } from "react-router";
import type { LoaderData } from "@/loaders/project.loader";

export type OnlineUser = {
  userId: string;
  lastSeen: number;
  devices: number;
};

export type PageMeta = {
  title: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export default function useAppData() {
  // const { projectId } = useParams();
  const [onlineUsers, setOnlineUsers] = React.useState<OnlineUser[]>([]);
  const [pagesMeta, setPagesMeta] = React.useState<PageMeta[]>([]);

  const loaderData = useLoaderData() as LoaderData;

  console.log("loaderData", loaderData);

  const { socket } = useSocketContext();

  useMessanger();

  const pagesMetaSortByUpdatedAt = React.useMemo(() => {
    return [...pagesMeta].sort(
      (a, b) => Number(b.updatedAt) - Number(a.updatedAt),
    );
  }, [pagesMeta]);

  const handleOnlineUsers = (payload: OnlineUser[]) => {
    console.log(chalk.green(`[on::${SOCKET_EVENTS.ONLINE_USERS}]`), payload);

    setOnlineUsers(payload);
  };

  const handleCreateNewPage = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const now = Date.now().toString();

    const meta = {
      _id: "",
      clientId: crypto.randomUUID(),
      title: "New Page",
      createdAt: now,
      updatedAt: now,
    };

    setPagesMeta((prev) => [...prev, meta]);

    scheduleSync(meta.clientId, "UPDATE_META", meta);

    // Save Meta To IndexedDB
    await idb.createPageMetaWithPage(meta);
  };

  const handleDeletePage =
    (clientId: string) => async (e: React.MouseEvent) => {
      e.stopPropagation();

      setPagesMeta((prev) => prev.filter((page) => page.clientId !== clientId));

      await idb.deletePageMetaAndPage(clientId);

      scheduleSync(clientId, "DELETE_PAGE", {
        clientId,
      });
    };

  // GET Pages meta from idb
  React.useEffect(() => {
    (async () => {
      const pageMetas = await idb.getPageMetas();

      setPagesMeta(pageMetas);
    })();
  }, []);

  // GET ONLINE FRIENDS
  React.useEffect(() => {
    if (socket) {
      socket.on(SOCKET_EVENTS.ONLINE_USERS, handleOnlineUsers);
    }

    return () => {
      if (socket) {
        socket.off(SOCKET_EVENTS.ONLINE_USERS, handleOnlineUsers);
      }
    };
  }, [socket]);

  React.useEffect(() => {
    window.addEventListener("online", processQueue);

    processQueue(); // try on app load

    return () => {
      window.removeEventListener("online", processQueue);
    };
  }, []);

  return {
    onlineUsers,
    pagesMeta,
    pagesMetaSortByUpdatedAt,
    loaderData,
    setPagesMeta,
    handleCreateNewPage,
    handleDeletePage,
  };
}
