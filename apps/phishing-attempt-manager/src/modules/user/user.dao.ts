import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { UserSchema } from './user.schema';
import { UserCreationDto } from './user.dto';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(UserSchema.name)
    private model: Model<UserSchema & Document>
  ) {}

  create(data: UserCreationDto) {
    return this.model.create(data);
  }

  findByUsername(username: string) {
    return this.model.findOne({ username });
  }

  findByUsernameOrEmail(username: string, email: string) {
    return this.model.findOne({ $or: [{ username }, { email }] });
  }

  findWithUsernameOrEmail(usernameOrEmail: string) {
    return this.model.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  }

  findById(id: string | ObjectId) {
    return this.model.findById(id);
  }

  updateVerificationStatus(
    id: string | ObjectId,
    data: { isEmailVerified: boolean; activationDate: Date },
  ) {
    return this.model.findByIdAndUpdate(id, { $set: { ...data } });
  }

  updatePassword(id: string | ObjectId, passwordHashed: string) {
    return this.model.findByIdAndUpdate(id, {
      $set: { password: passwordHashed },
    });
  }
}
