import { OnQueueEvent, QueueEventsHost, QueueEventsListener } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

@QueueEventsListener('video')
export class VideoQueueEventsListener extends QueueEventsHost {
  logger = new Logger('Queue')

  @OnQueueEvent('added')
  onAdded(job: {jobId: string; name: string}) {
    this.logger.log(`job ${job.jobId} is added to queue.`);
  }
}