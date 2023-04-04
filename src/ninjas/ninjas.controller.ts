import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { EWeapon } from './entities/Ninja.entity';

@ApiTags('ninjas')
@Controller('ninjas')
@UseGuards(BeltGuard)
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}
  // GET /ninjas?weapon=stars --> []
  @Get()
  @ApiOkResponse({ type: CreateNinjaDto, isArray: true })
  @ApiQuery({ name: 'weapon', enum: EWeapon, required: false })
  getNinjas(@Query('weapon') weapon: EWeapon) {
    return this.ninjaService.getNinja(weapon);
  }

  // GET /ninjas/:id -> {...}
  @Get(':id')
  @ApiOkResponse({ type: CreateNinjaDto })
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.getOneNinja(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas
  @Post()
  @ApiCreatedResponse({ type: CreateNinjaDto })
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  // PUT /ninjas/:id --> {...}
  @Put()
  updateNinja(@Body() updateNinjaDto: UpdateNinjaDto) {
    const { id, ...newNinja } = updateNinjaDto;
    return this.ninjaService.updateNinja(id, newNinja);
  }

  // DELETE /ninjas/:id
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjaService.removeNinja(+id);
  }
}
