import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseApiService } from '../../services/course-api.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-label">Certificado</span>
        <h1>Certificado de Conclusão</h1>
        <p>Parabéns pela conclusão do curso!</p>
      </div>
    </div>

    <section class="section" style="padding-bottom: 4rem;">
      <div class="container">
        @if (loading) {
          <p style="text-align:center;color:var(--gray-500);">A carregar...</p>
        } @else if (certificate) {
          <div class="card" style="padding: 2rem; max-width: 800px; margin: 0 auto; border: 2px solid #d4af37; border-radius: 1rem;">
            <div style="text-align:center;margin-bottom:1.5rem;">
              <img src="assets/AI.png" alt="Logo" style="width:64px;height:64px;object-fit:contain;">
              <h2 style="margin-top:1rem;">Certificado de Conclusão</h2>
            </div>

            <div style="text-align:center;margin-bottom:1.5rem;">
              <p style="font-size:1.125rem;">Este certificado é concedido a</p>
              <h3 style="font-size:1.5rem;font-weight:700;color:var(--gray-900);">{{ certificate.recipientName }}</h3>
              <p style="font-size:0.875rem;color:var(--gray-500);">{{ certificate.recipientEmail }}</p>
            </div>

            <div style="text-align:center;margin-bottom:1.5rem;">
              <p>Pela conclusão do curso</p>
              <h3 style="font-weight:700;">{{ certificate.courseName }}</h3>
              <p style="font-size:0.875rem;color:var(--gray-500);">Carga horária: {{ certificate.workloadHours }}h</p>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:1px solid var(--gray-200);font-size:0.875rem;color:var(--gray-500);">
              <div>
                <p><strong>Instrutor:</strong> {{ certificate.instructorName }}</p>
                <p><strong>Data de emissão:</strong> {{ certificate.issueDate | date:'dd/MM/yyyy' }}</p>
              </div>
              <div style="text-align:right;">
                <p><strong>Código:</strong> {{ certificate.verificationCode }}</p>
                <p><strong>Válido até:</strong> {{ certificate.validUntil | date:'dd/MM/yyyy' }}</p>
              </div>
            </div>

            <div style="text-align:center;margin-top:1.5rem;">
              <a [routerLink]="['/certificados/verificar']" class="btn btn-primary">Verificar Certificado</a>
            </div>
          </div>
        } @else {
          <div style="text-align:center;">
            <p style="color:var(--gray-500);margin-bottom:1rem;">Você ainda não concluiu nenhum curso.</p>
            <a routerLink="/cursos" class="btn btn-primary">Ver Cursos</a>
          </div>
        }
      </div>
    </section>
  `,
  styles: [``]
})
export class CertificateComponent implements OnInit {
  certificate: any = null;
  loading = true;

  constructor(private route: ActivatedRoute, private api: CourseApiService, private storage: StorageService) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    if (!courseId) return;
    const result = this.storage.getQuizResult(courseId!);
    if (result && result.passed) {
      this.api.getCourseById(courseId).subscribe({
        next: (course: any) => {
          this.certificate = {
            recipientName: this.storage.getCurrentUser()?.name || 'Aluno',
            recipientEmail: this.storage.getCurrentUser()?.email || '',
            courseName: course.titulo,
            courseId: course.id,
            instructorName: course.instrutor || 'Instrutor',
            workloadHours: course.cargaHoraria,
            verificationCode: 'CERT-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
            issueDate: new Date().toISOString(),
            validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'valido',
            createdAt: new Date().toISOString()
          };
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}
