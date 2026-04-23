"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ news: 0, cases: 0, resources: 0, contacts: 0, pendingContacts: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/news").then(r => r.json()),
      fetch("/api/admin/cases").then(r => r.json()),
      fetch("/api/admin/resources").then(r => r.json()),
      fetch("/api/admin/contacts").then(r => r.json()),
    ]).then(([news, cases, resources, contacts]) => {
      setStats({
        news: Array.isArray(news) ? news.length : 0,
        cases: Array.isArray(cases) ? cases.length : 0,
        resources: Array.isArray(resources) ? resources.length : 0,
        contacts: Array.isArray(contacts) ? contacts.length : 0,
        pendingContacts: Array.isArray(contacts) ? contacts.filter((c: { status: string }) => c.status === "pending").length : 0,
      });
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">数据概览</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "新闻数量", value: stats.news, icon: "📰", color: "bg-blue-50 text-blue-700" },
          { label: "案例数量", value: stats.cases, icon: "🎬", color: "bg-green-50 text-green-700" },
          { label: "广告资源", value: stats.resources, icon: "📺", color: "bg-purple-50 text-purple-700" },
          { label: "未处理留言", value: stats.pendingContacts, icon: "💬", color: "bg-orange-50 text-orange-700" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-2xl ${item.color} rounded-lg w-12 h-12 flex items-center justify-center`}>{item.icon}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{item.value}</p>
            <p className="text-sm text-gray-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
