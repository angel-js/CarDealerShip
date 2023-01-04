import { Controller, ParseIntPipe, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { Body, Get, Param, Post, Patch, Delete} from '@nestjs/common/decorators';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';

@Controller('cars')
export class CarsController {
    
    constructor(
        private readonly carsService: CarsService
    ) {}


    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

 /*  @Get(':id')
    getCarByID( @Param('id') id: string )  {
        console.log({ id: +id })
        if ( this.cars.length > +id && +id >= 0 ) {
            return this.cars[id];
        } else if (+id < 0){
            return "Su id es invalido negativo!"
        } else {
            return "Su id es invalido!"
        }
    }  */
  @Get(':id')
    getCarByID( @Param('id', ParseUUIDPipe ) id: string )  {
        //console.log({ id: id })
        return this.carsService.findOneById( id );
    } 

    @Post()
    @UsePipes( ValidationPipe )
    createCar( @Body() createCarDto: CreateCarDto ) {
        return createCarDto;
    }

    @Patch(':id')
    updateCar( @Body() body: any ){
        return body;
    }

    @Delete(':id')
    deleteCar ( @Param('id', ParseIntPipe ) id : number ){
        return {
            method: 'Delete',
            id
        }
    }
}
