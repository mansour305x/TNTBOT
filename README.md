# TNT 1478 Discord Bot

بوت Discord احترافي مبني بـ TypeScript و discord.js v14، يعمل بالكامل عبر الأزرار (100% button-driven) دون الحاجة لكتابة أوامر.

## Features

- **لوحة تحكم هرمية بالأزرار (3 مستويات)** — Dashboard, Schedules, Management, Settings, Smart Systems, Owner Panel.
- لا حاجة لكتابة أوامر — كل شيء عبر الأزرار + Select Menus + Modals.
- دعم كامل للغة العربية والإنجليزية في جميع الأزرار.
- ناف بار (Back | Home) في كل مستوى.
- Slash Commands منظمة حسب الأقسام.
- PostgreSQL عبر Prisma ORM.
- Zod validation للتدفقات الحرجة.
- node-schedule لتشغيل الجدولات.
- Logging منظم عبر pino.
- ضبط بيئي عبر dotenv.
- Permission gates — Owner-only للوحة المالك.

## Tech Stack

- Language: TypeScript (strict)
- Runtime: Node.js LTS (>= 20.10)
- Discord Library: discord.js v14
- Database: PostgreSQL + Prisma ORM
- Validation: Zod
- Scheduler: node-schedule
- Config: dotenv
- Logger: pino

## Project Structure

```text
src/
  commands/        # Slash commands + subcommands
  app/             # Runtime foundation (client, db, scheduler, i18n, errors)
  config/          # Environment config + validation
  core/            # Client / Logger / Database / Scheduler
  events/          # Discord events
  i18n/            # AR/EN dictionaries
  interactions/
    buttons/       # Button handlers (mainPanel, l2, l3, nav, ...)
    modals/        # Modal submit handlers
    selectMenus/   # String select menu handlers
  modules/         # Business logic per domain
  types/           # Shared TS types
  ui/
    components/    # Button panel builders (all levels: L1, L2, L3)
    embeds/        # EmbedBuilder helpers
    utils/         # Emoji helpers
  utils/           # Helpers
```

## Environment Variables

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `DISCORD_TOKEN` | ✅ | Discord bot token |
| `CLIENT_ID` | ✅ | Bot application ID (auto-derived if omitted) |
| `GUILD_ID` | ✅ | Target server ID for command registration |
| `DATABASE_URL` | ✅ | PostgreSQL connection string (e.g. `postgresql://user:pass@host:5432/db`) |
| `OWNER_ID` | ✅ | Discord user ID of the bot owner |
| `DEFAULT_LANGUAGE` | ➖ | `ar` or `en` (default: `ar`) |
| `DEFAULT_TIMEZONE` | ➖ | e.g. `Asia/Riyadh` |
| `LOG_LEVEL` | ➖ | `info`, `debug`, `error`, etc. |
| `TNT_EMOJI_ID` | ➖ | Custom emoji ID for buttons (optional) |
| `NODE_ENV` | ➖ | `development` / `production` |

## Install & Run

```bash
npm install
npx prisma generate
npx prisma migrate dev    # first-time DB setup
npm run dev               # development (tsx watch)
# or
npm run build && npm start  # production
```

Other useful commands:

```bash
npm run typecheck    # TypeScript check without emitting
npm run lint         # ESLint
npm run format       # Prettier
npm run prisma:generate
```

## How to Use (Button-Driven UI)

1. Invite the bot to your server and set env vars.
2. Run `/tnt` in any channel to open the control panel.
3. Navigate using the buttons:

### Level 1 — Main Navigation (always visible)

| Button | Description |
|---|---|
| ◇ Dashboard \| الرئيسية | Dashboard overview |
| ◇ Schedules \| الجدولة | Schedule management |
| ◇ Management \| الإدارة | Server management |
| ◇ Settings \| الإعدادات | Bot settings |
| ◇ Smart Systems \| أنظمة الذكاء | AI-powered features |
| ◇ Owner Panel \| لوحة المالك | Owner-only controls |

### Level 2 — Subsections

Clicking a Level 1 button shows the subsections for that area.

| Section | Subsections |
|---|---|
| Dashboard | Overview, System Status, Quick Actions |
| Schedules | Create, View, Edit, Delete, Duplicate, Enable/Disable, Channels, Next Trigger |
| Management | Roles, Channels, Permissions, Logs, Security, Tickets, Auto Responses, Welcome System |
| Settings | Language, Timezone, Colors, Notifications, Bot Settings |
| Smart Systems | Smart Reminders, Smart Scheduler, Smart Shield, Smart Replies |
| Owner Panel | Overview, System Control, Database, Backup, Developers, Integrations, Advanced Logs, Error Center, Updates |

### Level 3 — Actions

Clicking a Level 2 subsection shows the specific actions for that area. Actions either:
- Open a **Modal** for text input
- Show an **ephemeral reply** with information
- **Perform** the action directly (e.g. switch language, toggle maintenance)

### Navigation

Every Level 2 and Level 3 view has navigation buttons at the bottom:

| Button | Action |
|---|---|
| ← رجوع \| Back | Go back to the previous level |
| 🏠 الرئيسية \| Home | Return to the main dashboard |

## Button Custom ID Scheme

```
Level 1:  tnt_dashboard, tnt_schedules, tnt_management, ...
Level 2:  tnt_l2:{section}:{subsection}  e.g. tnt_l2:schedules:create
Level 3:  tnt_l3:{section}:{subsection}:{action}  e.g. tnt_l3:schedules:create:save
Nav:      tnt_nav:home  |  tnt_nav:back:{section}
```

## Implemented Slash Commands

- `/tnt` — Open the main control panel
- `/schedule`: `create`, `list`, `edit`, `delete`, `duplicate`, `toggle`, `channels`, `next`
- `/manage`: `roles`, `channels`, `permissions`, `logs`, `security`, `tickets`, `autoresponses`, `welcome`
- `/settings`: `language`, `timezone`, `colors`, `notifications`, `bot`
- `/smart`: `reminders`, `scheduler`, `shield`, `replies`
- `/owner`: `overview`, `system`, `database`, `backup`, `developers`, `integrations`, `logs`, `errors`, `updates`

## Quality Standards

- Strict TypeScript enabled.
- Structured logging with pino.
- Prisma-based persistence on PostgreSQL.
- Zod validation on schedule creation flows.
- node-schedule runtime hydration on startup.
- Centralized interaction error handling.
- No hardcoded secrets.
- AR/EN i18n layer.
- Unified dark + gold/silver visual style for embeds.
- Prefix-based button routing for scalable handler registration.

## Notes

- Slash command registration happens automatically at bot startup (`ready` event).
- Scheduled jobs are hydrated from the database on startup.
- If `DATABASE_URL` is not set, the bot starts in setup mode — use `/setup` to configure.
