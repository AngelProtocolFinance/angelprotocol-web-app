window.sentryOnLoad = function () {
    Sentry.init({
      dsn: "https://4da0ddd9b67e4801af699469048265f8@o1061537.ingest.us.sentry.io/6051923bettergiving / better-giving-webapp",
      sendDefaultPii: true,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      enableLogs: true,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  };