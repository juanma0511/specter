# Architecture

## Boot Flow

Both root solutions converge on `boot_core.sh`.

### KernelSU / APatch

```
boot-completed.sh -> boot_core.sh
```

### Magisk

```
post-fs-data.sh   -> resolve_conflicts() (rename conflicting boot scripts)
service.sh        -> polls boot_completed -> boot_core.sh
```

### boot_core.sh

```
boot_core.sh
├── set +e (boot safety)
├── protect SELinux
├── run boot features (recovery, boot_hardening, bootloader_spoofer, suspicious_props)
├── TEE attestation (via disposable APK)
├── rom_spoof_cleanup
├── keybox_info (read + cache)
├── refresh module description
├── delayed re-spoof after 120s (Magisk only)
└── hourly suspicious props re-clean loop (Magisk only)
```

## Pipelines

Named pipelines in `src/pipelines/`. Each line is a feature script. `?` suffix marks optional steps (failures logged, pipeline continues).

**full_integrity** (action button + manual): `kill_play_store -> target -> security_patch -> keybox -> pif.sh?`

**root_hide**: `hma -> zygisk_next.sh?`

**action.sh** runs a modified full_integrity using `target_merge.sh` (merge mode) and respects `toggle_action_*` config values.

**orchestrator.sh** reads pipeline files, runs features, handles optional/hard-fail.

## Feature Scripts

All in `src/features/`. Contract: `set -e`, source libs from `$MODDIR/lib/`, use `$MODDIR` for paths, idempotent, exit 0 on success.

| Script | Function |
|---|---|
| `tee.sh` | Install APK, query TEE via ContentProvider, uninstall, compare vbmeta digest |
| `target.sh` | Generate target.txt from pm list packages |
| `target_merge.sh` | Merge mode (preserve existing, add missing) |
| `security_patch.sh` | Write previous month's last-day date |
| `keybox.sh` | Fetch, validate, check revocation, install keybox |
| `keybox_info.sh` | Decode serial, query catalog, cache status |
| `pif.sh` | Run PIF update scripts |
| `hma.sh` | Deploy HMA config template |
| `gms.sh` | Kill droidguard, force-stop GMS packages |
| `rka.sh` | Update Play Strong config |
| `kill_all.sh` | Force-stop + clear all detector/GMS/remote/tool apps |
| `kill_play_store.sh` | Force-stop + clear Play Store |
| `zygisk_next.sh` | Configure zygiskd |
| `widevine.sh` | Download attestation binary, run KmInstallKeybox |
| `lsposed.sh` | Delete base.odex files |
| `recovery.sh` | Hide TWRP/OrangeFox/PBRP folders |
| `boot_hardening.sh` | Kernel cmdline, /proc/net/unix, install-recovery.sh |
| `bootloader_spoofer.sh` | Reset ro.boot.vbmeta.digest |
| `suspicious_props.sh` | Check and clean 15 persistent props |
| `cleanup.sh` | Full detection trace cleanup |
| `rom_spoof_cleanup.sh` | Remove PixelProps/PIHooks/EntryHooks props |

## TEE Attestation

At every boot, `tee.sh` installs a disposable APK, queries the ContentProvider for TEE status (`normal`/`broken`) and boot hash, uninstalls it, then compares against the device's own vbmeta digest (computed by `vbmeta.sh` from AVB footers across boot/vendor_boot/dtbo/vendor_kernel_boot). Mismatch = TEE_STATUS "broken".

The APK parses Android Keystore attestation certs with zero-dependency ASN.1/CBOR parsers.

## Config Persistence

- **KernelSU**: `ksud module config get/set <key>`
- **Magisk/APatch**: Flat files at `/data/adb/modules/Specter/config/<key>.val`

Both use `cfg_get`/`cfg_set` from `lib/config_env.sh`.

## WebUI Bridge

The WebUI communicates with shell via `window.ksu.exec`:

- `runScript()` runs a feature/common script, returns Promise
- `exec()` runs a raw command, returns Promise
- `spawnScript()` streams output line-by-line (for dev mode live terminal)

In development, `dev-mock.ts` provides simulated responses.