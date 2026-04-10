import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/** L3 buttons for Management > Roles */
export function buildManagementRolesL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:management:roles:add').setLabel('Add Role | إضافة رتبة').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('tnt_l3:management:roles:edit').setLabel('Edit Role | تعديل رتبة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:roles:delete').setLabel('Delete Role | حذف رتبة').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:management:roles:assign').setLabel('Assign Role | إعطاء رتبة').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:management:roles:remove').setLabel('Remove Role | إزالة رتبة').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('management')];
}

/** L3 buttons for Management > Channels */
export function buildManagementChannelsL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:management:channels:list').setLabel('List Channels | عرض القنوات').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:channels:type').setLabel('Set Channel Type | تحديد نوع القناة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:channels:bind').setLabel('Bind to System | ربط قناة بنظام').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:management:channels:lock').setLabel('Lock/Unlock | قفل/فتح القناة').setStyle(ButtonStyle.Danger)
  );
  return [row, buildNavRow('management')];
}

/** L3 buttons for Management > Permissions */
export function buildManagementPermissionsL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:management:permissions:matrix').setLabel('Permission Matrix | مصفوفة الصلاحيات').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:permissions:grant').setLabel('Grant Permission | منح صلاحية').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('tnt_l3:management:permissions:revoke').setLabel('Revoke Permission | سحب صلاحية').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:management:permissions:rolebased').setLabel('Role-Based | صلاحيات حسب الرتبة').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('management')];
}

/** L3 buttons for Management > Logs */
export function buildManagementLogsL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:management:logs:messages').setLabel('Message Logs | لوج الرسائل').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:logs:joinleave').setLabel('Join/Leave Logs | لوج الدخول/الخروج').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:logs:moderation').setLabel('Moderation Logs | لوج الإشراف').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:logs:export').setLabel('Export Logs | تصدير اللوجات').setStyle(ButtonStyle.Primary)
  );
  return [row, buildNavRow('management')];
}

/** L3 buttons for Management > Security */
export function buildManagementSecurityL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:management:security:antispam').setLabel('Anti-Spam | مضاد السبام').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:security:antilink').setLabel('Anti-Link | منع الروابط').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:security:bankick').setLabel('Ban/Kick | الطرد والحظر').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:management:security:level').setLabel('Security Level | مستوى الحماية').setStyle(ButtonStyle.Primary)
  );
  return [row, buildNavRow('management')];
}

/** L3 buttons for Management > Tickets */
export function buildManagementTicketsL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:management:tickets:category').setLabel('Create Category | إنشاء فئة تذاكر').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:management:tickets:open').setLabel('Open Ticket | فتح تذكرة').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('tnt_l3:management:tickets:close').setLabel('Close Ticket | إغلاق تذكرة').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:management:tickets:assign').setLabel('Assign Ticket | إسناد تذكرة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:tickets:logs').setLabel('Ticket Logs | لوج التذاكر').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('management')];
}

/** L3 buttons for Management > Auto Responses */
export function buildManagementAutoResponsesL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:management:autoresponses:add').setLabel('Add Response | إضافة رد تلقائي').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('tnt_l3:management:autoresponses:edit').setLabel('Edit Response | تعديل رد تلقائي').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:autoresponses:delete').setLabel('Delete Response | حذف رد تلقائي').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:management:autoresponses:list').setLabel('List Responses | عرض الردود التلقائية').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('management')];
}

/** L3 buttons for Management > Welcome System */
export function buildManagementWelcomeL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:management:welcome:channel').setLabel('Welcome Channel | قناة الترحيب').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:welcome:message').setLabel('Welcome Message | رسالة الترحيب').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:management:welcome:toggle').setLabel('Enable/Disable | تشغيل/إيقاف الترحيب').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:management:welcome:test').setLabel('Test Welcome | تجربة الترحيب').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('management')];
}
