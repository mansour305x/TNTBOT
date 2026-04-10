import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/** L3 buttons for Owner > Overview */
export function buildOwnerOverviewL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:owner:overview:dashboard').setLabel('Owner Dashboard | لوحة المالك').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:owner:overview:health').setLabel('System Health | صحة النظام').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:owner:overview:stats').setLabel('Usage Stats | إحصائيات الاستخدام').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('owner')];
}

/** L3 buttons for Owner > System Control */
export function buildOwnerSystemL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:owner:system:restart').setLabel('Restart Bot | إعادة تشغيل البوت').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:owner:system:shutdown').setLabel('Shutdown Bot | إيقاف البوت').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:owner:system:features').setLabel('Toggle Features | تشغيل/إيقاف الميزات').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('owner')];
}

/** L3 buttons for Owner > Database */
export function buildOwnerDatabaseL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:owner:database:records').setLabel('View Records | عرض السجلات').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:owner:database:clean').setLabel('Clean Old Data | تنظيف البيانات القديمة').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:owner:database:export').setLabel('Export DB | تصدير قاعدة البيانات').setStyle(ButtonStyle.Primary)
  );
  return [row, buildNavRow('owner')];
}

/** L3 buttons for Owner > Backup */
export function buildOwnerBackupL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:owner:backup:create').setLabel('Create Backup | إنشاء نسخة احتياطية').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:owner:backup:restore').setLabel('Restore Backup | استعادة نسخة احتياطية').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:owner:backup:history').setLabel('Backup History | سجل النسخ الاحتياطية').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('owner')];
}

/** L3 buttons for Owner > Developers */
export function buildOwnerDevelopersL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:owner:developers:add').setLabel('Add Developer | إضافة مطوّر').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('tnt_l3:owner:developers:remove').setLabel('Remove Developer | إزالة مطوّر').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:owner:developers:permissions').setLabel('Dev Permissions | تعيين صلاحيات المطورين').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('owner')];
}

/** L3 buttons for Owner > Integrations */
export function buildOwnerIntegrationsL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:owner:integrations:connect').setLabel('Connect Service | ربط خدمة خارجية').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:owner:integrations:webhooks').setLabel('Manage Webhooks | إدارة Webhooks').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:owner:integrations:apikeys').setLabel('API Keys | مفاتيح الـ API').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('owner')];
}

/** L3 buttons for Owner > Advanced Logs */
export function buildOwnerAdvLogsL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:owner:advlogs:errors').setLabel('Deep Error Logs | سجلات الأخطاء التفصيلية').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:owner:advlogs:performance').setLabel('Performance Logs | سجلات الأداء').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:owner:advlogs:security').setLabel('Security Logs | سجلات الأمان').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('owner')];
}

/** L3 buttons for Owner > Error Center */
export function buildOwnerErrorCenterL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:owner:errorcenter:list').setLabel('View Error List | عرض قائمة الأخطاء').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:owner:errorcenter:resolve').setLabel('Mark Resolved | تعليم كمنتهي').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('tnt_l3:owner:errorcenter:details').setLabel('Error Details | تفاصيل الخطأ').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('owner')];
}

/** L3 buttons for Owner > Updates */
export function buildOwnerUpdatesL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:owner:updates:check').setLabel('Check Updates | التحقق من التحديثات').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:owner:updates:changelog').setLabel('View Changelog | عرض سجل التغييرات').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:owner:updates:apply').setLabel('Apply Update | تطبيق التحديث').setStyle(ButtonStyle.Success)
  );
  return [row, buildNavRow('owner')];
}
