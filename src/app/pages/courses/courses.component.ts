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
                  <a [routerLink]="['/cursos', course.id]" class="btn btn-ghost btn-sm">Ver Detalhes</a>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class CoursesComponent {
  activeCategory = 'Todos';

  categories = ['Todos', 'Gestão', 'Tecnologia', 'Liderança', 'Marketing', 'Soft Skills'];

  courses = [
    { id: 1, title: 'Gestão de Projetos', description: 'Aprenda as melhores práticas de gestão de projetos do zero ao avançado.', category: 'Gestão', price: 'AOA 15.000', duration: 40, featured: true },
    { id: 2, title: 'Desenvolvimento Web', description: 'Domine HTML, CSS, JavaScript e frameworks modernos.', category: 'Tecnologia', price: 'AOA 20.000', duration: 60, featured: true },
    { id: 3, title: 'Liderança e Gestão de Equipas', description: 'Desenvolva habilidades de liderança e gestão de equipas.', category: 'Liderança', price: 'AOA 18.000', duration: 30, featured: false },
    { id: 4, title: 'Marketing Digital', description: 'Aprenda estratégias de marketing digital para crescer a sua empresa.', category: 'Marketing', price: 'AOA 12.000', duration: 25, featured: false },
    { id: 5, title: 'Análise de Dados', description: 'Domine Python, SQL e ferramentas de visualização de dados.', category: 'Tecnologia', price: 'AOA 25.000', duration: 50, featured: true },
    { id: 6, title: 'Comunicação Empresarial', description: 'Melhore suas habilidades de comunicação no ambiente corporativo.', category: 'Soft Skills', price: 'AOA 10.000', duration: 20, featured: false }
  ];

  get filteredCourses() {
    if (this.activeCategory === 'Todos') return this.courses;
    return this.courses.filter(c => c.category === this.activeCategory);
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }
}
