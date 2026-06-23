import { Component, ViewEncapsulation, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-welcome',
  imports: [FormsModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Welcome implements OnInit {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  pseudo = '';

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/app']);
    }
  }

  start(): void {
    const name = this.pseudo.trim();
    if (!name) return;
    this.userService.createUser(name).subscribe(() => {
      this.router.navigate(['/app']);
    });
  }
}
