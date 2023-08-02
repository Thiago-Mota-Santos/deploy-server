import { Maybe } from 'graphql/jsutils/Maybe'
import mongoose, { Document, Types } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface User extends Document {
  username: string
  password: string
  encryptPassword: (password: string | undefined) => string
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
    },
    password: {
      required: true,
      type: String,
      minlength: 6,
      hidden: true,
    }
},
  
  {
    collection: 'User',
    timestamps: true,
  },
)

UserSchema.pre<UserDocument>('save', function encryptPasswordHook(next) {
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password)
  }
  return next()
})

UserSchema.methods = {
  authenticate(password: string) {
    return bcrypt.compareSync(password, this.password)
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8)
  },
}

export const UserModel = mongoose.model<UserDocument>('User', UserSchema)

export type { UserDocument }