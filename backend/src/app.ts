import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import diagnosisRoutes from "./routes/diagnosis.routes";
import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/chat", chatRoutes);

export default app;
