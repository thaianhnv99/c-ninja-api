import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    {
      id: 0,
      name: 'ninjaA',
      weapon: 'stars',
    },
    {
      id: 1,
      name: 'ninjaB',
      weapon: 'nunchucks',
    },
  ];

  getNinja(weapon?: 'stars' | 'nunchucks') {
    if (weapon) {
      return this.ninjas.filter((i) => i.weapon === weapon);
    }
    return this.ninjas;
  }

  getOneNinja(id?: number) {
    const ninja = this.ninjas.find((i) => i.id === id);
    if (!ninja) {
      throw new Error('Ninja not found');
    }
    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: Date.now(),
    };
    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((i) => {
      if (i.id === id) {
        return { ...i, ...updateNinjaDto };
      }

      return i;
    });

    return this.getOneNinja(id);
  }

  removeNinja(id: number) {
    const tobeRemove = this.getOneNinja(id);
    this.ninjas = this.ninjas.filter((i) => i.id !== id);

    return tobeRemove;
  }
}
