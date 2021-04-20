import { Card, CircularProgress, List, ListItem } from "@material-ui/core";
import { useEffect, useState } from "react";
import { PostList } from "../../../../data/models/models";
import "../../../../../css/discover/post-list.scss";
import buildSkyid from "../../../skyid/skyid";
import { postListAtom } from "../../../../data/jotai/Atoms";

const Post = ({ title, createdOn }) => {
  return (
    <ListItem disableGutters>
      <Card className={"post-card"}>
        <h3>{title}</h3>
        <p>{createdOn}</p>
      </Card>
    </ListItem>
  );
};

export default function PostListComponent({ listNameProp }) {
  const [loaded, setLoaded] = useState(false);
  const skyid = buildSkyid();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    skyid.getJSON(
      listNameProp || "posts/public-post-list.json",
      function (response, revision) {
        if (response === "") {
          console.log("No Post List Found");
          setPosts([]);
        } else {
          setPosts(new PostList(response).titleList());
        }
        setLoaded(true);
      }
    );
  }, []);

  if (!loaded) {
    return <CircularProgress />;
  }

  return (
    <div className={"post-list-root"}>
      <List>
        {Array.isArray(posts) ? (
          posts.map((p, i) => <Post key={i} {...p} />)
        ) : (
          <h1>No Posts Yet</h1>
        )}
      </List>
    </div>
  );
}
