import type { Language } from '@prisma/client';

const dictionary = {
  ar: {
    unknownCommand: 'الأمر غير معروف.',
    unexpectedError: 'حدث خطأ غير متوقع.',
    guildOnly: 'هذا الإجراء يعمل داخل السيرفر فقط.',
    ownerOnly: 'هذا القسم للمالك فقط.',
    scheduleCreated: 'تم إنشاء الجدولة بنجاح.',
    scheduleUpdated: 'تم تحديث الجدولة بنجاح.',
    scheduleDeleted: 'تم حذف الجدولة بنجاح.',
    scheduleToggled: 'تم تحديث حالة الجدولة بنجاح.',
    noSchedules: 'لا توجد جدولات حالياً.',
    invalidCron: 'صيغة الجدولة الزمنية غير صحيحة.',
    invalidChannel: 'القناة المحددة غير صالحة.',
    languageUpdated: 'تم تحديث اللغة بنجاح.',
    timezoneUpdated: 'تم تحديث المنطقة الزمنية بنجاح.'
  },
  en: {
    unknownCommand: 'Unknown command.',
    unexpectedError: 'An unexpected error occurred.',
    guildOnly: 'This action only works inside a guild.',
    ownerOnly: 'This section is owner-only.',
    scheduleCreated: 'Schedule created successfully.',
    scheduleUpdated: 'Schedule updated successfully.',
    scheduleDeleted: 'Schedule deleted successfully.',
    scheduleToggled: 'Schedule status updated successfully.',
    noSchedules: 'No schedules found.',
    invalidCron: 'The cron expression is invalid.',
    invalidChannel: 'The selected channel is invalid.',
    languageUpdated: 'Language updated successfully.',
    timezoneUpdated: 'Timezone updated successfully.'
  }
} as const;

export type TranslationKey = keyof typeof dictionary.ar;

export function t(language: Language, key: TranslationKey): string {
  return dictionary[language][key];
}
