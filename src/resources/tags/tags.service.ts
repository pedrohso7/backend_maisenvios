import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  private tags:Tag[];
  constructor(){
    this.tags = [];
  };

  create(createTagDto: CreateTagDto) {
    try{
      const {name, status, source, price} = createTagDto;
      const tag = new Tag({
        name: name,
        status: status,
        source: source,
        price: price,
      });
      this.tags.push(tag);
      return  tag;
    } catch (error){
      // throw new DefaultException();
      throw error;
    }    
  }

  findAll() {
    try{
      return this.tags;
    } catch (error){
        // throw new DefaultException();
      throw error;
    }    
  }

  findOne(id: number) {
    try{
        return this.tags[id];
    } catch (error){
        // throw new DefaultException();
      throw error;
    } 
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    try{
      const {name, status, source, price} = updateTagDto;
      const tag = new Tag({
        name: name,
        status: status,
        source: source,
        price: price,
      });
      this.tags[id] = tag;
      return tag;
    } catch (error){
        // throw new DefaultException();
      throw error;
    }
  }

  remove(id: number) {
    try{
      this._shiftElementsAtIndex(id);
      return this.tags;
    } catch (error){
        // throw new DefaultException();
      throw error;
    } 
  }

  private _shiftElementsAtIndex(index: number){
    for(let i = index; i < this.tags.length; i++){
      const nextIndex = i + 1; 
      if(nextIndex == this.tags.length){
        this.tags[i] = undefined;   
        return;
      } 
      
      this.tags[i] = this.tags[nextIndex];
    }
  }
}
