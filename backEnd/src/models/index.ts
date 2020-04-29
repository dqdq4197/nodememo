import Content, { associate as associateContent } from "./content";
import Post, { associate as associatePost } from "./post";
import User, { associate as associateUser } from "./user";

export * from "./sequelize";
const db = {
  Content,
  Post,
  User,
};

export type dbType = typeof db;

associateUser(db);
associatePost(db);
associateContent(db);
