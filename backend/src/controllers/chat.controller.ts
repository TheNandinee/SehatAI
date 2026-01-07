import { Request, Response } from "express";
import { queryLLM } from "../services/sehatai.service";

export async function chat(req: Request, res: Response) {
  try {
    const { message, context, conversation_id } = req.body;

    const result = await queryLLM({
      query: message,
      context,
      conversation_id
    });

    /* Map LLM response to frontend-friendly shape */
    res.json({
      id: result.query_id,
      role: "assistant",
      content: result.answer,
      confidence: result.confidence,
      sources: result.sources,
      metadata: result.metadata,
      timestamp: new Date()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "LLM query failed" });
  }
}
