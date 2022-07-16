import { IsNumber } from 'class-validator'

export class VerifyUserDto {

    @IsNumber()
    id:number
} 