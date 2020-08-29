import { Controller, Get, Required, PathParams } from '@tsed/common';
import { UserService } from '../../services/user/UserService';
import { User } from '../../models/User';

@Controller("/user")
export class UserController {

    constructor(private userService: UserService) {

    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get('/:id')
    async find(@Required() @PathParams('id') id: string): Promise<User> {
        return await this.userService.find(id);
    }
}