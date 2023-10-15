import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { verifyIfExists, verifyIfTagExistsCreation,  } from 'src/core/utils/handle_database_valitadions';

@Injectable()
export class TagsService {
  private tags: Tag[];
  constructor(){
    this.tags = [];
  };

  create(createTagDto: CreateTagDto) {
    const {tag, name, status, source, price} = createTagDto;

    if(verifyIfTagExistsCreation(this.tags, tag)){
      throw new HttpException('Item já existe', HttpStatus.CONFLICT);
    };
    
    const newTag = new Tag({
      tag: tag,
      name: name,
      status: status,
      source: source,
      price: price,
    });
    this.tags.push(newTag);
    
    return newTag;
  }

  createFromExtractedFile(data: any) {
    let extractedTags = data as any[];
    extractedTags.forEach((tag)=>{
      if(verifyIfTagExistsCreation(this.tags, tag.tag)){
        console.log('Item já existe');
        return;
      };

      const newTag =  new Tag({
        tag: tag.props.tag,
        name: tag.props.name,
        status: tag.props.status,
        source: tag.props.source,
        price: tag.props.price,
      });
      this.tags.push(newTag);
    });

    return this.tags;
  }

  findAll() {
    return this.tags;
  }

  findOne(id: number) {
    if(!verifyIfExists(this.tags, id)){
      throw new NotFoundException('Item não existe, id inválido');
    };

    return this.tags[id];
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    if(!verifyIfExists(this.tags, id)){
      throw new NotFoundException('Item não existe, id inválido');
    };
    
    const {tag, name, status, source, price} = updateTagDto;

    const newTag = new Tag({
      tag: tag,
      name: name,
      status: status,
      source: source,
      price: price,
    });

    this.tags[id] = newTag;
    return newTag;
  }

  remove(id: number) {
    if(!verifyIfExists(this.tags, id)){
      throw new NotFoundException('Item não existe, id inválido');
    };

    this.tags.splice(id, 1);
    return this.tags;
  }
}
