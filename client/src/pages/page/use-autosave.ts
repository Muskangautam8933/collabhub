import React from "react";
import * as idb from "@/lib/editorDB";
import { useParams } from "react-router";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useAppContext } from "@/contexts/app.context";
import { scheduleSync } from "@/lib/scheduleSync";
import type { EditorState } from "lexical";

export const EMPTY_EDITOR_STATE = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

export function useAutosave() {
  const [editor] = useLexicalComposerContext();

  const params = useParams();

  const clientId = params["client-id"];

  const ctx = useAppContext();

  // Load from IndexedDB on mount
  React.useEffect(() => {
    (async () => {
      if (!clientId) return;

      const payload = await idb.getPage(clientId);

      const savedState = payload.content ? payload.content : EMPTY_EDITOR_STATE;

      const parsed = editor.parseEditorState(savedState);

      editor.setEditorState(parsed);
    })();
  }, [editor, clientId]);

  const handleEditorStateChange = async (editorState: EditorState) => {
    if (!clientId) return;

    const json = editorState.toJSON();
    const updatedAt = Date.now().toString();

    const savedMeta = await idb.getPageMeta(clientId);

    // 1️⃣ Update local meta state
    ctx.setPagesMeta((prev) =>
      prev.map((page) =>
        page.clientId === clientId ? { ...page, updatedAt } : page,
      ),
    );

    // 2️⃣ Save to IndexedDB (IMPORTANT - you must implement this)
    await idb.setPageMeta(clientId, { ...savedMeta, updatedAt });
    await idb.setPage(clientId, json);

    // 3️⃣ Schedule server sync
    scheduleSync(clientId, "UPDATE_PAGE", {
      clientId,
      content: json,
      updatedAt,
    });
  };

  return {
    handleEditorStateChange,
  };
}
