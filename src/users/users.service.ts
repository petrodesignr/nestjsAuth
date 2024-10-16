import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Users } from "./users.model";




@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}
        
        async getAllUser():Promise<Users[]> {
            return this.prisma.users.findMany();
        }
    
        async createUser(data: Users): Promise<Users> {
           const existing = await this.prisma.users.findUnique({
               where: {
                   username: data.username
               }
           })
           if(existing){
                throw new ConflictException('username already exists')
           }

           return this.prisma.users.create({
            data
           })
        }

        // Method to fetch user by ID
        async getUserById(userId: string) {
         return this.prisma.users.findUnique({
            where: { username: userId },
        });
        }
}