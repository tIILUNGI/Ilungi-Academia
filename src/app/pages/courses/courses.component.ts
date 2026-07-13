import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { CourseApiService } from '../../services/course-api.service';
import { COURSES, CourseItem } from '../../data/courses.data';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-label">Aprendizagem</span>
        <h1>Catálogo de Cursos</h1>
        <p>Explore nossa variedade de cursos online e encontre o perfeito para sua carreira.</p>
      </div>
    </div>

    <section class="section" style="padding-bottom: 4rem;">
      <div class="container">
        <div style="display:flex;flex-direction:column;gap:1rem;margin-bottom:2rem;">
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

          <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;">
            <div style="flex:1;min-width:220px;position:relative;">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (input)="onSearch()"
                placeholder="Pesquisar cursos..."
                style="width:100%;padding:0.6rem 1rem 0.6rem 2.5rem;border:1px solid var(--gray-200);border-radius:8px;font-size:0.875rem;outline:none;">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--gray-400)" style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>

            <select [(ngModel)]="selectedLevel" (ngModelChange)="onFilter()" style="padding:0.6rem 1rem;border:1px solid var(--gray-200);border-radius:8px;font-size:0.875rem;outline:none;background:white;">
              <option value="">Todos os níveis</option>
              <option value="Beginner">Iniciante</option>
              <option value="Intermediate">Intermédio</option>
              <option value="Advanced">Avançado</option>
              <option value="All Levels">Todos os níveis</option>
            </select>

            <select [(ngModel)]="sortBy" (ngModelChange)="onFilter()" style="padding:0.6rem 1rem;border:1px solid var(--gray-200);border-radius:8px;font-size:0.875rem;outline:none;background:white;">
              <option value="featured">Destaque</option>
              <option value="price-asc">Preço: menor para maior</option>
              <option value="price-desc">Preço: maior para menor</option>
              <option value="duration">Duração</option>
            </select>
          </div>
        </div>

        <div style="font-size:0.85rem;color:var(--gray-500);margin-bottom:1.5rem;">
          {{ filteredAndSortedCourses.length }} curso(s) encontrado(s)
        </div>

        <div class="grid-courses">
          @for (course of paginatedCourses; track course.id) {
            <div class="card card-course">
               <div class="card-course-thumb">
                 @if (course.image) {
                   <img [src]="course.image" [alt]="course.title" referrerpolicy="no-referrer" style="width:100%; height:100%; object-fit:cover;">
                 } @else {
                   <svg width="52" height="52" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                   </svg>
                 }
               </div>
              <div class="card-course-body">
                <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
                  <span class="badge badge-primary">{{ course.category }}</span>
                  @if (course.featured) {
                    <span class="badge" style="background:rgba(245,158,11,0.12); color:#b45309;">Destaque</span>
                  }
                  <span class="badge" style="background:var(--gray-50);color:var(--gray-700);border:1px solid var(--gray-200);">{{ course.level }}</span>
                </div>
                <h3 class="card-course-title">{{ course.title }}</h3>
                <p class="card-course-desc">{{ course.description }}</p>
                <div class="card-course-footer">
                  <div>
                    <span class="course-price">{{ formatPrice(course.price) }}</span>
                    <p style="font-size:0.75rem; color:var(--gray-400); margin-top:2px;">{{ course.duration }}h de conteúdo</p>
                  </div>
                  <button (click)="openCourseModal(course)" class="btn btn-ghost btn-sm">Ver Detalhes</button>
                </div>
              </div>
            </div>
          }
        </div>

        @if (totalPages > 1) {
          <div style="display:flex;justify-content:center;align-items:center;gap:0.5rem;margin-top:2.5rem;">
            <button class="btn btn-ghost btn-sm" (click)="prevPage()" [disabled]="currentPage === 1">Anterior</button>
            @for (page of pages; track page) {
              <button
                class="btn btn-sm"
                [class.btn-primary]="currentPage === page"
                [class.btn-ghost]="currentPage !== page"
                (click)="goToPage(page)">
                {{ page }}
              </button>
            }
            <button class="btn btn-ghost btn-sm" (click)="nextPage()" [disabled]="currentPage === totalPages">Próxima</button>
          </div>
        }
      </div>
    </section>

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
            <span class="badge" style="background:var(--gray-50);color:var(--gray-700);border:1px solid var(--gray-200);margin-left:0.5rem;">{{ selectedCourse.level }}</span>
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
              <span class="course-price">{{ formatPrice(selectedCourse.price) }}</span>
              @if (selectedCourse.enrolled) {
                <p style="font-size:0.9rem;color:#059669;margin-top:0.5rem;">✓ Você já está inscrito neste curso</p>
              } @else {
                <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:1rem;height:44px;" (click)="enroll(selectedCourse)">Inscrever-se Agora</button>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
    .modal-content { background: white; border-radius: 1rem; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; }
    .modal-header { padding: 1.5rem; border-bottom: 1px solid var(--gray-200); display: flex; justify-content: space-between; align-items: center; }
    .modal-header h2 { font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin: 0; }
    .modal-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-500); padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; }
    .modal-body { padding: 1.5rem; }
    .course-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0 1.5rem; }
    .detail-item { display: flex; flex-direction: column; gap: 0.25rem; }
    .detail-label { font-size: 0.75rem; font-weight: 600; color: var(--gray-500); text-transform: uppercase; }
    .detail-value { font-size: 0.875rem; color: var(--gray-900); }
    .modal-price { text-align: center; padding-top: 1rem; border-top: 1px solid var(--gray-200); }
  `]
})
export class CoursesComponent implements OnInit {
  activeCategory = 'Todos';
  selectedCourse: CourseItem | null = null;
  searchQuery = '';
  selectedLevel = '';
  sortBy = 'featured';
  currentPage = 1;
  pageSize = 6;
  loading = false;
  apiError = false;

  categories = ['Todos', 'Gestão', 'Tecnologia', 'Liderança', 'Marketing', 'Soft Skills'];

  courses: CourseItem[] = [];

  get filteredCourses() {
    if (this.activeCategory === 'Todos') return this.courses;
    return this.courses.filter(c => c.category === this.activeCategory);
  }

  get filteredAndSortedCourses() {
    let result = this.filteredCourses;

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    if (this.selectedLevel) {
      result = result.filter(c => {
        const lvl = (c.level || '').toLowerCase();
        const sel = this.selectedLevel.toLowerCase();
        if (sel === 'all levels') return lvl === 'all levels';
        return lvl.includes(sel);
      });
    }

    if (this.sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'duration') {
      result = [...result].sort((a, b) => b.duration - a.duration);
    } else if (this.sortBy === 'featured') {
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredAndSortedCourses.length / this.pageSize));
  }

  get paginatedCourses() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAndSortedCourses.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    return pages;
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
    this.currentPage = 1;
  }

  onSearch() { this.currentPage = 1; }
  onFilter() { this.currentPage = 1; }
  goToPage(page: number) { this.currentPage = page; }
  prevPage() { if (this.currentPage > 1) this.currentPage--; }
  nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }

  formatPrice(price: number): string {
    return 'AOA ' + (price || 0).toLocaleString('pt-AO');
  }

  openCourseModal(course: CourseItem) {
    this.selectedCourse = course;
    this.selectedCourse.enrolled = this.storage.getEnrollments().some((e: any) => e.courseTitle === course.title || e.course === course.title);
  }

  closeCourseModal() {
    this.selectedCourse = null;
  }

  enroll(course: CourseItem) {
    const currentUser = this.storage.getCurrentUser();
    if (!currentUser) {
      alert('Faça login para se inscrever.');
      return;
    }

    const already = this.storage.getEnrollments().find((e: any) => e.courseTitle === course.title || e.course === course.title);
    if (already) {
      alert('Você já está inscrito neste curso.');
      return;
    }

    this.courseApi.enroll(course.id).subscribe({
      next: () => {
        this.storage.addEnrollment({
          id: Date.now().toString(),
          courseTitle: course.title,
          course: course.title,
          progress: 0,
          status: 'in_progress',
          startDate: new Date().toISOString().split('T')[0],
          nextLesson: 'Aula 1: Introdução'
        });
        alert('Inscrição realizada com sucesso!');
        this.closeCourseModal();
      },
      error: () => {
        this.storage.addEnrollment({
          id: Date.now().toString(),
          courseTitle: course.title,
          course: course.title,
          progress: 0,
          status: 'in_progress',
          startDate: new Date().toISOString().split('T')[0],
          nextLesson: 'Aula 1: Introdução'
        });
        alert('Inscrição realizada localmente (API indisponível).');
        this.closeCourseModal();
      }
    });
  }

  constructor(private storage: StorageService, private courseApi: CourseApiService) {}

  ngOnInit(): void {
    this.loading = true;
    this.courseApi.getCourses().subscribe({
      next: (data: CourseItem[]) => {
        this.courses = data && data.length ? data : COURSES;
        this.loading = false;
      },
      error: () => {
        this.courses = COURSES;
        this.loading = false;
      }
    });
  }
}
