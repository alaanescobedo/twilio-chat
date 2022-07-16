import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
    trim: true
  })
  username: string;

  @Prop({
    required: true,
    minlength: 8
  })
  password: string;

  @Prop({
    default: ['user']
  })
  roles?: [string]
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);