import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

interface Breadcrumb {
  label: string;
  path?: string;
}

export const useBreadcrumbs = (): Breadcrumb[] => {
  const location = useLocation();
  const params = useParams();

  return useMemo(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: Breadcrumb[] = [{ label: "Home", path: "/" }];

    let currentPath = "";

    paths.forEach((path, index) => {
      currentPath += `/${path}`;

      // Skip auth routes
      if (path === "auth") return;

      // Handle dynamic routes
      if (params.id && path === params.id) {
        breadcrumbs.push({
          label: `#${path.slice(0, 8)}...`,
          path: currentPath,
        });
      } else {
        // Capitalize and format label
        const label = path
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        breadcrumbs.push({
          label,
          path: index === paths.length - 1 ? undefined : currentPath,
        });
      }
    });

    return breadcrumbs;
  }, [location, params]);
};
