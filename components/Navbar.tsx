"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "首页", href: "/" },
  {
    label: "关于我们",
    href: "/about",
    children: [
      { label: "公司简介", href: "/about" },
      { label: "企业文化", href: "/about#culture" },
      { label: "团队展示", href: "/about#team" },
      { label: "资质荣誉", href: "/about#honors" },
    ],
  },
  {
    label: "核心业务",
    href: "/services",
    children: [
      { label: "央视广告代理", href: "/services" },
      { label: "融媒体传播", href: "/services#media" },
      { label: "品牌全案", href: "/services#brand" },
    ],
  },
  {
    label: "广告资源",
    href: "/resources",
    children: [
      { label: "央视一套", href: "/resources" },
      { label: "央视四套", href: "/resources" },
      { label: "更多频道", href: "/resources" },
    ],
  },
  {
    label: "客户案例",
    href: "/cases",
    children: [
      { label: "案例视频", href: "/cases?type=video" },
      { label: "服务案例", href: "/cases?type=service" },
    ],
  },
  {
    label: "新闻资讯",
    href: "/news",
    children: [
      { label: "行业动态", href: "/news" },
      { label: "公司新闻", href: "/news?type=company" },
    ],
  },
  { label: "联系我们", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-[#0f2b5c] shadow-lg"
          : "bg-gradient-to-b from-[#0f2b5c]/90 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">

          {/* Logo - only image, no text */}
          <Link href="/" className="flex items-center shrink-0" onClick={() => setMobileOpen(false)}>
            <img src="/company-logo-white.png" alt="央信合赢" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <>
                    <button
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                        openDropdown === item.label
                          ? "text-[#e8621a]"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <svg className={`w-3 h-3 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    <div
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`absolute top-full left-0 min-w-[180px] bg-[#0f2b5c] border border-white/10 shadow-2xl rounded-xl overflow-hidden transition-all duration-200 ${
                        openDropdown === item.label ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-5 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 text-sm font-medium transition-colors ${
                      pathname === item.href ? "text-[#e8621a]" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-[#e8621a] hover:bg-[#d45717] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-all hover:gap-3"
            >
              立即咨询
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/80"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden bg-[#0f2b5c] border-t border-white/10 transition-all duration-300 overflow-hidden ${
        mobileOpen ? "max-h-[600px]" : "max-h-0"
      }`}>
        <div className="px-6 py-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  item.children ? "text-white/60" : "text-white/90 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-6 space-y-0.5">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 text-xs text-white/50 hover:text-white/80 transition-colors rounded-md hover:bg-white/5"
                    >
                      · {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
