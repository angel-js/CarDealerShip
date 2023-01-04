import { IsString } from "class-validator";

export class CreateCarDto {

    @IsString({ message: `The brand most be a cool String`})
    readonly brand: string;

    @IsString()
    readonly model: string;
    
}