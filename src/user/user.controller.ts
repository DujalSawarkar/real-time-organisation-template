import { Controller, Post, Req, Body, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { CreateOrganizationDto } from './dto/create-user.dto/create-organisation.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'), new RoleGuard('USER'))
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Post()
  async create_organisation_details(
    @Req() req,
    @Body() createorganisationdto: CreateOrganizationDto,
  ) {
    let user_id = req.user.user.id;

    console.log('user id', user_id);
    let organisation = await this.userservice.create_organisation_details(
      user_id,
      createorganisationdto,
    );
    console.log('organisation', organisation);
    return organisation;
  }

  @Get()
  async get_organisation_details(@Req() req) {
    let user_id = req.user.user.id;
    console.log('user id', user_id);
    let organisation_data =
      await this.userservice.get_organisation_details(user_id);
    console.log('organisation data', organisation_data);
    return organisation_data;
  }
}
