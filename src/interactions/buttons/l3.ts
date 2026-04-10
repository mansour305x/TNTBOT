/**
 * L3 action handlers.
 * customId format: tnt_l3:{section}:{subsection}:{action}
 *
 * Actions either:
 *   - Show a modal for text input
 *   - Reply ephemerally with information
 *   - Perform a direct action and reply with confirmation
 */
import {
  ActionRowBuilder,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from 'discord.js';
import type { ButtonInteraction } from 'discord.js';
import { database } from '../../app/database.js';
import { config } from '../../config/config.js';
import { logger } from '../../core/logger.js';
import { scheduler } from '../../core/scheduler.js';
import { ScheduleService } from '../../modules/schedules/service.js';
import { SettingsService } from '../../modules/settings/settingsService.js';
import { OwnerService } from '../../modules/owner/ownerService.js';
import type { ButtonHandler } from '../../types/interaction.js';
import { embedTheme } from '../../ui/embeds/theme.js';

const settingsService = new SettingsService();
const scheduleService = new ScheduleService();
const ownerService = new OwnerService();

// ──────────────────────────────────────────────
// Helper: show a single-field modal
// ──────────────────────────────────────────────
function buildSingleModal(
  customId: string,
  title: string,
  inputId: string,
  label: string,
  placeholder: string,
  style: TextInputStyle = TextInputStyle.Short
): ModalBuilder {
  return new ModalBuilder()
    .setCustomId(customId)
    .setTitle(title)
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId(inputId)
          .setLabel(label)
          .setStyle(style)
          .setPlaceholder(placeholder)
          .setRequired(true)
      )
    );
}

// ──────────────────────────────────────────────
// Helper: ephemeral embed reply
// ──────────────────────────────────────────────
async function replyEmbed(
  interaction: ButtonInteraction,
  title: string,
  description: string,
  color: number = embedTheme.secondary
): Promise<void> {
  const embed = new EmbedBuilder().setColor(color).setTitle(title).setDescription(description).setTimestamp();
  await interaction.reply({ embeds: [embed], ephemeral: true });
}

// ──────────────────────────────────────────────
// Main dispatch
// ──────────────────────────────────────────────
async function handleL3(interaction: ButtonInteraction): Promise<void> {
  // customId: tnt_l3:{section}:{subsection}:{action}
  const parts = interaction.customId.split(':');
  const section = parts[1] ?? '';
  const subsection = parts[2] ?? '';
  const action = parts[3] ?? '';
  const key = `${section}:${subsection}:${action}`;

  const guildId = interaction.guildId;

  // Owner gate for owner section
  if (section === 'owner' && interaction.user.id !== config.ownerId) {
    await interaction.reply({ content: '🔒 هذا القسم للمالك فقط.', ephemeral: true });
    return;
  }

  // Require guild for most actions
  if (!guildId && !['dashboard', 'owner'].includes(section)) {
    await interaction.reply({ content: '⚠️ هذا الإجراء يعمل داخل السيرفر فقط.', ephemeral: true });
    return;
  }

  switch (key) {
    // ────────────── DASHBOARD ──────────────
    case 'dashboard:overview:summary':
      await handleDashboardSummary(interaction, guildId);
      break;
    case 'dashboard:overview:systems':
      await replyEmbed(interaction, '◇ Active Systems | الأنظمة النشطة',
        `🟢 Database: ${database.getHealth()}\n🟢 Bot Uptime: ${Math.floor(process.uptime())}s\n🟢 API Ping: ${interaction.client.ws.ping}ms`);
      break;
    case 'dashboard:overview:activity':
      await replyEmbed(interaction, '◇ Recent Activity | آخر النشاطات',
        'يتم عرض السجلات من قاعدة البيانات عند الاتصال.');
      break;
    case 'dashboard:status:online':
      await replyEmbed(interaction, '◇ Bot Online Status | حالة اتصال البوت',
        `🟢 البوت متصل ويعمل.\nUptime: ${Math.floor(process.uptime())}s`);
      break;
    case 'dashboard:status:api':
      await replyEmbed(interaction, '◇ API Status | حالة الـ API',
        `Discord API Ping: ${interaction.client.ws.ping}ms\nDatabase: ${database.getHealth()}`);
      break;
    case 'dashboard:status:errors': {
      const errCount = database.getHealth() === 'connected'
        ? await database.client.errorEntry.count().catch(() => 0)
        : 0;
      await replyEmbed(interaction, '◇ Error Summary | ملخص الأخطاء',
        `إجمالي الأخطاء المسجلة: **${errCount}**`);
      break;
    }
    case 'dashboard:actions:restart':
      if (interaction.user.id !== config.ownerId) {
        await interaction.reply({ content: '🔒 هذه العملية للمالك فقط.', ephemeral: true });
        return;
      }
      await interaction.reply({ content: '🔄 جارٍ إعادة التشغيل...', ephemeral: true });
      logger.info('Bot restart triggered via button');
      process.exit(0);
      break;
    case 'dashboard:actions:cache':
      scheduler.clear();
      if (guildId) await scheduleService.hydrate().catch(() => null);
      await replyEmbed(interaction, '✅ Clear Cache | مسح الكاش', 'تم مسح الكاش وإعادة تحميل الجدولات.');
      break;
    case 'dashboard:actions:refresh':
      await replyEmbed(interaction, '✅ Refresh Data | تحديث البيانات', 'تم تحديث البيانات بنجاح.');
      break;

    // ────────────── SCHEDULES ──────────────
    case 'schedules:create:name':
      await interaction.showModal(
        buildSingleModal('tnt_modal_schedule_create', 'Create Schedule | إنشاء جدولة', 'name', 'Schedule Name | اسم الجدولة', 'e.g. Daily Announcement')
      );
      break;
    case 'schedules:create:time':
      await interaction.showModal(
        buildSingleModal('tnt_modal_schedule_cron', 'Set Time | تحديد الوقت', 'cron', 'Cron Expression | تعبير الكرون', '0 9 * * * (every day 9am)')
      );
      break;
    case 'schedules:create:repeat':
      await replyEmbed(interaction, '◇ Set Repeat | تحديد التكرار',
        'استخدم نمط Cron للتكرار:\n`* * * * *` = كل دقيقة\n`0 9 * * *` = كل يوم الساعة 9\n`0 9 * * 1` = كل اثنين');
      break;
    case 'schedules:create:channel':
      await replyEmbed(interaction, '◇ Select Channel | اختيار القناة',
        'أدخل معرف القناة (Channel ID) عند إنشاء الجدولة عبر النموذج.');
      break;
    case 'schedules:create:action':
      await replyEmbed(interaction, '◇ Select Action | اختيار الإجراء',
        'الإجراءات المتاحة:\n• `notification` — إرسال رسالة\n• `announcement` — إعلان');
      break;
    case 'schedules:create:save':
      await interaction.showModal(buildFullScheduleModal());
      break;
    case 'schedules:view:list': {
      if (!guildId) break;
      const lang = await settingsService.getLanguage(guildId).catch(() => 'ar' as const);
      const content = await scheduleService.list(guildId, lang);
      await replyEmbed(interaction, '◇ All Schedules | كل الجدولات', content || 'لا توجد جدولات.');
      break;
    }
    case 'schedules:view:channel':
      await replyEmbed(interaction, '◇ Filter by Channel | تصفية حسب القناة',
        'أدخل معرف القناة في النموذج لتصفية الجدولات.');
      break;
    case 'schedules:view:status':
      await replyEmbed(interaction, '◇ Filter by Status | تصفية حسب الحالة',
        'يمكنك تصفية الجدولات حسب: مفعّلة (Enabled) أو معطّلة (Disabled).');
      break;
    case 'schedules:view:search':
      await interaction.showModal(
        buildSingleModal('tnt_modal_schedule_search', 'Search Schedules | البحث بالاسم', 'name', 'اسم الجدولة', 'e.g. Daily')
      );
      break;
    case 'schedules:edit:time':
      await interaction.showModal(
        buildSingleModal('tnt_modal_schedule_editcron', 'Edit Time | تعديل الوقت', 'cron', 'Cron Expression', '0 9 * * *')
      );
      break;
    case 'schedules:edit:channel':
      await interaction.showModal(
        buildSingleModal('tnt_modal_schedule_editchannel', 'Edit Channel | تعديل القناة', 'channelId', 'Channel ID', '123456789012345678')
      );
      break;
    case 'schedules:edit:action':
      await replyEmbed(interaction, '◇ Change Action | تعديل الإجراء',
        'الإجراءات المتاحة: `notification`, `announcement`');
      break;
    case 'schedules:edit:repeat':
      await interaction.showModal(
        buildSingleModal('tnt_modal_schedule_editcron', 'Edit Repeat | تعديل التكرار', 'cron', 'Cron Expression', '0 9 * * *')
      );
      break;
    case 'schedules:delete:select':
      await replyEmbed(interaction, '◇ Select Schedule | اختيار الجدولة',
        'استخدم القائمة المنسدلة عند توفرها، أو أدخل معرف الجدولة للحذف.');
      break;
    case 'schedules:delete:confirm':
      await replyEmbed(interaction, '⚠️ Confirm Delete | تأكيد الحذف',
        'هذه العملية نهائية. استخدم نافذة التأكيد لحذف الجدولة المحددة.', embedTheme.primary);
      break;
    case 'schedules:duplicate:select':
    case 'schedules:duplicate:copy':
    case 'schedules:duplicate:edit':
      await replyEmbed(interaction, '◇ Duplicate Schedule | نسخ جدولة',
        'اختر الجدولة المراد نسخها من القائمة.');
      break;
    case 'schedules:toggle:enable':
    case 'schedules:toggle:disable':
      await replyEmbed(interaction, '◇ Enable/Disable | تشغيل/إيقاف',
        'اختر الجدولة من القائمة المنسدلة لتغيير حالتها.');
      break;
    case 'schedules:channels:add':
    case 'schedules:channels:remove':
    case 'schedules:channels:view':
      await replyEmbed(interaction, '◇ Schedule Channels | قنوات الجدولة',
        'إدارة القنوات المرتبطة بالجدولات.');
      break;
    case 'schedules:next:nextrun':
    case 'schedules:next:upcoming':
      await replyEmbed(interaction, '◇ Next Trigger | الجدولة القادمة',
        'اختر الجدولة لمعرفة موعد التنفيذ القادم.');
      break;

    // ────────────── MANAGEMENT ──────────────
    case 'management:roles:add':
    case 'management:roles:edit':
    case 'management:roles:delete':
    case 'management:roles:assign':
    case 'management:roles:remove':
      await replyEmbed(interaction, '◇ Roles | الرتب', `إجراء: **${action}**\nستظهر قائمة الرتب هنا قريباً.`);
      break;
    case 'management:channels:list':
    case 'management:channels:type':
    case 'management:channels:bind':
    case 'management:channels:lock':
      await replyEmbed(interaction, '◇ Channels | القنوات', `إجراء: **${action}**\nإدارة القنوات قيد التطوير.`);
      break;
    case 'management:permissions:matrix':
    case 'management:permissions:grant':
    case 'management:permissions:revoke':
    case 'management:permissions:rolebased':
      await replyEmbed(interaction, '◇ Permissions | الصلاحيات', `إجراء: **${action}**\nإدارة الصلاحيات قيد التطوير.`);
      break;
    case 'management:logs:messages':
    case 'management:logs:joinleave':
    case 'management:logs:moderation':
    case 'management:logs:export':
      await replyEmbed(interaction, '◇ Logs | اللوجات', `نوع السجل: **${action}**\nسيتم عرض السجلات هنا.`);
      break;
    case 'management:security:antispam':
    case 'management:security:antilink':
    case 'management:security:bankick':
    case 'management:security:level':
      await replyEmbed(interaction, '◇ Security | الحماية', `إجراء: **${action}**\nإعدادات الحماية قيد التطوير.`);
      break;
    case 'management:tickets:category':
    case 'management:tickets:open':
    case 'management:tickets:close':
    case 'management:tickets:assign':
    case 'management:tickets:logs':
      await replyEmbed(interaction, '◇ Tickets | التذاكر', `إجراء: **${action}**\nنظام التذاكر قيد التطوير.`);
      break;
    case 'management:autoresponses:add':
      await interaction.showModal(
        buildSingleModal('tnt_modal_autoresponse_add', 'Add Auto Response | إضافة رد تلقائي', 'keyword', 'Keyword | الكلمة المفتاحية', 'e.g. مرحبا')
      );
      break;
    case 'management:autoresponses:edit':
    case 'management:autoresponses:delete':
    case 'management:autoresponses:list':
      await replyEmbed(interaction, '◇ Auto Responses | الردود التلقائية', `إجراء: **${action}**`);
      break;
    case 'management:welcome:channel':
    case 'management:welcome:message':
    case 'management:welcome:toggle':
    case 'management:welcome:test':
      await replyEmbed(interaction, '◇ Welcome System | الترحيب', `إجراء: **${action}**\nنظام الترحيب قيد التطوير.`);
      break;

    // ────────────── SETTINGS ──────────────
    case 'settings:language:arabic':
      if (!guildId) break;
      await settingsService.updateLanguage(guildId, 'ar');
      await replyEmbed(interaction, '✅ Language | اللغة', 'تم التحويل إلى اللغة العربية.', 0x57f287);
      break;
    case 'settings:language:english':
      if (!guildId) break;
      await settingsService.updateLanguage(guildId, 'en');
      await replyEmbed(interaction, '✅ Language | اللغة', 'Switched to English.', 0x57f287);
      break;
    case 'settings:language:auto':
      await replyEmbed(interaction, '◇ Auto Language Detection | كشف اللغة تلقائياً',
        'سيتم كشف اللغة تلقائياً بناءً على رسائل الأعضاء.');
      break;
    case 'settings:timezone:set':
      await interaction.showModal(
        buildSingleModal('tnt_modal_timezone', 'Set Timezone | ضبط المنطقة الزمنية', 'timezone', 'Timezone', 'Asia/Riyadh')
      );
      break;
    case 'settings:timezone:sync':
      await replyEmbed(interaction, '◇ Sync Timezone | مزامنة المنطقة', 'تتم المزامنة مع منطقة السيرفر تلقائياً.');
      break;
    case 'settings:timezone:show': {
      if (!guildId) break;
      const s = await settingsService.getOrCreate(guildId).catch(() => null);
      await replyEmbed(interaction, '◇ Current Timezone | المنطقة الحالية', `المنطقة الزمنية الحالية: **${s?.timezone ?? 'Asia/Riyadh'}**`);
      break;
    }
    case 'settings:colors:primary':
      await interaction.showModal(
        buildSingleModal('tnt_modal_color_primary', 'Primary Color | اللون الأساسي', 'color', 'Hex Color', '#D4AF37')
      );
      break;
    case 'settings:colors:accent':
      await interaction.showModal(
        buildSingleModal('tnt_modal_color_accent', 'Accent Color | لون التمييز', 'color', 'Hex Color', '#C0C0C0')
      );
      break;
    case 'settings:colors:reset':
      if (!guildId) break;
      await settingsService.updateColors(guildId, '#D4AF37', '#C0C0C0');
      await replyEmbed(interaction, '✅ Reset Theme | إعادة تعيين الثيم', 'تم إعادة تعيين الألوان إلى الافتراضية.', 0x57f287);
      break;
    case 'settings:notifications:dmon':
      if (!guildId) break;
      await settingsService.toggleNotifications(guildId);
      await replyEmbed(interaction, '✅ Notifications | الإشعارات', 'تم تفعيل الإشعارات.', 0x57f287);
      break;
    case 'settings:notifications:dmoff':
      if (!guildId) break;
      await settingsService.toggleNotifications(guildId);
      await replyEmbed(interaction, '✅ Notifications | الإشعارات', 'تم إيقاف الإشعارات.', 0xed4245);
      break;
    case 'settings:notifications:channel':
    case 'settings:notifications:errors':
      await replyEmbed(interaction, '◇ Notifications | الإشعارات', `إعداد إشعارات: **${action}**`);
      break;
    case 'settings:botsettings:prefix':
      await interaction.showModal(
        buildSingleModal('tnt_modal_prefix', 'Set Prefix | تعيين البريفكس', 'prefix', 'Prefix', '!')
      );
      break;
    case 'settings:botsettings:toggle':
      await replyEmbed(interaction, '◇ Toggle Systems | تشغيل/إيقاف الأنظمة',
        'تشغيل أو إيقاف أنظمة محددة.');
      break;
    case 'settings:botsettings:maintenance':
      if (!guildId) break;
      await settingsService.toggleMaintenance(guildId);
      await replyEmbed(interaction, '✅ Maintenance Mode | وضع الصيانة',
        'تم تغيير وضع الصيانة.', embedTheme.primary);
      break;
    case 'settings:botsettings:reset':
      await replyEmbed(interaction, '⚠️ Reset Config | إعادة ضبط الإعدادات',
        'سيتم إعادة جميع الإعدادات إلى القيم الافتراضية. هذه العملية نهائية.');
      break;

    // ────────────── SMART ──────────────
    case 'smart:reminders:add':
      await interaction.showModal(
        buildSingleModal('tnt_modal_reminder_add', 'Add Reminder | إضافة تذكير', 'content', 'Reminder Content | محتوى التذكير', 'e.g. اجتماع الفريق', TextInputStyle.Paragraph)
      );
      break;
    case 'smart:reminders:context':
    case 'smart:reminders:list':
      await replyEmbed(interaction, '◇ Smart Reminders | تذكيرات ذكية', `إجراء: **${action}**`);
      break;
    case 'smart:scheduler:autogenerate':
    case 'smart:scheduler:optimize':
    case 'smart:scheduler:analyze':
      await replyEmbed(interaction, '◇ Smart Scheduler | جدولة ذكية', `إجراء: **${action}**\nالميزات الذكية قيد التطوير.`);
      break;
    case 'smart:shield:detect':
    case 'smart:shield:autoban':
    case 'smart:shield:reports':
      await replyEmbed(interaction, '◇ Smart Shield | حماية ذكية', `إجراء: **${action}**\nالحماية الذكية قيد التطوير.`);
      break;
    case 'smart:replies:addpattern':
      await interaction.showModal(
        buildSingleModal('tnt_modal_smartreply_add', 'Add Reply Pattern | إضافة نمط', 'pattern', 'Pattern | النمط', 'e.g. مرحبا')
      );
      break;
    case 'smart:replies:train':
    case 'smart:replies:toggle':
      await replyEmbed(interaction, '◇ Smart Replies | ردود ذكية', `إجراء: **${action}**`);
      break;

    // ────────────── OWNER ──────────────
    case 'owner:overview:dashboard':
      await replyEmbed(interaction, '◇ Owner Dashboard | لوحة المالك', await ownerService.overview(), embedTheme.primary);
      break;
    case 'owner:overview:health':
      await replyEmbed(interaction, '◇ System Health | صحة النظام', await ownerService.system(), embedTheme.primary);
      break;
    case 'owner:overview:stats':
      await replyEmbed(interaction, '◇ Usage Stats | إحصائيات الاستخدام',
        `Uptime: ${Math.floor(process.uptime())}s\nPing: ${interaction.client.ws.ping}ms`, embedTheme.primary);
      break;
    case 'owner:system:restart':
      await interaction.reply({ content: '🔄 جارٍ إعادة التشغيل...', ephemeral: true });
      logger.info('Owner triggered bot restart');
      process.exit(0);
      break;
    case 'owner:system:shutdown':
      await interaction.reply({ content: '🛑 جارٍ إيقاف البوت...', ephemeral: true });
      logger.info('Owner triggered bot shutdown');
      process.exit(0);
      break;
    case 'owner:system:features':
      await replyEmbed(interaction, '◇ Toggle Features | تشغيل/إيقاف الميزات',
        'إدارة ميزات البوت قيد التطوير.', embedTheme.primary);
      break;
    case 'owner:database:records':
      await replyEmbed(interaction, '◇ View Records | عرض السجلات', await ownerService.databaseStats(), embedTheme.primary);
      break;
    case 'owner:database:clean':
      await replyEmbed(interaction, '◇ Clean Old Data | تنظيف البيانات', 'تنظيف البيانات القديمة قيد التطوير.', embedTheme.primary);
      break;
    case 'owner:database:export':
      await replyEmbed(interaction, '◇ Export DB | تصدير قاعدة البيانات', 'تصدير قاعدة البيانات قيد التطوير.', embedTheme.primary);
      break;
    case 'owner:backup:create':
    case 'owner:backup:restore':
    case 'owner:backup:history':
      await replyEmbed(interaction, '◇ Backup | النسخ الاحتياطي', `إجراء: **${action}**\nنظام النسخ الاحتياطي قيد التطوير.`, embedTheme.primary);
      break;
    case 'owner:developers:add':
    case 'owner:developers:remove':
    case 'owner:developers:permissions':
      await replyEmbed(interaction, '◇ Developers | المطورين', `إجراء: **${action}**`, embedTheme.primary);
      break;
    case 'owner:integrations:connect':
    case 'owner:integrations:webhooks':
    case 'owner:integrations:apikeys':
      await replyEmbed(interaction, '◇ Integrations | التكاملات', `إجراء: **${action}**\nالتكاملات قيد التطوير.`, embedTheme.primary);
      break;
    case 'owner:advlogs:errors':
    case 'owner:advlogs:performance':
    case 'owner:advlogs:security':
      await replyEmbed(interaction, '◇ Advanced Logs | السجلات المتقدمة', await ownerService.updates(), embedTheme.primary);
      break;
    case 'owner:errorcenter:list': {
      const errors = database.getHealth() === 'connected'
        ? await database.client.errorEntry.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }).catch(() => [])
        : [];
      const content = errors.length > 0
        ? errors.map((e) => `• [${e.scope}] ${e.message.slice(0, 80)}`).join('\n')
        : 'لا توجد أخطاء مسجلة.';
      await replyEmbed(interaction, '◇ Error List | قائمة الأخطاء', content, embedTheme.primary);
      break;
    }
    case 'owner:errorcenter:resolve':
    case 'owner:errorcenter:details':
      await replyEmbed(interaction, '◇ Error Center | مركز الأخطاء', `إجراء: **${action}**`, embedTheme.primary);
      break;
    case 'owner:updates:check':
      await replyEmbed(interaction, '◇ Check Updates | التحقق من التحديثات', await ownerService.updates(), embedTheme.primary);
      break;
    case 'owner:updates:changelog':
      await replyEmbed(interaction, '◇ Changelog | سجل التغييرات', 'راجع CHANGELOG.md في المستودع.', embedTheme.primary);
      break;
    case 'owner:updates:apply':
      await replyEmbed(interaction, '◇ Apply Update | تطبيق التحديث', 'تطبيق التحديثات يتم يدوياً عبر إعادة نشر الكود.', embedTheme.primary);
      break;

    default:
      await interaction.reply({ content: `⚠️ الإجراء \`${key}\` غير مُطبَّق بعد.`, ephemeral: true });
  }
}

// ──────────────────────────────────────────────
// Full schedule creation modal (5 fields max)
// ──────────────────────────────────────────────
function buildFullScheduleModal(): ModalBuilder {
  return new ModalBuilder()
    .setCustomId('tnt_modal_schedule_create')
    .setTitle('Create Schedule | إنشاء جدولة')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder().setCustomId('name').setLabel('Name | الاسم').setStyle(TextInputStyle.Short).setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder().setCustomId('cron').setLabel('Cron Expression').setPlaceholder('0 9 * * *').setStyle(TextInputStyle.Short).setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder().setCustomId('channelId').setLabel('Channel ID').setStyle(TextInputStyle.Short).setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder().setCustomId('actionType').setLabel('Action Type').setValue('notification').setStyle(TextInputStyle.Short).setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder().setCustomId('payload').setLabel('Message Content | محتوى الرسالة').setStyle(TextInputStyle.Paragraph).setRequired(true)
      )
    );
}

// ──────────────────────────────────────────────
// Dashboard summary helper
// ──────────────────────────────────────────────
async function handleDashboardSummary(interaction: ButtonInteraction, guildId: string | null): Promise<void> {
  const isDbUp = database.getHealth() === 'connected';
  const schedulesCount = (guildId && isDbUp)
    ? await database.client.schedule.count({ where: { guildId } }).catch(() => 0)
    : 0;

  const lines = [
    `🖥️ **Server:** ${interaction.guild?.name ?? 'Unknown'}`,
    `🔋 **Uptime:** ${Math.floor(process.uptime())}s`,
    `📡 **Database:** ${database.getHealth()}`,
    `📅 **Active Schedules:** ${schedulesCount}`,
    `📶 **API Ping:** ${interaction.client.ws.ping}ms`
  ];
  await replyEmbed(interaction, '◇ Dashboard Summary | ملخص', lines.join('\n'));
}

export const l3ButtonHandlers: ButtonHandler[] = [
  { customId: 'tnt_l3:', prefix: true, execute: handleL3 }
];
