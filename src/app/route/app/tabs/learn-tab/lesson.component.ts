import { Component, input, output, signal, computed, inject } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { LessonData } from './lesson-data';

@Component({
  selector: 'app-lesson',
  imports: [],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss',
})
export class LessonComponent {
  protected readonly userService = inject(UserService);

  readonly lesson = input.required<LessonData>();
  readonly close = output<void>();

  currentIndex = signal(0);
  score = signal(0);
  submitted = signal(false);
  showResult = signal(false);
  quizStarted = signal(false);
  showExitConfirm = signal(false);
  showNoHearts = signal(false);

  choiceSelected = signal<number | null>(null);
  fillSelected = signal<number | null>(null);
  truefalseSelected = signal<boolean | null>(null);

  currentQuestion = computed(() => this.lesson().questions[this.currentIndex()]);
  totalQuestions = computed(() => this.lesson().questions.length);
  progress = computed(() => (this.currentIndex() / this.totalQuestions()) * 100);

  xpGained = computed(() => {
    const s = this.score();
    const total = this.totalQuestions();
    if (total === 0) return 0;
    return Math.round((s / total) * 50) + 10;
  });

  answerLocked = computed(() => {
    const q = this.currentQuestion();
    if (this.submitted()) return true;
    switch (q.type) {
      case 'choice': return this.choiceSelected() !== null;
      case 'fill': return this.fillSelected() !== null;
      case 'truefalse': return this.truefalseSelected() !== null;
    }
  });

  startQuiz(): void {
    if (!this.userService.hasHearts()) return;
    this.quizStarted.set(true);
  }

  selectChoice(index: number): void {
    if (this.submitted()) return;
    this.choiceSelected.set(index);
  }

  selectFill(index: number): void {
    if (this.submitted()) return;
    this.fillSelected.set(index);
  }

  selectTrueFalse(value: boolean): void {
    if (this.submitted()) return;
    this.truefalseSelected.set(value);
  }

  submitAnswer(): void {
    const q = this.currentQuestion();
    let correct = false;
    switch (q.type) {
      case 'choice':
        correct = this.choiceSelected() === q.correctIndex;
        break;
      case 'fill':
        correct = this.fillSelected() === q.correctIndex;
        break;
      case 'truefalse':
        correct = this.truefalseSelected() === q.isTrue;
        break;
    }
    if (correct) {
      this.score.update(s => s + 1);
    } else {
      this.userService.loseHeart();
      if (!this.userService.hasHearts()) {
        this.showNoHearts.set(true);
        setTimeout(() => this.confirmExit(), 4000);
      }
    }
    this.submitted.set(true);
  }

  nextQuestion(): void {
    if (this.currentIndex() < this.totalQuestions() - 1) {
      this.currentIndex.update(i => i + 1);
      this.resetAnswer();
    } else {
      this.finishQuiz();
    }
  }

  private finishQuiz(): void {
    const s = this.score();
    const lessonId = this.lesson().id;
    this.userService.addXp(this.xpGained());
    this.userService.completeLesson(lessonId, s);
    this.showResult.set(true);
  }

  private resetAnswer(): void {
    this.submitted.set(false);
    this.choiceSelected.set(null);
    this.fillSelected.set(null);
    this.truefalseSelected.set(null);
  }

  restartQuiz(): void {
    this.currentIndex.set(0);
    this.score.set(0);
    this.showResult.set(false);
    this.quizStarted.set(true);
    this.resetAnswer();
  }

  closeQuiz(): void {
    if (this.quizStarted() && !this.showResult()) {
      this.showExitConfirm.set(true);
    } else {
      this.close.emit();
    }
  }

  confirmExit(): void {
    this.showExitConfirm.set(false);
    this.close.emit();
  }

  cancelExit(): void {
    this.showExitConfirm.set(false);
  }

  getScoreMessage(): string {
    const s = this.score();
    const total = this.totalQuestions();
    const pct = (s / total) * 100;
    if (pct === 100) return 'Parfait ! Tu es un expert !';
    if (pct >= 80) return 'Excellent travail !';
    if (pct >= 60) return 'Bien joué ! Continue comme ça !';
    if (pct >= 40) return 'Pas mal ! Tu peux mieux faire !';
    return 'Continue à apprendre ! Tu vas y arriver !';
  }

  currentOptions(): string[] {
    const q = this.currentQuestion();
    return (q.type === 'choice' || q.type === 'fill') ? q.options : [];
  }

  currentCorrectIndex(): number {
    const q = this.currentQuestion();
    return (q.type === 'choice' || q.type === 'fill') ? q.correctIndex : -1;
  }

  currentHint(): string {
    const q = this.currentQuestion();
    return q.type === 'fill' ? q.hint : '';
  }

  isTrueStatement(): boolean {
    const q = this.currentQuestion();
    return q.type === 'truefalse' ? q.isTrue : false;
  }

  getTypeLabel(): string {
    const q = this.currentQuestion();
    switch (q.type) {
      case 'choice': return 'Choix multiple';
      case 'fill': return 'Complète la phrase';
      case 'truefalse': return 'Vrai ou Faux';
    }
  }
}
