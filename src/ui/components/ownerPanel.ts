import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { buildNavRow } from './navRow.js';

/**
 * 👑 Owner | لوحة المالك
 * (مخصصة لك فقط — TNT Owner)
 */
export function buildOwnerPanel(): ActionRowBuilder<ButtonBuilder>[] {
  const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_l2:owner:overview')
      .setLabel('👁️ Overview | نظرة عامة')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:owner:system')
      .setLabel('🎛️ System Control | التحكم بالنظام')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:owner:database')
      .setLabel('🗄️ Database | قاعدة البيانات')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:owner:backup')
      .setLabel('💾 Backup | النسخ الاحتياطي')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:owner:developers')
      .setLabel('👨‍💻 Developers | المطورين')
      .setStyle(ButtonStyle.Secondary)
  );
  const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('tnt_l2:owner:advlogs')
      .setLabel('📊 Advanced Logs | السجلات المتقدمة')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:owner:errorcenter')
      .setLabel('⚠️ Error Center | مركز الأخطاء')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('tnt_l2:owner:updates')
      .setLabel('🔄 Updates | التحديثات')
      .setStyle(ButtonStyle.Secondary)
  );
  return [row1, row2, buildNavRow()];
}

