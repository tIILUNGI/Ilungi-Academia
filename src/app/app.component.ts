import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-shell">
      @if (showHeader) {
        <app-header></app-header>
      }
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      @if (showFooter) {
        <app-footer></app-footer>
      }
    </div>
  `
})
export class AppComponent {
  showFooter = true;
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        const isAuth = url.includes('/login') || url.includes('/registro') || url.includes('/recuperar-senha');
        this.showFooter = !isAuth;
        this.showHeader = !isAuth;
      }
    });
  }
}
