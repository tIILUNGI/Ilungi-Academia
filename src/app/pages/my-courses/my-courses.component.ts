import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:2rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2.5rem;">
        <h1 style="font-size:1.75rem;font-weight:700;color:var(--gray-900);">Meus Cursos</h1>
        <a routerLink="/cursos" class="btn btn-primary btn-sm">Explorar Mais Cursos</a>
      </div>

      @if (enrolledCourses.length > 0) {
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;">
          @for (course of enrolledCourses; track course.id) {
            <div style="background:white;border:1px solid var(--gray-200);border-radius:14px;overflow:hidden;transition:transform 0.2s,box-shadow 0.2s;">
              <div style="height:140px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));position:relative;">
                <div style="position:absolute;top:0.75rem;right:1rem;">
                  <span class="badge" [class]="course.status === 'completed' ? 'badge-success' : 'badge-primary'">
                    {{ course.status === 'completed' ? 'Concluído' : 'Em Andamento' }}
                  </span>
                </div>
                <div style="position:absolute;bottom:1rem;left:1rem;right:1rem;">
                  <h3 style="font-weight:700;color:white;font-size:1.1rem;">{{ course.course }}</h3>
                  <p style="font-size:0.8rem;color:rgba(255,255,255,0.85);margin-top:0.25rem;">{{ course.nextLesson || 'Continuar aprendizado' }}</p>
                </div>
              </div>
              <div style="padding:1.5rem;">
                <div style="margin-bottom:1rem;">
                  <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.375rem;">
                    <span style="color:var(--gray-500)">Progresso</span>
                    <span style="font-weight:700;color:{{ course.status === 'completed' ? '#059669' : 'var(--primary)' }};">{{ course.progress }}%</span>
                  </div>
                  <div style="height:6px;background:var(--gray-100);border-radius:9999px;overflow:hidden;">
                    <div [style.width.%]="course.progress" [style.background]="course.status === 'completed' ? '#10b981' : 'var(--primary)'" style="height:100%;border-radius:9999px;"></div>
                  </div>
                </div>
                <button class="btn {{ course.status === 'completed' ? 'btn-ghost' : 'btn-primary' }}" style="width:100%;justify-content:center;">
                  {{ course.status === 'completed' ? 'Rever Curso' : 'Continuar Aula' }}
                </button>
              </div>
            </div>
          }
        </div>
      } @else {
        <div style="background:white;border:1px dashed var(--gray-300);border-radius:16px;padding:5rem 2rem;text-align:center;max-width:600px;margin:0 auto;">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="var(--gray-300)" style="margin:0 auto 1.5rem;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
          </svg>
          <h3 style="font-size:1.35rem;font-weight:700;color:var(--gray-700);margin-bottom:0.5rem;">Nenhum curso inscrito</h3>
          <p style="color:var(--gray-500);margin-bottom:1.75rem;max-width:400px;margin-left:auto;margin-right:auto;">Inscreva-se no seu primeiro curso e comece a jornada de aprendizado hoje mesmo.</p>
          <a routerLink="/cursos" class="btn btn-primary btn-lg">Ver Cursos Disponíveis</a>
        </div>
      }
    </div>
  `
})
export class MyCoursesComponent implements OnInit {
  enrolledCourses: any[] = [];
  userName = '';

  constructor(private storage: StorageService) {}

  ngOnInit() {
    const user = this.storage.getCurrentUser();
    if (user) {
      this.userName = user.name || user.firstName || 'Aluno';
      this.enrolledCourses = this.storage.getEnrollments();
    }
  }
}