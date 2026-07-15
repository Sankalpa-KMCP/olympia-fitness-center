import type { Page } from "@playwright/test";

export const publicRoutes = [
  { path: "/", label: "Home" },
  { path: "/services/", label: "Services" },
  { path: "/zumba/", label: "Zumba" },
  { path: "/contact/", label: "Contact" },
] as const;

export function monitorRuntime(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const thirdPartyRequests: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("request", (request) => {
    const url = new URL(request.url());

    if (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.origin !== "http://127.0.0.1:4321"
    ) {
      thirdPartyRequests.push(request.url());
    }
  });

  return { consoleErrors, pageErrors, thirdPartyRequests };
}
