import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../services/user.service';
import { ThemeService } from '../../../../../services/theme.service';

@Component({
  selector: 'app-settings-panel',
  imports: [FormsModule, CommonModule],
  templateUrl: './settings-panel.html',
  styleUrl: './settings-panel.scss',
})
export class SettingsPanel {
  private readonly userService = inject(UserService);
  protected readonly themeService = inject(ThemeService);

  readonly closePanel = output<void>();

  protected pseudo: string = this.userService.userSignal()?.pseudo ?? '';
  protected saved = false;

  protected savePseudo(): void {
    const trimmed = this.pseudo.trim();
    if (!trimmed) return;
    this.userService.updatePseudo(trimmed);
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
  }

  protected close(): void {
    this.closePanel.emit();
  }

  protected toggleTheme(): void {
    this.themeService.toggle();
  }
}
