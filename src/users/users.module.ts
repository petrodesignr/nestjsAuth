import { Module } from "@nestjs/common";
import { UsersController } from "./users.controllers";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma.service";
import { JwtService } from "@nestjs/jwt";




@Module({
    controllers : [UsersController],
    providers : [UsersService,PrismaService,JwtService]
})
export class UsersModule{}