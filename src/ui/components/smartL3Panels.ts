import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/** L3 buttons for Smart > Smart Reminders */
export function buildSmartRemindersL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:smart:reminders:add').setLabel('Add Reminder | إضافة تذكير ذكي').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:smart:reminders:context').setLabel('Context-Based | تذكير حسب السياق').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:smart:reminders:list').setLabel('List Reminders | عرض التذكيرات الذكية').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('smart')];
}

/** L3 buttons for Smart > Smart Scheduler */
export function buildSmartSchedulerL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:smart:scheduler:autogenerate').setLabel('Auto Generate | إنشاء جدولة تلقائياً').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:smart:scheduler:optimize').setLabel('Optimize Times | تحسين أوقات التنفيذ').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:smart:scheduler:analyze').setLabel('Analyze Usage | تحليل الاستخدام').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('smart')];
}

/** L3 buttons for Smart > Smart Shield */
export function buildSmartShieldL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:smart:shield:detect').setLabel('Detect Suspicious | كشف سلوك مشبوه').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:smart:shield:autoban').setLabel('Auto Mute/Ban | كتم/حظر تلقائي').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tnt_l3:smart:shield:reports').setLabel('Security Reports | تقارير الحماية').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('smart')];
}

/** L3 buttons for Smart > Smart Replies */
export function buildSmartRepliesL3Panel(): ActionRowBuilder<ButtonBuilder>[] {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_l3:smart:replies:addpattern').setLabel('Add AI Pattern | إضافة نمط رد ذكي').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_l3:smart:replies:train').setLabel('Train on Messages | التعلم من الرسائل').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_l3:smart:replies:toggle').setLabel('Enable/Disable | تشغيل/إيقاف الردود الذكية').setStyle(ButtonStyle.Secondary)
  );
  return [row, buildNavRow('smart')];
}
