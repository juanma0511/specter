# WebUI Guide

Specter's WebUI has 4 tabs: **Home**, **Tools**, **Control**, and **Settings**.

## Home

Shows device and keybox status.

- **Keybox card**: source, version, revocation status, active/softbanned/revoked. Tap for recent activity history.
- **Refresh**: re-runs device info and keybox checks
- **Info grid**: Module version, Android, kernel, root solution, security patch date, TEE status
- **Network chip** in top bar shows online/offline state

## Tools

### Keybox

- **Install Keybox**: select a provider from the catalog, tap install
- **Set Custom Keybox**: import from file (built-in file browser), URL, or device path; private keybox option

### Google Services

- **Kill GMS**: force-stops and clears data for Play Store, Play Services, and related packages

### Tricky Store

- **App Targeting**: per-app target states: unchecked, bare, conditional (`?`), force (`!`). Includes search, blacklist mode, and DenyList import
- **Set target.txt**: auto-generate from all installed packages
- **Set Security Patch**: set spoofed security patch date (auto-generates previous month). Can fetch from source.android.com

### Play Integrity

- **Get New Fingerprint**: runs PIF update scripts
- **Clean ROM Spoof Engines**: removes persistent props from PixelProps, PIHooks, EntryHooks

### Module Configs

- **Set HMA-OSS**: deploy HMA config template
- **Set Zygisk Next**: configure enforce-denylist, anonymous memory, builtin linker
- **Update RKA**: provision Remote Key Attestation for Play Strong

### Danger Zone

All show a confirmation dialog first.

- **Clear All Detection Traces**: full cleanup: recovery folders, detector/tool app data, ODEX, TWRP, GMS, daemons, props
- **Kill All Processes**: force-stop all detector, GMS, remote control, and tool apps
- **Scan & Clean Suspicious Props**: check 15 known leftover persistent props
- **Fix Widevine L1**: download attestation binary, run KmInstallKeybox (Qualcomm only)

## Control

### Boot Behavior

| Toggle | Default | What it does |
|---|---|---|
| Auto-Hide Recovery Folders | ON | Hide TWRP/OrangeFox/PBRP folders at boot |
| Boot Hardening | ON | Protect kernel cmdline, /proc/net/unix, install-recovery.sh |
| Boot State Props | ON | Security patch, ro.* resets, ROM spoof blocking |
| LSPosed ODEX Clean | ON | Delete LSPosed base.odex traces |
| Suspicious Props Clean | ON | Clean 15 known persistent props |

### Conflict Resolution

Shows detected conflicting modules. Each has a priority toggle:

- **OFF** (default): Specter takes priority, other module's boot scripts get renamed to `.bak`
- **ON**: Other module takes priority, Specter disables overlapping features

Known modules: Zygisk-NoHello, TSupport-Advance, TreatWheel, SensitiveProps, Yurikey, IntegrityBox.

### Action Pipeline

Controls which steps run when you tap the action button: Kill Play Store, Regenerate Target, Set Security Patch, Set Fingerprint, Install Keybox.

## Settings

- **Language**: auto or manual (English, Arabic, Spanish, Russian, Chinese). Arabic enables RTL
- **Appearance**: Dark/Light/Auto mode + 10 color presets (blue, yellow, red, purple, green, orange, pink, cyan, grey, monet). Monet uses system wallpaper accent
- **Developer Mode**: live terminal output during script execution, expandable activity history with copy
- **Update & Support**: GitHub, Telegram links
- **Contributors**: contributor cards from dev.json