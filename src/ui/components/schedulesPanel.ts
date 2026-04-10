import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/**
 * 📅 Schedules | نظام الجدولة
 * (خفيف – واضح – بدون تعقيد)
 */
export function buildSchedulesPanel(): ActionRowBuilder<ButtonBuilder>[] {
  const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_l2:schedules:create')
      .setLabel('📝 Create Schedule | إنشاء جدولة')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:schedules:view')
      .setLabel('📋 View Schedules | عرض الجدولات')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:schedules:edit')
      .setLabel('✏️ Edit Schedule | تعديل جدولة')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:schedules:delete')
      .setLabel('🗑️ Delete Schedule | حذف جدولة')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId('tnt_l2:schedules:duplicate')
      .setLabel('📑 Duplicate | نسخ')
      .setStyle(ButtonStyle.Secondary)
  );
  const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_l2:schedules:toggle')
      .setLabel('🔘 Enable/Disable | تشغيل/إيقاف')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:schedules:channels')
      .setLabel('📢 Channels | قنوات الجدولة')
      .setStyle(ButtonStyle.Secondary)
  );
  return [row1, row2, buildNavRow()];
}

