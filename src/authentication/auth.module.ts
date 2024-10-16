import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma.service";
import { JwtStrategy } from "./jwt.strategy";
import { UsersService } from "src/users/users.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";





@Module({
    controllers: [AuthController],
    providers:[AuthService,PrismaService,JwtStrategy,UsersService],
    exports:[JwtStrategy,JwtModule],
    imports:[
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretkey',
            signOptions: {
                expiresIn: process.env.EXPIRES_IN || '1h'
            }
        })
    ]

})
export class AuthModule{}