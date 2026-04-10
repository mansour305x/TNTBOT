import schedule, { type Job } from 'node-schedule';
import { logger } from './logger.js';

export type ScheduledTask = {
  id: string;
  cron: string;
  enabled: boolean;
  job: () => Promise<void>;
};

class Scheduler {
  private jobs = new Map<string, Job>();

  public register(task: ScheduledTask): void {
    this.stop(task.id);
    if (!task.enabled) {
      return;
    }

    const job = schedule.scheduleJob(task.cron, () => {
      void task.job().catch((error: unknown) => {
        logger.error({ error, taskId: task.id }, 'Scheduled task failed');
      });
    });

    if (!job) {
      throw new Error(`Invalid cron expression: ${task.cron}`);
    }

    this.jobs.set(task.id, job);
  }

  public stop(id: string): void {
    const job = this.jobs.get(id);
    if (!job) {
      return;
    }

    job.cancel();
    this.jobs.delete(id);
  }

  public clear(): void {
    for (const id of this.jobs.keys()) {
      this.stop(id);
    }
  }

  public getNextInvocation(id: string): Date | null {
    const job = this.jobs.get(id);
    if (!job) {
      return null;
    }

    const next = job.nextInvocation();
    if (!next) {
      return null;
    }

    return next;
  }
}

export const scheduler = new Scheduler();
