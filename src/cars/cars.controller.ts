import { Controller, ParseIntPipe, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { Body, Get, Param, Post, Patch, Delete} from '@nestjs/common/decorators';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { UpdateCarDto } from './dto/update-car.dto';

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
        return this.carsService.create( createCarDto );
    }

    @Patch(':id')
    updateCar(
        @Param( 'id', ParseUUIDPipe ) id:string, 
        @Body() updateCarDto: UpdateCarDto )
        {
        return this.carsService.update( id, updateCarDto);
    }

    @Delete(':id')
    deleteCar ( @Param('id', ParseUUIDPipe ) id : string ){
        return this.carsService.delete( id )
    }

}
