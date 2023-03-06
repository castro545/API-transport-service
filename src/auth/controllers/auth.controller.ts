import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { IUserLogin } from '../interfaces/login.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() credentials: IUserLogin) {
        const user = await this.authService.validateUserCredentials(credentials);
        if (!user) {
            return { message: 'Invalid credentials' };
        }
        const { access_token } = await this.authService.login(user);
        return { access_token };
    }
}
