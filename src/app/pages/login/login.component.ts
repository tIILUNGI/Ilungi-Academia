import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  template: `
    <div class="auth-container">
      
      <!-- Left Static Brand Column -->
      <div class="auth-left">
        <div class="brand-panel">
          <div class="brand-circle brand-circle-lg"></div>
          <div class="brand-circle brand-circle-md"></div>
          <div class="brand-circle brand-circle-sm"></div>
          <div class="brand-content">
            <div class="brand-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5"/>
              </svg>
            </div>
            <div class="brand-title">Ilungi<span>-Academia</span></div>
            <p class="brand-desc">Excelência em Educação Profissional</p>
            <div class="brand-line"></div>
            <p class="brand-desc-sm">Transforme a sua carreira com os nossos cursos online e certificações reconhecidas.</p>
          </div>
        </div>
      </div>

      <!-- Right Form Column -->
      <div class="auth-right">
        <div style="max-width:400px; width:100%; margin:0 auto; padding: 0 1.25rem;">
          <div style="text-align:center; margin-bottom:1rem;">
            <a routerLink="/" style="text-decoration:none;">
              <span class="logo-text" style="font-size:1.05rem; font-weight:800; color:var(--gray-900);">Ilungi<span style="color:var(--primary)">-Academia</span></span>
            </a>
          </div>
          <div class="form-card" style="width: 100%; max-width: 400px; padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--gray-200); background: white; box-shadow: var(--shadow-sm);">
          
          <div class="form-header">
            <h1 style="margin-top:1.25rem;">Bem-vindo de volta</h1>
            <p style="color:var(--gray-500); font-size:0.875rem; margin-top:0.375rem;">
              Entre na sua conta para continuar a sua formação
            </p>
          </div>

          @if (errorMessage) {
            <div class="alert alert-error" style="margin-bottom: 1.25rem; font-size: 0.85rem; padding: 0.75rem 1rem;">
              {{ errorMessage }}
            </div>
          }

          <form (ngSubmit)="onSubmit()">
            
            <div class="form-group">
              <label for="email" style="font-weight: 500; font-size: 0.875rem; color: var(--gray-700); margin-bottom: 0.5rem; display: block;">
                Endereço de Email <span style="color: var(--primary);">*</span>
              </label>
              <div class="animated-input-wrapper">
                <input
                  id="email"
                  [(ngModel)]="email"
                  name="email"
                  type="email"
                  required
                   placeholder="solucoes@ilungi.ao"
                  style="border-radius: var(--radius-sm); border: 1.5px solid var(--gray-200); padding: 0.75rem 1rem; width: 100%; background: var(--white); font-size: 0.875rem;">
              </div>
            </div>

            <div class="form-group">
              <label for="password" style="font-weight: 500; font-size: 0.875rem; color: var(--gray-700); margin-bottom: 0.5rem; display: block;">
                Senha <span style="color: var(--primary);">*</span>
              </label>
              <div class="animated-input-wrapper">
                <input
                  id="password"
                  [(ngModel)]="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Introduza a sua senha"
                  style="border-radius: var(--radius-sm); border: 1.5px solid var(--gray-200); padding: 0.75rem 1rem; width: 100%; background: var(--white); font-size: 0.875rem;">
              </div>
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; margin-top: 0.5rem;">
              <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.82rem; font-weight:400; cursor:pointer;">
                <input type="checkbox" style="width:14px; height: 14px; padding:0; border-radius: 4px;">
                <span style="color:var(--gray-600)">Lembrar-me</span>
              </label>
              <a routerLink="/recuperar-senha" style="font-size:0.82rem; color:var(--primary); font-weight:600;">Esqueceu a senha?</a>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; justify-content: center; height: 42px; border-radius: var(--radius-sm); font-weight: 600;">
              Entrar &rarr;
            </button>
          </form>

          <div class="form-divider" style="margin: 1.75rem 0 1.25rem; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gray-400);">
            Ou conecte-se com
          </div>

          <div style="display:grid; grid-template-columns:1fr; gap:0.75rem;">
            <button class="btn btn-secondary" style="border-radius:var(--radius-sm); border:1px solid var(--gray-200); height: 40px; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 500; font-size: 0.875rem; background: var(--white);">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Iniciar sessão com o Google
            </button>
          </div>

          <p class="form-footer" style="margin-top:2rem; font-size:0.875rem; text-align: center; color: var(--gray-500);">
            Não tem uma conta?
            <a routerLink="/registro" style="color: var(--primary); font-weight: 600; text-decoration: underline;">Criar conta grátis</a>
          </p>
        </div>
      </div>

    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  onSubmit() {
    this.errorMessage = '';

    const user = this.storage.authenticateUser(this.email, this.password);
    if (user) {
      this.router.navigate(['/area-do-aluno']);
    } else {
      this.errorMessage = 'Email ou senha incorretos. Tente criar uma conta primeiro.';
    }
  }
}
