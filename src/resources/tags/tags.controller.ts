import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { handleHttpException } from 'src/core/errors/httpExceptionHandler';
import { Tag } from './entities/tag.entity';
import { DefaultResponse, SuccessfulResponse } from 'src/core/response/default_response';
import { FileInterceptor } from '@nestjs/platform-express';
import { xlsxFileValidatorInterceptor } from 'src/core/interceptors/xlsxFileValidator.interceptor';
import { PublisherService } from 'src/core/utils/publisher_client';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService, private readonly publisherService: PublisherService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto): DefaultResponse<Tag> {
    try{
      return {
        statusCode: HttpStatus.CREATED,
        data: this.tagsService.create(createTagDto),
      } as SuccessfulResponse<Tag>;
    } catch (error){
      return handleHttpException(error);
    }
  }

  @Get()
  findAll(): DefaultResponse<Tag[]> {
    try{
      return {
        statusCode: HttpStatus.OK,
        data: this.tagsService.findAll(),
      } as SuccessfulResponse<Tag[]>;
    } catch (error){
      return handleHttpException(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): DefaultResponse<Tag> {
    try{
      return {
        statusCode: HttpStatus.OK,
        data: this.tagsService.findOne(+id),
      } as SuccessfulResponse<Tag>;
    } catch (error){
      return handleHttpException(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto): DefaultResponse<{}> {
    try{
      this.tagsService.update(+id, updateTagDto);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        data: {},
      } as SuccessfulResponse<Tag>;             
    } catch (error){
      return handleHttpException(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): DefaultResponse<{}> {
    try{
      this.tagsService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        data: {},
      } as SuccessfulResponse<Tag>;  
    } catch (error){
      return handleHttpException(error);
    }
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', 
    // {
    //   fileFilter: xlsxFileValidatorInterceptor,
    // },
    ),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      this.publisherService.sendFileToConsumer(
        file, 
        (data) => this.tagsService.createFromExtractedFile(data),
      );
      return {
        statusCode: HttpStatus.ACCEPTED,
        data: {
          message: 'Arquivo sendo processado...'
        },
      } as SuccessfulResponse<{message: string}>;
    } catch (error) {
      return handleHttpException(error);
    }
  }
}
