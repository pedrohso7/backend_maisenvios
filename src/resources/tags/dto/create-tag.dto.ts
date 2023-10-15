import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class  CreateTagDto {
    @IsString()
    @IsNotEmpty()
    tag: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsNumber()
    @IsNotEmpty()
    status: number;
    
    @IsString()
    @IsNotEmpty()
    source: string;
    
    @IsNumber()
    @IsNotEmpty()
    price: number;
}