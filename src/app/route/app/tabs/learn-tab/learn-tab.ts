import { Component, inject, input, effect } from '@angular/core';
import { LessonComponent } from './lesson.component';
import { themesData, ThemeData, LessonData } from './lesson-data';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-learn-tab',
  imports: [LessonComponent],
  templateUrl: './learn-tab.html',
  styleUrl: './learn-tab.scss',
})
export class LearnTab {
  private readonly userService = inject(UserService);

  readonly resetKey = input(0);

  readonly themes = themesData;

  selectedTheme: ThemeData | null = null;
  selectedLesson: LessonData | null = null;

  private oldResetKey = 0;

  constructor() {
    effect(() => {
      const key = this.resetKey();
      if (key !== this.oldResetKey) {
        this.oldResetKey = key;
        this.selectedTheme = null;
        this.selectedLesson = null;
      }
    });
  }

  get user() {
    return this.userService.userSignal;
  }

  isLessonCompleted(lessonId: string): boolean {
    return this.user()?.lessons[lessonId]?.completed ?? false;
  }

  isLessonLocked(theme: ThemeData, lessonIndex: number): boolean {
    if (lessonIndex === 0) return false;
    return !this.isLessonCompleted(theme.lessons[lessonIndex - 1].id);
  }

  getThemeCompletedCount(theme: ThemeData): number {
    return theme.lessons.filter((l) => this.isLessonCompleted(l.id)).length;
  }

  getThemeProgress(theme: ThemeData): number {
    const total = theme.lessons.length;
    if (total === 0) return 0;
    return Math.round((this.getThemeCompletedCount(theme) / total) * 100);
  }

  selectTheme(theme: ThemeData): void {
    this.selectedTheme = theme;
  }

  selectLesson(lesson: LessonData, locked: boolean): void {
    if (locked) return;
    this.selectedLesson = lesson;
  }

  backToThemes(): void {
    this.selectedTheme = null;
  }

  backToLessons(): void {
    this.selectedLesson = null;
  }
}
