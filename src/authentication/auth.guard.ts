import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";




// export class JwtAuthGuard extends AuthGuard('jwt'){

//     canActivate(context: ExecutionContext){
//         return super.canActivate(context)
//     }

//     handleRequest(err,user){
//         if(err || !user) {
//             throw err || new UnauthorizedException();
//         }
//         return user
//     }
// }

import { Injectable, CanActivate} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
  
    if (!authHeader) {
      console.log('Authorization header is missing');
      throw new UnauthorizedException('Authorization header not found');
    }
  
    const token = authHeader.split(' ')[1];
  
    if (!token) {
      console.log('Token is missing from the Authorization header');
      throw new UnauthorizedException('Token not found');
    }
  
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      console.log('Token successfully verified:', decoded);
      request.user = decoded;
      return true;
    } catch (error) {
      console.log('Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
  
}
