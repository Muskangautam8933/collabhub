"use client";

import * as React from "react";
import {
  BookOpen,
  CircleUser,
  ClipboardPlus,
  LayoutDashboard,
  // Command,
  // LifeBuoy,
  MessageCircle,
  Send,
  Settings,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGlobalContext } from "@/contexts/global.context";
import { Link, useLocation, useParams } from "react-router";
import { APP_NAME } from "@/app.constatns";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ROUTES } from "@/_routes.constants";

const data = {
  navMain: [
    {
      title: "Tasks",
      url: ROUTES.PRIVATE.PROJECTS.TASKS,
      icon: ClipboardPlus,
      collapsable: false,
    },
    {
      title: "Pages",
      url: ROUTES.PRIVATE.PROJECTS.PAGES,
      icon: BookOpen,
      collapsable: true,
    },
  ],
  navSecondary: [
    {
      title: "Profile",
      url: ROUTES.PRIVATE.PROJECTS.PROFILE,
      icon: CircleUser,
    },
    {
      title: "Settings",
      url: ROUTES.PRIVATE.PROJECTS.SETTINGS.ROOT,
      icon: Settings,
    },
    {
      title: "Feedback",
      url: "https://github.com/sahil-verma-9696/collabhub/issues",
      icon: Send,
      targetBlank: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const ctx = useGlobalContext();
  const { projectId } = useParams();

  const excludePatterns = [
    /^\/projects$/, // match only /projects
  ];

  const shouldExclude = excludePatterns.some((pattern) =>
    pattern.test(location.pathname),
  );

  if (shouldExclude) {
    return null;
  }
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={`${ROUTES.PRIVATE.PROJECTS.ROOT}`}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  {/* <Command className="size-4" /> */}
                  <span className="font-bold">CH</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{APP_NAME}</span>
                  {/* <span className="truncate text-xs">Project</span> */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full w-full rounded-md">
          <SidebarMenu className="p-2">
            <Link
              to={`${ROUTES.PRIVATE.PROJECTS.ROOT}/${projectId}/${ROUTES.PRIVATE.PROJECTS.DASHBOARD}`}
            >
              <SidebarMenuButton className="cursor-pointer">
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
            <Link
              to={`${ROUTES.PRIVATE.PROJECTS.ROOT}/${projectId}/${ROUTES.PRIVATE.PROJECTS.COMMUNICATIONS}`}
            >
              <SidebarMenuButton className="cursor-pointer">
                <MessageCircle />
                <span>Communication</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenu>

          <NavMain items={data.navMain} />

          <SidebarGroup>
            <SidebarGroupLabel className="space-x-4">
              <span>Team members</span>
              <Badge variant={"outline"}>0/6</Badge>
            </SidebarGroupLabel>
            <SidebarMenu>
              {[
                { name: "Sahil Verma", role: "Admin", to: "/me/chats/sahil" },
                { name: "Sonal Verma", role: "Write", to: "/me/chats/sonal" },
                { name: "Muskan Gautam", role: "Read", to: "/me/chats/muskan" },
                { name: "Vansh Nigam", role: "Read", to: "/me/chats/vansh" },
                { name: "Sakshi Verma", role: "Read", to: "/me/chats/sakshi" },
                { name: "Atul Verma", role: "Read", to: "/me/chats/atul" },
              ].map((item) => {
                return (
                  <Link key={item.name} to={item.to}>
                    <SidebarMenuButton className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <User size={18} />
                        <span>{item.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </Link>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
        <NavUser user={ctx.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
