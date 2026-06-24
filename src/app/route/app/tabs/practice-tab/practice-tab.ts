import { Component, input } from '@angular/core';

@Component({
  selector: 'app-practice-tab',
  imports: [],
  templateUrl: './practice-tab.html',
  styleUrl: './practice-tab.scss',
})
export class PracticeTab {
  readonly resetKey = input(0);
}
