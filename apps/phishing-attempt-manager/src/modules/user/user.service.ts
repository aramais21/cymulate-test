import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { UserDao } from './user.dao';
import { UserCreationDto, UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userDao: UserDao,
    private readonly configService: ConfigService,
  ) {}

  async getInfo(user: UserDto): Promise<UserDto | null> {
    return this.userDao.findById(user._id);
  }

  findById(id: string): Promise<UserDto | null> {
    return this.userDao.findById(id)
  }

  async create(data: UserCreationDto) {
    const { name, username, password, email } = data;
    const potentiallyAlreadyCreatedProfile =
      await this.userDao.findByUsernameOrEmail(username, email);
    if (potentiallyAlreadyCreatedProfile) {
      throw new BadRequestException('Invalid username or password');
    }
    const passwordHash = await hash(
      password,
      this.configService.get<string>('bcryptSaltRounds') || '',
    );

    return this.userDao.create({
      name,
      username,
      email,
      password: passwordHash,
    });
  }

  findWithUsernameOrEmail(usernameOrEmail: string) {
    return this.userDao.findWithUsernameOrEmail(usernameOrEmail)
  }

  updateVerificationStatus(
    id: string,
    data: { isEmailVerified: boolean; activationDate: Date },
  ) {
    return this.userDao.updateVerificationStatus(id, data)
  }

  updatePassword(id: string, passwordHashed: string) {
    return this.userDao.updatePassword(id, passwordHashed)
  }
}
