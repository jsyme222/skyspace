import {
  Button,
  ButtonGroup,
  TextareaAutosize,
} from "@material-ui/core";
import {
  Cancel,
  Save,
} from "@material-ui/icons";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { editorState } from "../../../data/jotai/Atoms";
import EditorAppBar from "../../create/editor-app-bar/editor-app-bar";
import ModalRoot from "../modal-root";

export default function EditorModal() {
  const [showModal, setShowModal] = useAtom(editorState);
  const [state, setState] = useState("");

  const saveContent = () => {
    showModal.setDataFunc(state);
    setShowModal({});
  };

  const closeModal = () => {
    setShowModal({ modalOpen: false })
  }

  const appBarConfig = {
    title: showModal.docTitle,
    onClose: closeModal,
    encryptable: !showModal.notEncryptable,
    publishable: !showModal.notPublishable,
    content: showModal.content,
    titleEditable: showModal.titleEditable
  }

  useEffect(() => {
    showModal.content && setState(showModal.content);
  }, [showModal.content]);

  return (
    <ModalRoot
      open={showModal.modalOpen}
      onClose={closeModal}
      style={{ background: "white" }}
    >
      <div className={"editor-modal-root"}>
        <EditorAppBar {...appBarConfig}/>
        <TextareaAutosize
          multiline
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
          className={"editor-content"}
        />
        <ButtonGroup>
          <Button color={"primary"} iconStart={<Save />} onClick={saveContent}>
            Save
          </Button>
          <Button
            color={"secondary"}
            startIcon={<Cancel />}
            onClick={() => setShowModal(false)}
          >
            cancel
          </Button>
        </ButtonGroup>
      </div>
    </ModalRoot>
  );
}
