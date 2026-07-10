# Academia Ilungi — Landing Page

A Landing Page oficial da **Academia Ilungi**, desenvolvida em Angular. Apresenta o portal institucional, catálogo de cursos, informações de certificação, verificação de certificados e fornece redirecionamento para o Portal do Aluno e do Admin.

## Stack Tecnológico

| Camada | Tecnologia |
|--------|------------|
| Framework | Angular 17.x (Standalone Components) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS v4 |
| Roteamento | Angular Router |
| Ícones | Custom SVG |
| Client HTTP | Angular HttpClient |
| Porta Local | 4200 |

## Estrutura do Projeto

```
Ilungi-Academia/
├── src/
│   ├── app/
│   │   ├── components/      # Componentes compartilhados (header, footer, orbit anims)
│   │   ├── pages/           # Páginas estruturadas (home, cursos, certificações, legal)
│   │   │   ├── home/        # Landing page animada
│   │   │   ├── courses/     # Grid dinâmico de cursos
│   │   │   ├── verify-certificate/ # Verificação de certificados por código único
│   │   │   └── redirect/    # Redirecionadores para portas de portais externos
│   │   ├── services/        # Serviços baseados em RxJS (HttpClient, etc)
│   │   │   ├── course-api.service.ts # Consumo da API de cursos e verificação
│   │   │   └── storage.service.ts    # Armazenamento de cache / dados estáticos
│   │   └── app.routes.ts    # Rotas de navegação da Landing Page
│   └── styles.css           # Folha de estilo TailWind centralizada
```

---

## Como Executar Localmente

### Pré-requisitos
- Node.js (v18+)
- Angular CLI compilando localmente.

### Passos

1. Acesse a pasta do projeto:
   ```bash
   cd .\Ilungi-Academia\
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   # ou ng serve
   ```

O site estará acessível em **http://localhost:4200**.

---

## Integração com a API Backend

### 1. Comunicação Direta com o Backend (Porta `4001`)
O serviço `course-api.service.ts` faz requisições Http dirigidas a endpoints específicos da API. Se a API estiver offline, a aplicação recupera e exibe dados locais mockados (`src/app/data/courses.data.ts`) para evitar quebras visuais e garantir resiliência operacional.

### 2. Configuração de Proxy (Para desenvolvimento)
As requisições iniciadas com o prefixo `/api` são mapeadas via proxy local do Angular configurado em `proxy.conf.json` para encaminhar diretamente para o servidor Spring Boot na porta `4001`.

### 3. Rotas de Redirecionamento de Portais
As rotas de acesso ao ecossistema estão configuradas na Landing Page para redirecionamento automático para os respectivos portais que correm nas portas locais:
* **Área do Aluno**: Redireciona para o portal do aluno rodando em `http://localhost:3000`.
* **Registro de Novo Aluno**: Redireciona para `http://localhost:3000?view=register`.
* **Portal de Administração**: Redireciona para a central de gestão em `http://localhost:3001`.

---

## Módulo de Verificação de Certificados
A Landing Page contém uma área pública de validação de certificados na rota `/certificados/verificar`. 
- O utilizador introduz o código identificador único (ex: `ILUNGI-XXXXXXXXXXXX`).
- O sistema faz uma requisição HTTP GET para `/api/certificates/verify/{code}`.
- Conforme as regras de negócio, dados cruciais como o nome do aluno, instrutor, curso, carga horária e validade são respondidos pela API e renderizados no ecrã.
