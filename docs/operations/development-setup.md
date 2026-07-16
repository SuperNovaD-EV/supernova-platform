# Development Setup

## Local Foundation

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm supabase:start
corepack pnpm validate
```

Copy `.env.example` to an ignored `.env.local` only when local commands require provider values. App-specific examples live in each app folder.

## Remote CLI Setup

Install and authenticate provider CLIs before rerunning Phase 0.5 provisioning:

```sh
winget install --id GitHub.cli --source winget
gh auth login
npm install --global eas-cli
eas login
pnpm i -g vercel
vercel login
npm install --global @sentry/cli
sentry-cli login
winget install -e --id Google.CloudSDK
gcloud init
```

Do not paste tokens into terminal output, Git-tracked files, screenshots, or issue comments.
