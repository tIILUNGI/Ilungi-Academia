import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding:2rem;">
      <h1 style="font-size:1.75rem;font-weight:700;color:var(--gray-900);margin-bottom:2.5rem;">Comunidade</h1>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;">
        @for (forum of forums; track forum.name) {
          <a routerLink="/area-do-aluno/comunidade/{{ forum.id }}" style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:2rem;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s;">
            <div style="width:64px;height:64px;background:{{ forum.color }};border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;">
              <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                <path fill-rule="evenodd" [attr.d]="forum.icon" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 style="font-size:1.2rem;font-weight:700;color:var(--gray-900);margin-bottom:0.5rem;">{{ forum.name }}</h3>
            <p style="color:var(--gray-500);font-size:0.9rem;margin-bottom:1.25rem;">{{ forum.description }}</p>
            <div style="display:flex;gap:1.5rem;font-size:0.85rem;color:var(--gray-500);">
              <span>{{ forum.topics }} tópicos</span>
              <span>{{ forum.posts }} posts</span>
            </div>
          </a>
        }
      </div>
    </div>
  `
})
export class CommunityComponent {
  forums = [
    { 
      id: 'geral', 
      name: 'Geral', 
      description: 'Discussões gerais sobre educação e tecnologia', 
      color: '#7c3aed',
      icon: 'M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5zM12 4a4 4 0 100 8 4 4 0 000-8zM5 20h5v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5z',
      topics: 124, posts: 542 
    },
    { 
      id: 'duvidas', 
      name: 'Dúvidas', 
      description: 'Tire dúvidas sobre os cursos e conteúdos', 
      color: '#3b82f6',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      topics: 89, posts: 312 
    },
    { 
      id: 'projetos', 
      name: 'Projetos', 
      description: 'Compartilhe e discuta seus projetos', 
      color: '#10b981',
      icon: 'M9 17.25v-1.5a3 3 0 00-3-3H5a3 3 0 00-3 3v1.5m18 0v-1.5a3 3 0 00-3-3h-1.5a3 3 0 00-3 3v1.5m0 0v-1.5a3 3 0 013-3h1.5a3 3 0 013 3v1.5',
      topics: 56, posts: 289 
    }
  ];
}