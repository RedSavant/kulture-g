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
  protected readonly userService = inject(UserService);
  protected readonly themeService = inject(ThemeService);

  readonly closePanel = output<void>();

  protected pseudo: string = this.userService.userSignal()?.pseudo ?? '';
  protected saved = false;
  protected pfpUploading = false;

  protected get pfpUrl(): string | null {
    return this.userService.userSignal()?.pfp ?? null;
  }

  protected savePseudo(): void {
    const trimmed = this.pseudo.trim();
    if (!trimmed) return;
    this.userService.updatePseudo(trimmed);
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
  }

  protected onPfpSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      alert('Format accepté : PNG, JPEG, WebP');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image trop volumineuse (max 5 Mo)');
      return;
    }
    this.pfpUploading = true;
    this.userService.uploadPfp(file).subscribe({
      next: () => (this.pfpUploading = false),
      error: () => {
        this.pfpUploading = false;
        alert('Erreur lors du téléchargement');
      },
    });
  }

  protected close(): void {
    this.closePanel.emit();
  }

  protected toggleTheme(): void {
    this.themeService.toggle();
  }
}
