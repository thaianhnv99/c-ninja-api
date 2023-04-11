import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  private account;

  setAccount(account: any) {
    this.account = account;
  }

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    try {
      // find the ser by email
      const userExits = await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      // if user does not exits throw exception
      if (userExits) {
        throw new Error('InvalidEmail');
      }

      // Save the new user in the db
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      // return the saved user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      } else if (error instanceof Error) {
        throw new HttpException('Exits email', HttpStatus.CREATED);
      }
    }
  }

  async login(dto: AuthDto) {
    // find the ser by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exits throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });

    return { access_token: token };
  }
}
