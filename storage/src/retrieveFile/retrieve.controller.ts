import {
  Controller,
  Get,
  NotFoundException,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { RetrieveService } from './retrieve.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Controller('retrieve')
export class RetrieveController {
  private readonly s3Client: S3Client;

  constructor(private readonly retrieveService: RetrieveService) {
    this.s3Client = new S3Client({
      region: process.env.AWS_S3_REGION,
      endpoint: 'http://localhost:9000',
      forcePathStyle: true,
    });
  }

  @Get()
  getFile() {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file, {
      type: 'application/json',
      disposition: 'attachment; filename:"package.json"',
    });
  }

  @Get(':name')
  async readFile(@Param('name') name: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: 'nestjs',
        Key: name,
      });
      const file = await this.s3Client.send(command);
      if (!file.Body) throw new NotFoundException('File not found.');

      const stream = file.Body as Readable;

      return new StreamableFile(stream);
    } catch (error) {
      throw new NotFoundException('File not found.');
    }
  }
}
