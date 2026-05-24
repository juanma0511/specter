# Development

## Prerequisites

- Node.js >= 22, npm >= 10
- TypeScript for WebUI changes
- Shell scripting for feature/lib changes

## Setup

```bash
git clone https://github.com/dpejoh/specter
cd specter
npm ci
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server with HMR for WebUI |
| `npm run build` | Full build (vite + inline CSS + copy module + zip) |
| `npx tsc --noEmit` | TypeScript type check |
| `find src/ -name '*.sh' -exec shellcheck {} +` | Shell script lint |
| `cd apk && ./build.sh` | Build companion APK (requires Android SDK) |

## Build Pipeline

```
npm run build
├── vite build               # TS/CSS/HTML -> Module/webroot/
├── node inline-css.cjs      # Inline CSS into index.html
├── npm run build:module      # Copy lib/, features/, pipelines/, configs, APK
├── rm source maps & strings
└── npm run build:zip         # module.zip
```

## WebUI Dev Server

```bash
npm run dev
```

Starts at `http://localhost:5173` with HMR. Uses `dev-mock.ts` for simulated KSU bridge, API responses, and test data.

## APK Build

```bash
cd apk
ANDROID_HOME=~/Android/Sdk ./build.sh
```

Output: `src/apk/specter.apk`. Then `npm run build` bundles it.

## Source Rules

- Edit only `src/`, never `Module/` or `module/`
- All executable scripts use `set -e`
- Library scripts (`lib/*.sh`) never call `exit` or `return` at top level
- Never use `su -c` in feature scripts
- Never hardcode `/data/adb/modules/Specter`, use `$MODDIR`
- WebUI is TypeScript; edit `.ts` files in `src/webroot/js/`

## Boot Safety

`boot_core.sh` uses `set +e` to prevent bootloops. Every `resetprop` call must use `resetprop_if_diff` (with `2>/dev/null || true` guards).

## Adding a Feature

1. Create `src/features/<name>.sh` with `set -e`, source libs from `$MODDIR/lib/`, use `$MODDIR` for paths
2. Add config toggle `toggle_<name>` with default
3. Add button to `src/webroot/index.html` with `data-script="<name>.sh"`
4. Add to pipeline in `src/pipelines/` if automatic: `<name>.sh` (required) or `<name>.sh?` (optional)
5. Add translation key in `src/webroot/lang/source/string.json`
6. `npm run build` and test
