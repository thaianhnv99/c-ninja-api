import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @IsInt()
  @ApiProperty()
  id: number;

  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsEnum(['stars', 'nunchucks'], { message: 'Use correct weapon!' })
  @ApiProperty()
  weapon: 'stars' | 'nunchucks';
}
