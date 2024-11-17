import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'mw-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  constructor(private router: Router)
  {
    let path = localStorage.getItem('path');
    let fragment = localStorage.getItem('fragment');
    if (path)
    {
      console.log("Found Path In LocalStorage: " + path);
      localStorage.removeItem('path');
      if (fragment)
      {
        console.log("Found Fragment In LocalStorage: " + fragment);
        localStorage.removeItem('fragment');
        this.router.navigate([path], { fragment: fragment });
      }
      else
      {
        this.router.navigate([path]);
      }
    }
  }

  year = new Date().getFullYear();
}
