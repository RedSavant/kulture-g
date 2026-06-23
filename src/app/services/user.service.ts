import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LessonProgress {
  completed: boolean;
  bestScore?: number;
  lastScore?: number;
}

export interface UserData {
  pseudo: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  lessons: Record<string, LessonProgress>;
  createdAt: string;
  lastLoginAt: string;
}

const TOKEN_KEY = 'kulture_g_token';
const API_BASE = '/api';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly user = signal<UserData | null>(null);
  readonly userSignal = this.user.asReadonly();

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  private get token(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  private loadUser(): void {
    const t = this.token;
    if (!t) return;
    this.http.get<{ user: UserData }>(`${API_BASE}/users/${t}`).subscribe({
      next: (res) => this.user.set(res.user),
      error: () => {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(TOKEN_KEY);
        }
      },
    });
  }

  createUser(pseudo: string): Observable<{ token: string; user: UserData }> {
    return this.http
      .post<{ token: string; user: UserData }>(`${API_BASE}/users`, { pseudo })
      .pipe(
        tap((res) => {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(TOKEN_KEY, res.token);
          }
          this.user.set(res.user);
        }),
      );
  }

  private saveUser(): void {
    const t = this.token;
    const u = this.user();
    if (!t || !u) return;
    this.http.put<{ user: UserData }>(`${API_BASE}/users/${t}`, u).subscribe({
      next: (res) => this.user.set(res.user),
    });
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  getCompletedLessons(): number {
    const data = this.user();
    if (!data) return 0;
    return Object.values(data.lessons).filter((l) => l.completed).length;
  }

  addXp(amount: number): void {
    const data = this.user();
    if (!data) return;
    data.xp += amount;
    while (data.xp >= data.xpToNextLevel) {
      data.xp -= data.xpToNextLevel;
      data.level++;
      data.xpToNextLevel = Math.round(data.xpToNextLevel * 1.5);
    }
    this.saveUser();
  }

  completeLesson(lessonId: string, score?: number): void {
    const data = this.user();
    if (!data) return;
    const prev = data.lessons[lessonId];
    data.lessons[lessonId] = {
      completed: true,
      bestScore: prev ? Math.max(prev.bestScore ?? 0, score ?? 0) : score,
      lastScore: score,
    };
    this.saveUser();
  }

  updatePseudo(pseudo: string): void {
    const data = this.user();
    if (!data) return;
    data.pseudo = pseudo;
    this.saveUser();
  }

  logout(): void {
    const t = this.token;
    if (t) {
      this.http.delete(`${API_BASE}/users/${t}`).subscribe();
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
    this.user.set(null);
  }
}
