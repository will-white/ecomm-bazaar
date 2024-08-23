import { Body, Controller, Get, HttpCode, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { AccessToken } from 'src/auth/types';
import { PersonalInfoService } from './personal-info.service';
import { PersonalInfoDto } from './dtos/personal-info.dto';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(
    // private readonly profilesService: ProfilesService,
    private readonly personalInfoService: PersonalInfoService
  ) {}

  // @Post()
  // @ApiCreatedResponse({ description: 'Created user' })
  // @ApiBadRequestResponse({ description: 'Invalid input' })
  // @ApiOperation({ summary: 'Create user' })
  // create(@Body() dto: CreateUserDto) {
  //   return this.profilesService.create(dto);
  // }

  // @Get()
  // @ApiOperation({ summary: 'Query profiles' })
  // findAll() {
  //   return this.profilesService.findAll();
  // }

  // @Get(':id')
  // @ApiOkResponse({ type: CreateUserDto })
  // @ApiBadRequestResponse({ description: 'Invalid input' })
  // @ApiNotFoundResponse({ description: 'Entity not found or not authorized' })
  // @ApiOperation({ summary: 'Get user by ID' })
  // findOne(@Param('id') id: string) {
  //   return this.profilesService.findOneById(id);
  // }

  // @Patch(':id')
  // @HttpCode(204)
  // @ApiNoContentResponse({ description: 'Entity was updated' })
  // @ApiBadRequestResponse({ description: 'Invalid input' })
  // @ApiNotFoundResponse({ description: 'Entity not found or not authorized' })
  // @ApiOperation({ summary: 'Update user by ID' })
  // update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
  //   return this.profilesService.update(id, dto);
  // }

  // @Delete(':id')
  // @HttpCode(204)
  // @ApiNoContentResponse({ description: 'Entity was deleted' })
  // @ApiNotFoundResponse({ description: 'Entity not found or not authorized' })
  // @ApiOperation({ summary: 'Delete user by ID' })
  // remove(@Param('id') id: string) {
  //   return this.profilesService.remove(id);
  // }

  @Get('personal-info')
  @ApiOkResponse({ type: PersonalInfoDto })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Entity not found or not authorized' })
  @ApiOperation({ summary: 'Get personal info for self' })
  findSelf(@User() user: AccessToken) {
    return this.personalInfoService.findOneById(user.sub);
  }

  @Patch('personal-info')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Entity was updated' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Entity not found or not authorized' })
  @ApiOperation({ summary: 'Update personal info for self' })
  updateSelf(@User() user: AccessToken, @Body() dto: Partial<PersonalInfoDto>) {
    return this.personalInfoService.update(user.sub, dto);
  }
}
