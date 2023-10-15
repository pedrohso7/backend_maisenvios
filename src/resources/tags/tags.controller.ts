import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { handleException } from 'src/core/errors/httpExceptionHandler';
import { Tag } from './entities/tag.entity';
import { SuccessfulResponse } from 'src/core/response/default_response';
import { FileInterceptor } from '@nestjs/platform-express';
import { xlsxFileValidatorInterceptor } from 'src/core/interceptors/xlsxFileValidator.interceptor';
import { PublisherService } from 'src/core/utils/publisher_client';
import { Response } from 'express';
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService, 
    private readonly publisherService: PublisherService,
  ) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto, @Res() res: Response) {
    try{
      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        data: this.tagsService.create(createTagDto),
      } as SuccessfulResponse<Tag>);
    } catch (error){
      return handleException(error, res);
    }
  }

  @Get()
  findAll(@Res() res: Response){
    try{
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        data: this.tagsService.findAll(),
      } as SuccessfulResponse<Tag[]>);
    } catch (error){
      return handleException(error, res);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    try{
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        data: this.tagsService.findOne(+id),
      } as SuccessfulResponse<Tag>);
    } catch (error){
      return handleException(error, res);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto, @Res() res: Response) {
    try{
      this.tagsService.update(+id, updateTagDto);
      return res.status(HttpStatus.NO_CONTENT).send({
        statusCode: HttpStatus.NO_CONTENT,
        data: {},
      } as SuccessfulResponse<Tag>);             
    } catch (error){
      return handleException(error, res);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response){
    try{
      this.tagsService.remove(+id);
      return res.status(HttpStatus.NO_CONTENT).send({
        statusCode: HttpStatus.NO_CONTENT,
        data: {},
      } as SuccessfulResponse<Tag>);  
    } catch (error){
      return handleException(error, res);
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
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {
      this.publisherService.sendFileToConsumer(
        file, 
        (data) => this.tagsService.createFromExtractedFile(data),
      );

      return res.status(HttpStatus.ACCEPTED).send({
        statusCode: HttpStatus.ACCEPTED,
        data: {
          message: 'Arquivo sendo processado...'
        },
      } as SuccessfulResponse<{message: string}>);
    } catch (error) {
      return handleException(error, res);
    }
  }
}
