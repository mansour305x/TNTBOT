# TNT 1478 Discord Bot

بوت Discord احترافي مبني بـ TypeScript و discord.js v14، بتصميم Modular قابل للتوسعة، ويدعم:

- Slash Commands منظمة حسب الأقسام.
- لوحة تحكم تفاعلية عبر Embeds + Buttons.
- هيكل واضح للخدمات (Modules) والتفاعلات (Interactions).
- PostgreSQL عبر Prisma ORM.
- Zod validation للتدفقات الحرجة.
- node-schedule لتشغيل الجدولات.
- Logging منظم عبر pino.
- ضبط بيئي عبر dotenv.

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
	interactions/    # Button + Modal handlers
	modules/         # Business logic per domain
	types/           # Shared TS types
	ui/              # Embeds + Button components
	utils/           # Helpers
```

## Environment

انسخ ملف البيئة ثم عبئ القيم:

```bash
cp .env.example .env
```

المتغيرات الأساسية:

- `DISCORD_TOKEN`
- `CLIENT_ID`
- `GUILD_ID`
- `DATABASE_URL`
- `OWNER_ID`

## Install & Run

```bash
npm install
npx prisma generate
npm run dev
```

أوامر مفيدة:

```bash
npm run typecheck
npm run build
npm run start
npm run lint
npm run format
npm run prisma:generate
```

## Implemented Slash Commands

- `/tnt`
- `/schedule`:
	- `create`, `list`, `edit`, `delete`, `duplicate`, `toggle`, `channels`, `next`
- `/manage`:
	- `roles`, `channels`, `permissions`, `logs`, `security`, `tickets`, `autoresponses`, `welcome`
- `/settings`:
	- `language`, `timezone`, `colors`, `notifications`, `bot`
- `/smart`:
	- `reminders`, `scheduler`, `shield`, `replies`
- `/owner`:
	- `overview`, `system`, `database`, `backup`, `developers`, `integrations`, `logs`, `errors`, `updates`

## Main Control Panel

الأزرار الرئيسية المدعومة:

- `tnt_dashboard`
- `tnt_schedules`
- `tnt_management`
- `tnt_settings`
- `tnt_smart`
- `tnt_owner`

كل زر يقوم بتحديث نفس الرسالة (update/edit behavior) مع تغيير الـ Embed والأزرار حسب القسم.

## Quality Standards Applied

- Strict TypeScript enabled.
- Structured logging with pino.
- Prisma-based persistence on PostgreSQL.
- Zod validation on schedule creation flows.
- node-schedule runtime hydration on startup.
- Centralized interaction error handling.
- No hardcoded secrets.
- AR/EN i18n layer.
- Unified dark + gold/silver visual style for embeds.

## Notes

- تسجيل أوامر الـ Slash يتم تلقائيًا عند حدث `ready` على مستوى Guild المحدد.
- Jobs المجدولة يتم تحميلها عند الإقلاع من قاعدة البيانات.
- أوامر ومودالات الجدولة والإعدادات الأساسية أصبحت متصلة بقاعدة البيانات فعليًا.