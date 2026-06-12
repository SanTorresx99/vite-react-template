import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

// Adicione rotas de API aqui quando necessário
// ex: app.post("/api/leads", async (c) => { ... })

export default app;
