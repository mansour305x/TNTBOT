import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { withTntEmoji } from '../utils/emoji.js';

export function buildMainPanel(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_dashboard').setLabel('Dashboard | الرئيسية').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_schedules').setLabel('Schedules | الجدولة').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_management').setLabel('Management | الإدارة').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_settings').setLabel('Settings | الإعدادات').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_smart').setLabel('Smart Systems | الذكاء').setStyle(ButtonStyle.Secondary))
  );
}

export function buildMainPanelOwner(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_owner').setLabel('Owner Panel | لوحة المالك').setStyle(ButtonStyle.Primary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_setup_open').setLabel('Setup | إعداد').setStyle(ButtonStyle.Success))
  );
}
