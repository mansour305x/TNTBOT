import type { BotCommand } from '../types/command.js';
import { createSectionCommand } from './shared.js';
import { tntCommand } from './tnt/tnt.js';
import { setupCommand } from './setup/setup.js';

import { scheduleCreate } from './schedules/create.js';
import { scheduleList } from './schedules/list.js';
import { scheduleEdit } from './schedules/edit.js';
import { scheduleDelete } from './schedules/delete.js';
import { scheduleDuplicate } from './schedules/duplicate.js';
import { scheduleToggle } from './schedules/toggle.js';
import { scheduleChannels } from './schedules/channels.js';
import { scheduleNext } from './schedules/next.js';

import { manageRoles } from './management/roles.js';
import { manageChannels } from './management/channels.js';
import { managePermissions } from './management/permissions.js';
import { manageLogs } from './management/logs.js';
import { manageSecurity } from './management/security.js';
import { manageTickets } from './management/tickets.js';
import { manageAutoresponses } from './management/autoresponses.js';
import { manageWelcome } from './management/welcome.js';

import { settingsLanguage } from './settings/language.js';
import { settingsTimezone } from './settings/timezone.js';
import { settingsColors } from './settings/colors.js';
import { settingsNotifications } from './settings/notifications.js';
import { settingsBot } from './settings/botsettings.js';

import { smartReminders } from './smart/reminders.js';
import { smartScheduler } from './smart/smartscheduler.js';
import { smartShield } from './smart/smartshield.js';
import { smartReplies } from './smart/smartreplies.js';

import { ownerOverview } from './owner/overview.js';
import { ownerSystem } from './owner/systemcontrol.js';
import { ownerDatabase } from './owner/database.js';
import { ownerBackup } from './owner/backup.js';
import { ownerDevelopers } from './owner/developers.js';
import { ownerIntegrations } from './owner/integrations.js';
import { ownerLogs } from './owner/advancedlogs.js';
import { ownerErrors } from './owner/errorcenter.js';
import { ownerUpdates } from './owner/updates.js';

const scheduleCommand = createSectionCommand('schedule', 'إدارة أنظمة الجدولة', [
  scheduleCreate,
  scheduleList,
  scheduleEdit,
  scheduleDelete,
  scheduleDuplicate,
  scheduleToggle,
  scheduleChannels,
  scheduleNext
]);

const manageCommand = createSectionCommand('manage', 'إدارة السيرفر', [
  manageRoles,
  manageChannels,
  managePermissions,
  manageLogs,
  manageSecurity,
  manageTickets,
  manageAutoresponses,
  manageWelcome
]);

const settingsCommand = createSectionCommand('settings', 'إعدادات البوت', [
  settingsLanguage,
  settingsTimezone,
  settingsColors,
  settingsNotifications,
  settingsBot
]);

const smartCommand = createSectionCommand('smart', 'أنظمة الذكاء', [
  smartReminders,
  smartScheduler,
  smartShield,
  smartReplies
]);

const ownerCommand = createSectionCommand('owner', 'لوحة تحكم المالك', [
  ownerOverview,
  ownerSystem,
  ownerDatabase,
  ownerBackup,
  ownerDevelopers,
  ownerIntegrations,
  ownerLogs,
  ownerErrors,
  ownerUpdates
]);

export const commands: BotCommand[] = [
  tntCommand,
  setupCommand,
  scheduleCommand,
  manageCommand,
  settingsCommand,
  smartCommand,
  ownerCommand
];
