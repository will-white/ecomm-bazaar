import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ example: 'test@test.invalid' })
    email?: string;
    @ApiProperty({ example: '12345' })
    password?: string;
    rememberMe?: boolean
}
