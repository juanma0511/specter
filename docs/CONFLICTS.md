# Conflict Handling Policy

Specter automatically detects conflicting modules and resolves them silently.
No user prompts during install — all conflict handling is done at boot via
`post-fs-data.sh`.

No conflicting modules have their functionality broken. Specter handles conflicts
by either disabling the other module (aggressive type) or deferring its own
overlapping features (passive type).

## Conflict Types

### Aggressive — 100% Overlap

Modules that do **exactly what Specter does**. They are fully redundant and
keeping both running achieves nothing. Specter silently renames their boot
scripts to `.bak`, preventing them from executing. The module stays installed
— its Zygisk/native code continues to work. Specter handles all features.

### Passive — Partial Overlap

Modules with **complementary functionality** that overlaps with Specter on
specific features. Both modules coexist. Specter automatically disables its
own overlapping features via the toggle system, deferring to the other module
for those specific features.

## Per-Module Table

| Module | ID | Type | Overlapping Features | Specter's Action |
|---|---|---|---|---|
| TSupport-Advance | `tsupport-advance` | aggressive | boot_hardening, security_patch, suspicious_props, lsposed, rom_spoof, bootloader_spoofer, target | Rename both post-fs-data.sh + service.sh to .bak. Specter handles everything. |
| Yurikey Manager | `Yurikey` | aggressive | boot_hardening, security_patch, suspicious_props, rom_spoof | Rename service.sh to .bak. Specter handles everything. |
| Integrity Box | `integritybox` | aggressive | boot_hardening, security_patch, suspicious_props, rom_spoof, bootloader_spoofer, target | Rename service.sh to .bak. Specter handles everything. |
| TreatWheel | `treat_wheel` | passive | boot_hardening | Scripts untouched. Specter defers boot_hardening to TreatWheel. |
| NoHello | `zygisk_nohello` | passive | boot_hardening | Scripts untouched. Specter defers boot_hardening to NoHello. |
| Sensitive Props | `sensitive_props` | passive | boot_hardening, suspicious_props | Scripts untouched. Specter defers boot_hardening and suspicious_props. |

## Always Blocked — No Toggle

| Module | Detection | Action |
|---|---|---|
| BootloaderSpoofer (`es.chiteroman.bootloaderspoofer`) | `/data/system/packages.list` | `pm uninstall --user 0` — archived since 2024 |

## Compatible Modules — Never Blocked

| Module | Reason |
|---|---|
| Play Integrity Fix | Essential, complementary features (Zygisk injection, auto fingerprint) |
| TrickyStore | Attestation certificate manipulation — different layer from prop spoofing |
| TEESimulator | TrickyStore fork — already integrated via locked.xml format |

## Backup and Restore

Specter keeps a list of renamed scripts at:

```
/data/adb/Specter/conflict_backups.txt
```

On Specter uninstall, all `.bak` files are automatically restored to their
original names. No permanent changes are made to other modules.

## Do's and Don'ts

### Do
- Run Specter with PIF + TrickyStore — designed to work together
- Check the boot log for conflict resolution messages (`logcat | grep CONFLICT`)

### Don't
- Manually rename `.bak` files back while Specter is active. They will be
  re-blocked on the next boot.
- Install both Specter and TSupport-Advance/Yurikey/Integrity Box. They are
  fully redundant — keep only Specter.
- Remove the `conflict_backups.txt` file — needed for clean uninstall.
