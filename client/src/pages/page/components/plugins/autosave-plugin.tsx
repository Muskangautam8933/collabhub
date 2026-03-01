import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useAutosave } from "../../use-autosave";

export function AutoSavePlugin() {
  const { handleEditorStateChange } = useAutosave();

  return <OnChangePlugin onChange={handleEditorStateChange} />;
}
