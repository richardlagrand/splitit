import { AppSidebar } from "@/components/app-sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

interface Breadcrumb {
  title: string;
  url: string;
}

function Dashboard() {
  const { pathname } = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    const components = pathname.slice(1).split("/");
    const breadcrumbs = components.map((component, index, components) => {
      return {
        title: component.charAt(0).toUpperCase() + component.slice(1),
        url: "/" + components.slice(0, index + 1).join("/"),
      };
    });

    console.log({ breadcrumbs });
    setBreadcrumbs(breadcrumbs);
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        {isLast ? (
                          <BreadcrumbLink className="text-rebecca-purple-800">
                            {breadcrumb.title}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={breadcrumb.url}>{breadcrumb.title}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex-1 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default Dashboard;
