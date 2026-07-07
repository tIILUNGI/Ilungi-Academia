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
                <button class="btn {{ course.status === 'completed' ? 'btn-ghost' : 'btn-primary' }}" style="width:100%;justify-content:center;" (click)="openPlayer(course)">
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

    @if (selectedCourse) {
      <div class="video-overlay" (click)="closePlayer()">
        <div class="video-player" (click)="$event.stopPropagation()">
          <div class="video-header">
            <div>
              <span class="badge badge-primary" style="margin-bottom:0.25rem;">Aula</span>
              <h2 style="font-size:1.1rem;font-weight:700;color:var(--gray-900);">{{ selectedCourse.nextLesson || selectedCourse.course }}</h2>
            </div>
            <button class="btn btn-ghost btn-sm" (click)="closePlayer()">Fechar</button>
          </div>
          <div class="video-container">
            <div class="video-screen">
              <div class="video-thumb">
                <svg width="80" height="80" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="video-controls">
                <div class="video-progress">
                  <div class="video-progress-bar" [style.width.%]="playProgress"></div>
                </div>
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <div style="display:flex;align-items:center;gap:1rem;">
                    <button class="video-btn" (click)="togglePlay()">
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white">
                        @if (!isPlaying) {
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                        } @else {
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6"/>
                        }
                      </svg>
                    </button>
                    <button class="video-btn">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/>
                      </svg>
                    </button>
                    <span style="color:white;font-size:0.85rem;font-weight:500;">{{ currentTime }} / {{ totalTime }}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:1rem;">
                    <button class="video-btn">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                      </svg>
                    </button>
                    <button class="video-btn">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="video-sidebar">
              <h3 style="font-size:1rem;font-weight:700;color:var(--gray-900);margin-bottom:1rem;">Aulas do Curso</h3>
              <div style="display:flex;flex-direction:column;gap:0.75rem;">
                @for (lesson of lessons; track lesson.id) {
                  <div class="video-lesson-item">
                    <div style="flex:1;">
                      <div style="font-weight:600;color:var(--gray-800);font-size:0.9rem;">{{ lesson.title }}</div>
                      <div style="font-size:0.75rem;color:var(--gray-500);margin-top:0.25rem;">{{ lesson.duration }} • {{ lesson.type }}</div>
                    </div>
                    @if (lesson.completed) {
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#10b981">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .video-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      padding: 1rem;
    }
    .video-player {
      background: #0f0f0f;
      border-radius: 12px;
      width: 100%;
      max-width: 1200px;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .video-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #222;
    }
    .video-container {
      display: grid;
      grid-template-columns: 1fr 320px;
      max-height: 75vh;
    }
    .video-screen {
      aspect-ratio: 16/9;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .video-thumb {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .video-controls {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.9));
      padding: 1.5rem 1rem 1rem;
    }
    .video-progress {
      height: 4px;
      background: rgba(255,255,255,0.2);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 0.75rem;
      cursor: pointer;
    }
    .video-progress-bar {
      height: 100%;
      background: #ef4444;
      border-radius: 2px;
      transition: width 0.3s ease;
    }
    .video-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.15s;
    }
    .video-btn:hover {
      transform: scale(1.1);
    }
    .video-sidebar {
      background: #1a1a1a;
      border-left: 1px solid #222;
      padding: 1.25rem;
      overflow-y: auto;
    }
    .video-lesson-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: 8px;
      background: #222;
      border: 1px solid #333;
    }
    @media (max-width: 900px) {
      .video-container {
        grid-template-columns: 1fr;
      }
      .video-sidebar {
        display: none;
      }
    }
  `]
})
export class MyCoursesComponent implements OnInit {
  enrolledCourses: any[] = [];
  userName = '';
  selectedCourse: any = null;
  isPlaying = false;
  playProgress = 35;
  currentTime = '12:45';
  totalTime = '36:20';
  lessons = [
    { id: 1, title: 'Introdução ao Curso', duration: '5:30', type: 'Vídeo', completed: true },
    { id: 2, title: 'Conceitos Fundamentais', duration: '12:15', type: 'Vídeo', completed: true },
    { id: 3, title: 'Prática Guiada', duration: '8:45', type: 'Vídeo', completed: false },
    { id: 4, title: 'Exercícios de Fixação', duration: '10:00', type: 'Atividade', completed: false },
    { id: 5, title: 'Avaliação Final', duration: '5:30', type: 'Quiz', completed: false }
  ];

  constructor(private storage: StorageService) {}

  ngOnInit() {
    const user = this.storage.getCurrentUser();
    if (user) {
      this.userName = user.name || user.firstName || 'Aluno';
      this.enrolledCourses = this.storage.getEnrollments();
    }
  }

  openPlayer(course: any) {
    this.selectedCourse = course;
    this.isPlaying = false;
  }

  closePlayer() {
    this.selectedCourse = null;
    this.isPlaying = false;
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }
}
