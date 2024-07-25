import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';
import schema from 'db/schema';

export class LoginDto
  implements Omit<typeof schema.user.$inferInsert, 'password'>
{
  @IsEmail()
  @ApiProperty({ example: 'test@test.invalid' })
  email!: string;

  @IsStrongPassword()
  @ApiProperty({ example: '12345' })
  password!: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description:
      'Changes cookie stayalive to allow user to stay logined in longer',
  })
  rememberMe?: boolean;
}
