import Realm from 'realm';

class Posts extends Realm.Object {}
Posts.schema = {
  name: 'Posts',
  properties: {
      id: 'string',
      creationDate: 'string'
  },
};

class Post extends Realm.Object {}
Post.schema = {
  name: 'Post',
  properties: {
    id: 'string',
    description: 'string',
    full_picture: 'string'
  },
};

export default new Realm({schema: [Posts, Post]});