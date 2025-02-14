import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bullmq';

@Controller('gallery')
export class VideoController {
  constructor(@InjectQueue('gallery') private readonly galleryQueue: Queue) {}

  @Post('video')
  async postVideo() {
    await this.galleryQueue.add(
      'video',
      { file: 'video.mp3' },
      { removeOnComplete: 1000, removeOnFail: 5000 },
    );
  }

  @Post('img')
  async postImg() {
    await this.galleryQueue.add(
      'img',
      { filr: 'img.jpg' },
      { removeOnComplete: 1000, removeOnFail: 5000 },
    );
  }
}
