import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseApiService, CourseDTO } from '../../services/course-api.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-label">Quiz</span>
        <h1>{{ quiz?.titulo }}</h1>
        <p>{{ quiz?.descricao }}</p>
      </div>
    </div>

    <section class="section" style="padding-bottom: 4rem;">
      <div class="container">
        @if (loading) {
          <p style="text-align:center;color:var(--gray-500);">A carregar...</p>
        } @else if (quiz && questions.length) {
          <div class="card" style="padding: 1.5rem; max-width: 800px; margin: 0 auto;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
              <span class="badge" style="background:var(--gray-50);color:var(--gray-700);border:1px solid var(--gray-200);">Tempo limite: {{ quiz.tempoLimiteMin }} min</span>
              <span class="badge" style="background:var(--gray-50);color:var(--gray-700);border:1px solid var(--gray-200);">Nota de corte: {{ quiz.notaCorte }}%</span>
            </div>

            <form (ngSubmit)="submit()">
              @for (q of questions; track q.id; let i = $index) {
                <div style="margin-bottom:1.5rem;padding:1rem;border:1px solid var(--gray-200);border-radius:0.75rem;">
                  <p style="font-weight:600;margin-bottom:0.75rem;">{{ i + 1 }}. {{ q.texto || q.enunciado }}</p>
                  @if (q.tipo === 'multipla') {
                    <div style="display:flex;flex-direction:column;gap:0.5rem;">
                      @for (opt of getOptions(q); track opt; let j = $index) {
                        <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;">
                          <input type="radio" [name]="'q-' + q.id" [value]="j" [(ngModel)]="answers[q.id]" required>
                          <span style="font-size:0.875rem;">{{ opt }}</span>
                        </label>
                      }
                    </div>
                  } @else {
                    <input type="text" [(ngModel)]="answers[q.id]" name="'q-' + q.id" required style="width:100%;padding:0.5rem;border:1px solid var(--gray-200);border-radius:0.5rem;">
                  }
                </div>
              }
              <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">Enviar Respostas</button>
            </form>
          </div>
        } @else {
          <p style="text-align:center;color:var(--gray-500);">Quiz não encontrado ou sem perguntas.</p>
        }
      </div>
    </section>
  `,
  styles: [``]
})
export class QuizComponent implements OnInit {
  quiz: any = null;
  questions: any[] = [];
  loading = true;
  answers: Record<string, number | string> = {};
  courseId: string | null = null;

  constructor(private route: ActivatedRoute, private api: CourseApiService, private storage: StorageService) {}

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('lessonId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    if (!lessonId || !this.courseId) return;
    this.api.getCourseById(this.courseId).subscribe({
      next: (course: any) => {
        const lesson = course.modulos?.flatMap((m: any) => m.aulas || []).find((a: any) => a.id === lessonId);
        const quiz = lesson?.quizzes?.[0];
        if (quiz) {
          this.quiz = quiz;
          this.questions = quiz.questoes || [];
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getOptions(q: any): string[] {
    if (q.opcoes && Array.isArray(q.opcoes)) return q.opcoes;
    if (typeof q.opcoes === 'string' && q.opcoes) return q.opcoes.split('||');
    return [];
  }

  submit() {
    if (!this.quiz) return;
    let correct = 0;
    this.questions.forEach((q, idx) => {
      const userAnswer = this.answers[q.id];
      if (userAnswer !== undefined && userAnswer !== null && String(userAnswer) === String(q.respostaCorreta)) {
        correct++;
      }
    });
    const score = Math.round((correct / this.questions.length) * 100);
    const passed = score >= (this.quiz.notaCorte || 70);
    if (passed) {
      this.storage.setQuizResult(this.courseId!, { lessonId: this.quiz.licaoId, score, passed });
      alert(`Parabéns! Você passou com ${score}%.`);
    } else {
      alert(`Você não atingiu a nota de corte. Score: ${score}%`);
    }
  }
}
