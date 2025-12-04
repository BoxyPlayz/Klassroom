import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors"
const app = express();
const port = 3000;

app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});