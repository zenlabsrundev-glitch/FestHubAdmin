import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  ShieldCheck, 
  Home, 
  LogOut, 
  User, 
  Zap,
  Settings,
  PlusCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

const navItems = [
  { label: "Admin", href: "/admin", icon: ShieldCheck },
  { label: "Registration", href: "/registration", icon: Calendar },

];

export function AppSidebar() {
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-white/10 bg-[#0f1117]">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shrink-0">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-data-[collapsible=icon]:hidden">
            EventHub
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-neutral-500 group-data-[collapsible=icon]:hidden">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="hover:bg-white/5 active:bg-white/10 transition-colors"
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className={`h-4 w-4 ${pathname === item.href ? "text-blue-400" : "text-neutral-400"}`} />
                      <span className={pathname === item.href ? "text-white font-semibold" : "text-neutral-300"}>
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/5">
        {isAuthenticated && user ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:px-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-xs font-bold text-white shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium text-white truncate">{user.name}</span>
                <span className="text-xs text-neutral-500 truncate">{user.email}</span>
              </div>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => logout()} 
                  tooltip="Sign out"
                  className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="group-data-[collapsible=icon]:hidden">Sign out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Sign in" className="bg-white/5 hover:bg-white/10">
                <Link to="/login" className="flex items-center gap-3">
                  <PlusCircle className="h-4 w-4 text-neutral-300" />
                  <span className="text-neutral-300 group-data-[collapsible=icon]:hidden">Sign in</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
