"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, PlusSquare, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { safeStorageRemove } from "@/lib/storage";

interface DashboardSidebarProps {
  username: string;
}

export function DashboardSidebar({ username }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    safeStorageRemove("token");
    router.push("/signin");
  };

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/create-room", icon: PlusSquare, label: "Create Room" },
  ];

  return (
    <div className="fixed left-0 top-0 z-20 flex h-screen w-60 flex-col border-r border-border bg-card">
      <div className="px-5 py-5">
        <Link href="/" className="text-base font-semibold text-foreground">
          Sketchable
        </Link>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-indigo-600/15 text-indigo-600 dark:bg-indigo-600/20 dark:text-indigo-300"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-3 py-4">
        <p className="mb-3 px-3 text-[11px] text-muted-foreground/60 truncate">{username}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
