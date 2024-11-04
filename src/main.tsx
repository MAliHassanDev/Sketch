import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "@/app/App";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import "./styles/main.css";
import * as Sentry from "@sentry/react";
import logger from "./config/logger";

Sentry.init({
  dsn: "https://19594802a6f87750b6f10ef1251fa490@o4508228613111808.ingest.us.sentry.io/4508234338074624",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
const rootElement =
  document.getElementById("root") || document.createElement("div");

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

logger.info("App Rendered Successfully");
