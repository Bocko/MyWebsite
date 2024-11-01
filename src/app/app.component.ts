import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mw-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  year = new Date().getFullYear();
}
