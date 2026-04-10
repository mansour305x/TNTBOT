import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/** L3 buttons for Schedules > Create Schedule */
export function buildSchedulesCreateL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:schedules:create:name').setLabel('Set Name | تحديد الاسم').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:create:time').setLabel('Set Time | تحديد الوقت').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:create:repeat').setLabel('Set Repeat | تحديد التكرار').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:create:channel').setLabel('Select Channel | اختيار القناة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:create:action').setLabel('Select Action | اختيار الإجراء').setStyle(ButtonStyle.Secondary)
  );
  const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:schedules:create:save').setLabel('Save Schedule | حفظ الجدولة').setStyle(ButtonStyle.Success)
  );
  return [row1, row2, buildNavRow('schedules')];
}

/** L3 buttons for Schedules > View Schedules */
export function buildSchedulesViewL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:schedules:view:list').setLabel('List All Schedules | عرض كل الجدولات').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:view:channel').setLabel('Filter by Channel | تصفية حسب القناة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:view:status').setLabel('Filter by Status | تصفية حسب الحالة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:view:search').setLabel('Search by Name | البحث بالاسم').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('schedules')];
}

/** L3 buttons for Schedules > Edit Schedule */
export function buildSchedulesEditL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:schedules:edit:time').setLabel('Change Time | تعديل الوقت').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:edit:channel').setLabel('Change Channel | تعديل القناة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:edit:action').setLabel('Change Action | تعديل الإجراء').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:edit:repeat').setLabel('Change Repeat | تعديل التكرار').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('schedules')];
}

/** L3 buttons for Schedules > Delete Schedule */
export function buildSchedulesDeleteL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:schedules:delete:select').setLabel('Select Schedule | اختيار الجدولة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:delete:confirm').setLabel('Confirm Delete | تأكيد الحذف').setStyle(ButtonStyle.Danger)
  );
  return [row, buildNavRow('schedules')];
}

/** L3 buttons for Schedules > Duplicate Schedule */
export function buildSchedulesDuplicateL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:schedules:duplicate:select').setLabel('Select Schedule | اختيار الجدولة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:duplicate:copy').setLabel('Create Copy | إنشاء نسخة').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:duplicate:edit').setLabel('Edit Copy | تعديل النسخة').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('schedules')];
}

/** L3 buttons for Schedules > Enable/Disable */
export function buildSchedulesToggleL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:schedules:toggle:enable').setLabel('Enable Schedule | تشغيل الجدولة').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:toggle:disable').setLabel('Disable Schedule | إيقاف الجدولة').setStyle(ButtonStyle.Danger)
  );
  return [row, buildNavRow('schedules')];
}

/** L3 buttons for Schedules > Schedule Channels */
export function buildSchedulesChannelsL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:schedules:channels:add').setLabel('Add Channel | إضافة قناة').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:channels:remove').setLabel('Remove Channel | إزالة قناة').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:channels:view').setLabel('View Bound Channels | عرض القنوات المرتبطة').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('schedules')];
}

/** L3 buttons for Schedules > Next Trigger */
export function buildSchedulesNextL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:schedules:next:nextrun').setLabel('Show Next Run | عرض أقرب تنفيذ').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:schedules:next:upcoming').setLabel('Show All Upcoming | عرض كل التنفيذات القادمة').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('schedules')];
}
