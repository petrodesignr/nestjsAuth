import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from "./dto/register-user.dto";
import { Users } from "src/users/users.model";



@Injectable()
export class AuthService {

    constructor (
        private readonly prismaService: PrismaService, 
        private readonly jwtService: JwtService, 
        private readonly userService: UsersService) {}

    async login(LoginDto: LoginDto): Promise<any> {
        const {username, password, id} = LoginDto;

        const users = await this.prismaService.users.findUnique({
            where: {
                username
            }
        })

        if (!users) {
            throw new NotFoundException("User not found");
        }

        const validatePassword = await bcrypt.compare(password, users.password);
        if (!validatePassword) {
            throw new NotFoundException("Wrong password");
        }

        return {
            token: this.jwtService.sign({username, id}),
        }
    }

    async register(createDto: RegisterUserDto): Promise<any> {
        const createUsers = new Users();

        createUsers.name = createDto.name;
        createUsers.username = createDto.username;
        createUsers.email = createDto.email;
        createUsers.password = await bcrypt.hash(createDto.password, 10);

        const user = await this.userService.createUser(createUsers);

        return {
            token: this.jwtService.sign({username: user.username})
        }
    }

    //

    async generateToken(user: any) {
        const payload = { userId: user.id, username: user.username };  // Include user info in payload
        return {
          access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }),
        };
      }
}