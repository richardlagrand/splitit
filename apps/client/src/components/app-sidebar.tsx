"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    username: "Richard",
    email: "rwlagrand@gmail.com",
    avatar:
      "https://avatars.githubusercontent.com/u/17964921?s=400&u=58bf0b150c7131e9707d3f5ddecc9f21b54a7785&v=4",
  },
  teams: [
    {
      name: "Axis Property",
      logo: GalleryVerticalEnd,
      plan: "Premium plan",
    },
    {
      name: "Tecnocasa",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Engel & Volkers",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Invoices",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Incoming",
          url: "#",
        },
        {
          title: "Outgoing",
          url: "#",
        },
        {
          title: "Add invoice",
          url: "#",
        },
      ],
    },
    {
      title: "Payments",
      url: "",
      icon: Bot,
      items: [
        {
          title: "Overview",
          url: "/dashboard/payments",
        },
        {
          title: "Payouts",
          url: "/dashboard/payouts",
        },
        {
          title: "Add Payment",
          url: "/dashboard/add-payment",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Registration",
          url: "/register",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Madrid",
      url: "../",
      icon: Frame,
    },
    {
      name: "Barcelona",
      url: "../",
      icon: PieChart,
    },
    {
      name: "Granada",
      url: "../",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
