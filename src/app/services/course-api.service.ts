import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CourseItem } from '../data/courses.data';

export interface CourseDTO {
  id: string | number;
  titulo: string;
  descricao: string;
  imagemUrl: string;
  categoria: string;
  nivel: string;
  cargaHoraria: number;
  duracaoEstimada: number;
  gratuito: boolean;
  preco: number;
  instrutorId?: string;
  instrutor?: string;
  videoUrl?: string;
  documentoUrl?: string;
  modulos?: ModuleDTO[];
}

export interface ModuleDTO {
  id: string;
  titulo: string;
  descricao?: string;
  ordem: number;
  cursoId: string;
  aulas?: LessonDTO[];
}

export interface LessonDTO {
  id: string;
  titulo: string;
  tipo: string;
  ordem: number;
  moduloId: string;
  duracaoMin?: number;
  publicado: boolean;
  quizzes?: QuizDTO[];
}

export interface QuizDTO {
  id: string;
  licaoId: string;
  titulo: string;
  descricao?: string;
  pontuacaoMaxima?: number;
  tempoLimiteMin?: number;
  notaCorte?: number;
  tentativasMax?: number;
  embaralhar?: boolean;
  tipo?: string;
  questoes?: QuestionDTO[];
}

export interface QuestionDTO {
  id: string;
  quizId: string;
  texto?: string;
  enunciado?: string;
  tipo?: string;
  opcoes?: string[];
  respostaCorreta?: any;
  pontos?: number;
  ordem?: number;
}

export interface CertificateDTO {
  id: string;
  recipientName: string;
  recipientEmail: string;
  courseName: string;
  courseId: string;
  instructorName: string;
  workloadHours: number;
  verificationCode: string;
  issueDate: string;
  validUntil: string;
  status: string;
  createdAt: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  description: string;
  level: string;
  price: string;
  bg: string;
  color: string;
  features: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {
  private readonly baseUrl = 'http://localhost:4001/api';
  // Caminho público onde o backend serve os ficheiros carregados (/uploads/**)
  private readonly uploadsBase = this.baseUrl.replace(/\/api\/?$/, '') + '/uploads';

  constructor(private http: HttpClient) {}

  // Converte a imagem devolvida pela API (URL absoluta do Unsplash ou caminho
  // relativo "imagens/xxx.jpg" gravado pelo upload) numa URL utilizável no browser.
  private resolveImage(url?: string): string {
    if (!url) return '';
    if (/^https?:\/\//i.test(url) || url.startsWith('//') || url.startsWith('data:')) {
      return url;
    }
    return `${this.uploadsBase}/${url.replace(/^\//, '')}`;
  }

  getCourses(): Observable<CourseItem[]> {
    return this.http.get<CourseDTO[]>('/api/courses').pipe(
      map(dtos => dtos.map(dto => this.toCourseItem(dto))),
      catchError(() => of([]))
    );
  }

  getCourseById(id: string | number): Observable<CourseDTO> {
    return this.http.get<CourseDTO>(`/api/courses/${id}`).pipe(
      catchError(() => throwError(() => new Error('Curso não encontrado')))
    );
  }

  enroll(cursoId: string | number): Observable<any> {
    return this.http.post('/api/enrollments', { cursoId });
  }

  getCertifications(): Observable<CertificationItem[]> {
    return this.http.get<CourseDTO[]>('/api/courses').pipe(
      map(dtos => dtos.map(dto => this.toCertificationItem(dto))),
      catchError(() => of([]))
    );
  }

  verifyCertificate(code: string): Observable<CertificateDTO | null> {
    return this.http.get<CertificateDTO>(`/api/certificates/verify/${encodeURIComponent(code.toUpperCase())}`).pipe(
      catchError(() => of(null))
    );
  }

  private toCourseItem(dto: CourseDTO): CourseItem {
    return {
      id: typeof dto.id === 'string' ? Number(dto.id) : dto.id,
      title: dto.titulo,
      description: dto.descricao,
      category: dto.categoria,
      price: dto.preco != null ? Number(dto.preco) : 0,
      duration: dto.duracaoEstimada != null ? dto.duracaoEstimada : 0,
      workload: dto.cargaHoraria != null ? dto.cargaHoraria : 0,
      level: dto.nivel || 'Todos',
      modality: 'Online',
      certificate: !dto.gratuito,
      startDate: 'Consulte o catálogo',
      featured: true,
      enrolled: false,
      image: this.resolveImage(dto.imagemUrl),
      certName: 'Certificado',
      certBg: '#f3f4f6',
      certColor: '#374151',
      certFeatures: []
    };
  }

  private toCertificationItem(dto: CourseDTO): CertificationItem {
    const price = dto.preco != null ? 'AOA ' + Number(dto.preco).toLocaleString('pt-AO') : 'Consulte';
    return {
      id: typeof dto.id === 'string' ? dto.id : String(dto.id),
      name: dto.titulo,
      description: dto.descricao,
      level: dto.nivel || 'Todos',
      price,
      bg: '#f3f4f6',
      color: '#374151',
      features: [
        'Curso certificado',
        'Material incluso',
        'Suporte pedagógico',
        'Avaliação final'
      ]
    };
  }
}
