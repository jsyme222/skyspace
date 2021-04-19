import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import EditorAppBar from "../editor-app-bar/editor-app-bar";
import { Button, ButtonGroup } from "@material-ui/core";
import { Close, Send } from "@material-ui/icons";
import "../../../../css/create/content-editor.scss";
import { setData } from "../../skyid/actions";

export default function ContentEditor() {
  const [editorState, setEditorState] = useState("");
  const [title, setTitle] = useState("");

  const postContent = () => {
    const prepData = {
      title: title,
      content: editorState
    }

    let t = title.replace(/\s/g, "-").toLocaleLowerCase();
    let fileName = 'posts/' + t + '.json';
    let data = JSON.stringify(prepData)

    setData(fileName, data)
  };

  return (
    <div className={"content-editor"}>
      <EditorAppBar title={title} setTitle={setTitle}/>
      <MDEditor
        value={editorState}
        onChange={setEditorState}
        preview={"edit"}
        height={400}
      />
      <ButtonGroup className={"action-buttons"}>
        <Button
          color={"secondary"}
          variant={"contained"}
          endIcon={<Send />}
          onClick={postContent}
        >
          Post
        </Button>
        {/* <Button color={"primary"} variant={"contained"} endIcon={<Close />}>
          Cancel
        </Button> */}
      </ButtonGroup>
      {/* <MDEditor.Markdown source={editorState} /> */}
    </div>
  );
}
