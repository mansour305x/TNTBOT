import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { withTntEmoji } from '../utils/emoji.js';
import { runtimeConfig } from '../../config/setupConfig.js';

export function buildSetupEmbed(): EmbedBuilder {
  const missing = runtimeConfig.missingKeys;
  const done = runtimeConfig.isFullyConfigured;

  const statusLine = (key: string): string => {
    const filled = !missing.includes(key);
    return filled ? `✅  \`${key}\`` : `❌  \`${key}\``;
  };

  return new EmbedBuilder()
    .setTitle('⚙️  TNT 1478 — إعداد البوت')
    .setDescription(
      done
        ? '✅ **البوت مُهيَّأ بالكامل وجاهز للعمل.**'
        : '⚠️ **بعض الإعدادات مفقودة.** استخدم الأزرار أدناه لإكمال الإعداد.\nبعد حفظ كل قيمة سيُعيد البوت تشغيل نفسه تلقائياً.'
    )
    .addFields(
      { name: 'CLIENT_ID',    value: statusLine('CLIENT_ID'),    inline: true },
      { name: 'GUILD_ID',     value: statusLine('GUILD_ID'),     inline: true },
      { name: 'DATABASE_URL', value: statusLine('DATABASE_URL'), inline: false },
      { name: 'OWNER_ID',     value: statusLine('OWNER_ID'),     inline: true }
    )
    .setColor(done ? 0x57f287 : 0xfee75c)
    .setFooter({ text: 'TNT 1478 Setup Wizard' })
    .setTimestamp();
}

export function buildSetupPanel(): ActionRowBuilder<ButtonBuilder>[] {
  const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_setup_clientid').setLabel('Set CLIENT_ID').setStyle(ButtonStyle.Primary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_setup_guildid').setLabel('Set GUILD_ID').setStyle(ButtonStyle.Primary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_setup_ownerid').setLabel('Set OWNER_ID').setStyle(ButtonStyle.Primary))
  );

  const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_setup_dburl').setLabel('Set DATABASE_URL').setStyle(ButtonStyle.Secondary)),
    withTntEmoji(new ButtonBuilder().setCustomId('tnt_setup_status').setLabel('Refresh Status').setStyle(ButtonStyle.Secondary))
  );

  return [row1, row2];
}
