import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export function buildMainPanel(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_dashboard').setLabel('◇ Dashboard | الرئيسية').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_schedules').setLabel('◇ Schedules | الجدولة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_management').setLabel('◇ Management | الإدارة').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_settings').setLabel('◇ Settings | الإعدادات').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('tnt_smart').setLabel('◇ Smart Systems | أنظمة الذكاء').setStyle(ButtonStyle.Secondary)
  );
}

export function buildMainPanelOwner(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('tnt_owner').setLabel('◇ Owner Panel | لوحة المالك').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('tnt_setup_open').setLabel('⚙ Setup | إعداد').setStyle(ButtonStyle.Success)
  );
}
