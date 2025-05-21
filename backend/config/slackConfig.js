import dotenv from "dotenv";
dotenv.config();

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

export default slackWebhookUrl;
