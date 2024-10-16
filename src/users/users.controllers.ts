import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { Controller, Get, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Controller('/users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    // @UseGuards(JwtAuthGuard)    
    async getAllUser(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const result = await this.userService.getAllUser();
            res.status(200).json({
                status: 'Ok!',
                message: 'Successfully fetched data',
                result: result,
            });
        } catch (err) {
            res.status(500).json({
                status: 'Error!',
                message: 'Internal server error',
            });
        }
    }
    // Route to get details of the currently authenticated user
    @Get('/me')
    @UseGuards(JwtAuthGuard)
    async getUserProfile(@Req() req: Request, @Res() res: Response): Promise<any> {
      try {
        // Assuming the JWT contains a userId field
        // const user = req['user'] as { userId: string };
        const user = req['user'];
        console.log(user);
        
        // Check if userId exists
        if (!user) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            status: 'Error!',
            message: 'Unauthorized access',
          });
        }
  
        // Fetch user by the decoded userId
        // const result = await this.userService.getUserById(parseInt(user.username, 10));
        const result = await this.userService.getUserById(user.username);
        // If no user is found
        if (!result) {
          return res.status(HttpStatus.NOT_FOUND).json({
            status: 'Error!',
            message: 'User not found',
          });
        }
  
        // Return the user profile data
        return res.status(HttpStatus.OK).json({
          status: 'Ok!',
          message: 'Successfully fetched user data',
          result: result,
        });
  
      } catch (err) {
        console.error('Error in getUserProfile:', err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'Error!',
          message: 'Internal server error',
        });
      }
    }
}
