import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/json' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    // for (const f of file) {
    await this.uploadService.upload(file.originalname, file.buffer);
    // }
  }

  @Get(':name')
  async readFile(@Param('name') name: string) {
    return await this.uploadService.getFile(name);
  }

  @Get()
  getFile() {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file, {
      type: 'application/json',
      disposition: 'attachment; filename:"package.json"',
    });
  }

  @Delete(':name')
  async deleteFile(@Param('name') name: string) {
    return await this.uploadService.deleteFile(name);
  } 
}
