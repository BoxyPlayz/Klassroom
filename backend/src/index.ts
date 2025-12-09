import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
const app = express();
const port = 3000;

app.use(
    cors({
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        origin: [
            "http://localhost:3000",
            "http://localhost:8000"
        ]
    }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/ping", (_req, res) => {
    res.send("pong")
})
app.use(express.json());
app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});
