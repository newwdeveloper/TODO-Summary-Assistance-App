Todo Summary Assistant
Overview
The Todo Summary Assistant is a full-stack application for managing to-do items, summarizing pending tasks using OpenAI's gpt-4o-mini language model, and sending summaries to a Slack channel. Users can add, delete, and view to-dos through a React frontend, store data in Supabase, and generate meaningful summaries (e.g., "You have four pending tasks involving purchasing chocolate, a teddy bear, cards, and clothes") that are posted to Slack via Incoming Webhooks.
The application is deployed and accessible at:

Frontend: https://todo-summary-assistance-app.vercel.app/ (hosted on Vercel)
Backend API: https://todo-summary-assistance-app.onrender.com (hosted on Render)

Setup Instructions
Prerequisites

Browser to access the hosted frontend.
Postman or similar tool to test the backend API (optional).
Supabase account for database access (if replicating the setup).
OpenAI account for LLM integration (if replicating the setup).
Slack workspace with permission to create apps and webhooks (if replicating the setup).

1. Accessing the Hosted Application

Frontend:
Visit the deployed frontend: https://todo-summary-assistance-app.vercel.app/.
Use the UI to add, delete, and summarize to-dos.

Backend API:
The backend is hosted at: https://todo-summary-assistance-app.onrender.com.
Test endpoints like /todos or /summarize using Postman (e.g., GET https://todo-summary-assistance-app.onrender.com/todos).

2. Running Locally (Optional)
   To run the app locally or replicate the setup:
   Clone the Repository
   git clone https://github.com/newwdeveloper/TODO-Summary-Assistance-App
   cd TODO-Summary-Assistance-App

Backend Setup

Navigate to the backend directory:cd backend

Install dependencies:npm install

Copy .env.example to .env and fill in the required variables:cp .env.example .env

Edit .env with your Supabase, OpenAI, and Slack credentials (see Environment Variables).
Start the backend server:npm start

The server runs on http://localhost:5000 (or your configured port on your local machine).

Frontend Setup

Navigate to the frontend directory:cd frontend

Install dependencies:npm install

Start the React development server:npm start

The frontend runs on http://localhost:5173.(on local machine)

3. Supabase Setup

Sign up at Supabase and create a new project.
Get your Project URL and Anon Key from the project settings (API section).
Create a todos table with columns:
id (auto-incrementing primary key)
description (text)
status (text, e.g., "pending" or "completed")

Add SUPABASE_URL and SUPABASE_KEY to your .env file or hosting platform’s environment settings (see Environment Variables).

4. OpenAI Setup

Sign up at OpenAI and create an API key.
Add the OPENAI_API_KEY to your .env file or hosting platform’s environment settings (see Environment Variables).
The backend uses the gpt-4o-mini model. Ensure your API key has access to this model.

5. Integrating Slack Incoming Webhooks
   This section explains how to set up Slack Incoming Webhooks to post summaries of pending to-do items to a Slack channel. The hosted backend sends LLM-generated summaries, such as "You have four pending tasks involving purchasing chocolate, a teddy bear, cards, and clothes," to the configured Slack channel.
   Below is a placeholder screenshot of a sample summary posted to a Slack channel. Replace this with your actual screenshot by storing it in (frontend/src/assets/slackScreenShot.jpg) and updating the image path below.

   screenShot-(frontend/src/assets/slackScreenShot.jpg)

Prerequisites

A Slack workspace with permission to create apps and webhooks.
Basic knowledge of making HTTP requests in Node.js (e.g., using Axios).

Step 1: Create a Slack App

Go to the Slack API website.
Click Create New App.
Enter a name (e.g., "Todo Summary Bot") and select your workspace.
Click Create App.

Step 2: Enable Incoming Webhooks

In your app's settings, navigate to Incoming Webhooks.
Toggle the switch to enable Incoming Webhooks.

Step 3: Create a Webhook URL

Scroll down to the Webhook URLs for Your Workspace section.
Click Add New Webhook to Workspace.
Select the Slack channel for summaries (e.g., #todo-summaries).
Click Authorize.
Copy the generated Webhook URL (e.g., https://hooks.slack.com/services/xxx/yyy/zzz).

Step 4: Configure the Webhook in Your Project

For the hosted app, add the Webhook URL to Render’s environment settings as SLACK_WEBHOOK_URL (via Render’s dashboard).
For local setup, add it to your .env file:SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz

The backend (summarizedTodos.js) sends an HTTP POST request to the Webhook URL with the summary in a JSON object:{
"text": "You have four pending tasks involving purchasing chocolate, a teddy bear, cards, and clothes."
}

Step 5: Test the Integration

Test the webhook with Postman:POST <your-slack-webhook-url>
Body: { "text": "Test: Todo Summary Assistant" }

Access the hosted frontend (https://todo-summary-assistance-app.vercel.app/), add pending to-dos (e.g., "Buy chocolate"), click "Summarize and Send to Slack," and check the Slack channel for the summary (as shown in the screenshot above, once replaced).
For local setup, run the app and repeat the process.
Check backend logs for the OpenAI Summary: output to verify the LLM response.

Replacing the Placeholder Screenshot
To replace the placeholder with your actual Slack screenshot:

Capture a screenshot of your Slack channel showing the summary.
Save it as slack_summary_screenshot.png in the images/ folder of your repository.
Update the image reference in this README:![Slack Summary Screenshot](frontend/src/assets/slackScreenShot.jpg)

Commit and push the changes:git add images/slack_summary_screenshot.png README.md
git commit -m "Replace placeholder with actual Slack screenshot"
git push origin main

Troubleshooting

Invalid Webhook URL: Verify the URL is correct and authorized. Test with Postman.
No Messages in Slack: Check Render’s environment variables or .env file, and review server logs.
Rate Limits: See Slack API rate limits.

Security Note

Store the Webhook URL in Render’s environment settings or .env file. Ensure .env is in .gitignore.

Additional Resources

Slack Incoming Webhooks documentation

Environment Variables
For the hosted app, set these variables in Vercel (for frontend) and Render (for backend) via their respective dashboards. For local setup, copy .env.example to .env and fill in the values:
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url

Design/Architecture Decisions

1. Tech Stack

Frontend: React
Chosen for its component-based architecture and ecosystem (e.g., react-toastify, react-spinners).
Deployed on Vercel for seamless React hosting and automatic scaling.

Backend: Node.js/Express
Lightweight and scalable for API requests.
Deployed on Render for Node.js support and environment variable management.
Integrates with Supabase, OpenAI, and Slack via Axios.

Database: Supabase
Open-source, PostgreSQL-based, with a JavaScript client.
Chosen for SQL familiarity and free tier.

LLM: OpenAI (gpt-4o-mini)
Selected for cost-effective, high-quality summarization.

Slack: Incoming Webhooks
Simple and lightweight for one-way notifications.

2. Hosting Choices

Frontend (Vercel): Vercel was chosen for its optimized React deployment, automatic scaling, free tier, and easy environment variable management. The frontend is accessible at https://todo-summary-assistance-app.vercel.app/.
Backend (Render): Render was selected for its Node.js support, free tier, and straightforward environment variable configuration. The API is accessible at https://todo-summary-assistance-app.onrender.com.
Environment Variables: Configured in Vercel and Render dashboards to secure sensitive data (e.g., API keys, webhook URLs).

3. Separation of Concerns

Frontend: Handles UI rendering and API calls (api.js).
Backend: Manages database queries, LLM integration, and Slack communication.
Modular Configs: Separate files (supabaseConfig.js, openAIConfig.js, slackConfig.js) for clean dependency management.

4. LLM Integration

Used gpt-4o-mini for performance and cost.
Prompt designed for concise, narrative summaries:Summarize the following ${todos.length} pending to-do items in one concise sentence, starting with "You have ${todos.length} pending tasks" and avoiding bullet points, the word "Summary", or repeating the list verbatim

Debug logs (console.log("OpenAI Summary:", summary)) verify LLM output.

5. Slack Integration

Chose Incoming Webhooks for simplicity over a Slack bot.
Secured the webhook URL in Render’s environment settings or .env.
Included a placeholder screenshot in the README, with replacement instructions.

6. Error Handling and UX

Backend: Uses try/catch and AppError middleware for errors (e.g., OpenAI quota issues).
Frontend: Shows loading spinners (ClipLoader) and toasts (react-toastify).
Validation: Prevents empty to-do submissions and handles edge cases.

7. Scalability Considerations

Vercel and Render support scaling for increased traffic.
Supabase offers real-time subscriptions for future features.
OpenAI’s API handles larger task lists efficiently.

Troubleshooting

Hosted App:
Frontend Not Loading: Check Vercel’s deployment logs.
API Errors: Verify environment variables in Render and test endpoints with Postman.

Local Setup:
Backend Errors: Check .env variables and server logs.
Frontend Issues: Ensure the backend API is running and CORS is configured.

Supabase: Verify table schema and anon key permissions.
OpenAI: Check API key validity and quota.
Slack: Test the webhook URL and check rate limits.

Future Improvements

Implement real-time to-do updates with Supabase subscriptions.
Enhance LLM prompts to categorize tasks (e.g., "shopping" vs. "personal").
Add a video demo in the README.
Implement retry logic for failed API requests.
