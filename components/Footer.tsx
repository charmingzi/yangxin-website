import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a1830]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src="/company-logo-white.png" alt="央信合赢" className="h-9 w-auto" />
            </div>
            <p className="text-white/40 text-xs leading-relaxed">
              央信合赢（北京）文化传媒有限公司，央视AAAA级信用广告代理，深耕品牌传播20年。
            </p>
            <div className="flex gap-3 mt-4">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors cursor-pointer">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors cursor-pointer">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.546 6.681l-2.53-2.538L12.54.593 3.46 1.594 2.008 6.68l6.482 6.482z" opacity="0" /><path d="M8.004 9.99c.828-.018 1.653.07 2.46.263L7.46 13.26a.49.49 0 00-.21.54c.037.157.119.296.23.4l.002.002c.12.12.277.2.447.227l-.002.001c.027.004.054.006.081.007l-.01.001a.49.49 0 00.42.236l.002.001c.013 0 .025.002.038.001l-.003.001c.018.002.037.003.055.003l-.013.001c.017 0 .034.001.051.001h.004c.016 0 .032-.001.048-.002l-.014.001c.016-.001.032-.002.047-.004l-.012.001c.016-.002.032-.004.048-.007l-.011.002c.015-.003.03-.007.045-.011l-.009.003c.014-.005.028-.01.042-.016l-.009.004c.013-.006.025-.013.037-.021l-.007.005c.012-.009.023-.018.034-.028l-.005.005c.01-.01.019-.022.028-.034l-.004.005c.008-.012.016-.025.023-.038l-.003.005c.006-.012.011-.025.016-.038l-.002.006c.005-.013.009-.027.012-.041l-.001.006c.003-.013.005-.027.006-.041v-.007c.001-.014.001-.028 0-.042v-.007c0-.014-.001-.028-.003-.042v-.007c-.001-.014-.004-.027-.007-.041v-.006c-.002-.014-.006-.027-.01-.041v-.005c-.004-.013-.009-.026-.015-.039l.002-.005c-.006-.012-.013-.024-.02-.036l.003-.005c-.007-.012-.015-.023-.024-.034l.004-.004c-.009-.011-.019-.021-.03-.031l.005-.004c-.011-.009-.023-.018-.035-.026l.006-.003c-.012-.008-.025-.015-.038-.022l.007-.002c-.013-.006-.027-.011-.041-.016l.007-.002c-.014-.005-.029-.008-.044-.012l.008-.001c-.015-.003-.03-.006-.045-.008l.008-.001c-.015-.002-.031-.004-.046-.005l.008-.001c-.016-.001-.032-.002-.048-.002h.009c-.016 0-.032 0-.048.001h.009c-.016.001-.032.002-.048.003h.009c-.015.001-.031.003-.046.005h.008c-.015.002-.031.004-.046.006h.008c-.015.002-.03.005-.045.008h.007c-.015.003-.029.006-.044.01h.007c-.014.004-.028.008-.042.012h.006c-.014.005-.028.01-.041.016h.005c-.013.006-.026.012-.039.019h.005c-.013.007-.025.015-.037.023h.004c-.012.008-.024.017-.035.026h.003c-.011.009-.021.019-.031.029h.003c-.01.01-.019.021-.028.032l.002-.003c-.009.012-.017.025-.024.037l.002-.003c-.007.012-.013.025-.019.037l.001-.003c-.006.012-.011.025-.016.038l.001-.003c-.005.013-.009.026-.013.039l.001-.003c-.003.013-.006.026-.008.039v-.003c-.002.013-.003.026-.004.039v-.003c-.001.013-.001.026 0 .039v.044c0 .013.001.026.003.039.002.013.004.026.007.039.003.013.006.026.01.039.004.013.008.026.013.038.005.012.01.025.016.037.006.012.012.024.019.036.007.012.014.024.022.035.008.011.016.022.025.033.009.011.018.021.028.031.01.01.02.02.031.029.011.009.022.018.034.026.012.008.024.015.036.022.012.007.025.013.038.019.013.006.026.011.039.016.013.005.027.009.04.013.014.004.027.007.041.01.014.003.028.005.042.007.014.002.028.003.042.004.014.001.028.001.042.001.014 0 .028-.001.042-.003.014-.001.028-.003.042-.005.014-.002.028-.004.042-.007.014-.003.028-.006.041-.009.014-.003.027-.007.041-.011.014-.004.027-.008.041-.013.013-.005.026-.01.039-.015.013-.006.026-.012.038-.018.013-.006.025-.013.037-.02.013-.007.025-.015.037-.023.012-.008.024-.017.035-.026.012-.009.023-.019.034-.029.011-.01.022-.021.032-.032.01-.011.02-.022.029-.033.01-.011.019-.023.028-.035.009-.012.017-.024.025-.036.008-.012.016-.025.023-.038.007-.013.014-.026.02-.039.006-.013.012-.026.017-.039.005-.013.01-.027.014-.04.004-.013.008-.027.011-.041.003-.014.006-.028.008-.042.002-.014.003-.028.004-.042v-.001z" /></svg>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">快速链接</h4>
            <ul className="space-y-2.5">
              {[
                ["首页", "/"],
                ["关于我们", "/about"],
                ["核心业务", "/services"],
                ["广告资源", "/resources"],
                ["客户案例", "/cases"],
                ["新闻资讯", "/news"],
                ["联系我们", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/40 hover:text-white/70 text-xs transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">核心业务</h4>
            <ul className="space-y-2.5">
              {[
                "央视广告代理",
                "融媒体传播",
                "品牌全案策划",
                "TVC拍摄制作",
                "媒体监测报告",
              ].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-white/40 hover:text-white/70 text-xs transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">联系我们</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <svg className="w-3.5 h-3.5 text-[#e8621a] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/40 text-xs">北京市朝阳区酒仙桥东路9号院电子城科技研发中心</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-[#e8621a] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-white/40 text-xs">010-8622 9581</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-[#e8621a] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-white/40 text-xs">contact@yangxinad.com</span>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-2 bg-white/5 rounded-lg p-3">
              <div className="w-8 h-8 bg-[#e8621a]/20 rounded flex items-center justify-center shrink-0">
                <img src="/cctv-logo.png" alt="CCTV" className="w-5 h-auto" />
              </div>
              <div>
                <p className="text-white/80 text-xs font-semibold">AAAA 信用等级</p>
                <p className="text-white/30 text-[10px]">央视认证广告代理</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © 2025 央信合赢（北京）文化传媒有限公司 版权所有
          </p>
          <p className="text-white/15 text-[10px]">
            京ICP备XXXXXXXX号-1
          </p>
        </div>
      </div>
    </footer>
  );
}
