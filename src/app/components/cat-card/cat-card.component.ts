import { Component, Input } from '@angular/core';
import { CatImageDTO } from "../../../core/dto/cat-image.dto";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './cat-card.component.html',
  styleUrl: './cat-card.component.scss'
})
export class CatCardComponent {
  @Input() cat!: CatImageDTO;
}
