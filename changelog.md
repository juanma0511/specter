# Specter Changelog

## v1.0.0

### Architecture
- Migrated from vanilla JS to strict TypeScript with Vite bundling
- Replaced BeerCSS with Material Web Components (Google MWC)
- Replaced static color presets with dynamic Material Color Utilities (+ Monet system accent extraction)
- Pipeline-driven orchestration via `orchestrator.sh` instead of hardcoded sequential scripts
- Shared shell library (`lib/common.sh`) with reusable helpers
- Centralized config persistence via `ksud module config` with file-based fallback
- Bridge abstraction layer (`bridge.ts`) for KernelSU API

### Keybox Management
- Keybox revocation checking sourced directly from Google's attestation endpoint
- Multi-source keybox catalog with provider selection
- Custom keybox installation via file browser, URL, or device path
- Private keybox support with serial detection before install
- Keybox status card with source, version, format, and revocation info
- Keybox backup and restore on module update/uninstall

### Security Spoofing
- Delayed spoofing (120s) — re-applies critical props after boot completion
- Early boot property setup via `post-fs-data.sh` (ROM props, VBMeta, CROM detection)
- Boot completion handler for KernelSU/APatch hardening
- Comprehensive property management (~40+ props) with `resetprop_if_diff`/`resetprop_if_match`
- Persistent property setting across reboots (`persistprop`)
- VBMeta reading from real block device instead of hardcoded values
- CROM spoof hook detection to disable conflicting ROM-level spoofing

### New Features
- Blacklist system — exclude detector apps from target.txt (editable with defaults)
- SmartMerge — per-app targeting suffixes (! force, ? conditional, #disable)
- Developer mode — show raw script names with terminal output
- In-app terminal — live streaming execution logs
- Boot behavior toggle — auto-hide recovery folders (TWRP, OrangeFox, etc.)
- File browser — browse device filesystem for custom keybox
- Keybox detection — checks serial against remote catalog before install
- Rich toasts with icons, action buttons, types (success/error/info)
- 9 color presets (blue, yellow, red, purple, green, orange, pink, cyan, grey) + Monet
- Dark/light/auto theme modes with segmented button selector
- Page transition animations

### Shell Scripting
- Pipeline system (`pipelines/full_integrity`, `pipelines/root_hide`)
- 16 modular feature scripts replacing monolithic Yuri/ directory
- DroidGuard process killer in service loop
- Multi-root support (Magisk / KernelSU / APatch) with runtime detection
- Comprehensive uninstall — cleans configs, boot hash, RKA, migration markers
- Module path discovery via JSON fallback chain

### WebUI
- TypeScript with strict mode, typed interfaces for all data structures
- Material 3 floating pill navigation with animated indicator
- 5 language translations (en, zh, ru, es, ar)
- MWC components throughout (cards, dialogs, chips, selects, switches, buttons)
- Real-time clock with configurable format
- Network status indicator with offline detection
- Project contributors grid
- Developer mode toggle with terminal output
- `prefers-reduced-motion` support

### CI/CD
- GitHub Actions build and release workflow
- TypeScript type checking on CI
- Automated module zip packaging
- Automatic `update.json` version bump on release
- Vite development server for local WebUI dev
- Dev mock for browser-only development

### Other
- Rebranded from Yurikey to Specter
- Updated module ID, author, and repository URLs
- Removed 23 unused language translations (kept 5 most relevant)
- Removed snackbar color customization tool
- Removed "Set Necessary App" feature
- Removed app icon and banner image
- Cleaned up dead code and unused dependencies
