# Configuration Reference

## Config Storage

Toggles stored as `.val` files in `<MODDIR>/config/`. Read/write via `cfg_get(key, default)` and `cfg_set(key, val)` from `lib/config_env.sh`.

| Layer | Method |
|---|---|
| KernelSU | `ksud module config get/set <key>` |
| Magisk / APatch | Files at `/data/adb/modules/Specter/config/<key>.val` |

## Boot Behavior

| Key | Default | Description |
|---|---|---|
| `toggle_recovery` | 1 | Hide TWRP/OrangeFox/PBRP folders at boot |
| `toggle_boot_hardening` | 1 | Kernel cmdline, /proc/net/unix, install-recovery.sh protection |
| `toggle_prop_handler` | 1 | Security patch, ro.* resets, ROM spoof blocking |
| `toggle_lsposed` | 1 | Delete LSPosed base.odex traces at boot |
| `toggle_suspicious_props` | 1 | Clean 15 known persistent props at boot |

## Action Pipeline

| Key | Default | Description |
|---|---|---|
| `toggle_action_gms` | 1 | Kill Play Store in action pipeline |
| `toggle_action_target` | 1 | Regenerate target.txt |
| `toggle_action_security_patch` | 1 | Set security patch |
| `toggle_action_pif` | 0 | Run PIF update |
| `toggle_action_keybox` | 1 | Install keybox |

## Features (all default to 1)

| Key | Feature |
|---|---|
| `toggle_gms` | GMS kill (11 packages) |
| `toggle_hma` | HMA-OSS config deploy |
| `toggle_kill_all` | Kill all detector/remote-control/tool processes |
| `toggle_pif` | PIF fingerprint update |
| `toggle_rka` | RKA config for Play Strong |
| `toggle_target` | target.txt generation |
| `toggle_widevine` | Widevine L1 fix |
| `toggle_zygisk_next` | Zygisk Next config |
| `toggle_cleanup` | Detection trace cleanup |

## Keybox

| Key | Default | Description |
|---|---|---|
| `kb_provider` | auto | Keybox catalog provider |
| `kb_custom_type` | (empty) | `url` or `path` |
| `kb_custom_value` | (empty) | URL or file path |
| `kb_private` | (empty) | Disables catalog matching |

## UI

| Key | Default | Description |
|---|---|---|
| `theme` | dark | dark, light, or auto |
| `theme_preset` | monet | blue, yellow, red, purple, green, orange, pink, cyan, grey, monet |
| `monet_seed` | (auto) | Cached Monet seed color |
| `lang` | auto | en, zh, ru, es, ar |
| `dev_mode` | false | Live terminal, expandable history |

## Paths

| Path | Purpose |
|---|---|
| `/data/adb/tricky_store/keybox.xml` | Active keybox |
| `/data/adb/tricky_store/keybox.xml.bak` | Keybox backup |
| `/data/adb/tricky_store/locked.xml` | TEESimulator locked keybox |
| `/data/adb/tricky_store/target.txt` | Target list |
| `/data/adb/tricky_store/security_patch.txt` | Spoofed security patch date |
| `/data/adb/tricky_store/tee_status` | TEE status |
| `/data/adb/modules/Specter/` | Module directory |
| `/data/adb/modules/Specter/config/*.val` | Config files |
| `/data/adb/Specter/conflict_backups.txt` | Renamed script backups |
| `/data/adb/Specter/persist_backup.txt` | Persisted props restore list |
| `/data/adb/Specter/blacklist.txt` | Target generation blacklist |
| `/data/adb/Specter/app_labels.json` | Cached app name mappings |
| `/data/adb/Specter/slain_props.prop` | Removed suspicious props backup |

## URLs

| URL | Purpose |
|---|---|
| `https://rawbin.netlify.app/key` | Keybox download |
| `https://rawbin.netlify.app/key/catalog` | Keybox catalog |
| `https://rawbin.netlify.app/clips/attestation` | Widevine attestation binary |
| `https://rawbin.netlify.app/clips/hma` | HMA-OSS config |
| `https://android.googleapis.com/attestation/status` | Google revocation check |
| `https://rawbin.netlify.app/apps` | App name catalog |

## Package Lists (`lib/package_list.sh`)

| List | Count | Purpose |
|---|---|---|
| `FIXED_TARGETS` | 10 | Always added to target.txt |
| `DETECTOR_APPS` | 80+ | Killed by kill_all.sh |
| `GMS_APPS` | 11 | Managed by gms.sh |
| `REMOTE_CONTROL_APPS` | 7 | Killed by kill_all.sh |
| `TOOL_APPS` | 13 | Killed by kill_all.sh |
| `BLACKLIST` | varies | Excluded from target.txt |
| `SUSPICIOUS_PROPS` | 15 | Checked by suspicious_props.sh |