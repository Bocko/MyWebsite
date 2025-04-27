import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'mw-root',
    imports: [RouterModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  
  year = new Date().getFullYear();
  showShell = true;

  constructor(private router: Router)
  {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.onRouterNavEndEvent(event.url);
    });

    addEventListener("orientationchange", (event) => {
      location.reload();
    });
  }

  ngOnInit(): void
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

  onRouterNavEndEvent(url: string)
  {
    this.showShell = (url != "/linktree");
  }
}
