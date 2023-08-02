import { Maybe } from 'graphql/jsutils/Maybe'
import mongoose, { Document, Types } from 'mongoose'

export interface User extends Document {
  username: string
  _id: Types.ObjectId
}

type UserDocument = Maybe<Document> & User

const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    }
},
  {
    collection: 'User',
    timestamps: true,
  },
)

export const UserModel = mongoose.model<UserDocument>('User', UserSchema)

export type { UserDocument }