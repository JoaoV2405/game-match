# 🎮 Game Matcher



Game Matcher é uma aplicação web para descoberta de jogos baseada em similaridade. A partir de um jogo selecionado pelo usuário, o sistema utiliza embeddings pré-computados e métricas de similaridade para recomendar títulos com características semelhantes.

O projeto é composto por:

* **Frontend** desenvolvido em Next.js e React.
* **Backend** desenvolvido em FastAPI.
* **Banco de dados PostgreSQL** para armazenamento dos metadados dos jogos.
* **Modelo de recomendação** baseado em embeddings vetoriais e similaridade cosseno.

---
## Capturas de Tela

### Página Inicial

![Página Inicial](./docs/homepage.png)

---
### Página de Detalhes

![Detalhes](./docs/game_detail.png)

---
### Pesquisa

![Página Inicial](./docs/image.png)

---


### Página de Resultados

![Recomendações](./docs/search_results.png)

---

# Funcionalidades

## Busca de jogos

O usuário pode pesquisar jogos por nome através da interface principal.

## Página de detalhes

Cada jogo possui uma página dedicada contendo:

* Capa
* Trailer
* Descrição
* Gêneros
* Plataformas
* Estúdios
* Links externos

## Recomendações

A partir de um jogo selecionado, o sistema identifica os títulos mais semelhantes utilizando embeddings vetoriais e apresenta recomendações personalizadas.

## Navegação entre recomendações

O usuário pode explorar continuamente novos jogos através da rede de recomendações geradas pelo sistema.

---

# Arquitetura

```text
Frontend (Next.js)
        │
        ▼
Backend (FastAPI)
        │
        ├── Modelo de Recomendação
        │
        └── PostgreSQL
```

---

# Tecnologias Utilizadas

## Frontend

* Next.js
* React
* TypeScript
* TailwindCSS

## Backend

* FastAPI
* Pandas
* NumPy
* Scikit-Learn
* Psycopg

## Banco de Dados

* PostgreSQL

---

# Instalação

## Pré-requisitos

* Python 3.13+
* Node.js 20+
* PostgreSQL 16+
* Git

---

# Clonando o Projeto

```bash
git clone https://github.com/JoaoV2405/game-match.git

cd game-matcher
```

---

# Configuração do Banco de Dados

Crie um banco PostgreSQL:

```sql
CREATE DATABASE games;
```

Crie um arquivo `.env` no backend:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/games
```

---

# Configuração do Backend

Entre na pasta do backend:

```bash
cd backend
```

Crie um ambiente virtual:

```bash
python -m venv .venv
```

Ative o ambiente virtual:

### Windows

```bash
.venv\Scripts\activate
```

### Linux/Mac

```bash
source .venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Execute a aplicação:

```bash
fastapi dev app/api/recommender_api.py
```

ou

```bash
uvicorn app.api.recommender_api:app --reload
```

O backend ficará disponível em:

```text
http://localhost:8000
```

---

# Configuração do Frontend

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Execute:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

---

# Estrutura do Projeto

```text
project/
│
├── backend/
│   ├── app/
│   ├── modelo/
│   ├── csvs/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   └── public/
│
└── README.md
```

---

# Como Funciona o Sistema de Recomendação

1. O usuário seleciona um jogo.
2. O sistema localiza o embedding correspondente.
3. É calculada a similaridade cosseno entre o jogo selecionado e os demais jogos do catálogo.
4. Os jogos mais similares são ordenados.
5. Os metadados dos jogos recomendados são recuperados do banco de dados.
6. As recomendações são exibidas ao usuário.

---

# Trabalhos Futuros

* Filtros avançados por gênero e plataforma.
* Recomendações híbridas utilizando metadados e embeddings.
* Sistema de favoritos.
* Histórico de navegação.
* Avaliações e feedback dos usuários.
* Deploy em ambiente cloud.

---

# Licença

Este projeto é disponibilizado para fins acadêmicos e educacionais.
