import { CorePalette, Scheme } from '@material/material-color-utilities';
import { cfgGet, cfgSet } from './cfg.js';

const PRESETS = {
  ocean:  '#1B6EF3',
  rose:   '#C2184B',
  forest: '#1B6E3A',
  sunset: '#E65100',
  violet: '#6750A4',
};

let currentPreset = 'ocean';

export async function initTheme(savedMode) {
  const preset = await cfgGet('theme_preset', 'ocean') || 'ocean';
  currentPreset = preset;
  const mode = savedMode || 'dark';
  applyMode(mode);
  wireThemeControls();
}

function applyMode(mode) {
  const resolved = mode === 'auto'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : mode;
  document.documentElement.setAttribute('data-theme', mode);
  document.documentElement.setAttribute('data-theme-resolved', resolved);
  document.documentElement.style.colorScheme = resolved;
  cfgSet('theme', mode);
  const group = document.getElementById('theme-mode-group');
  if (group) {
    group.querySelectorAll('md-outlined-segmented-button').forEach(btn => {
      btn.selected = btn.getAttribute('value') === mode;
    });
  }
  generateScheme(currentPreset, resolved === 'dark');
}

function applyPreset(preset) {
  const seed = PRESETS[preset];
  if (!seed) return;
  currentPreset = preset;
  document.documentElement.setAttribute('data-theme-preset', preset);
  cfgSet('theme_preset', preset);
  document.querySelectorAll('.preset-chip').forEach(chip => {
    chip.selected = chip.dataset.preset === preset;
  });
  const resolved = document.documentElement.getAttribute('data-theme-resolved') === 'dark';
  generateScheme(preset, resolved);
}

function generateScheme(preset, isDark) {
  const seed = PRESETS[preset];
  if (!seed) return;
  const argb = parseInt(seed.slice(1), 16) | 0xFF000000;
  const scheme = isDark ? Scheme.dark(argb) : Scheme.light(argb);
  const props = scheme.toJSON();

  const core = CorePalette.contentOf(argb);
  const n1 = core.n1;
  if (isDark) {
    props.surfaceContainerLowest = n1.tone(4);
    props.surfaceContainerLow = n1.tone(10);
    props.surfaceContainer = n1.tone(12);
    props.surfaceContainerHigh = n1.tone(17);
    props.surfaceContainerHighest = n1.tone(22);
  } else {
    props.surfaceContainerLowest = n1.tone(100);
    props.surfaceContainerLow = n1.tone(96);
    props.surfaceContainer = n1.tone(94);
    props.surfaceContainerHigh = n1.tone(92);
    props.surfaceContainerHighest = n1.tone(90);
  }

  const root = document.documentElement;
  for (const [key, value] of Object.entries(props)) {
    const cssKey = '--md-sys-color-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(cssKey, '#' + (value & 0x00FFFFFF).toString(16).padStart(6, '0'));
  }
}

function wireThemeControls() {
  const modeGroup = document.getElementById('theme-mode-group');
  modeGroup?.addEventListener('segmented-button-set-selection', (e) => {
    const idx = e.detail.index;
    const btn = modeGroup.querySelectorAll('md-outlined-segmented-button')[idx];
    if (btn) applyMode(btn.getAttribute('value'));
  });

  document.querySelectorAll('.preset-chip').forEach(chip => {
    chip.addEventListener('click', () => applyPreset(chip.dataset.preset));
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const mode = document.documentElement.getAttribute('data-theme');
    if (mode === 'auto') {
      const resolved = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme-resolved', resolved);
      document.documentElement.style.colorScheme = resolved;
      applyMode('auto');
    }
  });
}
