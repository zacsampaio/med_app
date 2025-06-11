import {
  ChevronRight,
  ClipboardPlus,
  LayoutDashboard,
  Pill,
  Stethoscope,
  UserRoundCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";

export function SideMenu() {
  return (
    <Sidebar className="bg-sidebar p-2">
      <SidebarHeader className="flex flex-row items-center gap-8">
        <Stethoscope className="h-8 w-8" />
        <h3 className="text-lg font-semibold">med.app</h3>
      </SidebarHeader>
      <SidebarContent className="mt-6">
        <SidebarGroup>
          <Link href="/">
            <SidebarGroupLabel className="gap-4 cursor-pointer hover:bg-zinc-100">
              <LayoutDashboard />
              DASHBOARD
            </SidebarGroupLabel>
          </Link>
        </SidebarGroup>

        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="gap-4 hover:bg-zinc-100">
                <ClipboardPlus />
                CONSULTAS
                <ChevronRight className="ml-auto cursor-pointer transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="ml-2 ">
                  <SidebarMenuItem>
                    <Link href="/app/appointments/create">
                      <SidebarMenuButton className="cursor-pointer">
                        Listagem
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/app/appointments">
                      <SidebarMenuButton className="cursor-pointer">
                        Consulta detalhada
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/app/appointments/">
                      <SidebarMenuButton className="cursor-pointer">
                        Gerar Relatório
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="gap-4 hover:bg-zinc-100">
                <Pill />
                PRESCRIÇÕES
                <ChevronRight className="ml-auto cursor-pointer transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="ml-2">
                  <SidebarMenuItem>
                    <Link href="/app/prescriptions/create">
                      <SidebarMenuButton className="cursor-pointer">
                        Prescrever
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/app/prescriptions">
                      <SidebarMenuButton className="cursor-pointer">
                        Listagem
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/app/prescriptions/upload">
                      <SidebarMenuButton className="cursor-pointer">
                        Carregar Prescrição
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="gap-4 hover:bg-zinc-100">
                <UserRoundCheck />
                PACIENTE
                <ChevronRight className="ml-auto cursor-pointer transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="ml-2">
                  <SidebarMenuItem>
                    <Link href="/app/patient/create">
                      <SidebarMenuButton className="cursor-pointer">
                        Adicionar Paciente
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/app/patient">
                      <SidebarMenuButton className="cursor-pointer">
                        Listagem
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/app/patient/id">
                      <SidebarMenuButton className="cursor-pointer">
                        Consulta Detalhada
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  );
}
