import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

/**
 * 🎛️ TNT Control Panel | لوحة التحكم
 * (مختصرة – قوية – فخمة مثل الشعار)
 */
export function buildMainPanel(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_schedules')
      .setLabel('📅 Schedules | الجدولة')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_management')
      .setLabel('🛠️ Management | الإدارة')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_settings')
      .setLabel('⚙️ Settings | الإعدادات')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_smart')
      .setLabel('🤖 Smart | الذكاء')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_owner')
      .setLabel('👑 Owner | المالك')
      .setStyle(ButtonStyle.Primary)
  );
}

/** Secondary row with setup and dashboard quick access */
export function buildMainPanelOwner(): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_dashboard')
      .setLabel('🏠 Dashboard | الرئيسية')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_setup_open')
      .setLabel('⚙ Setup | إعداد')
      .setStyle(ButtonStyle.Success)
  );
}
