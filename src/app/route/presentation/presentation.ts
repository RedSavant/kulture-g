import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './presentation.html',
  styleUrl: './presentation.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Presentation {}
