import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "央信合赢(北京)文化传媒有限公司",
  description: "央视AAAA级信用广告代理公司，提供央视黄金时段广告资源与融媒体全案传播服务",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}