import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import schema from 'db/schema';

export class CreateUserDto
  implements Omit<typeof schema.user.$inferInsert, 'id'>
{
  @IsString()
  @IsNotEmpty()
  @MaxLength(320)
  @ApiProperty({ example: 'test@test.invalid' })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'password' })
  password!: Buffer;
}
