import supabase from "../config/supabaseConfig.js";
import openai from "../config/openAIConfig.js";
import axios from "axios";
import slackWebhookUrl from "../config/slackConfig.js";
import AppError from "../middlewares/appError.js";

export const summarizedTodos = async (req, res, next) => {
  try {
    const { data: todos, error } = await supabase
      .from("todos")
      .select("description")
      .eq("status", "pending");
    if (error)
      return next(new AppError(`Supabase Error:${error.message}`, 500));
    if (!todos || todos.length === 0) {
      return res.status(200).json({ message: "No pending todos to summarize" });
    }
    const prompt = `Summarize the following ${
      todos.length
    } pending to-do items into summary kind sentence starting with "You have [Number] pending task" avoiding bullet points or repeating list verbatim:\n${todos
      .map((todo) => `- ${todo.description}`)
      .join("\n")}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: prompt }],
    });

    const summary = completion?.choices?.[0]?.message?.content?.trim(); //safely trying to extract the AI's response using optional chaining

    if (!summary) {
      return next(new AppError("Failed to generate Summary from OpenAI", 500));
    }

    await axios.post(slackWebhookUrl, { text: summary });

    res
      .status(200)
      .json({ message: "Summary sent to Slack successfully", summary });
  } catch (error) {
    if (error.code === "insufficient_quota" || error.status === 429) {
      return next(
        new AppError("OpenAI quota exceeded,please upgrade your plan", 429)
      );
    }
    console.error("Detailed error:", error);
    next(new AppError("Failed to summarize or failed to send Slack", 500));
  }
};
