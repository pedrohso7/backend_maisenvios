import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  private tags: Tag[];
  constructor(){
    this.tags = [];
  };

  create(createTagDto: CreateTagDto) {
    const {name, status, source, price} = createTagDto;
    const tag = new Tag({
      name: name,
      status: status,
      source: source,
      price: price,
    });
    this.tags.push(tag);
    return tag;
  }

  findAll() {
    return this.tags;
  }

  findOne(id: number) {
    return this.tags[id];
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    const {name, status, source, price} = updateTagDto;
    const tag = new Tag({
      name: name,
      status: status,
      source: source,
      price: price,
    });
    this.tags[id] = tag;
    return tag;
  }

  remove(id: number) {
    this.tags.splice(id, 1);
    return this.tags;
  }
}
