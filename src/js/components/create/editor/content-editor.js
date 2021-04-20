import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import EditorAppBar from "../editor-app-bar/editor-app-bar";
import { Button, ButtonGroup } from "@material-ui/core";
import { Close, Send } from "@material-ui/icons";
import "../../../../css/create/content-editor.scss";
import { Post } from "../../../data/models/models";
import { useAtom } from "jotai";
import buildSkyid from "../../skyid/skyid";
import { toastMessage } from "../../../data/jotai/Atoms";

export default function ContentEditor() {
  const [editorState, setEditorState] = useState("");
  const [title, setTitle] = useState("");
  const [postListState, setPostListState] = useState([]);
  const [toast, setToast] = useAtom(toastMessage);
  const skyid = buildSkyid();

  const writeToPostList = (p) => {
    const posts = "posts/user-post-list.json";
    const post = JSON.parse(p);

    const create = (data) => {
      skyid.setJSON(posts, data, function (response) {
        console.log(data);
        if (response !== true) {
          alert("Sorry, skyid.setFile failed :(");
        } else {
          console.log("Post List Updated");
        }
      });
    };
    let newList = [];

    skyid
      .getJSON(posts, function (response, revision) {
        newList = [...response]
        let isEdit = false;
        if (response === "") {
          console.log("Creating New Post List");
          setPostListState([{ ...post }]);
        } else {
          response.forEach((p) => {
            if (p.title === post.title) {
              p.content = post.content;
              console.log("EDITING OLD POST");
              isEdit = true;
            }
            return true;
          });

          if (!isEdit) {
            console.log("ADDING NEW POST");
            newList.push({ ...post });
            create(newList)
            console.log(newList);
          }
          create(newList)
        }
      })
  };

  const postContent = () => {
    const post = new Post(title, editorState);
    const serializedPost = post.serializePost();

    let t = title.replace(/\s/g, "-").toLocaleLowerCase();
    let fileName = "posts/" + t + ".json";

    console.log(serializedPost, fileName);
    // setData(fileName, serializedPost)

    skyid.setJSON(fileName, serializedPost, function (response) {
      if (response !== true) {
        alert("Sorry, skyid.setFile failed :(");
      } else {
        setToast({ message: "Post Created" });
        writeToPostList(serializedPost);
      }
    });

    // skyid.getJSON(fileName, function (response, revision) {
    //   console.log(response);
    //   if (response === "") {
    //     console.log("Creating New Post")
    //     skyid.setJSON(fileName, serializedPost, function(response) {
    //       if (response !== true) {
    //         alert("Sorry, skyid.setFile failed :(");
    //       }else{
    //         setToast({message: "Post Created"});
    //         writeToPostList();
    //       }
    //     })
    //   } else {
    //     console.info("File already found")
    //     alert("File already found, a new title will suffice.");
    //   }
    // })
  };

  return (
    <div className={"content-editor"}>
      <EditorAppBar title={title} setTitle={setTitle} />
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
        <Button
          onClick={() => {
            // skyid.getRegistry("posts/test-title.json", function (entry) {
            //   if (entry == false) {
            //     alert("Sorry, skyid.getRegistry failed :(");
            //   }
            //   console.log(entry);
            // })
            // getData("posts/test-title.json", console.log)
            // skyid.getRegistryUrl("posts/test-title.json")
            // getOrCreate("posts/user-post-list.json")
          }}
        >
          Registry
        </Button>
      </ButtonGroup>
      {/* <MDEditor.Markdown source={editorState} /> */}
    </div>
  );
}
