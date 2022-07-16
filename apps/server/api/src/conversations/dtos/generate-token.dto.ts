import { IsArray, IsString } from 'class-validator'

export class GenerateTokenDto {
    @IsString()
    identity: string;

    @IsArray({groups: ['user', 'admin']})
    roles?: string[];
} 