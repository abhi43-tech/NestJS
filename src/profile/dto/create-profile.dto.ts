import { IsDataURI, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class createProfileDto {
  @IsString({message: 'First name must be in string.'})
    @IsNotEmpty()
    @MinLength(3, {message: 'Min length for first name is 3.'})
    @IsOptional()
    @MaxLength(100)
    firstname?: string;
    
    @IsString({message: 'last name must be in string.'})
    @IsNotEmpty()
    @MinLength(3, {message: 'Min length for last name is 3.'})
    @MaxLength(100)
    @IsOptional()
    lastname?: string;
  
    @IsString()
    @IsOptional()
    gender?: string;

    @IsDate()
    @IsOptional()
    dateofBirth?: Date;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    profileImage?: string;
}