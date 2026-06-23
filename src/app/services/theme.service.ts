import { Injectable, signal } from '@angular/core';

const THEME_KEY = 'kulture_g_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal<boolean>(false);

  constructor() {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(THEME_KEY) : null;
    if (saved === 'dark') {
      this.isDark.set(true);
      document.body.classList.add('dark-theme');
    }
  }

  toggle(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    document.body.classList.toggle('dark-theme', next);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
    }
  }
}
