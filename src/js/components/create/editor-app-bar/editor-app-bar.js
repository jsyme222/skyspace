import {
  AppBar,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
} from "@material-ui/core";
import {
  Close,
  Lock,
  LockOpen,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import "../../../../css/create/editor-app-bar.scss";
import { editorState } from "../../../data/jotai/Atoms";

export default function EditorAppBar({
  onClose,
  title,
  setTitle,
  titleEditable = true,
  encryptable = true,
  publishable = true,
}) {
  const [encrypt, setEncrypt] = useState(false);
  const [publish, setPublish] = useState(true);
  const [titleState, setTitleState] = useState("");
  const [editor, setEditorState] = useAtom(editorState);

  const encryptContent = () => {
    !encrypt && setPublish(false);
    setEncrypt(() => !encrypt);
  };

  const setTitleFunc = () => {
      setEditorState(
          {
              ...editor,
              docTitle: titleState
          }
      )
      setTitle&&setTitle(titleState)
  }

  useEffect(() => {
    title && setTitleState(title);
  }, [title]);

  return (
    <AppBar position={"static"} className={"editor-bar"}>
      <div>
        <div>
          {onClose && (
            <IconButton onClick={onClose}>
              <Close color={"secondary"} />
            </IconButton>
          )}
          <div className={"doc-title"}>
            <p>
              TITLE:{" "}
            </p>
              <TextField
                value={titleState}
                disabled={!titleEditable}
                onChange={(e) => setTitleState(e.target.value)}
                onBlur={setTitleFunc}
              />
          </div>
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={publish}
              onChange={() => !encrypt&&setPublish(() => !publish)}
              name="publish-switch"
              color="primary"
              title={publish ? "published" : "unpublished"}
              disabled={!publishable}
            />
          }
          label={publish ? <Visibility /> : <VisibilityOff />}
        />
        <FormControlLabel
          control={
            <Switch
              checked={encrypt}
              onChange={encryptContent}
              name="encrypt-switch"
              color="secondary"
              title={!encrypt ? "encrypt" : "unencrypt"}
              disabled={!encryptable}
            />
          }
          label={!encrypt ? <LockOpen /> : <Lock />}
        />
      </div>
    </AppBar>
  );
}
