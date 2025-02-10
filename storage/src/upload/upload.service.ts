import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: process.env.AWS_S3_REGION,
      endpoint: 'http://localhost:9000',
      forcePathStyle: true,
      credentials: {
        accessKeyId: 'minioadmin',
        secretAccessKey: 'minioadmin123',
      },
    });
  }

  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'nestjs',
        Key: fileName,
        Body: file,
      }),
    );
  }

  async getFile(name: string) {
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
  
  async deleteFile(name: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: 'nestjs',
        Key: name,
      });

      await this.s3Client.send(command);
    } catch (error) {
      throw new NotFoundException(`File not found`);
    }
  }
}
