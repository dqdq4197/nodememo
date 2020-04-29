import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  Model,
} from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";
import Content from "./content";
import User from "./user";

class Post extends Model {
  public id!: number;
  public main_title!: string;
  public UserId!: number;
  public readonly Contents?: Content[];
}

Post.init(
  {
    main_title: {
      type: DataTypes.TEXT, // 매우 긴 글
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "post",
    charset: "utf8mb4", //  한글+이모티콘
    collate: "utf8mb4_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.Post.belongsTo(db.User); // 테이블에 UserId 컬럼이 생겨요
  db.Post.hasMany(db.Content, { as: "Contents" });
};

export default Post;
