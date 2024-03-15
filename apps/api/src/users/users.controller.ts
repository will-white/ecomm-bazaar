import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { AccessToken } from 'src/auth/types';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created user' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiOperation({ summary: 'Create user' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Query users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CreateUserDto })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Entity not found or not authorized' })
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Entity was updated' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Entity not found or not authorized' })
  @ApiOperation({ summary: 'Update user by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Entity was deleted' })
  @ApiNotFoundResponse({ description: 'Entity not found or not authorized' })
  @ApiOperation({ summary: 'Delete user by ID' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('me')
  @ApiOkResponse({ type: CreateUserDto })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Entity not found or not authorized' })
  @ApiOperation({ summary: 'Get self' })
  findSelf(@User() user: AccessToken) {
    return this.usersService.findOneById(user.sub);
  }

  @Patch('me')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Entity was updated' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Entity not found or not authorized' })
  @ApiOperation({ summary: 'Update self' })
  updateSelf(@User() user: AccessToken, @Body() dto: UpdateUserDto) {
    return this.usersService.update(user.sub, dto);
  }
}
