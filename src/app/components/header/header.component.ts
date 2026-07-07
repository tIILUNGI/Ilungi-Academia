import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="site-header">
      <div class="container">
        <div class="header-inner">

          <!-- Logo (sem navegação) -->
          <div class="header-logo" aria-label="Academia Ilungi">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5"/>
            </svg>
            <div class="logo-text">Academia<span>-Ilungi</span></div>
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
            <a routerLink="/login" class="btn btn-ghost">Entrar</a>
            <a routerLink="/registro" class="btn btn-primary">Criar Conta</a>
          </div>

          <!-- Mobile Button -->
          <button class="mobile-menu-btn" (click)="toggleMenu()" aria-label="Menu">
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
            <a routerLink="/login" class="btn btn-ghost" (click)="closeMenu()">Entrar</a>
            <a routerLink="/registro" class="btn btn-primary" (click)="closeMenu()">Criar Conta</a>
          </nav>
        }
      </div>
    </header>
  `
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
