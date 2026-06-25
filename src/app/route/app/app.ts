import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ThemeService } from '../../services/theme.service';
import { LearnTab } from './tabs/learn-tab/learn-tab';
import { PracticeTab } from './tabs/practice-tab/practice-tab';
import { ProfileTab } from './tabs/profile-tab/profile-tab';
import { SettingsPanel } from './tabs/profile-tab/settings-panel/settings-panel';

type AppTabId = 'learn' | 'practice' | 'profile';

interface AppTab {
  id: AppTabId;
  label: string;
}

@Component({
  selector: 'app-app',
  imports: [LearnTab, PracticeTab, ProfileTab, SettingsPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly themeService = inject(ThemeService);

  constructor() {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.userService.heartsLeft();
    this.heartTimer = setInterval(() => this.userService.heartsLeft(), 60000);
  }

  ngOnDestroy(): void {
    if (this.heartTimer) clearInterval(this.heartTimer);
  }

  private heartTimer: ReturnType<typeof setInterval> | null = null;

  protected readonly hearts = this.userService.heartsSignal;

  protected readonly maxHearts = 9;

  protected readonly tabs: AppTab[] = [
    { id: 'learn', label: 'Apprendre' },
    { id: 'practice', label: 'Réviser' },
    { id: 'profile', label: 'Profil' },
  ];

  protected readonly activeTabId = signal<AppTabId>(this.tabs[0].id);
  protected readonly showSettings = signal(false);
  protected readonly tabResetKey = signal(0);

  protected setActiveTab(tabId: AppTabId): void {
    if (this.activeTabId() !== tabId) {
      this.activeTabId.set(tabId);
    }
    this.tabResetKey.update(k => k + 1);
  }
}
