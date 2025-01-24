import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsByteLength, IsDefined, IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export class createCustomerDTO {
  @IsAlpha()
  @IsDefined()
  @ApiProperty({
    description: 'first name',
    type: String
  })
  first_name: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  last_name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsByteLength(10,10)
  @IsNumberString()
  phone: string;

  address: string;

  @Length(0, 100)
  description: string;
}