import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
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
export class App {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  constructor() {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  protected readonly tabs: AppTab[] = [
    { id: 'learn', label: 'Apprendre' },
    { id: 'practice', label: 'Réviser' },
    { id: 'profile', label: 'Profil' },
  ];

  protected readonly activeTabId = signal<AppTabId>(this.tabs[0].id);
  protected readonly showSettings = signal(false);

  protected setActiveTab(tabId: AppTabId): void {
    this.activeTabId.set(tabId);
  }
}
