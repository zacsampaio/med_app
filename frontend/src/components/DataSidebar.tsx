import {
  ChevronRight,
  ClipboardPlus,
  LayoutDashboard,
  LucideIcon,
  Pill,
  Stethoscope,
  UserRoundCheck,
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export type SidebarItem =
  | {
      type: "link";
      label: string;
      href: string;
      icon?: LucideIcon;
    }
  | {
      type: "group";
      label: string;
      icon: LucideIcon;
      children: { label: string; href: string }[];
    };

export const SIDEBAR: SidebarItem[] = [
  { type: "link", label: "DASHBOARD", href: "/", icon: LayoutDashboard },
  {
    type: "group",
    label: "CONSULTAS",
    icon: ClipboardPlus,
    children: [
      { label: "Listagem", href: "/app/appointments" },
      { label: "Consulta detalhada", href: "/app/appointments/create" },
      { label: "Gerar Relatório", href: "/app/appointments/report" },
    ],
  },
  {
    type: "group",
    label: "PRESCRIÇÕES",
    icon: Pill,
    children: [
      { label: "Prescrever", href: "/app/prescriptions/create" },
      { label: "Listagem", href: "/app/prescriptions" },
      { label: "Carregar Prescrição", href: "/app/prescriptions/upload" },
    ],
  },
  {
    type: "group",
    label: "PACIENTE",
    icon: UserRoundCheck,
    children: [
      { label: "Adicionar Paciente", href: "/app/patient/create" },
      { label: "Listagem", href: "/app/patient" },
      { label: "Consulta Detalhada", href: "/app/patient/id" },
    ],
  },
];

export function DataSidebar() {

  return (
    <Sidebar className="bg-sidebar p-2">
      <SidebarHeader className="flex items-center gap-8">
        <Stethoscope className="h-8 w-8" />
        <h3 className="text-lg font-semibold">consulta.app</h3>
      </SidebarHeader>

      <SidebarContent className="mt-6">
        {SIDEBAR.map((item) => item.type === "link" ? (
          <SidebarGroup key={item.href}>
            <Link href={item.href}>
              <SidebarGroupLabel className="gap-4 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                {item.icon && <item.icon />}
                {item.label}
              </SidebarGroupLabel>
            </Link>
          </SidebarGroup>
        ) : (
          <Collapsible key={item.label} className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="gap-4 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <item.icon />
                  {item.label}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className='ml-2'>
                    {item.children.map((child) => (
                      <SidebarMenuItem key={child.href}>
                        <Link href={child.href}>
                          <SidebarMenuButton className="cursor-pointer">
                            {child.label}
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )
      )}
      </SidebarContent>
    </Sidebar>
  )
}
