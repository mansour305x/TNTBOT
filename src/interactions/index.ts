import type { ButtonHandler, ModalHandler, SelectMenuHandler } from '../types/interaction.js';
import { mainPanelButtonHandlers } from './buttons/mainPanel.js';
import { managementButtonHandlers } from './buttons/management.js';
import { ownerButtonHandlers } from './buttons/owner.js';
import { schedulesButtonHandlers } from './buttons/schedules.js';
import { settingsButtonHandlers } from './buttons/settings.js';
import { smartButtonHandlers } from './buttons/smart.js';
import { setupButtonHandlers } from './buttons/setup.js';

import { handler as createScheduleModal } from './modals/schedules/createScheduleModal.js';
import { handler as editScheduleModal } from './modals/schedules/editScheduleModal.js';
import { handler as addRoleModal } from './modals/management/addRoleModal.js';
import { handler as autoResponseModal } from './modals/management/autoResponseModal.js';
import { handler as languageModal } from './modals/settings/languageModal.js';
import { handler as timezoneModal } from './modals/settings/timezoneModal.js';
import { setupModalHandlers } from './modals/setup/setupModals.js';
import { scheduleSelectHandlers } from './selectMenus/schedules.js';

export const buttonHandlers: ButtonHandler[] = [
  ...mainPanelButtonHandlers,
  ...schedulesButtonHandlers,
  ...managementButtonHandlers,
  ...settingsButtonHandlers,
  ...smartButtonHandlers,
  ...ownerButtonHandlers,
  ...setupButtonHandlers
];

export const modalHandlers: ModalHandler[] = [
  createScheduleModal,
  editScheduleModal,
  addRoleModal,
  autoResponseModal,
  languageModal,
  timezoneModal,
  ...setupModalHandlers
];

export const selectMenuHandlers: SelectMenuHandler[] = [...scheduleSelectHandlers];
