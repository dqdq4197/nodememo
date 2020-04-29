import { DataTypes, Model } from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index'
import User from './user'

class Content extends Model {
    public id!: number

    public title!: string
    public content?: string
    public code!: string

    public PostId!: number
    public UserId!: number
}

Content.init(
    {
        title: {
            type: DataTypes.TEXT, // 긴 글
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT, // 긴 글
            allowNull: true,
        },
        code: {
            type: DataTypes.TEXT, // 긴 글
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Content',
        tableName: 'content',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    }
)

export const associate = (db: dbType) => {
    db.Content.belongsTo(db.Post)
    db.Content.belongsTo(db.User)
}

export default Content
