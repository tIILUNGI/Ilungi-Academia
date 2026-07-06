import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  template: `
    <div class="auth-container">
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
            <p class="brand-desc-sm">Transforme a sua carreira com os nossos cursos online e certificações.</p>
          </div>
        </div>
      </div>

      <div class="auth-right">
        <div style="max-width:400px; width:100%; margin:0 auto; padding: 0 1.25rem;">
          <div style="text-align:center; margin-bottom:1rem;">
            <a routerLink="/" style="text-decoration:none;">
              <span class="logo-text" style="font-size:1.05rem; font-weight:800; color:var(--gray-900);">Academia<span style="color:var(--primary)">Ilungi</span></span>
            </a>
          </div>
        </div>

        <div style="max-width:400px; width:100%; margin:0 auto; padding: 0 1.25rem;">
          <div class="form-card" style="width: 100%; max-width: 400px; padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--gray-200); background: white; box-shadow: var(--shadow-sm);">

          <div class="form-header">
            <h1 style="margin-top:1.25rem;">Recuperar senha</h1>
            <p style="color:var(--gray-500); font-size:0.875rem; margin-top:0.375rem;">
              Introduza o seu email para receber um código de recuperação
            </p>
          </div>

          @if (successMessage) {
            <div class="alert alert-success" style="margin-bottom: 1.25rem; font-size: 0.85rem; padding: 0.75rem 1rem;">
              {{ successMessage }}
            </div>
          }

          @if (errorMessage) {
            <div class="alert alert-error" style="margin-bottom: 1.25rem; font-size: 0.85rem; padding: 0.75rem 1rem;">
              {{ errorMessage }}
            </div>
          }

          <form (ngSubmit)="onSubmit()">
            <div class="form-group" style="margin-bottom: 1.5rem;">
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

            <button type="submit" class="btn btn-primary" style="width:100%; justify-content: center; height: 42px; border-radius: var(--radius-sm); font-weight: 600;">
              Enviar código
            </button>
          </form>

          <p class="form-footer" style="margin-top:2rem; font-size:0.875rem; text-align: center; color: var(--gray-500);">
            Lembrou-se da senha?
            <a routerLink="/login" style="color: var(--primary); font-weight: 600; text-decoration: underline;">Fazer login</a>
          </p>
        </div>
      </div>

    </div>
  `
})
export class ForgotPasswordComponent {
  email = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email) {
      this.errorMessage = 'Introduza o seu email.';
      return;
    }

    const users = this.storage.getUsers();
    const user = users.find((u: any) => u.email === this.email);

    if (!user) {
      this.errorMessage = 'Email não encontrado. Verifique ou crie uma conta.';
      return;
    }

    this.successMessage = 'Código enviado! Verifique o seu email (simulação).';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2500);
  }
}
