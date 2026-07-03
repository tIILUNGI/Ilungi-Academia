import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-label">Legal</span>
        <h1>Política de Privacidade</h1>
        <p>Última atualização: 03 de Julho de 2026</p>
      </div>
    </div>

    <section class="section section-alt" style="padding:3rem 0 5rem;">
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto; background: var(--white); padding: 2.5rem 2rem; border-radius: var(--radius-lg); border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm); line-height: 1.7; color: var(--gray-700);">
          <a routerLink="/registro" class="btn btn-secondary" style="display:inline-flex; margin-bottom:1.5rem; border-radius:var(--radius-sm); border:1px solid var(--gray-200); height:40px; padding:0 1.25rem; font-size:0.875rem; font-weight:500; align-items:center; gap:0.5rem; text-decoration:none; color:var(--gray-700);">
            &larr; Voltar
          </a>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">1. Informação que Coletamos</h2>
          <p style="margin-bottom: 1.5rem;">Ao criar uma conta na Ilungi-Academia, coletamos nome, email, telefone e dados de pagamento. Também registamos interações na plataforma para melhorar a experiência de formação.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">2. Uso dos Dados</h2>
          <p style="margin-bottom: 1.5rem;">Os seus dados são utilizados para: gerir a conta, processar inscrições, emitir certificados, enviar comunicações relevantes e melhorar os nossos serviços. Não partilhamos dados com terceiros sem o seu consentimento, exceto quando exigido por lei.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">3. Cookies e Tecnologias Semelhantes</h2>
          <p style="margin-bottom: 1.5rem;">Utilizamos cookies para lembrar preferências, analisar tráfego e personalizar conteúdo. Pode gerir as preferências de cookies no seu navegador. O uso contínuo da plataforma implica aceitação.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">4. Partilha de Dados</h2>
          <p style="margin-bottom: 1.5rem;">Os dados podem ser partilhados com parceiros de pagamento e operadores de email exclusivamente para fornecer o serviço. Empregadores podem verificar a autenticidade de um certificado, mas não têm acesso a dados pessoais adicionais.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">5. Segurança</h2>
          <p style="margin-bottom: 1.5rem;">Adotamos medidas técnicas e organizacionais para proteger os seus dados. No entanto, nenhum sistema é 100% seguro e não podemos garantir segurança absoluta.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">6. Direitos do Utilizador</h2>
          <p style="margin-bottom: 1.5rem;">Você tem direito a aceder, corrigir ou eliminar os seus dados pessoais. Também pode solicitar a portabilidade dos dados ou retirar o consentimento para comunicações promocionais.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">7. Retenção de Dados</h2>
          <p style="margin-bottom: 1.5rem;">Os dados são mantidos enquanto a conta estiver ativa e por um período adicional de 5 anos após a exclusão, conforme exigido pela legislação angolana.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">8. Alterações a esta Política</h2>
          <p style="margin-bottom: 1.5rem;">Podemos atualizar esta Política periodicamente. A data de atualização será sempre indicada no topo. O uso contínuo após alterações implica aceitação.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">9. Contacto</h2>
          <p style="margin-bottom: 0;">Para questões sobre privacidade, contacte-nos em <a href="mailto:solucoes&#64;ilungi.ao" style="color: var(--primary); font-weight: 600;">solucoes&#64;ilungi.ao</a>.</p>
        </div>
      </div>
    </section>
  `
})
export class PrivacyComponent {}
