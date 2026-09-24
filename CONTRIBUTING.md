# Contributing  VELOCE BESPOKE KENYA

## Branching
- `feature/xxx`  new features
- `fix/xxx`  bug fixes
- `refactor/xxx`  code cleanup
- `chore/xxx`  config, deps, tooling

Never push directly to `main`.

## Workflow
1. `git checkout main && git pull origin main`
2. `git checkout -b feature/your-thing`
3. Commit as you go
4. `git push -u origin feature/your-thing`
5. Open a Pull Request on GitHub
6. Wait for review before merging

## Commit Messages (Conventional Commits)
- `feat:` new feature
- `fix:` bug fix
- `style:` formatting only
- `refactor:` code change, no behavior change
- `chore:` config, deps, tooling
- `docs:` documentation

Examples:
- `feat: add import duty calculator page`
- `fix: correct navbar mobile menu delay`
- `chore: bump next to 14.2.35`

## Code Style
- TypeScript strict mode
- Tailwind utility classes
- `'use client'` only when needed
- Components live in `components/`, pages in `app/`, shared logic in `lib/`
- Data lives in `lib/data.ts`  single source of truth

## Pages
- `/` homepage
- `/inventory` vehicle listings
- `/inventory/[id]` vehicle detail
- `/financing` calculator + pre-qual
- `/import-duty` calculator
- `/after-sales` service booking
- `/sell` trade-in
- `/about`
- `/contact`