import { PrismaClient } from '@prisma/client';
import { logger } from './logger.js';

class Database {
  private prismaClient: PrismaClient | null = null;

  public async connect(): Promise<void> {
    if (this.prismaClient) return;

    // DATABASE_URL may be empty during first-run setup; skip silently
    const url = process.env.DATABASE_URL ?? '';
    if (!url) {
      logger.warn('DATABASE_URL not set – running without database (use /setup to configure)');
      return;
    }

    try {
      this.prismaClient = new PrismaClient();
      await this.prismaClient.$connect();
      logger.info('Connected to PostgreSQL via Prisma');
    } catch (err) {
      logger.error({ err }, 'Database connection failed – running without database');
      this.prismaClient = null;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.prismaClient) return;
    await this.prismaClient.$disconnect();
    this.prismaClient = null;
  }

  public get client(): PrismaClient {
    if (!this.prismaClient) {
      throw new Error('Database client is not connected');
    }
    return this.prismaClient;
  }

  public getHealth(): 'connected' | 'disconnected' {
    return this.prismaClient ? 'connected' : 'disconnected';
  }
}

export const database = new Database();
