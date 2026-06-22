import { CommonModule } from '@angular/common';
import { Component, Type, computed, signal } from '@angular/core';
import { LearnTab } from './tabs/learn-tab/learn-tab';
import { PracticeTab } from './tabs/practice-tab/practice-tab';
import { ProfileTab } from './tabs/profile-tab/profile-tab';

type AppTabId = 'learn' | 'practice' | 'profile';

interface AppTab {
  id: AppTabId;
  label: string;
  icon: string;
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
  protected readonly tabs: AppTab[] = [
    createTab({ id: 'learn', label: 'Apprendre', icon: '🌱', component: LearnTab }),
    createTab({ id: 'practice', label: 'Réviser', icon: '🎯', component: PracticeTab }),
    createTab({ id: 'profile', label: 'Profil', icon: '🟣', component: ProfileTab }),
  ];

  protected readonly activeTabId = signal<AppTabId>(this.tabs[0].id);
  protected readonly activeTab = computed(
    () => this.tabs.find((tab) => tab.id === this.activeTabId()) ?? this.tabs[0],
  );

  protected setActiveTab(tabId: AppTabId): void {
    this.activeTabId.set(tabId);
  }
}
