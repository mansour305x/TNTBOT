/**
 * L2 navigation handlers.
 * customId format: tnt_l2:{section}:{subsection}
 * Updates the main message to show the Level-3 action buttons for that subsection.
 */
import type { ButtonInteraction, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { config } from '../../config/config.js';
import type { ButtonHandler } from '../../types/interaction.js';
import { buildMainPanel, buildMainPanelOwner } from '../../ui/components/mainPanel.js';
import { embedTheme } from '../../ui/embeds/theme.js';

// Dashboard L3 panels
import {
  buildDashboardOverviewL3Panel,
  buildDashboardStatusL3Panel,
  buildDashboardActionsL3Panel
} from '../../ui/components/dashboardL3Panels.js';

// Schedules L3 panels
import {
  buildSchedulesCreateL3Panel,
  buildSchedulesViewL3Panel,
  buildSchedulesEditL3Panel,
  buildSchedulesDeleteL3Panel,
  buildSchedulesDuplicateL3Panel,
  buildSchedulesToggleL3Panel,
  buildSchedulesChannelsL3Panel,
  buildSchedulesNextL3Panel
} from '../../ui/components/schedulesL3Panels.js';

// Management L3 panels
import {
  buildManagementRolesL3Panel,
  buildManagementChannelsL3Panel,
  buildManagementPermissionsL3Panel,
  buildManagementLogsL3Panel,
  buildManagementSecurityL3Panel,
  buildManagementTicketsL3Panel,
  buildManagementAutoResponsesL3Panel,
  buildManagementWelcomeL3Panel
} from '../../ui/components/managementL3Panels.js';

// Settings L3 panels
import {
  buildSettingsLanguageL3Panel,
  buildSettingsTimezoneL3Panel,
  buildSettingsColorsL3Panel,
  buildSettingsNotificationsL3Panel,
  buildSettingsBotL3Panel
} from '../../ui/components/settingsL3Panels.js';

// Smart L3 panels
import {
  buildSmartRemindersL3Panel,
  buildSmartSchedulerL3Panel,
  buildSmartShieldL3Panel,
  buildSmartRepliesL3Panel
} from '../../ui/components/smartL3Panels.js';

// Owner L3 panels
import {
  buildOwnerOverviewL3Panel,
  buildOwnerSystemL3Panel,
  buildOwnerDatabaseL3Panel,
  buildOwnerBackupL3Panel,
  buildOwnerDevelopersL3Panel,
  buildOwnerIntegrationsL3Panel,
  buildOwnerAdvLogsL3Panel,
  buildOwnerErrorCenterL3Panel,
  buildOwnerUpdatesL3Panel
} from '../../ui/components/ownerL3Panels.js';

/** Map of subsection key → label (Arabic/English) and L3 panel builder */
type L3Entry = {
  title: string;
  description: string;
  color: number;
  buildPanel: () => ActionRowBuilder<ButtonBuilder>[];
};

const L3_MAP: Record<string, L3Entry> = {
  'dashboard:overview': {
    title: '◇ Overview | نظرة عامة',
    description: 'نظرة عامة على أداء وحالة البوت.',
    color: embedTheme.primary,
    buildPanel: buildDashboardOverviewL3Panel
  },
  'dashboard:status': {
    title: '◇ System Status | حالة النظام',
    description: 'حالة الاتصال والـ API والأخطاء.',
    color: embedTheme.primary,
    buildPanel: buildDashboardStatusL3Panel
  },
  'dashboard:actions': {
    title: '◇ Quick Actions | إجراءات سريعة',
    description: 'إجراءات سريعة للتحكم في البوت.',
    color: embedTheme.primary,
    buildPanel: buildDashboardActionsL3Panel
  },
  'schedules:create': {
    title: '◇ Create Schedule | إنشاء جدولة',
    description: 'أنشئ جدولة جديدة خطوة بخطوة.',
    color: embedTheme.secondary,
    buildPanel: buildSchedulesCreateL3Panel
  },
  'schedules:view': {
    title: '◇ View Schedules | عرض الجدولات',
    description: 'استعرض وابحث في الجدولات الحالية.',
    color: embedTheme.secondary,
    buildPanel: buildSchedulesViewL3Panel
  },
  'schedules:edit': {
    title: '◇ Edit Schedule | تعديل جدولة',
    description: 'عدّل إعدادات جدولة موجودة.',
    color: embedTheme.secondary,
    buildPanel: buildSchedulesEditL3Panel
  },
  'schedules:delete': {
    title: '◇ Delete Schedule | حذف جدولة',
    description: 'احذف جدولة بعد التأكيد.',
    color: embedTheme.secondary,
    buildPanel: buildSchedulesDeleteL3Panel
  },
  'schedules:duplicate': {
    title: '◇ Duplicate Schedule | نسخ جدولة',
    description: 'انسخ جدولة وعدّل النسخة.',
    color: embedTheme.secondary,
    buildPanel: buildSchedulesDuplicateL3Panel
  },
  'schedules:toggle': {
    title: '◇ Enable / Disable | تشغيل / إيقاف',
    description: 'شغّل أو أوقف جدولة محددة.',
    color: embedTheme.secondary,
    buildPanel: buildSchedulesToggleL3Panel
  },
  'schedules:channels': {
    title: '◇ Schedule Channels | قنوات الجدولة',
    description: 'أضف أو أزل القنوات المرتبطة بالجدولات.',
    color: embedTheme.secondary,
    buildPanel: buildSchedulesChannelsL3Panel
  },
  'schedules:next': {
    title: '◇ Next Trigger | الجدولة القادمة',
    description: 'اعرض أقرب وأكثر تنفيذات الجدولة.',
    color: embedTheme.secondary,
    buildPanel: buildSchedulesNextL3Panel
  },
  'management:roles': {
    title: '◇ Roles | الرتب',
    description: 'إدارة رتب السيرفر.',
    color: embedTheme.secondary,
    buildPanel: buildManagementRolesL3Panel
  },
  'management:channels': {
    title: '◇ Channels | القنوات',
    description: 'إدارة قنوات السيرفر.',
    color: embedTheme.secondary,
    buildPanel: buildManagementChannelsL3Panel
  },
  'management:permissions': {
    title: '◇ Permissions | الصلاحيات',
    description: 'إدارة صلاحيات الأعضاء والرتب.',
    color: embedTheme.secondary,
    buildPanel: buildManagementPermissionsL3Panel
  },
  'management:logs': {
    title: '◇ Logs | اللوجات',
    description: 'عرض وتصدير سجلات السيرفر.',
    color: embedTheme.secondary,
    buildPanel: buildManagementLogsL3Panel
  },
  'management:security': {
    title: '◇ Security | الحماية',
    description: 'إعدادات الحماية ومنع السبام والروابط.',
    color: embedTheme.secondary,
    buildPanel: buildManagementSecurityL3Panel
  },
  'management:tickets': {
    title: '◇ Tickets | التذاكر',
    description: 'إدارة نظام التذاكر.',
    color: embedTheme.secondary,
    buildPanel: buildManagementTicketsL3Panel
  },
  'management:autoresponses': {
    title: '◇ Auto Responses | الردود التلقائية',
    description: 'إدارة الردود التلقائية على الرسائل.',
    color: embedTheme.secondary,
    buildPanel: buildManagementAutoResponsesL3Panel
  },
  'management:welcome': {
    title: '◇ Welcome System | الترحيب',
    description: 'إعداد نظام الترحيب بالأعضاء الجدد.',
    color: embedTheme.secondary,
    buildPanel: buildManagementWelcomeL3Panel
  },
  'settings:language': {
    title: '◇ Language | اللغة',
    description: 'تغيير لغة البوت.',
    color: embedTheme.secondary,
    buildPanel: buildSettingsLanguageL3Panel
  },
  'settings:timezone': {
    title: '◇ Timezone | المنطقة الزمنية',
    description: 'ضبط المنطقة الزمنية.',
    color: embedTheme.secondary,
    buildPanel: buildSettingsTimezoneL3Panel
  },
  'settings:colors': {
    title: '◇ Colors | الألوان',
    description: 'تخصيص ألوان البوت.',
    color: embedTheme.secondary,
    buildPanel: buildSettingsColorsL3Panel
  },
  'settings:notifications': {
    title: '◇ Notifications | الإشعارات',
    description: 'إدارة إعدادات الإشعارات.',
    color: embedTheme.secondary,
    buildPanel: buildSettingsNotificationsL3Panel
  },
  'settings:botsettings': {
    title: '◇ Bot Settings | إعدادات البوت',
    description: 'إعدادات عامة للبوت.',
    color: embedTheme.secondary,
    buildPanel: buildSettingsBotL3Panel
  },
  'smart:reminders': {
    title: '◇ Smart Reminders | تذكيرات ذكية',
    description: 'إضافة وإدارة التذكيرات الذكية.',
    color: embedTheme.secondary,
    buildPanel: buildSmartRemindersL3Panel
  },
  'smart:scheduler': {
    title: '◇ Smart Scheduler | جدولة ذكية',
    description: 'إنشاء وتحسين الجدولات التلقائية.',
    color: embedTheme.secondary,
    buildPanel: buildSmartSchedulerL3Panel
  },
  'smart:shield': {
    title: '◇ Smart Shield | حماية ذكية',
    description: 'الحماية الذكية وكشف السلوك المشبوه.',
    color: embedTheme.secondary,
    buildPanel: buildSmartShieldL3Panel
  },
  'smart:replies': {
    title: '◇ Smart Replies | ردود ذكية',
    description: 'إعداد وتدريب الردود الذكية.',
    color: embedTheme.secondary,
    buildPanel: buildSmartRepliesL3Panel
  },
  'owner:overview': {
    title: '◇ Overview | نظرة عامة',
    description: 'لوحة المالك - نظرة شاملة.',
    color: embedTheme.primary,
    buildPanel: buildOwnerOverviewL3Panel
  },
  'owner:system': {
    title: '◇ System Control | التحكم بالنظام',
    description: 'تحكم كامل بتشغيل البوت.',
    color: embedTheme.primary,
    buildPanel: buildOwnerSystemL3Panel
  },
  'owner:database': {
    title: '◇ Database | قاعدة البيانات',
    description: 'إدارة قاعدة البيانات.',
    color: embedTheme.primary,
    buildPanel: buildOwnerDatabaseL3Panel
  },
  'owner:backup': {
    title: '◇ Backup | النسخ الاحتياطي',
    description: 'إنشاء واستعادة النسخ الاحتياطية.',
    color: embedTheme.primary,
    buildPanel: buildOwnerBackupL3Panel
  },
  'owner:developers': {
    title: '◇ Developers | المطورين',
    description: 'إدارة المطورين وصلاحياتهم.',
    color: embedTheme.primary,
    buildPanel: buildOwnerDevelopersL3Panel
  },
  'owner:integrations': {
    title: '◇ Integrations | التكاملات',
    description: 'ربط الخدمات الخارجية والـ Webhooks.',
    color: embedTheme.primary,
    buildPanel: buildOwnerIntegrationsL3Panel
  },
  'owner:advlogs': {
    title: '◇ Advanced Logs | السجلات المتقدمة',
    description: 'سجلات الأخطاء والأداء والأمان.',
    color: embedTheme.primary,
    buildPanel: buildOwnerAdvLogsL3Panel
  },
  'owner:errorcenter': {
    title: '◇ Error Center | مركز الأخطاء',
    description: 'عرض وإدارة أخطاء النظام.',
    color: embedTheme.primary,
    buildPanel: buildOwnerErrorCenterL3Panel
  },
  'owner:updates': {
    title: '◇ Updates | التحديثات',
    description: 'التحقق من التحديثات وتطبيقها.',
    color: embedTheme.primary,
    buildPanel: buildOwnerUpdatesL3Panel
  }
};

async function handleL2(interaction: ButtonInteraction): Promise<void> {
  // customId: tnt_l2:{section}:{subsection}
  const parts = interaction.customId.split(':');
  const section = parts[1] ?? '';
  const subsection = parts[2] ?? '';
  const key = `${section}:${subsection}`;
  const entry = L3_MAP[key];

  if (!entry) {
    await interaction.reply({ content: `⚠️ لم يتم العثور على القسم: \`${key}\``, ephemeral: true });
    return;
  }

  // Owner-only gate
  if (section === 'owner' && interaction.user.id !== config.ownerId) {
    await interaction.reply({ content: 'هذا القسم للمالك فقط.', ephemeral: true });
    return;
  }

  const baseRows = [buildMainPanel(), buildMainPanelOwner()];
  const embed = new EmbedBuilder()
    .setColor(entry.color)
    .setTitle(entry.title)
    .setDescription(entry.description)
    .setFooter({ text: 'TNT 1478 | اختر الإجراء المطلوب' })
    .setTimestamp();

  await interaction.update({
    embeds: [embed],
    components: [...baseRows, ...entry.buildPanel()]
  });
}

export const l2ButtonHandlers: ButtonHandler[] = [
  { customId: 'tnt_l2:', prefix: true, execute: handleL2 }
];
