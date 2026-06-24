import { Component, signal, computed } from '@angular/core';

type ChoiceQ = { type: 'choice'; question: string; options: string[]; correctIndex: number };
type FillQ = { type: 'fill'; question: string; hint: string; options: string[]; correctIndex: number };
type TrueFalseQ = { type: 'truefalse'; question: string; isTrue: boolean };
type Question = ChoiceQ | FillQ | TrueFalseQ;

@Component({
  selector: 'app-example',
  imports: [],
  templateUrl: './example.html',
  styleUrl: './example.scss',
})
export class Example {
  questions: Question[] = [
    {
      type: 'choice',
      question: 'Quel pays est connu pour ses "sushis" ?',
      options: ['Chine', 'Corée', 'Japon', 'Thaïlande'],
      correctIndex: 2,
    },
    {
      type: 'fill',
      question: 'La ___ est une fête traditionnelle mexicaine où l\'on honore les défunts.',
      hint: 'Fête mexicaine',
      options: ['Tomatina', 'Feria', 'Quinceañera', 'Día de Muertos'],
      correctIndex: 3,
    },
    {
      type: 'truefalse',
      question: 'Le tango est une danse originaire d\'Argentine.',
      isTrue: true,
    },
    {
      type: 'choice',
      question: 'Dans quel pays trouve-t-on le Taj Mahal ?',
      options: ['Népal', 'Inde', 'Pakistan', 'Bangladesh'],
      correctIndex: 1,
    },
    {
      type: 'fill',
      question: 'Le ___ est un art martial originaire du Japon.',
      hint: 'Art martial',
      options: ['Taekwondo', 'Karaté', 'Kung-fu', 'Capoeira'],
      correctIndex: 1,
    },
    {
      type: 'truefalse',
      question: 'Le carnaval de Rio a lieu chaque année au Brésil.',
      isTrue: true,
    },
    {
      type: 'choice',
      question: 'Quel instrument est traditionnellement associé au flamenco espagnol ?',
      options: ['Piano', 'Violon', 'Guitare', 'Batterie'],
      correctIndex: 2,
    },
    {
      type: 'fill',
      question: 'En Inde, la ___ est une fête des couleurs qui marque l\'arrivée du printemps.',
      hint: 'Fête des couleurs',
      options: ['Diwali', 'Holi', 'Eid', 'Pongal'],
      correctIndex: 1,
    },
    {
      type: 'truefalse',
      question: 'Le kimono est le vêtement traditionnel de la Corée.',
      isTrue: false,
    },
  ];

  currentIndex = signal(0);
  score = signal(0);
  submitted = signal(false);
  showResult = signal(false);
  quizStarted = signal(false);

  choiceSelected = signal<number | null>(null);
  fillSelected = signal<number | null>(null);
  truefalseSelected = signal<boolean | null>(null);

  currentQuestion = computed(() => this.questions[this.currentIndex()]);
  totalQuestions = this.questions.length;
  progress = computed(() => (this.currentIndex() / this.totalQuestions) * 100);

  hasAnswered = computed(() => this.submitted());

  isCorrect = computed(() => {
    const q = this.currentQuestion();
    if (!this.submitted()) return null;
    switch (q.type) {
      case 'choice': return this.choiceSelected() === this.currentCorrectIndex();
      case 'fill': return this.fillSelected() === this.currentCorrectIndex();
      case 'truefalse': return this.truefalseSelected() === this.isTrueStatement();
    }
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
        correct = this.choiceSelected() === this.currentCorrectIndex();
        break;
      case 'fill':
        correct = this.fillSelected() === this.currentCorrectIndex();
        break;
      case 'truefalse':
        correct = this.truefalseSelected() === this.isTrueStatement();
        break;
    }
    if (correct) this.score.update(s => s + 1);
    this.submitted.set(true);
  }

  nextQuestion(): void {
    if (this.currentIndex() < this.totalQuestions - 1) {
      this.currentIndex.update(i => i + 1);
      this.resetAnswer();
    } else {
      this.showResult.set(true);
    }
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

  getScoreMessage(): string {
    const s = this.score();
    const total = this.totalQuestions;
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
