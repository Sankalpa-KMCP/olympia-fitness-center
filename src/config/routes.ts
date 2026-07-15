export interface SiteRoute {
  readonly path: `/${string}`;
  readonly label: string;
  readonly navigation: boolean;
}

export const siteRoutes = {
  home: { path: "/", label: "Home", navigation: true },
  services: { path: "/services/", label: "Services", navigation: true },
  zumba: { path: "/zumba/", label: "Zumba", navigation: true },
  contact: { path: "/contact/", label: "Contact", navigation: true },
  notFound: {
    path: "/404.html",
    label: "Page not found",
    navigation: false,
  },
} as const satisfies Record<string, SiteRoute>;

export type SiteRoutePath =
  (typeof siteRoutes)[keyof typeof siteRoutes]["path"];
export type NavigationRoute = Extract<
  (typeof siteRoutes)[keyof typeof siteRoutes],
  { readonly navigation: true }
>;

export const primaryNavigationRoutes = Object.values(siteRoutes).filter(
  (route): route is NavigationRoute => route.navigation,
);

function normalizePathname(pathname: string): string {
  const path = pathname.split(/[?#]/, 1)[0] || "/";

  if (path === "/" || path.endsWith(".html") || path.endsWith("/")) {
    return path;
  }

  return `${path}/`;
}

export function isCurrentRoute(
  currentPath: string,
  routePath: NavigationRoute["path"],
): boolean {
  return normalizePathname(currentPath) === routePath;
}
