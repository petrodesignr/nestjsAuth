import { IsNotEmpty, IsString, Length } from "class-validator";


export class LoginDto {
    
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    id: string;
}