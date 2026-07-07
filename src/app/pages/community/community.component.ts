import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div style="padding:2rem;max-width:900px;">

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;">
        <h1 style="font-size:1.75rem;font-weight:700;color:var(--gray-900);">Comunidade</h1>
      </div>

      <!-- Create Post -->
      <div style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:1.5rem;margin-bottom:2rem;">
        <div style="display:flex;gap:1rem;align-items:flex-start;">
          <img [src]="currentUserAvatar" style="width:40px;height:40px;border-radius:50%;object-fit:cover;flex-shrink:0;">
          <div style="flex:1;">
            <textarea [(ngModel)]="newPostContent" placeholder="Partilhe algo com a comunidade..." rows="3" style="width:100%;padding:0.75rem 1rem;border:1px solid var(--gray-200);border-radius:10px;font-size:0.95rem;outline:none;resize:vertical;font-family:inherit;"></textarea>
            <div style="display:flex;justify-content:flex-end;margin-top:0.75rem;">
              <button class="btn btn-primary btn-sm" (click)="createPost()" [disabled]="!newPostContent.trim()">Publicar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Feed -->
      <div style="display:flex;flex-direction:column;gap:1.5rem;">
        @for (post of posts; track post.id) {
          <div style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:1.5rem;">
            <div style="display:flex;gap:1rem;align-items:flex-start;margin-bottom:1rem;">
              <img [src]="post.avatar" style="width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;">
              <div style="flex:1;">
                <div style="font-weight:700;color:var(--gray-900);font-size:0.95rem;">{{ post.author }}</div>
                <div style="color:var(--gray-400);font-size:0.8rem;">{{ formatDate(post.createdAt) }}</div>
              </div>
            </div>

            <p style="color:var(--gray-800);font-size:0.95rem;line-height:1.6;margin-bottom:1.25rem;">{{ post.content }}</p>

            <div style="display:flex;gap:1.5rem;padding-top:1rem;border-top:1px solid var(--gray-100);">
              <button class="btn btn-ghost btn-sm" (click)="toggleLike(post.id)" style="gap:0.4rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" [attr.fill]="isLiked(post.id) ? 'currentColor' : 'none'">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
                <span>{{ post.likes }}</span>
              </button>
              <button class="btn btn-ghost btn-sm" (click)="toggleComments(post.id)" style="gap:0.4rem;">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                </svg>
                <span>{{ post.comments?.length || 0 }}</span>
              </button>
              <button class="btn btn-ghost btn-sm" (click)="sharePost(post.id)" style="gap:0.4rem;">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
                  <path d="M16 6l-4-4-4 4"/>
                  <path d="M12 2v13"/>
                </svg>
                <span>{{ post.shares }}</span>
              </button>
            </div>

            @if (showComments[post.id]) {
              <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--gray-100);">
                @for (comment of post.comments; track comment.author + comment.createdAt) {
                  <div style="display:flex;gap:0.75rem;margin-bottom:0.75rem;">
                    <div style="width:32px;height:32px;border-radius:50%;background:var(--gray-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.75rem;font-weight:700;color:var(--gray-600);">
                      {{ comment.author.charAt(0) }}
                    </div>
                    <div style="flex:1;background:var(--gray-50);border-radius:10px;padding:0.75rem 1rem;">
                      <div style="font-weight:600;color:var(--gray-900);font-size:0.85rem;">{{ comment.author }}</div>
                      <div style="color:var(--gray-700);font-size:0.875rem;margin-top:0.25rem;">{{ comment.text }}</div>
                    </div>
                  </div>
                }

                <div style="display:flex;gap:0.75rem;margin-top:0.75rem;">
                  <input [(ngModel)]="commentText[post.id]" placeholder="Escreva um comentário..." style="flex:1;padding:0.5rem 1rem;border:1px solid var(--gray-200);border-radius:8px;font-size:0.875rem;outline:none;">
                  <button class="btn btn-primary btn-sm" (click)="addComment(post.id)" [disabled]="!commentText[post.id].trim()">Enviar</button>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class CommunityComponent implements OnInit {
  posts: any[] = [];
  newPostContent = '';
  showComments: Record<string, boolean> = {};
  commentText: Record<string, string> = {};
  currentUserAvatar = '';

  constructor(private storage: StorageService) {}

  ngOnInit() {
    const user = this.storage.getCurrentUser();
    if (user) {
      this.currentUserAvatar = user.picture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || user.email || 'U') + '&background=7c3aed&color=fff';
    }
    this.posts = this.storage.getCommunityPosts();
  }

  createPost() {
    if (!this.newPostContent.trim()) return;
    const user = this.storage.getCurrentUser();
    this.storage.addCommunityPost({
      id: 'p' + Date.now(),
      author: user?.name || user?.firstName || 'Aluno',
      avatar: this.currentUserAvatar,
      content: this.newPostContent.trim(),
      likes: 0,
      likedBy: [],
      comments: [],
      shares: 0,
      createdAt: new Date().toISOString()
    });
    this.newPostContent = '';
    this.posts = this.storage.getCommunityPosts();
  }

  toggleLike(postId: string) {
    const user = this.storage.getCurrentUser();
    if (!user?.email) {
      alert('Faça login para curtir publicações.');
      return;
    }
    this.storage.toggleLikePost(postId, user.email);
    this.posts = this.storage.getCommunityPosts();
  }

  isLiked(postId: string): boolean {
    const user = this.storage.getCurrentUser();
    if (!user?.email) return false;
    const post = this.posts.find(p => p.id === postId);
    return post?.likedBy?.includes(user.email) || false;
  }

  toggleComments(postId: string) {
    this.showComments[postId] = !this.showComments[postId];
  }

  addComment(postId: string) {
    const text = this.commentText[postId]?.trim();
    if (!text) return;
    const user = this.storage.getCurrentUser();
    this.storage.addCommentToPost(postId, {
      author: user?.name || user?.firstName || 'Aluno',
      text,
      createdAt: new Date().toISOString()
    });
    this.commentText[postId] = '';
    this.posts = this.storage.getCommunityPosts();
  }

  sharePost(postId: string) {
    this.storage.sharePost(postId);
    this.posts = this.storage.getCommunityPosts();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `Há ${minutes} minuto(s)`;
    if (hours < 24) return `Há ${hours} hora(s)`;
    if (days < 7) return `Há ${days} dia(s)`;
    return date.toLocaleDateString('pt-AO');
  }
}