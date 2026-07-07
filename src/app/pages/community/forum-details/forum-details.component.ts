import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

declare const window: any;

@Component({
  selector: 'app-forum-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding:2rem;max-width:1000px;margin:0 auto;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1.75rem;">
        <div>
          <h1 style="font-size:1.75rem;font-weight:800;color:var(--gray-900);margin-bottom:0.25rem;">
            {{ forum?.name || 'Fórum' }}
          </h1>
          <p style="color:var(--gray-500);font-size:0.95rem;">
            {{ forum?.description || 'Discussões e tópicos sobre a comunidade.' }}
          </p>
        </div>
        <button class="btn btn-ghost" (click)="goBack()" style="height:42px;">&larr; Voltar</button>
      </div>

      <div style="display:grid;grid-template-columns:320px 1fr;gap:1.5rem;">
        <aside style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:1.25rem;">
          <div style="width:64px;height:64px;border-radius:14px;background:{{ forum?.color || '#7c3aed' }};display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path [attr.d]="forum?.icon || ''" fill-rule="evenodd" clip-rule="evenodd"/>
            </svg>
          </div>

          <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
            <span class="badge badge-primary">{{ forum?.topics || 0 }} Tópicos</span>
            <span class="badge" style="background:var(--gray-50);color:var(--gray-700);border:1px solid var(--gray-200)">{{ forum?.posts || 0 }} Posts</span>
          </div>

          <div style="margin-top:1.25rem;">
            <h3 style="font-size:1rem;font-weight:800;color:var(--gray-900);margin-bottom:0.75rem;">Destaques</h3>
            <div style="display:flex;flex-direction:column;gap:0.75rem;">
              @for (t of highlights; track t.title) {
                <div style="padding:0.85rem;border-radius:12px;border:1px solid var(--gray-200);">
                  <div style="font-weight:700;color:var(--gray-900);font-size:0.9rem;line-height:1.25;">{{ t.title }}</div>
                  <div style="margin-top:0.25rem;color:var(--gray-500);font-size:0.8rem;">{{ t.meta }}</div>
                </div>
              }
            </div>
          </div>
        </aside>

        <section style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:1.25rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1rem;">
            <h2 style="font-size:1.1rem;font-weight:900;color:var(--gray-900);margin:0;">Tópicos</h2>
          </div>

          <div style="display:flex;flex-direction:column;gap:0.75rem;">
            @for (topic of topics; track topic.id) {
              <div style="border:1px solid var(--gray-200);border-radius:14px;padding:1rem;display:flex;gap:1rem;align-items:flex-start;">
                <div style="width:34px;height:34px;border-radius:10px;background:rgba(124,58,237,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14"/>
                    <path d="M5 12h14"/>
                  </svg>
                </div>
                <div style="flex:1;">
                  <div style="font-weight:800;color:var(--gray-900);">{{ topic.title }}</div>
                  <div style="margin-top:0.25rem;color:var(--gray-500);font-size:0.85rem;">{{ topic.meta }}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-weight:800;color:var(--gray-900);font-size:0.95rem;">{{ topic.comments }}</div>
                  <div style="color:var(--gray-500);font-size:0.8rem;">Comentários</div>
                </div>
              </div>
            }
          </div>

          <div style="margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--gray-100);">
            <button class="btn btn-primary" style="width:100%;justify-content:center;height:44px;" (click)="onCreateTopic()">
              Criar novo tópico
            </button>
          </div>
        </section>
      </div>
    </div>
  `
})
export class ForumDetailsComponent implements OnInit {
  forum: any = null;
  topics: any[] = [];
  highlights: any[] = [];

  // Demonstração: mesmo conjunto base usado no CommunityComponent
  private forums = [
    { 
      id: 'geral', 
      name: 'Geral', 
      description: 'Discussões gerais sobre educação e tecnologia', 
      color: '#7c3aed',
      icon: 'M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5zM12 4a4 4 0 100 8 4 4 0 000-8zM5 20h5v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5z',
      topicsCount: 124, postsCount: 542
    },
    { 
      id: 'duvidas', 
      name: 'Dúvidas', 
      description: 'Tire dúvidas sobre os cursos e conteúdos', 
      color: '#3b82f6',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      topicsCount: 89, postsCount: 312
    },
    { 
      id: 'projetos', 
      name: 'Projetos', 
      description: 'Compartilhe e discuta seus projetos', 
      color: '#10b981',
      icon: 'M9 17.25v-1.5a3 3 0 00-3-3H5a3 3 0 00-3 3v1.5m18 0v-1.5a3 3 0 00-3-3h-1.5a3 3 0 00-3 3v1.5m0 0v-1.5a3 3 0 013-3h1.5a3 3 0 013 3v1.5',
      topicsCount: 56, postsCount: 289
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const forumId = this.route.snapshot.paramMap.get('forumId');
    this.forum = this.forums.find(f => f.id === forumId) || this.forums[0];

    this.topics = this.getDemoTopics(this.forum.id);
    this.highlights = this.getDemoHighlights(this.forum.id);

    // Normaliza nomes para template
    this.forum = {
      ...this.forum,
      topics: this.forum.topicsCount,
      posts: this.forum.postsCount
    };
  }

  goBack() {
    this.location.back();
  }

  onCreateTopic() {
    if (typeof window !== 'undefined' && window?.alert) {
      window.alert('Criar tópico ainda está em desenvolvimento nesta versão demo.');
      return;
    }
    // Fallback silencioso
  }

  private getDemoTopics(forumId: string): any[] {
    const base = [
      { id: 't1', title: 'Como estudar melhor no seu ritmo?', meta: 'Última resposta há 2 dias', comments: 18 },
      { id: 't2', title: 'Recomendação de cursos para iniciantes', meta: 'Última resposta há 5 dias', comments: 9 },
      { id: 't3', title: 'Boas práticas para projetos reais', meta: 'Última resposta há 1 semana', comments: 24 }
    ];

    if (forumId === 'duvidas') {
      return [
        { id: 'd1', title: 'Qual a melhor forma de acompanhar progresso?', meta: 'Última resposta hoje', comments: 12 },
        { id: 'd2', title: 'Dúvida sobre inscrições e certificados', meta: 'Última resposta há 3 dias', comments: 7 },
        { id: 'd3', title: 'Como acessar o player das aulas?', meta: 'Última resposta há 6 dias', comments: 15 }
      ];
    }

    if (forumId === 'projetos') {
      return [
        { id: 'p1', title: 'Mostre o seu projeto: feedback e melhoria', meta: 'Última resposta há 2 dias', comments: 21 },
        { id: 'p2', title: 'Checklist para apresentação final', meta: 'Última resposta há 1 semana', comments: 10 },
        { id: 'p3', title: 'Como estruturar um MVP?', meta: 'Última resposta há 4 dias', comments: 17 }
      ];
    }

    return base;
  }

  private getDemoHighlights(forumId: string): any[] {
    if (forumId === 'duvidas') {
      return [
        { title: 'Guia rápido: área do aluno', meta: 'Tutorial em 6 passos' },
        { title: 'Certificados: o que acontece após concluir', meta: 'Explicação + exemplos' }
      ];
    }

    if (forumId === 'projetos') {
      return [
        { title: 'Projetos que impressionam', meta: 'Ideias para começar' },
        { title: 'Feedback construtivo', meta: 'Como pedir e dar sugestões' }
      ];
    }

    return [
      { title: 'Bem-vindo à Comunidade', meta: 'Comece aqui' },
      { title: 'Conte experiências de aprendizagem', meta: 'Troca de conhecimento' }
    ];
  }
}

