import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestService } from 'src/request.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly requestService: RequestService,
    private prismaService: PrismaService,
  ) {}

  getUserId() {
    const userId = this.requestService.getUserId();
    this.logger.log('getHello userid::' + userId);

    return userId;
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    try {
      const userById = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
      });

      return UserDto.plainToClass(userById);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException('Not found user by id', HttpStatus.FOUND);
      }
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
