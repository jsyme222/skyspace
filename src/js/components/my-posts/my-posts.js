import PostListComponent from "../discover/lists/post-list/post-list";

export default function MyPosts() {

  return (
    <div>
      <h2>My Posts</h2>
      <PostListComponent listNameProp={"posts/user-post-list.json"} />
    </div>
  );
}
