import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoConsumer } from './video.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'video',
    }),
  ],
  controllers: [VideoController],
  providers: [VideoConsumer],
})
export class VideoModule {}
