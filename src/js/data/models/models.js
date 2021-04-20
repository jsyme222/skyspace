import packageJson from "../../../../package.json";

export class ConfigFile {
  constructor() {
    this.version = packageJson.version;
  }

  get file() {
    return {
      version: this.version,
    };
  }
}

export class Post {
  constructor(title, content) {
    this.title = title;
    this.content = content;
    this.createdOn = this.getDate();
  }

  getDate() {
    let date = new Date();
    return date.now;
  }

  serializePost() {
    let post = {
      title: this.title,
      content: this.content,
      createdOn: this.createdOn,
    };
    return JSON.stringify(post);
  }
}

export class PostList {
  constructor(posts) {
    if (typeof posts === String) {
      posts = JSON.parse(this.posts);
    }
    this.posts = posts;
  }

  titleList() {
    let titleList = [];
    if (Array.isArray(this.posts)) {
      this.posts.map((p) => {
        let post = p;
        titleList.push({ title: post.title, createdOn: post.createdOn });
        return true;
      });
    }
    return titleList;
  }

  posts() {
    return this.posts;
  }
}
