# Glossary

## A
**APatch** — A root solution for Android that uses kernel patching. Detected and supported by Specter alongside Magisk and KernelSU.

## B
**Bootloader spoofer** — Specter feature that masks the bootloader unlock status by resetting `ro.boot.*` properties at boot time.

## C
**Conflict** — When two modules try to control the same system property or file. Specter's conflict system detects known modules (TSupport, Yurikey, NoHello, etc.) and prioritizes Specter's behavior.

## D
**DenyList** — Magisk feature that hides root from selected apps. Specter can import your DenyList for its App Targeting overlay.

## G
**GMS** — Google Mobile Services. Specter's action pipeline selectively kills GMS processes (DroidGuard, Play Store) to trigger fresh Play Integrity attestation.

## H
**Hardening** — Boot-time feature that locks down file permissions, removes developer options, and resets suspicious system properties.

## K
**Keybox** — An XML file containing device certificates used for Play Integrity attestation. Specter manages keybox sourcing, installation, revocation checking, and fallback.

**KSU** — KernelSU. A root solution based on kernel hooks. Supported by Specter alongside Magisk and APatch.

## L
**LSPosed** — A Zygisk module for Xposed-style framework hooks. Specter auto-detects LSPosed and toggles its boot features accordingly.

## M
**Magisk** — The most widely used Android root solution, based on boot image patching and Zygisk injection.

## P
**Play Integrity (PI)** — Google's attestation API (replacing SafetyNet). Returns a verdict based on device integrity, keybox validity, and boot state.

## R
**Recovery** — Specter feature that hides recovery-related files and folders from the system, triggered during boot.

**Revocation** — When Google marks a keybox certificate as invalid. Specter checks revocation status against Google's API and flags revoked keyboxes.

## S
**Spoofing** — Replacing system properties with known-good values to pass integrity checks. Specter spoofs boot properties and ROM identifiers.

## T
**TEE** — Trusted Execution Environment. Specter runs a TEE attestation APK to verify the device's hardware-backed attestation status.

**Target.txt** — Tricky Store configuration file listing apps to target. Specter's App Targeting overlay can manage target entries.

**Toggle** — A Control page switch that enables or disables a specific feature (e.g., Boot Hardening, Suspicious Props, Recovery hiding).

## V
**VBMeta** — Verified Boot metadata. Specter reads boot hash from `/proc/cmdline` to avoid detection.

## Z
**Zygisk** — Magisk's framework injection layer. Required for LSPosed. Specter works with or without it.