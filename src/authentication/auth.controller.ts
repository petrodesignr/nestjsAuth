import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import {Request, Response } from 'express'
import { RegisterUserDto } from "./dto/register-user.dto";

@Controller('/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Req() request: Request, @Res() response: Response, @Body() LoginDto: LoginDto): Promise<any> {
        try {
            const result = await this.authService.login(LoginDto);
            response.status(200).json({
                status: 'Ok!',
                message: 'Successfully login!',
                result: result
            });
        } catch (err) {
            response.status(500).json({
                status: 'Error!',
                message: 'Internal server error',
            });
        }
    }

    @Post('/register')
    async register(@Req() request: Request, @Res() response: Response, @Body() RegisterDto: RegisterUserDto): Promise<any> {
        try {
            const result = await this.authService.register(RegisterDto);
            response.status(200).json({
                status: 'Ok!',
                message: 'Successfully Registered!',
                result: result
            });
        } catch (err) {
            console.error('Registration Error:', err); // Logs the error details
            response.status(500).json({
                status: 'Error!',
                message: 'Internal server error',
                error: err.message // Optionally, include the error message
            });
        }
    }
}
