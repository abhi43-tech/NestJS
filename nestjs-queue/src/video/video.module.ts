import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoConsumer } from './video.worker';
import { VideoQueueEventsListener } from './video.queue.event';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'gallery',
    }),
  ],
  controllers: [VideoController],
  providers: [VideoConsumer, VideoQueueEventsListener],
})
export class VideoModule {}
