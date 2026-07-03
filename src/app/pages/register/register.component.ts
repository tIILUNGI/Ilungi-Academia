import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-register',
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
            <p class="brand-desc-sm">Junte-se a nós e comece a sua jornada de aprendizado profissional.</p>
          </div>
        </div>
      </div>

      <!-- Right Form Column -->
      <div class="auth-right">
        <div style="max-width:440px; width:100%; margin:0 auto; padding: 0 1.25rem;">
          <div style="text-align:center; margin-bottom:1rem;">
            <a routerLink="/" style="text-decoration:none;">
              <span class="logo-text" style="font-size:1.05rem; font-weight:800; color:var(--gray-900);">Ilungi<span style="color:var(--primary)">-Academia</span></span>
            </a>
          </div>
        </div>

        <div style="max-width:440px; width:100%; margin:0 auto; padding: 0 1.25rem;">
          <div class="form-card" style="width: 100%; max-width: 440px; padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--gray-200); background: white; box-shadow: var(--shadow-sm);">
          
          <div class="form-header" style="margin-bottom: 1.5rem;">
            <h1 style="margin-top:1rem; font-size: 1.75rem;">Crie a sua conta</h1>
            <p style="color:var(--gray-500); font-size:0.875rem; margin-top:0.25rem;">
              Comece a aprender hoje mesmo de forma profissional
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
            
            <!-- Firstname & Lastname -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
              <div class="form-group" style="margin-bottom: 1.5rem;">
                <label for="firstName" style="font-weight: 500; font-size: 0.82rem; color: var(--gray-700); margin-bottom: 0.5rem; display: block;">
                  Nome <span style="color: var(--primary);">*</span>
                </label>
                <div class="animated-input-wrapper">
                  <input
                    id="firstName"
                    [(ngModel)]="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="João"
                    style="border-radius: var(--radius-sm); border: 1.5px solid var(--gray-200); padding: 0.75rem 1rem; width: 100%; background: var(--white); font-size: 0.85rem;">
                </div>
              </div>

              <div class="form-group" style="margin-bottom: 1.5rem;">
                <label for="lastName" style="font-weight: 500; font-size: 0.82rem; color: var(--gray-700); margin-bottom: 0.5rem; display: block;">
                  Sobrenome <span style="color: var(--primary);">*</span>
                </label>
                <div class="animated-input-wrapper">
                  <input
                    id="lastName"
                    [(ngModel)]="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Silva"
                    style="border-radius: var(--radius-sm); border: 1.5px solid var(--gray-200); padding: 0.75rem 1rem; width: 100%; background: var(--white); font-size: 0.85rem;">
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label for="email" style="font-weight: 500; font-size: 0.82rem; color: var(--gray-700); margin-bottom: 0.5rem; display: block;">
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
                  style="border-radius: var(--radius-sm); border: 1.5px solid var(--gray-200); padding: 0.75rem 1rem; width: 100%; background: var(--white); font-size: 0.85rem;">
              </div>
            </div>

            <!-- Phone -->
            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label for="phone" style="font-weight: 500; font-size: 0.82rem; color: var(--gray-700); margin-bottom: 0.5rem; display: block;">
                Telefone
              </label>
              <div class="animated-input-wrapper">
                <input
                  id="phone"
                  [(ngModel)]="phone"
                  name="phone"
                  type="tel"
                  placeholder="+244 923 000 000"
                  style="border-radius: var(--radius-sm); border: 1.5px solid var(--gray-200); padding: 0.75rem 1rem; width: 100%; background: var(--white); font-size: 0.85rem;">
              </div>
            </div>

            <!-- Password -->
            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label for="password" style="font-weight: 500; font-size: 0.82rem; color: var(--gray-700); margin-bottom: 0.5rem; display: block;">
                Senha <span style="color: var(--primary);">*</span>
              </label>
              <div class="animated-input-wrapper">
                <input
                  id="password"
                  [(ngModel)]="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Mínimo 8 caracteres"
                  style="border-radius: var(--radius-sm); border: 1.5px solid var(--gray-200); padding: 0.75rem 1rem; width: 100%; background: var(--white); font-size: 0.85rem;">
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label for="confirmPassword" style="font-weight: 500; font-size: 0.82rem; color: var(--gray-700); margin-bottom: 0.5rem; display: block;">
                Confirmar Senha <span style="color: var(--primary);">*</span>
              </label>
              <div class="animated-input-wrapper">
                <input
                  id="confirmPassword"
                  [(ngModel)]="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Repita a sua senha"
                  style="border-radius: var(--radius-sm); border: 1.5px solid var(--gray-200); padding: 0.75rem 1rem; width: 100%; background: var(--white); font-size: 0.85rem;">
              </div>
            </div>

            <!-- Terms and conditions -->
            <div style="display:flex; align-items:flex-start; gap:0.5rem; margin-bottom:1.5rem;">
              <input type="checkbox" id="terms" required style="width:14px; height: 14px; margin-top:3px; flex-shrink:0;">
              <label for="terms" style="font-size:0.8rem; color:var(--gray-600); font-weight:400; cursor:pointer; line-height: 1.35;">
                Eu aceito os
                <a (click)="$event.preventDefault(); readTerms()" style="color:var(--primary); font-weight:600; text-decoration: underline; cursor: pointer;">Termos de Serviço</a>
                e
                <a (click)="$event.preventDefault(); readPrivacy()" style="color:var(--primary); font-weight:600; text-decoration: underline; cursor: pointer;">Política de Privacidade</a>
              </label>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; justify-content: center; height: 42px; border-radius: var(--radius-sm); font-weight: 600;">
              Criar Conta &rarr;
            </button>
          </form>

          <p class="form-footer" style="margin-top:1.5rem; font-size:0.875rem; text-align: center; color: var(--gray-500);">
            Já tem uma conta?
            <a routerLink="/login" style="color: var(--primary); font-weight: 600; text-decoration: underline;">Fazer Login</a>
          </p>
        </div>
      </div>

    </div>
  `
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  readTerms() {
    this.router.navigate(['/termos']);
  }

  readPrivacy() {
    this.router.navigate(['/privacidade']);
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'A senha deve ter pelo menos 8 caracteres.';
      return;
    }

    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password,
      createdAt: new Date().toISOString()
    };

    const saved = this.storage.saveUser(user);
    if (saved) {
      this.successMessage = 'Conta criada com sucesso! Redirecionando...';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    } else {
      this.errorMessage = 'Este email já está cadastrado. Tente fazer login.';
    }
  }
}
