import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:2rem;">
      <div style="margin-bottom:2.5rem;">
        <p style="font-size:0.875rem;color:var(--gray-500);margin-bottom:0.25rem;">Bem-vindo de volta</p>
        <h1 style="font-size:2rem;font-weight:800;color:var(--gray-900);">{{ userName }}!</h1>
      </div>

      <!-- Stats Cards -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-bottom:3rem;">
        @for (stat of dashStats; track stat.label) {
          <div style="background:white;padding:1.75rem;border-radius:12px;border:1px solid var(--gray-200);box-shadow:var(--shadow-sm);transition:transform 0.2s;">
            <div style="font-size:2.25rem;font-weight:800;color:var(--gray-900);">{{ stat.value }}</div>
            <div style="font-size:0.875rem;color:var(--gray-500);margin-top:0.25rem;font-weight:500;">{{ stat.label }}</div>
          </div>
        }
      </div>

      <!-- Continue Learning -->
      <div style="margin-bottom:3rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
          <h2 style="font-size:1.35rem;font-weight:700;color:var(--gray-900);">Continuar a Aprender</h2>
          <a routerLink="/area-do-aluno/cursos" style="font-size:0.875rem;color:var(--primary);font-weight:600;">Ver todos</a>
        </div>
        @if (enrolledCourses.length > 0) {
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;">
            @for (course of enrolledCourses.slice(0,4); track course.id) {
              <div style="background:white;border:1px solid var(--gray-200);border-radius:12px;overflow:hidden;display:flex;transition:transform 0.2s,box-shadow 0.2s;">
                <div style="width:90px;height:90px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                  </svg>
                </div>
                <div style="padding:1.25rem;flex:1;">
                  <h3 style="font-weight:600;color:var(--gray-900);font-size:1rem;margin-bottom:0.25rem;">{{ course.course }}</h3>
                  <div style="height:5px;background:var(--gray-100);border-radius:9999px;overflow:hidden;margin-bottom:0.5rem;">
                    <div [style.width.%]="course.progress" style="height:100%;background:var(--primary);"></div>
                  </div>
                  <span style="font-size:0.8rem;color:var(--gray-500);">{{ course.progress }}% concluído</span>
                </div>
              </div>
            }
          </div>
        } @else {
          <div style="background:white;border:1px dashed var(--gray-300);border-radius:12px;padding:2.5rem;text-align:center;">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="var(--gray-300)" style="margin:0 auto 1rem;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
            </svg>
            <p style="color:var(--gray-500);">Nenhum curso iniciado. <a routerLink="/cursos" style="color:var(--primary);font-weight:500;">Explorar cursos</a></p>
          </div>
        }
      </div>

      <!-- Learning Activity Chart -->
      <div style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:2rem;margin-bottom:3rem;">
        <h2 style="font-size:1.35rem;font-weight:700;color:var(--gray-900);margin-bottom:1.5rem;">Atividade de Aprendizado</h2>
        <div style="display:flex;align-items:flex-end;gap:1rem;height:180px;padding:0 0.5rem;">
          @for (bar of activityChart; track bar.day) {
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:0.5rem;">
              <div style="width:100%;background:var(--gray-100);border-radius:6px;overflow:hidden;height:140px;display:flex;align-items:flex-end;">
                <div [style.height.%]="bar.pct" style="width:100%;background:linear-gradient(180deg,var(--primary),var(--primary-dark));border-radius:6px;transition:height 0.5s ease;"></div>
              </div>
              <span style="font-size:0.75rem;color:var(--gray-500);font-weight:500;">{{ bar.day }}</span>
            </div>
          }
        </div>
      </div>

      <!-- Achievements -->
      <div>
        <h2 style="font-size:1.35rem;font-weight:700;color:var(--gray-900);margin-bottom:1.5rem;">Conquistas</h2>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;">
          @for (achievement of achievements; track achievement.name) {
            <div style="background:white;border:1px solid var(--gray-200);border-radius:12px;padding:1.5rem;text-align:center;transition:transform 0.2s;">
              <div style="width:56px;height:56px;margin:0 auto 1rem;background:{{ achievement.unlocked ? 'rgba(124,58,237,0.1)' : '#f3f4f6' }};border-radius:50%;display:flex;align-items:center;justify-content:center;">
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="achievement.icon" [style.stroke]="achievement.unlocked ? 'var(--primary)' : '#9ca3af'"/>
                </svg>
              </div>
              <span style="font-size:0.9rem;font-weight:500;color:{{ achievement.unlocked ? 'var(--gray-900)' : 'var(--gray-500)' }};">{{ achievement.name }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  userName = '';
  enrolledCourses: any[] = [];
  certificates: any[] = [];
  achievements = [
    { name: 'Primeiro Curso', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253', unlocked: true },
    { name: 'Parte da Comunidade', icon: 'M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5zM12 4a4 4 0 100 8 4 4 0 000-8zM5 20h5v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5z', unlocked: true },
    { name: '100% Concluído', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806', unlocked: false },
    { name: 'Participação', icon: 'M7 8h10M7 12h4m1 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', unlocked: false }
  ];
  activityChart = [
    { day: 'Seg', pct: 30 },
    { day: 'Ter', pct: 55 },
    { day: 'Qua', pct: 40 },
    { day: 'Qui', pct: 70 },
    { day: 'Sex', pct: 50 },
    { day: 'Sáb', pct: 20 },
    { day: 'Dom', pct: 35 }
  ];

  get completedCourses() {
    return this.enrolledCourses.filter(c => c.status === 'completed').length;
  }

  get dashStats() {
    return [
      { label: 'Cursos', value: this.enrolledCourses.length },
      { label: 'Concluídos', value: this.completedCourses },
      { label: 'Horas', value: '24' },
      { label: 'Certificados', value: this.certificates.length }
    ];
  }

  constructor(private storage: StorageService) {}

  ngOnInit() {
    const user = this.storage.getCurrentUser();
    if (user) {
      this.userName = user.name || user.firstName || 'Aluno';
      this.enrolledCourses = this.storage.getEnrollments();
      this.certificates = this.storage.getCertificates();
    }
  }
}
