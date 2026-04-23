"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const menu = [
  { label: "数据概览", href: "/admin", icon: "📊" },
  { label: "新闻管理", href: "/admin/news", icon: "📰" },
  { label: "案例管理", href: "/admin/cases", icon: "🎬" },
  { label: "广告资源", href: "/admin/resources", icon: "📺" },
  { label: "留言管理", href: "/admin/contacts", icon: "💬" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<{ username: string; name?: string } | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    const stored = localStorage.getItem("admin");
    if (!stored) {
      router.push("/admin/login");
    } else {
      setAdmin(JSON.parse(stored));
    }
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <img src="/logo.png" alt="央信合赢" className="h-8 mb-2" />
          <p className="text-xs text-gray-400">后台管理</p>
        </div>
        <nav className="flex-1 py-4">
          {menu.map((m) => (
            <Link key={m.href} href={m.href}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                pathname === m.href ? "bg-[#0066cc] text-white" : "text-gray-300 hover:bg-gray-800"
              }`}>
              <span>{m.icon}</span>
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2">{admin?.username}</p>
          <button onClick={logout}
            className="text-xs text-gray-400 hover:text-white transition-colors">
            退出登录
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
