import { Component, signal, computed } from '@angular/core';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

@Component({
  selector: 'app-example',
  imports: [],
  templateUrl: './example.html',
  styleUrl: './example.scss',
})
export class Example {
  questions: Question[] = [
    {
      question: 'Quel pays est connu pour ses "sushis" ?',
      options: ['Chine', 'Corée', 'Japon', 'Thaïlande'],
      correctIndex: 2,
    },
    {
      question: 'Quelle fête est célébrée le 31 octobre ?',
      options: ['Noël', 'Halloween', 'Pâques', 'La Saint-Jean'],
      correctIndex: 1,
    },
    {
      question: 'Dans quel pays trouve-t-on le Taj Mahal ?',
      options: ['Népal', 'Inde', 'Pakistan', 'Bangladesh'],
      correctIndex: 1,
    },
    {
      question: 'Quel instrument est traditionnellement associé au flamenco espagnol ?',
      options: ['Piano', 'Violon', 'Guitare', 'Batterie'],
      correctIndex: 2,
    },
    {
      question: 'Quel pays organise le carnaval le plus célèbre du monde ?',
      options: ['Italie', 'France', 'Brésil', 'États-Unis'],
      correctIndex: 2,
    },
    {
      question: 'Dans quelle culture boit-on du "maté" ?',
      options: ['Argentine', 'Japon', 'Maroc', 'Turquie'],
      correctIndex: 0,
    },
    {
      question: 'Quel pays est le berceau du "kebab" ?',
      options: ['Grèce', 'Liban', 'Turquie', 'Iran'],
      correctIndex: 2,
    },
    {
      question: 'Quelle danse est originaire de la République Dominicaine ?',
      options: ['Salsa', 'Bachata', 'Tango', 'Merengue'],
      correctIndex: 3,
    },
    {
      question: 'Dans quel pays le "Thaipusam" est-il une fête importante ?',
      options: ['Inde', 'Sri Lanka', 'Malaisie', 'Singapour'],
      correctIndex: 2,
    },
    {
      question: 'Quel plat est traditionnellement associé à la Belgique ?',
      options: ['Les baguettes', 'Les gaufres', 'La paella', 'Le curry'],
      correctIndex: 1,
    },
  ];

  currentQuestionIndex = signal(0);
  score = signal(0);
  selectedAnswer = signal<number | null>(null);
  showResult = signal(false);
  quizStarted = signal(false);

  currentQuestion = computed(() => this.questions[this.currentQuestionIndex()]);
  totalQuestions = this.questions.length;
  isCorrect = computed(() => {
    const selected = this.selectedAnswer();
    if (selected === null) return null;
    return selected === this.currentQuestion().correctIndex;
  });
  progress = computed(() => ((this.currentQuestionIndex()) / this.totalQuestions) * 100);
  hasAnswered = computed(() => this.selectedAnswer() !== null);

  startQuiz(): void {
    this.quizStarted.set(true);
  }

  selectAnswer(index: number): void {
    if (this.hasAnswered()) return;
    this.selectedAnswer.set(index);
    if (index === this.currentQuestion().correctIndex) {
      this.score.update(s => s + 1);
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex() < this.totalQuestions - 1) {
      this.currentQuestionIndex.update(i => i + 1);
      this.selectedAnswer.set(null);
    } else {
      this.showResult.set(true);
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex.set(0);
    this.score.set(0);
    this.selectedAnswer.set(null);
    this.showResult.set(false);
    this.quizStarted.set(true);
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
}
