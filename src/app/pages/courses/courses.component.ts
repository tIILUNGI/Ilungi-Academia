import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Page Hero -->
    <div class="page-hero">
      <div class="container">
        <span class="section-label">Aprendizagem</span>
        <h1>Catálogo de Cursos</h1>
        <p>Explore nossa variedade de cursos online e encontre o perfeito para sua carreira.</p>
      </div>
    </div>

    <!-- Courses Section -->
    <section class="section" style="padding-bottom: 4rem;">
      <div class="container">
        <!-- Filter Bar -->
        <div class="filter-bar">
          <span style="font-size:0.85rem; font-weight:600; color:var(--gray-500);">Filtrar:</span>
          @for (cat of categories; track cat) {
            <button
              class="filter-btn"
              [class.active]="activeCategory === cat"
              (click)="setCategory(cat)">
              {{ cat }}
            </button>
          }
        </div>

        <div class="grid-courses">
          @for (course of filteredCourses; track course.id) {
            <div class="card card-course">
              <div class="card-course-thumb">
                <svg width="52" height="52" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <div class="card-course-body">
                <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
                  <span class="badge badge-primary">{{ course.category }}</span>
                  @if (course.featured) {
                    <span class="badge" style="background:rgba(245,158,11,0.12); color:#b45309;">Destaque</span>
                  }
                </div>
                <h3 class="card-course-title">{{ course.title }}</h3>
                <p class="card-course-desc">{{ course.description }}</p>
                <div class="card-course-footer">
                  <div>
                    <span class="course-price">{{ course.price }}</span>
                    <p style="font-size:0.75rem; color:var(--gray-400); margin-top:2px;">{{ course.duration }}h de conteúdo</p>
                  </div>
                  <button (click)="openCourseModal(course)" class="btn btn-ghost btn-sm">Ver Detalhes</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Course Details Modal -->
    @if (selectedCourse) {
      <div class="modal-overlay" (click)="closeCourseModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ selectedCourse.title }}</h2>
            <button (click)="closeCourseModal()" class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <span class="badge badge-primary">{{ selectedCourse.category }}</span>
            @if (selectedCourse.featured) {
              <span class="badge" style="background:rgba(245,158,11,0.12); color:#b45309; margin-left:0.5rem;">Destaque</span>
            }
            <p style="margin:1rem 0 1.5rem;">{{ selectedCourse.description }}</p>
<div class="course-details-grid">
               <div class="detail-item">
                 <span class="detail-label">Modalidade</span>
                 <span class="detail-value">{{ selectedCourse.modality }}</span>
               </div>
               <div class="detail-item">
                 <span class="detail-label">Duração</span>
                 <span class="detail-value">{{ selectedCourse.duration }}h</span>
               </div>
               <div class="detail-item">
                 <span class="detail-label">Carga Horária</span>
                 <span class="detail-value">{{ selectedCourse.workload }}h</span>
               </div>
               <div class="detail-item">
                 <span class="detail-label">Nível</span>
                 <span class="detail-value">{{ selectedCourse.level }}</span>
               </div>
               <div class="detail-item">
                 <span class="detail-label">Certificado</span>
                 <span class="detail-value">{{ selectedCourse.certificate ? 'Incluído' : 'Não Incluído' }}</span>
               </div>
               <div class="detail-item">
                 <span class="detail-label">Início</span>
                 <span class="detail-value">{{ selectedCourse.startDate }}</span>
               </div>
             </div>
            <div class="modal-price">
              <span class="course-price">{{ selectedCourse.price }}</span>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }
    .modal-content {
      background: white;
      border-radius: 1rem;
      max-width: 500px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-header h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--gray-900);
      margin: 0;
    }
    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--gray-500);
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-body {
      padding: 1.5rem;
    }
    .course-details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin: 1rem 0 1.5rem;
    }
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .detail-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--gray-500);
      text-transform: uppercase;
    }
    .detail-value {
      font-size: 0.875rem;
      color: var(--gray-900);
    }
    .modal-price {
      text-align: center;
      padding-top: 1rem;
      border-top: 1px solid var(--gray-200);
    }
  `]
})
export class CoursesComponent {
  activeCategory = 'Todos';
  selectedCourse: any = null;

  categories = ['Todos', 'Gestão', 'Tecnologia', 'Liderança', 'Marketing', 'Soft Skills'];

  courses = [
    { id: 1, title: 'Gestão de Projetos', description: 'Aprenda as melhores práticas de gestão de projetos do zero ao avançado.', category: 'Gestão', price: 'AOA 15.000', duration: 40, modality: 'Online', workload: 40, level: 'Beginner to Advanced', certificate: true, startDate: 'Next cohort: July 2026', featured: true },
    { id: 2, title: 'Desenvolvimento Web', description: 'Domine HTML, CSS, JavaScript e frameworks modernos.', category: 'Tecnologia', price: 'AOA 20.000', duration: 60, modality: 'Live Sessions', workload: 60, level: 'Intermediate', certificate: true, startDate: 'Next cohort: August 2026', featured: true },
    { id: 3, title: 'Liderança e Gestão de Equipas', description: 'Desenvolva habilidades de liderança e gestão de equipas.', category: 'Liderança', price: 'AOA 18.000', duration: 30, modality: 'Hybrid', workload: 30, level: 'All Levels', certificate: true, startDate: 'Next cohort: September 2026', featured: false },
    { id: 4, title: 'Marketing Digital', description: 'Aprenda estratégias de marketing digital para crescer a sua empresa.', category: 'Marketing', price: 'AOA 12.000', duration: 25, modality: 'Online', workload: 25, level: 'Beginner', certificate: true, startDate: 'Next cohort: October 2026', featured: false },
    { id: 5, title: 'Análise de Dados', description: 'Domine Python, SQL e ferramentas de visualização de dados.', category: 'Tecnologia', price: 'AOA 25.000', duration: 50, modality: 'Live Sessions', workload: 50, level: 'Advanced', certificate: true, startDate: 'Next cohort: November 2026', featured: true },
    { id: 6, title: 'Comunicação Empresarial', description: 'Melhore suas habilidades de comunicação no ambiente corporativo.', category: 'Soft Skills', price: 'AOA 10.000', duration: 20, modality: 'Online', workload: 20, level: 'All Levels', certificate: true, startDate: 'Next cohort: December 2026', featured: false }
  ];

  get filteredCourses() {
    if (this.activeCategory === 'Todos') return this.courses;
    return this.courses.filter(c => c.category === this.activeCategory);
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }

  openCourseModal(course: any) {
    this.selectedCourse = course;
  }

  closeCourseModal() {
    this.selectedCourse = null;
  }
}