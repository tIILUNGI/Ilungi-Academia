import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="site-header">
      <div class="container">
        <div class="header-inner">

          <!-- Logo (sem navegação) -->
          <div class="header-logo" aria-label="Academia Ilungi" style="display: flex; align-items: center; gap: 10px;">
            <img src="assets/AI.png" alt="Academia Ilungi" style="width: 32px; height: 32px; object-fit: contain;" />
            <div class="logo-text">Academia <span>Ilungi</span></div>
          </div>

          <!-- Navigation Desktop -->
          <nav class="header-nav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Início</a>
            <a routerLink="/cursos" routerLinkActive="active">Catálogo de Cursos</a>
            <a routerLink="/certificacoes" routerLinkActive="active">Certificações</a>
            <a routerLink="/certificados/verificar" routerLinkActive="active">Verificar Certificados</a>
          </nav>

          <!-- Auth Buttons Desktop -->
          <div class="header-actions">
            @if (currentUser) {
              <a routerLink="/area-do-aluno" class="btn btn-ghost">Área do Aluno</a>
              <button class="btn btn-primary" type="button" (click)="logout()">Sair</button>
            } @else {
              <a routerLink="/login" class="btn btn-ghost">Entrar</a>
              <a routerLink="/registro" class="btn btn-primary">Criar Conta</a>
            }
          </div>

          <!-- Mobile Button -->
          <button type="button" class="mobile-menu-btn" (click)="toggleMenu()" aria-label="Menu">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (isMenuOpen) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        @if (isMenuOpen) {
          <nav class="mobile-nav">
            <a routerLink="/" (click)="closeMenu()">Início</a>
            <a routerLink="/cursos" (click)="closeMenu()">Catálogo de Cursos</a>
            <a routerLink="/certificacoes" (click)="closeMenu()">Certificações</a>
            <a routerLink="/certificados/verificar" (click)="closeMenu()">Verificar Certificados</a>
            <hr>
            @if (currentUser) {
              <a routerLink="/area-do-aluno" class="btn btn-ghost" (click)="closeMenu()">Área do Aluno</a>
              <button class="btn btn-primary" type="button" (click)="logout(); closeMenu();">Sair</button>
            } @else {
              <a routerLink="/login" class="btn btn-ghost" (click)="closeMenu()">Entrar</a>
              <a routerLink="/registro" class="btn btn-primary" (click)="closeMenu()">Criar Conta</a>
            }
          </nav>
        }
      </div>
    </header>
  `,
  styles: [``]
})
export class HeaderComponent {
  isMenuOpen = false;
  currentUser = this.storage.getCurrentUser();

  constructor(private router: Router, private storage: StorageService, private auth: AuthService) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.closeMenu();
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyOverflow();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.updateBodyOverflow();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  private updateBodyOverflow() {
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }
}
