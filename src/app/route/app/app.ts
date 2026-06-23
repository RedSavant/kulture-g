import { CommonModule } from '@angular/common';
import { Component, Type, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LearnTab } from './tabs/learn-tab/learn-tab';
import { PracticeTab } from './tabs/practice-tab/practice-tab';
import { ProfileTab } from './tabs/profile-tab/profile-tab';

type AppTabId = 'learn' | 'practice' | 'profile';

interface AppTab {
  id: AppTabId;
  label: string;
  component: Type<unknown>;
}

function createTab(tab: AppTab): AppTab {
  return tab;
}

@Component({
  selector: 'app-app',
  imports: [CommonModule],
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
    createTab({ id: 'learn', label: 'Apprendre', component: LearnTab }),
    createTab({ id: 'practice', label: 'Réviser', component: PracticeTab }),
    createTab({ id: 'profile', label: 'Profil', component: ProfileTab }),
  ];

  protected readonly activeTabId = signal<AppTabId>(this.tabs[0].id);
  protected readonly activeTab = computed(
    () => this.tabs.find((tab) => tab.id === this.activeTabId()) ?? this.tabs[0],
  );

  protected setActiveTab(tabId: AppTabId): void {
    this.activeTabId.set(tabId);
  }
}
