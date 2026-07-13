import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseApiService, CourseDTO } from '../../services/course-api.service';
import { StorageService } from '../../services/storage.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, SafeUrlPipe],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-label">Curso</span>
        <h1>{{ course?.titulo }}</h1>
        <p>{{ course?.descricao }}</p>
      </div>
    </div>

    <section class="section" style="padding-bottom: 4rem;">
      <div class="container">
        @if (loading) {
          <p style="text-align:center;color:var(--gray-500);">A carregar...</p>
        } @else if (course) {
          <div class="grid-courses" style="grid-template-columns: 1fr; gap: 1.5rem;">
            <div class="card" style="padding: 1.5rem;">
              <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;">
                <span class="badge badge-primary">{{ course.categoria }}</span>
                <span class="badge" style="background:var(--gray-50);color:var(--gray-700);border:1px solid var(--gray-200);">{{ course.nivel }}</span>
                <span class="badge" style="background:var(--gray-50);color:var(--gray-700);border:1px solid var(--gray-200);">{{ course.cargaHoraria }}h</span>
                @if (course.gratuito) {
                  <span class="badge" style="background:#dcfce7;color:#166534;">Gratuito</span>
                } @else {
                  <span class="badge" style="background:#fef9c3;color:#854d0e;">Pago</span>
                }
              </div>

              <div style="margin-top:1.5rem;">
                @if (course.imagemUrl) {
                  <img [src]="course.imagemUrl" alt="Capa" style="width:100%;max-height:300px;object-fit:cover;border-radius:0.75rem;margin-bottom:1rem;">
                }
                @if (course.videoUrl) {
                  <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:0.75rem;margin-bottom:1rem;">
                    <iframe [src]="course.videoUrl | safeUrl" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>
                  </div>
                }
              </div>

              <h2 style="margin-top:1rem;">Módulos e Aulas</h2>
              @for (mod of course.modulos; track mod.id) {
                <div style="margin-top:1rem;padding:1rem;border:1px solid var(--gray-200);border-radius:0.75rem;">
                  <h3 style="font-size:1rem;font-weight:700;margin-bottom:0.5rem;">{{ mod.titulo }}</h3>
                  <p style="font-size:0.875rem;color:var(--gray-500);margin-bottom:0.75rem;">{{ mod.descricao }}</p>
                  <div style="display:flex;flex-direction:column;gap:0.5rem;">
                    @for (aula of mod.aulas; track aula.id) {
                      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem;border:1px solid var(--gray-100);border-radius:0.5rem;">
                        <div>
                          <p style="font-weight:600;font-size:0.875rem;">{{ aula.titulo }}</p>
                          <p style="font-size:0.75rem;color:var(--gray-500);">{{ aula.tipo }} • {{ aula.duracaoMin }} min</p>
                        </div>
                        @if (aula.quizzes && aula.quizzes.length > 0) {
                          <a [routerLink]="['/quiz', course.id, aula.id]" class="btn btn-primary btn-sm">Fazer Quiz</a>
                        }
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        } @else {
          <p style="text-align:center;color:var(--gray-500);">Curso não encontrado.</p>
        }
      </div>
    </section>
  `,
  styles: [``]
})
export class CourseDetailComponent implements OnInit {
  course: CourseDTO | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private api: CourseApiService, private storage: StorageService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.api.getCourseById(id).subscribe({
      next: (data) => {
        this.course = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
