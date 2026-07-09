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
  instrutor: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {
  private readonly baseUrl = 'http://localhost:4001/api';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CourseItem[]> {
    return this.http.get<CourseDTO[]>('/api/courses').pipe(
      map(dtos => dtos.map(dto => this.toCourseItem(dto))),
      catchError(() => of([]))
    );
  }

  getCourseById(id: string | number): Observable<CourseItem> {
    return this.http.get<CourseDTO>(`/api/courses/${id}`).pipe(
      map(dto => this.toCourseItem(dto)),
      catchError(() => throwError(() => new Error('Curso não encontrado')))
    );
  }

  enroll(cursoId: string | number): Observable<any> {
    return this.http.post('/api/enrollments', { cursoId });
  }

  private toCourseItem(dto: CourseDTO): CourseItem {
    return {
      id: typeof dto.id === 'string' ? Number(dto.id) : dto.id,
      title: dto.titulo,
      description: dto.descricao,
      category: dto.categoria,
      price: dto.preco != null ? dto.preco : 0,
      duration: dto.duracaoEstimada != null ? dto.duracaoEstimada : 0,
      workload: dto.cargaHoraria != null ? dto.cargaHoraria : 0,
      level: dto.nivel || 'Todos',
      modality: 'Online',
      certificate: !dto.gratuito,
      startDate: 'Consulte o catálogo',
      featured: false,
      enrolled: false,
      image: dto.imagemUrl || '',
      certName: 'Certificado',
      certBg: '#f3f4f6',
      certColor: '#374151',
      certFeatures: []
    };
  }
}
