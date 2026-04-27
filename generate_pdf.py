#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""生成央信合赢官网制作过程 PDF"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak,
    Table, TableStyle, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont

# 注册中文字体
pdfmetrics.registerFont(UnicodeCIDFont('STSong-Light'))

FONT_CN = 'STSong-Light'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCREENSHOTS = os.path.join(BASE_DIR, 'screenshots')

# 品牌色
COLOR_PRIMARY = HexColor('#1A3A6B')     # 深蓝 — 央信合赢品牌色
COLOR_DARK = HexColor('#1E293B')
COLOR_GRAY = HexColor('#64748B')
COLOR_LIGHT = HexColor('#F1F5F9')
COLOR_ACCENT = HexColor('#C8102E')      # 央视红
COLOR_BORDER = HexColor('#E2E8F0')
COLOR_BLUE = HexColor('#2563EB')

PAGE_W, PAGE_H = A4
MARGIN = 2.2 * cm


def create_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        'CoverTitle', fontName=FONT_CN, fontSize=30, leading=40,
        textColor=COLOR_PRIMARY, alignment=TA_CENTER, spaceAfter=12
    ))
    styles.add(ParagraphStyle(
        'CoverSub', fontName=FONT_CN, fontSize=14, leading=20,
        textColor=COLOR_GRAY, alignment=TA_CENTER, spaceAfter=6
    ))
    styles.add(ParagraphStyle(
        'H1CN', fontName=FONT_CN, fontSize=22, leading=30,
        textColor=COLOR_PRIMARY, spaceBefore=20, spaceAfter=10,
    ))
    styles.add(ParagraphStyle(
        'H2CN', fontName=FONT_CN, fontSize=16, leading=22,
        textColor=COLOR_DARK, spaceBefore=14, spaceAfter=8
    ))
    styles.add(ParagraphStyle(
        'H3CN', fontName=FONT_CN, fontSize=13, leading=18,
        textColor=COLOR_ACCENT, spaceBefore=10, spaceAfter=6
    ))
    styles.add(ParagraphStyle(
        'Body', fontName=FONT_CN, fontSize=10.5, leading=18,
        textColor=COLOR_DARK, alignment=TA_JUSTIFY, spaceAfter=6,
        firstLineIndent=21
    ))
    styles.add(ParagraphStyle(
        'BodyNoIndent', fontName=FONT_CN, fontSize=10.5, leading=18,
        textColor=COLOR_DARK, spaceAfter=6
    ))
    styles.add(ParagraphStyle(
        'Caption', fontName=FONT_CN, fontSize=9, leading=14,
        textColor=COLOR_GRAY, alignment=TA_CENTER, spaceAfter=4, spaceBefore=4
    ))
    styles.add(ParagraphStyle(
        'BulletCN', fontName=FONT_CN, fontSize=10.5, leading=18,
        textColor=COLOR_DARK, leftIndent=20, bulletIndent=6,
        spaceAfter=3
    ))
    styles.add(ParagraphStyle(
        'CodeCN', fontName='Courier', fontSize=9, leading=14,
        textColor=HexColor('#334155'), backColor=COLOR_LIGHT,
        leftIndent=12, rightIndent=12, spaceBefore=4, spaceAfter=4,
        borderWidth=0.5, borderColor=COLOR_BORDER, borderPadding=6
    ))
    styles.add(ParagraphStyle(
        'TimelineTime', fontName=FONT_CN, fontSize=9, leading=14,
        textColor=COLOR_ACCENT, leftIndent=28, spaceAfter=1
    ))
    return styles


def add_image(story, path, caption, styles, max_width=None):
    if not os.path.exists(path):
        story.append(Paragraph(f'[图片缺失: {os.path.basename(path)}]', styles['Caption']))
        return
    max_w = max_width or (PAGE_W - 2 * MARGIN)
    img = Image(path)
    w = img.imageWidth
    h = img.imageHeight
    ratio = h / w
    display_w = min(max_w, w)
    display_h = display_w * ratio
    max_h = 160 * mm
    if display_h > max_h:
        display_h = max_h
        display_w = display_h / ratio
    img._restrictSize(display_w, display_h)
    story.append(img)
    if caption:
        story.append(Paragraph(caption, styles['Caption']))


def add_cover(story, styles):
    story.append(Spacer(1, 60 * mm))
    story.append(Paragraph('央信合赢官网', styles['CoverTitle']))
    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph('从零到上线的完整制作过程', styles['CoverSub']))
    story.append(Spacer(1, 6 * mm))
    story.append(HRFlowable(width='40%', thickness=1, color=COLOR_PRIMARY, spaceAfter=6 * mm))
    story.append(Paragraph('人机协作 · 3 天完成', styles['CoverSub']))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph('央信合赢（北京）文化传媒有限公司', styles['CoverSub']))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph('2026 年 4 月 21 日 — 23 日', styles['CoverSub']))
    story.append(PageBreak())


def add_chapter1(story, styles):
    """项目背景与目标"""
    story.append(Paragraph('一、项目背景与目标', styles['H1CN']))
    story.append(HRFlowable(width='100%', thickness=0.5, color=COLOR_BORDER, spaceAfter=6 * mm))

    story.append(Paragraph('1.1 公司简介', styles['H2CN']))
    story.append(Paragraph(
        '央信合赢（北京）文化传媒有限公司是 CCTV AAAA 级信用广告代理公司，'
        '专注于央视黄金时段广告代理和融媒体全案传播。公司长期服务京东、银联、长城汽车、汾酒等知名品牌，'
        '在央视广告领域拥有深厚资源和丰富经验。',
        styles['Body']
    ))

    story.append(Paragraph('1.2 项目目标', styles['H2CN']))
    bullets = [
        '建设公司品牌官网，展示企业形象与核心业务能力',
        '前台展示：首页、关于我们、业务服务、广告资源、案例展示、新闻资讯、联系我们',
        '后台管理：新闻管理、案例管理、资源管理、留言管理，支持内容动态更新',
        '响应式设计，适配桌面端和移动端',
        '部署上线，国内可访问',
    ]
    for b in bullets:
        story.append(Paragraph(f'• {b}', styles['BulletCN']))

    story.append(Paragraph('1.3 技术选型', styles['H2CN']))
    data = [
        ['技术', '选型', '理由'],
        ['框架', 'Next.js 16', 'SSR/SSG + API Routes 一体化'],
        ['样式', 'Tailwind CSS', '原子化 CSS，快速迭代'],
        ['数据库', 'Prisma + SQLite', '轻量级全栈方案，快速开发'],
        ['部署', 'Vercel', 'Next.js 官方平台，零配置部署'],
        ['协作', 'OpenClaw + 人工', 'AI 写代码，人做决策'],
    ]
    t = Table(data, colWidths=[40 * mm, 40 * mm, 70 * mm])
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), FONT_CN),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), COLOR_PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), HexColor('#FFFFFF')),
        ('BACKGROUND', (0, 1), (-1, -1), COLOR_LIGHT),
        ('GRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [COLOR_LIGHT, HexColor('#FFFFFF')]),
    ]))
    story.append(t)
    story.append(Spacer(1, 4 * mm))


def add_chapter2(story, styles):
    """制作过程时间线"""
    story.append(Paragraph('二、制作过程', styles['H1CN']))
    story.append(HRFlowable(width='100%', thickness=0.5, color=COLOR_BORDER, spaceAfter=6 * mm))

    story.append(Paragraph('2.1 Day 1：项目搭建（4 月 21 日）', styles['H2CN']))
    story.append(Paragraph(
        '用 OpenClaw 辅助创建 Next.js 项目框架，完成基础目录结构和依赖安装。'
        '确定了深蓝 + 央视红的品牌色调，搭建了首页、关于我们等核心页面的骨架。'
        '初步实现了 Navbar 导航和 Footer 页脚组件。',
        styles['Body']
    ))
    story.append(Paragraph(
        'npx create-next-app@latest yangxin-website --typescript --tailwind --app',
        styles['CodeCN']
    ))

    story.append(Paragraph('2.2 Day 2：功能开发与内容填充（4 月 22 日）', styles['H2CN']))

    story.append(Paragraph('数据库与管理后台', styles['H3CN']))
    story.append(Paragraph(
        '接入 Prisma ORM + SQLite，定义了 User、News、Case、Resource、Contact 五个数据模型。'
        '遇到了 Prisma 7 适配器兼容问题，回退到 Prisma 5 后解决。完成数据库迁移，'
        '创建默认管理员账号 admin/admin123。后台实现了新闻管理（含排序）、案例管理、资源管理、留言管理四个模块。',
        styles['Body']
    ))

    story.append(Paragraph('首屏重设计', styles['H3CN']))
    story.append(Paragraph(
        '初版首页存在 logo 过大、背景缺失、视觉杂乱等问题。参考世纪润华和翔龙云影等同业网站，'
        '重新规划了子目录导航结构，优化了首屏的视觉层次和品牌呈现。',
        styles['Body']
    ))

    story.append(Paragraph('内容修正与完善', styles['H3CN']))
    story.append(Paragraph(
        '修正了广告资源描述：CCTV-1《新闻30分》、CCTV-4《国家记忆》等具体节目时段。'
        '导航栏去掉"央视新闻"，改为"案例视频"+"服务案例"的下拉菜单结构。'
        '后台 logo 同步更新为白色版本。修复了 tags 双重序列化的 bug。',
        styles['Body']
    ))

    story.append(Paragraph('2.3 Day 3：数据填充、优化与部署（4 月 23 日）', styles['H2CN']))

    story.append(Paragraph('真实数据录入', styles['H3CN']))
    story.append(Paragraph(
        '从 Excel 导入 20 条央视广告资源数据，覆盖节目时段广告、主题套装广告、创意内容定制、新媒体广告四大类别。'
        '从 PDF 提取 11 条真实案例：京东、银联、长城汽车、汾酒、舍得酒、华润三九、佛山标准、好客山东、'
        '王守义十三香、捷途汽车、多彩云南。',
        styles['Body']
    ))

    story.append(Paragraph('UI 优化', styles['H3CN']))
    story.append(Paragraph(
        '完成了 6 项修改需求：导航栏去文字改为图标、'
        '"企业"改为"政企"、产品页接入 Excel 数据、资质图片替换、'
        '团队头像改为渐变色背景+SVG 图标（崔总徽章、曹总工牌、远总创意、刘总对话气泡）、'
        '文化图标改为纯色。Footer 去掉 logo 旁文字。后台登录页 logo 文字从白色改为黑色。',
        styles['Body']
    ))

    story.append(Paragraph('部署上线', styles['H3CN']))
    story.append(Paragraph(
        '代码推送到 GitHub 仓库 charmingzi/yangxin-website。首次推送因两个大视频文件（390MB+246MB）'
        '导致连接重置，通过删除 .git 重建历史解决。尝试 Cloudflare Pages 部署失败（Prisma+SQLite '
        '不兼容 Edge Runtime），最终部署到 Vercel。Vercel 构建时需要特殊处理：将 tsx '
        '从 devDependencies 移到 dependencies，build 脚本中加入 prisma generate && '
        'prisma db push && tsx prisma/seed.ts 流程，将 SQLite 数据库打包进部署。'
        '部署地址：https://yangxin-website.vercel.app',
        styles['Body']
    ))

    story.append(Paragraph('国内访问问题', styles['H3CN']))
    story.append(Paragraph(
        'Vercel 在国内因 DNS 污染无法直接访问。解决方案：购买自定义域名 + Cloudflare CDN 代理，'
        '通过 Cloudflare DNS 将域名指向 Vercel，利用 Cloudflare 的国内节点实现加速。'
        '域名方案待用户最终确定（.com 域名约 35-60 元/年）。',
        styles['Body']
    ))


def add_chapter3(story, styles):
    """前台页面展示"""
    story.append(Paragraph('三、前台页面展示', styles['H1CN']))
    story.append(HRFlowable(width='100%', thickness=0.5, color=COLOR_BORDER, spaceAfter=6 * mm))

    story.append(Paragraph('3.1 首页', styles['H2CN']))
    story.append(Paragraph(
        '首页以央视大楼为背景图，突出"CCTV AAAA级信用广告代理公司"的核心定位。'
        '导航栏采用深蓝品牌色，下拉菜单支持"案例视频"+"服务案例"二级导航。'
        '首屏下方展示核心业务、广告资源、经典案例、新闻动态等板块。',
        styles['Body']
    ))
    add_image(story, os.path.join(SCREENSHOTS, 'home.png'), '图 1：首页全页效果', styles, max_width=150 * mm)

    story.append(Paragraph('3.2 关于我们', styles['H2CN']))
    story.append(Paragraph(
        '展示公司简介、企业文化（使命/愿景/价值观）、核心团队（渐变色背景+SVG 图标）、'
        '资质荣誉等板块。团队头像采用了创意图标方案：每位成员对应独特的渐变色背景和 SVG 图标。',
        styles['Body']
    ))
    add_image(story, os.path.join(SCREENSHOTS, 'about.png'), '图 2：关于我们页面', styles, max_width=150 * mm)

    story.append(Paragraph('3.3 业务服务', styles['H2CN']))
    story.append(Paragraph(
        '展示公司的四大核心业务：央视黄金时段广告代理、融媒体全案传播、品牌战略咨询、'
        '创意内容制作。每个业务板块配有图标和详细说明。',
        styles['Body']
    ))
    add_image(story, os.path.join(SCREENSHOTS, 'services.png'), '图 3：业务服务页面', styles, max_width=150 * mm)

    story.append(PageBreak())

    story.append(Paragraph('3.4 广告资源', styles['H2CN']))
    story.append(Paragraph(
        '从后台数据库动态加载 20 条央视广告资源数据，支持按四大类别筛选：'
        '节目时段广告、主题套装广告、创意内容定制、新媒体广告。每条资源包含节目名称、时段、价格等信息。',
        styles['Body']
    ))
    add_image(story, os.path.join(SCREENSHOTS, 'resources.png'), '图 4：广告资源页面（支持分类筛选）', styles, max_width=150 * mm)

    story.append(Paragraph('3.5 案例展示', styles['H2CN']))
    story.append(Paragraph(
        '动态展示 11 条真实案例，包括京东、银联、长城汽车、汾酒、舍得酒等知名品牌。'
        '每个案例卡片包含品牌名称、服务类型和项目描述。',
        styles['Body']
    ))
    add_image(story, os.path.join(SCREENSHOTS, 'cases.png'), '图 5：案例展示页面', styles, max_width=150 * mm)

    story.append(Paragraph('3.6 新闻资讯', styles['H2CN']))
    story.append(Paragraph(
        '动态加载新闻列表，支持后台排序功能。新闻详情页展示完整内容。',
        styles['Body']
    ))
    add_image(story, os.path.join(SCREENSHOTS, 'news.png'), '图 6：新闻资讯页面', styles, max_width=150 * mm)

    story.append(PageBreak())

    story.append(Paragraph('3.7 联系我们', styles['H2CN']))
    story.append(Paragraph(
        '展示公司联系方式、地址，并提供在线留言表单。'
        '留言数据存入数据库，可在后台管理中查看。',
        styles['Body']
    ))
    add_image(story, os.path.join(SCREENSHOTS, 'contact.png'), '图 7：联系我们页面', styles, max_width=150 * mm)


def add_chapter4(story, styles):
    """后台管理展示"""
    story.append(Paragraph('四、后台管理系统', styles['H1CN']))
    story.append(HRFlowable(width='100%', thickness=0.5, color=COLOR_BORDER, spaceAfter=6 * mm))

    story.append(Paragraph('4.1 登录页面', styles['H2CN']))
    story.append(Paragraph(
        '后台登录页采用品牌蓝色调，中央卡片式布局。默认管理员账号：admin / admin123。',
        styles['Body']
    ))
    add_image(story, os.path.join(SCREENSHOTS, 'admin-login.png'), '图 8：后台登录页面', styles, max_width=150 * mm)

    story.append(Paragraph('4.2 管理仪表盘', styles['H2CN']))
    story.append(Paragraph(
        '登录后进入仪表盘，显示新闻、案例、资源、留言的统计数据。'
        '左侧导航栏可切换到各管理模块。',
        styles['Body']
    ))
    add_image(story, os.path.join(SCREENSHOTS, 'admin-dashboard.png'), '图 9：管理仪表盘', styles, max_width=150 * mm)

    story.append(Paragraph('4.3 内容管理', styles['H2CN']))
    story.append(Paragraph(
        '四个管理模块分别管理新闻、案例、资源和留言。支持新增、编辑、删除操作，'
        '新闻管理额外支持排序功能。资源管理从 Excel 导入了 20 条央视广告资源数据。',
        styles['Body']
    ))
    add_image(story, os.path.join(SCREENSHOTS, 'admin-news.png'), '图 10：新闻管理', styles, max_width=150 * mm)
    add_image(story, os.path.join(SCREENSHOTS, 'admin-cases.png'), '图 11：案例管理', styles, max_width=150 * mm)
    add_image(story, os.path.join(SCREENSHOTS, 'admin-resources.png'), '图 12：资源管理', styles, max_width=150 * mm)


def add_chapter5(story, styles):
    """数据统计"""
    story.append(Paragraph('五、数据统计', styles['H1CN']))
    story.append(HRFlowable(width='100%', thickness=0.5, color=COLOR_BORDER, spaceAfter=6 * mm))

    story.append(Paragraph('5.1 内容数据统计', styles['H2CN']))
    data = [
        ['模块', '数量', '说明'],
        ['广告资源', '20 条', '4 大类别：节目时段/主题套装/创意定制/新媒体'],
        ['服务案例', '11 条', '京东/银联/长城汽车/汾酒/舍得等'],
        ['新闻资讯', '1 条', '后续持续更新'],
        ['数据模型', '5 个', 'User/News/Case/Resource/Contact'],
        ['前台页面', '7 个', '首页/关于/服务/资源/案例/新闻/联系'],
        ['后台模块', '5 个', '仪表盘/新闻/案例/资源/留言'],
    ]
    t = Table(data, colWidths=[35 * mm, 25 * mm, 75 * mm])
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), FONT_CN),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), COLOR_PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), HexColor('#FFFFFF')),
        ('GRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER),
        ('ALIGN', (1, 0), (1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [COLOR_LIGHT, HexColor('#FFFFFF')]),
    ]))
    story.append(t)
    story.append(Spacer(1, 4 * mm))

    story.append(Paragraph('5.2 时间投入', styles['H2CN']))
    time_data = [
        ['日期', '主要工作', '耗时'],
        ['4 月 21 日', '项目初始化、框架搭建、基础页面', '约 4 小时'],
        ['4 月 22 日', '数据库接入、后台开发、首屏重设计、内容修正', '约 6 小时'],
        ['4 月 23 日', '数据填充、UI 优化、部署上线、排坑', '约 8 小时'],
        ['合计', '人机协作完成', '约 18 小时'],
    ]
    t2 = Table(time_data, colWidths=[30 * mm, 65 * mm, 30 * mm])
    t2.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), FONT_CN),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), COLOR_ACCENT),
        ('TEXTCOLOR', (0, 0), (-1, 0), HexColor('#FFFFFF')),
        ('GRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER),
        ('ALIGN', (2, 0), (2, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('BACKGROUND', (0, -1), (-1, -1), HexColor('#FEF2F2')),
    ]))
    story.append(t2)

    story.append(Paragraph('5.3 踩过的坑', styles['H2CN']))
    pitfalls = [
        'Prisma 7 适配器兼容问题 → 回退 Prisma 5 解决',
        'Git 推送 403 权限错误 → credential helper 配置修复',
        '大视频文件（390MB+246MB）导致 push 连接重置 → 删除 .git 重建历史',
        'Cloudflare Pages 不兼容 Prisma+SQLite → 改用 Vercel 部署',
        'Vercel 构建时 tsx 不在 dependencies → 从 devDependencies 移入',
        'Vercel 国内 DNS 污染无法访问 → 待配置自定义域名 + Cloudflare 代理',
        'Vercel 只读文件系统，SQLite 无法写入 → 后台增删改仅本地可用',
        'Playwright 截图 networkidle 超时 → 改用 domcontentloaded + 等待',
    ]
    for p in pitfalls:
        story.append(Paragraph(f'• {p}', styles['BulletCN']))


def add_chapter6(story, styles):
    """总结与展望"""
    story.append(Paragraph('六、总结与展望', styles['H1CN']))
    story.append(HRFlowable(width='100%', thickness=0.5, color=COLOR_BORDER, spaceAfter=6 * mm))

    story.append(Paragraph('6.1 经验总结', styles['H2CN']))
    lessons = [
        'AI 辅助开发效率极高：3 天内完成了传统方式需要 1-2 周的全栈网站开发',
        '先跑通再优化：首版页面虽粗糙，但验证了整体架构，后续迭代只是修数据和调样式',
        '部署要提前规划：Prisma+SQLite 的技术选型限制了部署平台选择，纯静态方案部署更灵活',
        '大文件是部署的敌人：视频文件导致 git push 失败，应早期配置 .gitignore',
        '国内访问是刚需：面向国内用户的网站，部署平台选择必须考虑国内可访问性',
    ]
    for l in lessons:
        story.append(Paragraph(f'• {l}', styles['BulletCN']))

    story.append(Paragraph('6.2 后续计划', styles['H2CN']))
    plans = [
        '购买自定义域名，配置 Cloudflare CDN 代理解决国内访问问题',
        '将 SQLite 迁移到 Turso 等云数据库，实现后台在线编辑',
        '补充更多案例和新闻内容，丰富网站信息量',
        '添加案例视频播放功能（当前视频文件因体积过大未上线）',
        '移动端响应式优化，确保手机端浏览体验',
        'SEO 优化，提升搜索引擎收录',
    ]
    for p in plans:
        story.append(Paragraph(f'• {p}', styles['BulletCN']))


def main():
    output_path = os.path.join(BASE_DIR, '央信合赢官网制作过程.pdf')
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=MARGIN,
        title='央信合赢官网制作过程',
        author='人机协作',
    )

    styles = create_styles()
    story = []

    add_cover(story, styles)
    add_chapter1(story, styles)
    add_chapter2(story, styles)
    add_chapter3(story, styles)
    add_chapter4(story, styles)
    add_chapter5(story, styles)
    add_chapter6(story, styles)

    doc.build(story)
    print(f'PDF 生成完成: {output_path}')
    size = os.path.getsize(output_path)
    print(f'文件大小: {size / 1024:.1f} KB')


if __name__ == '__main__':
    main()
