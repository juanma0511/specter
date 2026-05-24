# Conflict Resolution

Specter detects conflicting modules at boot and resolves them automatically.

## Conflict Registry

Defined in `config/conflicts.txt`:

```
zygisk_nohello|passive|boot hardening
tsupport-advance|aggressive|boot hardening, security patch, suspicious props, lsposed, rom spoof, bootloader spoofer, target
treat_wheel|passive|boot hardening
sensitive_props|passive|boot hardening, suspicious props
Yurikey|aggressive|boot hardening, security patch, suspicious props, rom spoof
integritybox|aggressive|boot hardening, security patch, suspicious props, rom spoof, bootloader spoofer, target
```

## Conflict Types

| Type | Behavior | Modules |
|---|---|---|
| Aggressive | Specter renames the module's boot scripts to `.bak`. Native/Zygisk code still works. | TSupport-Advance, Yurikey, IntegrityBox |
| Passive | Both coexist. Specter disables only its overlapping toggles. Other module's scripts untouched. | Zygisk-NoHello, TreatWheel, SensitiveProps |

## Setting Priority

In **Control tab > Conflict Resolution**, each detected module has a toggle:

- **OFF** (default): Specter takes priority
- **ON**: Other module takes priority, Specter disables overlapping features

## Compatible Modules

Never blocked: Play Integrity Fix, TrickyStore, TEESimulator.

## Backup and Restore

Renamed scripts tracked in `/data/adb/Specter/conflict_backups.txt`. On uninstall, all `.bak` files are restored automatically.