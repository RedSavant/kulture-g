import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './presentation.html',
  styleUrl: './presentation.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Presentation {}
