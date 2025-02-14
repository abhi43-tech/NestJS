import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('gallery', { concurrency: 2 })
export class VideoConsumer extends WorkerHost {
  async process(job: Job) {
    switch (job.name) {
      case 'vidoe': {
        const totalStep = 5;
        for (let step = 1; step <= totalStep; step++) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const progress = Math.round((step / totalStep) * 100);
          await job.updateProgress(progress);
        }
        break;
      }
      case 'img': {
        const totalStep = 2;
        for (let step = 1; step <= totalStep; step++) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const progress = Math.round((step / totalStep) * 100);
          await job.updateProgress(progress);
        }
        break;
      }
    }
  }

  @OnWorkerEvent('progress')
  onProgess(job: Job) {
    console.log('progress : ', job.progress);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log('New job : ', job.id);
  }

  @OnWorkerEvent('completed')
  onComplete(job: Job) {
    console.log('completed job : ', job.id);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log('failed job : ', job.id);
  }
}
