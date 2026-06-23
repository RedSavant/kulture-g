import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-profile-tab',
  imports: [CommonModule],
  templateUrl: './profile-tab.html',
  styleUrl: './profile-tab.scss',
})
export class ProfileTab {
  private readonly router = inject(Router);
  protected readonly userService = inject(UserService);

  readonly openSettings = output<void>();

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
