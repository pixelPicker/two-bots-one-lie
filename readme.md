# TWO BOTS ONE LIE

## Fullstack AI Game with Docker Compose

This project is a fullstack AI-powered chat application designed for local development and experimentation with large language models (LLMs). It features a modern Vite + React frontend, an Express.js backend, and integrates with Ollama to run local LLMs without relying on cloud APIs. Data persistence is handled via PostgreSQL, with schema management powered by Drizzle ORM.


---

## 🐳 Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Getting Started

#### 1. **Clone the repository**

```bash
git clone https://github.com/pixelPicker/two-bots-one-lie.git
cd two-bots-one-lie
```

#### 2. **Start your ollama model**

- Start your ollama model.
- Go to server/.env and add

```md
CHATBOT_URL = <your url> or http://localhost:11434/api/generate
CHATBOT_NAME = <your model name>
```

- NOTE: Make sure your model has capabilities to generate JSON schema

 #### 3. **Create a postgres database**

- Create a postgres database and link it with server/.env

 ```md
 DATABASE_URL = <your db url>
 ```

- run the following command on your terminal in server dir
```bash
npx drizzle-kit push
```

####  4. **Start the app**

```bash
docker-compose up --build