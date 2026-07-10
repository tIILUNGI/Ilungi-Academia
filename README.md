# Academia Ilungi — Landing Page

Landing page oficial da **Academia Ilungi**, desenvolvida com Angular. Responsável pela apresentação institucional, catálogo de cursos, certificações e páginas legais (termos, privacidade).

## Stack Tecnológico

| Camada | Tecnologia |
|--------|------------|
| Framework | Angular 17+ |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS v4 |
| Roteamento | Angular Router |
| Estado | Serviços RxJS/BehaviorSubject |
| Build | Angular CLI |

## Estrutura do Projeto

```
Ilungi-Academia/
├── src/
│   ├── app/
│   │   ├── components/      # Componentes reutilizáveis (header, footer)
│   │   ├── pages/           # Páginas da aplicação
│   │   │   ├── home/        # Página inicial
│   │   │   ├── courses/     # Listagem de cursos
│   │   │   ├── certifications/ # Certificações
│   │   │   ├── terms/       # Termos de serviço
│   │   │   ├── privacy/     # Política de privacidade
│   │   │   ├── verify-certificate/ # Verificação de certificado
│   │   │   └── redirect/    # Redirecionamentos
│   │   ├── services/        # Serviços (API)
│   │   ├── data/            # Dados estáticos (fallback)
│   │   └── app.routes.ts    # Rotas da aplicação
│   └── styles.css           # Estilos globais
├── angular.json
├── package.json
└── README.md
```

## Como Executar

### Pré-requisitos

- Node.js 18+
- Angular CLI 17+

### Comandos

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm start
# ou
ng serve

# A aplicação abre em http://localhost:4200
```

### Build de Produção

```bash
ng build --configuration production
```

Os arquivos são gerados em `dist/ailungi-frontend/browser/`.

## Configuração

### Variáveis de Ambiente

Configure a URL da API em `src/environments/environment.ts` ou no serviço de cursos:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4001/api'
};
```

### CORS

O backend está configurado para aceitar requisições de `http://localhost:4200`.

## Integração com Backend

### Serviço de Cursos

O serviço `CourseApiService` faz requisições para o backend:

```typescript
getCourses(): Observable<CourseItem[]> {
  return this.http.get<CourseItem[]>(`${environment.apiUrl}/courses`);
}

getCourseById(id: string): Observable<CourseItem> {
  return this.http.get<CourseItem>(`${environment.apiUrl}/courses/${id}`);
}
```

### Fallback para Dados Estáticos

Se a API estiver indisponível, as páginas usam dados estáticos definidos em `src/app/data/courses.data.ts`.

## Rotas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | `HomeComponent` | Página inicial |
| `/cursos` | `CoursesComponent` | Catálogo de cursos |
| `/certificacoes` | `CertificationsComponent` | Certificações disponíveis |
| `/termos` | `TermsComponent` | Termos de serviço |
| `/privacidade` | `PrivacyComponent` | Política de privacidade |
| `/verificar-certificado` | `VerifyCertificateComponent` | Verificação pública de certificado |
| `/certificado/:id` | `VerifyCertificateComponent` | Visualização pública de certificado |

## Deploy

### Netlify / Vercel

Configure o rewrite para `index.html` em todas as rotas (SPA):

```
/*    /index.html   200
```

### Apache / Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Troubleshooting

### Erro CORS

Verifique se o backend está rodando e se a origem `http://localhost:4200` está permitida.

### Dados não carregam

Verifique se o backend está acessível em `http://localhost:4001/api/courses`.
