import { LogsService } from '../../modules/management/logsService.js';
import { createSimpleSubcommand } from '../shared.js';

const logsService = new LogsService();

export const manageLogs = createSimpleSubcommand('logs', 'إدارة اللوقات', async () => logsService.overview());
