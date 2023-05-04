import {
  Exclude,
  Expose,
  Transform,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  email: string;

  @Exclude()
  hash: string;

  @Expose()
  firstName: string | null;

  @Expose()
  lastName: string | null;

  @Transform((o) => o.obj['firstName'] + ' ' + o.obj['lastName'])
  @Expose()
  fullName: string;

  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    const userInstance = plainToInstance(this, obj, {
      excludeExtraneousValues: true,
    });
    return instanceToPlain(userInstance);
  }
}
