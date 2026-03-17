"use client";

import { ContentLink as DatoContentLinkImpl } from "react-datocms";
import { usePathname, useRouter } from "next/navigation";

export function DatoContentLink() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DatoContentLinkImpl
      enableClickToEdit={{ hoverOnly: true }}
      onNavigateTo={(path) => router.push(path)}
      currentPath={pathname}
    />
  );
}

