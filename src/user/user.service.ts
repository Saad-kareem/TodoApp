import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Constants } from 'utils/constant';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRespository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let user = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;
    return await this.userRespository.save(user);
  }
  findUserById(id: number) {
    return this.userRespository.findOneOrFail({ where: { id: id } });
  }
  findAll() {
    return this.userRespository.find();
  }
  findUserByEmail(email: string) {
    return this.userRespository.findOne({ where: { email: email } });
  }
  remove(id: number) {
    return this.userRespository.delete(id);
  }
}
