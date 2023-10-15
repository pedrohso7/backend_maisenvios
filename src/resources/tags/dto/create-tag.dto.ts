import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class  CreateTagDto {
    @IsString()
    @IsNotEmpty()
    tag: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsNumber()
    status: number;
    
    @IsString()
    @IsNotEmpty()
    source: string;
    
    @IsNumber()
    price: number;
}