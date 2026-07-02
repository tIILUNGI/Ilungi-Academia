import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-student-area',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (!isLoggedIn) {
      <!-- Not Logged In State -->
      <div class="form-page" style="background:linear-gradient(135deg,#f5f3ff,#ede9fe 40%,#e0e7ff);">
        <div class="form-card" style="text-align:center; padding:3rem 2rem;">
          <div style="width:72px;height:72px;background:var(--gray-100);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color:var(--gray-400)">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h2 style="font-size:1.5rem;font-weight:800;color:var(--gray-900);margin-bottom:0.5rem;">Área Restrita</h2>
          <p style="color:var(--gray-500);font-size:0.9rem;margin-bottom:2rem;">Faça login para aceder à sua área de aluno e acompanhar os seus cursos.</p>
          <a routerLink="/login" class="btn btn-primary btn-lg" style="width:100%;justify-content:center;">Fazer Login</a>
          <p style="margin-top:1rem;font-size:0.85rem;color:var(--gray-400);">
            Não tem conta? <a routerLink="/registro" style="color:var(--primary);font-weight:600;">Registar-se</a>
          </p>
        </div>
      </div>
    } @else {
      <!-- Logged In Dashboard -->
      <div class="dashboard-hero">
        <div class="container">
          <div class="dashboard-top">
            <div>
              <p style="font-size:0.85rem;color:rgba(255,255,255,0.7);margin-bottom:0.25rem;">Bem-vindo de volta</p>
              <h1>Olá, {{ userName }}!</h1>
              <p style="color:rgba(255,255,255,0.8);margin-top:0.25rem;font-size:0.95rem;">Continue a sua jornada de aprendizagem</p>
            </div>
            <button (click)="logout()" class="btn btn-outline-white btn-sm">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Sair
            </button>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="container">

          <!-- Stats Cards -->
          <div class="dashboard-stats">
            @for (stat of dashStats; track stat.label) {
              <div class="dashboard-stat-card">
                <div class="stat-icon" [style.background]="stat.bg">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" [style.color]="stat.color">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="stat.icon"/>
                  </svg>
                </div>
                <div>
                  <span class="ds-number">{{ stat.value }}</span>
                  <span class="ds-label">{{ stat.label }}</span>
                </div>
              </div>
            }
          </div>

          <!-- My Courses -->
          <div style="margin-top:3rem;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
              <h2 style="font-size:1.35rem;font-weight:800;color:var(--gray-900);">Os Meus Cursos</h2>
              <a routerLink="/cursos" class="btn btn-ghost btn-sm">Explorar Mais</a>
            </div>

            @if (enrolledCourses.length > 0) {
              <div class="enrolled-grid">
                @for (course of enrolledCourses; track course.id) {
                  <div class="card enrolled-card">
                    <div class="enrolled-thumb">
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                      </svg>
                    </div>
                    <div class="enrolled-body">
                      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
                        <span class="badge" [class]="course.status === 'completed' ? 'badge-success' : 'badge-primary'">
                          {{ course.status === 'completed' ? 'Concluído' : 'Em Andamento' }}
                        </span>
                      </div>
                      <h3 class="enrolled-title">{{ course.course }}</h3>

                      <!-- Progress -->
                      <div style="margin-top:0.875rem;">
                        <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:0.375rem;">
                          <span style="color:var(--gray-500)">Progresso</span>
                          <span style="font-weight:700;color:var(--primary)">{{ course.progress }}%</span>
                        </div>
                        <div style="height:6px;border-radius:9999px;background:var(--gray-100);overflow:hidden;">
                          <div [style.width.%]="course.progress"
                               [style.background]="course.status === 'completed' ? '#10b981' : 'var(--gradient)'"
                               style="height:100%;border-radius:9999px;transition:width 0.5s ease;"></div>
                        </div>
                      </div>

                      <div style="margin-top:1rem;display:flex;align-items:center;justify-content:space-between;">
                        @if (course.status === 'completed') {
                          <span style="font-size:0.78rem;color:#059669;display:flex;align-items:center;gap:0.35rem;font-weight:600;">
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            Concluído
                          </span>
                        } @else {
                          <span style="font-size:0.78rem;color:var(--gray-400);">{{ course.startDate }}</span>
                        }
                        <button class="btn btn-ghost btn-sm">
                          {{ course.status === 'completed' ? 'Rever' : 'Continuar' }}
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <div class="empty-state">
                <div class="empty-icon">
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h3>Nenhum curso ainda</h3>
                <p>Inscreva-se no seu primeiro curso e comece a aprender hoje!</p>
                <a routerLink="/cursos" class="btn btn-primary" style="margin-top:1.25rem;">Ver Cursos Disponíveis</a>
              </div>
            }
          </div>

          <!-- Certificates -->
          @if (certificates.length > 0) {
            <div style="margin-top:3rem;">
              <h2 style="font-size:1.35rem;font-weight:800;color:var(--gray-900);margin-bottom:1.5rem;">Os Meus Certificados</h2>
              <div class="certs-grid">
                @for (cert of certificates; track cert.code) {
                  <div class="card cert-item">
                    <div class="cert-badge-icon">
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 style="font-size:0.95rem;font-weight:700;color:var(--gray-900);margin-bottom:0.25rem;">{{ cert.name }}</h3>
                      <p style="font-size:0.8rem;color:var(--gray-500);">{{ cert.course }}</p>
                      <p style="font-size:0.75rem;color:var(--gray-400);margin-top:0.5rem;">Emitido em {{ cert.issueDate }}</p>
                      <p style="font-size:0.72rem;font-family:monospace;color:var(--primary);margin-top:0.25rem;">{{ cert.code }}</p>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

        </div>
      </div>
    }
  `,
  styles: [`
    .dashboard-hero {
      background: var(--gradient);
      padding: 3rem 0 4rem;
    }
    .dashboard-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    .dashboard-top h1 {
      font-size: 2rem;
      font-weight: 800;
      color: white;
    }
    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
      margin-top: -2.5rem;
    }
    .dashboard-stat-card {
      background: white;
      border-radius: 1rem;
      padding: 1.25rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      border: 1px solid var(--gray-100);
    }
    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .ds-number {
      display: block;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--gray-900);
      line-height: 1;
    }
    .ds-label {
      display: block;
      font-size: 0.75rem;
      color: var(--gray-500);
      margin-top: 0.2rem;
    }
    .enrolled-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    .enrolled-card {
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow: hidden;
    }
    .enrolled-thumb {
      background: linear-gradient(135deg, #ede9fe, #dbeafe);
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
    }
    .enrolled-body { padding: 1.25rem; flex: 1; display: flex; flex-direction: column; }
    .enrolled-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--gray-900);
      line-height: 1.4;
    }
    .empty-state {
      background: var(--gray-50);
      border: 2px dashed var(--gray-200);
      border-radius: 1rem;
      padding: 3rem 2rem;
      text-align: center;
    }
    .empty-icon {
      width: 72px;
      height: 72px;
      background: var(--gray-100);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      color: var(--gray-300);
    }
    .empty-state h3 { font-size: 1.1rem; font-weight: 700; color: var(--gray-700); }
    .empty-state p { font-size: 0.875rem; color: var(--gray-400); margin-top: 0.375rem; }
    .certs-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }
    .cert-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    .cert-badge-icon {
      width: 48px;
      height: 48px;
      background: #fef3c7;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d97706;
      flex-shrink: 0;
    }
    @media (max-width: 1024px) {
      .dashboard-stats { grid-template-columns: repeat(2, 1fr); }
      .enrolled-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .dashboard-stats { grid-template-columns: repeat(2, 1fr); }
      .enrolled-grid { grid-template-columns: 1fr; }
      .certs-grid { grid-template-columns: 1fr; }
      .dashboard-top { flex-direction: column; gap: 1rem; }
    }
  `]
})
export class StudentAreaComponent implements OnInit {
  isLoggedIn = false;
  userName = '';
  enrolledCourses: any[] = [];
  certificates: any[] = [];

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit() {
    const user = this.storage.getCurrentUser();
    if (user) {
      this.isLoggedIn = true;
      this.userName = user.firstName || 'Aluno';
      this.enrolledCourses = this.storage.getEnrollments();
      this.certificates = this.storage.getCertificates().filter(
        (c: any) => c.holder === user.firstName + ' ' + user.lastName
      );
    }
  }

  get completedCourses() {
    return this.enrolledCourses.filter(c => c.status === 'completed').length;
  }

  get inProgressCourses() {
    return this.enrolledCourses.filter(c => c.status === 'in_progress').length;
  }

  get dashStats() {
    return [
      {
        label: 'Cursos Inscritos', value: this.enrolledCourses.length,
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        bg: '#ede9fe', color: '#7c3aed'
      },
      {
        label: 'Concluídos', value: this.completedCourses,
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        bg: '#d1fae5', color: '#059669'
      },
      {
        label: 'Em Andamento', value: this.inProgressCourses,
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        bg: '#fef3c7', color: '#d97706'
      },
      {
        label: 'Certificados', value: this.certificates.length,
        icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
        bg: '#dbeafe', color: '#2563eb'
      }
    ];
  }

  logout() {
    this.storage.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
