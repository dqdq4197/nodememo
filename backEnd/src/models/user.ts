import {
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    DataTypes,
    Model,
} from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index'
import Post from './post'
import Content from './content'

class User extends Model {
    public readonly id!: number
    public nickname!: string
    public userId!: string
    public password!: string
    public provider?: string
    public snsid?: string
    public readonly Posts?: Post[]
    public readonly Contents?: Content[]
    public readonly createAt!: Date
    public readonly updateAt!: Date
}

User.init(
    {
        nickname: {
            type: DataTypes.STRING(20), // 20글자 이하
            allowNull: false, // 필수
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true, // 고유한 값
        },
        password: {
            type: DataTypes.STRING(100), // 100글자 이하
            allowNull: false,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
        },
        snsid: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'local',
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글이 저장돼요
    }
)

export const associate = (db: dbType) => {
    db.User.hasMany(db.Post, { as: 'Posts' })
    db.User.hasMany(db.Content, { as: 'Contents' })
}

export default User
