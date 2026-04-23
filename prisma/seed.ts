import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("开始初始化数据...");

  // Create default admin
  const existing = await prisma.admin.findUnique({ where: { username: "admin" } });
  if (!existing) {
    const hashed = await bcrypt.hash("admin123", 10);
    await prisma.admin.create({
      data: { username: "admin", password: hashed, name: "管理员" },
    });
    console.log("✓ 默认管理员创建成功: admin / admin123");
  } else {
    console.log("- 管理员已存在，跳过");
  }

  // Seed resources with full Excel data
  const existingResources = await prisma.resource.count();
  if (existingResources === 0) {
    const resources = [
      // === 节目时段广告 ===
      { name: "CCTV-1《朝闻天下》后", category: "节目时段广告", channel: "CCTV-1", program: "朝闻天下", timeSlot: "约 08:32", description: "早间收视强点，权威新闻、生活服务内容全覆盖，紧邻\"品牌强国工程\"时段，触达政府官员、商界精英和家庭消费人群", price: "5秒: 38,000 | 10秒: 55,000 | 15秒: 68,000 | 20秒: 92,000 | 30秒: 123,000", note: "刊例价格截止至2026年12月31日", isHot: true, sort: 1 },
      { name: "CCTV-1《上午精品节目》前", category: "节目时段广告", channel: "CCTV-1", program: "上午精品节目", timeSlot: "约 09:23", description: "热播大剧重播时间，开启总台热播大剧重播，形成上午收视高峰，精准触达家庭消费人群", price: "5秒: 29,000 | 10秒: 44,000 | 15秒: 54,000 | 20秒: 74,000 | 30秒: 98,000", note: "刊例价格截止至2026年12月31日", isHot: false, sort: 2 },
      { name: "CCTV-1《新闻30分》后", category: "节目时段广告", channel: "CCTV-1", program: "新闻30分", timeSlot: "约 12:32", description: "午间新闻时段，\"中南海的新闻午餐\"，触达办公人群和家庭午餐人群", price: "5秒: 63,000 | 10秒: 96,000 | 15秒: 119,000 | 20秒: 162,000 | 30秒: 214,000", note: "刊例价格截止至2026年12月31日", isHot: true, sort: 3 },
      { name: "CCTV-1《第一情感剧场》第三集贴片", category: "节目时段广告", channel: "CCTV-1", program: "第一情感剧场", timeSlot: "约 14:00-16:00", description: "下午剧场时段，触达家庭主妇和休闲人群，延续热播剧收视热潮", price: "5秒: 36,000 | 10秒: 55,000 | 15秒: 69,000 | 20秒: 93,000 | 30秒: 124,000", note: "刊例价格截止至2026年12月31日", isHot: false, sort: 4 },
      { name: "CCTV-1《18点精品节目》前", category: "节目时段广告", channel: "CCTV-1", program: "18点精品节目", timeSlot: "约 17:58-18:20", description: "傍晚家庭时段，\"傍晚第一家庭时间\"，触达下班人群和家庭晚餐人群", price: "5秒: 45,000 | 10秒: 66,000 | 15秒: 83,000 | 20秒: 112,000 | 30秒: 148,000", note: "刊例价格截止至2026年12月31日", isHot: false, sort: 5 },
      { name: "CCTV-4《国家记忆》/《记住乡愁》", category: "节目时段广告", channel: "CCTV-4", program: "国家记忆/记住乡愁", timeSlot: "首播 20:00-20:30", description: "晚间黄金文化节目带，触达文化素养较高的观众，提供深度文化背书", price: "5秒: 83,000 | 10秒: 120,000 | 15秒: 148,000 | 30秒: 266,000", note: "刊例价格截止至2026年12月31日", isHot: true, sort: 6 },
      { name: "CCTV-4《黄金季播节目带》", category: "节目时段广告", channel: "CCTV-4", program: "黄金季播节目带", timeSlot: "周六 20:00", description: "周末黄金时段，每周六晚20点CCTV-4黄金季播栏目档，展现文旅新气象、文化新表达", price: "5秒: 83,000 | 10秒: 120,000 | 15秒: 148,000 | 30秒: 266,000", note: "刊例价格截止至2026年12月31日", isHot: false, sort: 7 },

      // === 主题套装广告 ===
      { name: "CCTV-1《新闻套》", category: "主题套装广告", channel: "CCTV-1", program: "新闻套", timeSlot: "约 08:32、12:32、17:58-18:20", description: "全天三大新闻时段组合：朝闻天下后、新闻30分后、18点精品节目前，单日触达1600万+人次，提供权威背书", price: "5秒: 116,000 | 10秒: 176,000 | 15秒: 218,000 | 20秒: 296,000 | 30秒: 392,000", note: "刊例价格截止至2026年12月31日", isHot: true, sort: 8 },
      { name: "CCTV-1《MINI套》", category: "主题套装广告", channel: "CCTV-1", program: "MINI套", timeSlot: "约 08:32、14:00-16:00、17:58-18:00", description: "全天多元节目覆盖，影响最广泛受众，高频次大声量传播，单日触达超千万人次", price: "5秒: 95,200 | 10秒: 140,800 | 15秒: 176,000 | 20秒: 237,600 | 30秒: 316,000", note: "刊例价格截止至2026年12月31日", isHot: false, sort: 9 },
      { name: "CCTV-1《剧场套》", category: "主题套装广告", channel: "CCTV-1", program: "剧场套", timeSlot: "约 09:23、14:00-16:00、17:58-18:00", description: "聚焦剧场观众，深度触达家庭消费人群，延续热播剧社会话题热潮", price: "5秒: 88,000 | 10秒: 132,000 | 15秒: 164,800 | 20秒: 223,200 | 30秒: 296,000", note: "刊例价格截止至2026年12月31日", isHot: false, sort: 10 },
      { name: "CCTV-1《全天套》", category: "主题套装广告", channel: "CCTV-1", program: "全天套", timeSlot: "约 08:32、09:23、14:00-16:00、17:58-18:00", description: "全方位覆盖，最大范围触达各类人群，实现品牌全天候曝光", price: "5秒: 118,400 | 10秒: 176,000 | 15秒: 219,200 | 20秒: 296,800 | 30秒: 394,400", note: "刊例价格截止至2026年12月31日", isHot: true, sort: 11 },
      { name: "CCTV-1 2026全国两会特别套装", category: "主题套装广告", channel: "CCTV-1", program: "两会特别套装", timeSlot: "两会期间", description: "全国两会期间特别套装，触达关注时政的高端人群，提供最高级别政治背书", price: "5秒: 1,350,000 | 10秒: 2,020,000 | 15秒: 2,520,000（8天总计，播出不少于32次）", note: "刊例价格截止至2026年3月31日，包含增值服务", isHot: false, sort: 12 },
      { name: "2026年全国糖酒会融媒体特别套装", category: "主题套装广告", channel: "多平台", program: "糖酒会特别套装", timeSlot: "糖酒会期间", description: "糖酒会期间融媒体套装，触达行业专业人士，实现跨平台整合传播", price: "5秒: 203,000 | 10秒: 308,000 | 15秒: 378,000 | 20秒: 518,000 | 30秒: 686,000", note: "刊例价格截止至2026年4月30日，包含增值服务", isHot: false, sort: 13 },

      // === 创意内容定制 ===
      { name: "CCTV-4《国家记忆》联合制作特别项目", category: "创意内容定制", channel: "CCTV-4", program: "国家记忆", timeSlot: "定制", description: "联合制作特别项目，深度品牌内容植入，提供国家级文化背书", price: "120万/期", note: "刊例价格截止至2026年12月31日", isHot: true, sort: 14 },
      { name: "央视频特别项目", category: "创意内容定制", channel: "央视频", program: "央视频", timeSlot: "定制", description: "央视频平台定制内容项目，触达年轻化、数字化观众群体", price: "460万（套装价格，包含：一场直播推流 + 10天焦点图广告 + 10天信息流广告）", note: "刊例价格截止至2026年12月31日", isHot: false, sort: 15 },
      { name: "CCTV-4《走遍中国》内容定制特别项目", category: "创意内容定制", channel: "CCTV-4", program: "走遍中国", timeSlot: "定制", description: "文化旅游内容定制，展示城市/品牌故事，提供深度文旅传播", price: "60万/期", note: "刊例价格截止至2026年12月31日", isHot: false, sort: 16 },

      // === 新媒体广告 ===
      { name: "《探厂·探店·探城》定制新媒体直播", category: "新媒体广告", channel: "新媒体", program: "探厂探店探城", timeSlot: "定制", description: "定制新媒体直播，实地探访展示，提供真实体验式传播", price: "央视新闻: 500万起 | 央视财经: 300万起 | 央视频: 300万起 | 央视网: 200万起", note: "刊例价格截止至2026年12月31日，不含制作费等", isHot: true, sort: 17 },
      { name: "《超级现场》定制新媒体直播", category: "新媒体广告", channel: "新媒体", program: "超级现场", timeSlot: "定制", description: "大型活动定制直播，提供沉浸式活动传播体验", price: "定制直播: 央视财经300万起/央视频300万起/央视网200万起 | 直播推流: 央视财经150万起/央视频150万起/央视网120万起", note: "刊例价格截止至2026年12月31日，不含制作费等", isHot: false, sort: 18 },
      { name: "《品牌有故事》定制新媒体短视频", category: "新媒体广告", channel: "新媒体", program: "品牌有故事", timeSlot: "定制", description: "品牌故事短视频定制，提供情感化、故事化品牌传播", price: "根据客户需求及预算单独核算，由中央广播电视总台出具专项方案", note: "需项目方案确认", isHot: false, sort: 19 },
      { name: "总台新媒体矩阵", category: "新媒体广告", channel: "总台新媒体", program: "新媒体矩阵", timeSlot: "多平台", description: "总台旗下新媒体平台整合投放，实现跨平台、全媒体传播覆盖", price: "根据投放平台、时长、频次定制报价", note: "需项目方案确认", isHot: false, sort: 20 },
    ];
    for (const r of resources) {
      await prisma.resource.create({ data: r });
    }
    console.log(`✓ 央视资源数据初始化完成 (${resources.length}条)`);
  } else {
    console.log("- 资源已存在，跳过");
  }

  // Seed default news
  const existingNews = await prisma.news.count();
  if (existingNews === 0) {
    await prisma.news.create({
      data: {
        title: "央信合赢闪耀亮相2025中国国际广告节",
        source: "公司官网",
        type: "company",
        content: "第32届中国国际广告节与第34届亚洲广告大会于2025年10月24日至26日在北京中关村国际创新中心盛大举行。盛会吸引来自全球30多个国家的200余位行业代表齐聚海淀，共同见证这场广告业的国际盛会。\n\n央信合赢（北京）文化传媒有限公司以央视4A级广告代理公司的身份精彩亮相，全面展示独家代理的央视核心优质资源，成为展会现场备受关注的焦点。\n\n展位现场，央信合赢团队与与会品牌代表、行业专家进行了深度交流，探讨品牌传播新趋势及未来合作前景。公司独家代理的《朝闻天下》、《新闻30分》等新闻资源，以及《国家记忆》、《深度国际》等央视黄金档节目广告资源，吸引了众多品牌方的重点关注。",
      },
    });
    console.log("✓ 新闻数据初始化完成");
  } else {
    console.log("- 新闻已存在，跳过");
  }

  // Seed cases
  const existingCases = await prisma.case.count();
  if (existingCases === 0) {
    const cases = [
      { title: "京东集团-乡村振兴典范品牌强国专案", category: "品牌强国工程", tags: "[\"品牌强国\",\"乡村振兴\",\"京东\"]", channel: "CCTV-1", year: "2022", description: "依托总台\"乡村振兴典范\"专属传播名义，为京东重点单元核心资源拉满宣传，实现京东多年未果的传播诉求，资源使用更灵活，实现全方位全媒体助力京东助农强农事业布局。", color: "#1464c8", sort: 1 },
      { title: "中国银联-品牌强国工程", category: "品牌强国工程", tags: "[\"品牌强国\",\"银联\",\"央视代理\"]", channel: "CCTV-1", year: "2021", description: "作为银联的\"品牌强国合作伙伴\"，我司连续2年服务银联央视品牌强国工程，协调《朝闻天下》近3分钟\"银联消费季\"报道，建党百年当天头条推送银联，实现重点月金融行业投放最优效果。", color: "#1464c8", sort: 2 },
      { title: "长城汽车-WEY世界杯天下足球节目冠名", category: "世界杯营销", tags: "[\"世界杯\",\"独家冠名\",\"汽车\",\"WEY\"]", channel: "CCTV", year: "2018", description: "长城汽车捆绑足球精神实现营销升级，通过谈判实现权益升级。冠名《天下足球我WEY球狂》，定制4个约8分钟短片与10个约1分钟短片，融合足球精神、代言人C罗。世界杯期间高频曝光，声量居汽车行业之首。", color: "#1464c8", sort: 3 },
      { title: "王守义十三香-生活圈冠名", category: "节目合作", tags: "[\"独家冠名\",\"十三香\",\"调味品\"]", channel: "CCTV-1", year: "2020", description: "我司代理冠名CCTV-1早间节目《生活圈》，包括9项权益，单期植入时长约13分钟。2020年合作60秒长版本广告首次登陆CCTV-1，三个版本广告片轮换播出，从不同角度讲述十三香的品牌故事。", color: "#1464c8", sort: 4 },
      { title: "舍得酒-开年大剧《人世间》", category: "节目合作", tags: "[\"开年大剧\",\"节目植入\",\"舍得\",\"白酒\"]", channel: "CCTV-1", year: "2022", description: "央视2022年开年大剧《人世间》吸引高达3.1亿观众收看，举全国网收视冠军。舍得酒作为CCTV-1开年大剧《人世间》荣誉品牌，借助总台大剧实现品牌声量突破。", color: "#1464c8", sort: 5 },
      { title: "捷途汽车-走遍中国指定用车", category: "节目合作", tags: "[\"指定用车\",\"捷途\",\"汽车\",\"走遍中国\"]", channel: "CCTV-4", year: "2019", description: "捷途合作CCTV-4《走遍中国》指定用车项目，助力打造\"旅行+\"生态圈。5大权益：名义授权、5S指定用车标版、15S企业硬广、片尾鸣谢、宣传片权益。2019年共计执行完成7期内容植入。", color: "#1464c8", sort: 5 },
      { title: "华润三九-公益健康大使", category: "特殊名义", tags: "[\"公益\",\"健康\",\"三九\",\"感冒药\"]", channel: "CCTV-1", year: "2021", description: "合作CCTV公益健康大使，\"流感季节别感冒\"朗朗上口广泛流传。联合企业制作科学防治流感广告片和主题公益广告片，IP联动999少儿感冒熊出没版广告在CCTV-1《熊出没》动画片前后点位播出。", color: "#1464c8", sort: 6 },
      { title: "汾酒-民族匠心品牌", category: "民族匠心品牌", tags: "[\"民族匠心\",\"白酒\",\"汾酒\"]", channel: "CCTV-1", year: "2022", description: "汾酒连续4年合作\"央视中国白酒民族匠心品牌\"。\"骨子里的中国\"深入人心。为汾酒找寻最贴合\"文化定位\"的S级项目，参与《启航2019》独家特约、《朗读者》、《遇见大咖》等节目录制。", color: "#1464c8", sort: 7 },
      { title: "好客山东-文旅品牌", category: "文旅品牌", tags: "[\"文旅\",\"好客山东\",\"区域品牌\"]", channel: "CCTV-1", year: "2022", description: "十年服务\"好客山东\"，见证品牌从诞生到经典。定期提供策略支持，在主流媒体发布公关软文，在《新闻联播》等权威新闻报道。乡村振兴、黄河流域生态保护主题宣传，每个地市5秒-10秒组合60秒集群广告。", color: "#1464c8", sort: 7 },
      { title: "多彩贵州-文旅品牌", category: "文旅品牌", tags: "[\"文旅\",\"贵州\",\"品牌强国工程\"]", channel: "CCTV-1/4等多频道", year: "2025", description: "十年来服务多彩贵州央视品牌宣传，2025年贵州入选品牌强国工程计划，聚集贵州省内文旅、农业、经济品牌宣传。", color: "#1464c8", sort: 8 },
      { title: "佛山标准-区域公共品牌", category: "区域品牌", tags: "[\"区域品牌\",\"佛山标准\",\"集群广告\"]", channel: "CCTV-1", year: "2022", description: "首个亮相中央媒体平台的地级市制造业区域公共品牌。\"5秒企业+5秒政府\"集群形式亮相CCTV-1《新闻30分》后及CCTV-4《国家记忆》，集结美的、简一、万和、蒙娜丽莎等品牌。", color: "#1464c8", sort: 9 },
    ];
    for (const c of cases) {
      await prisma.case.create({ data: c });
    }
    console.log(`✓ 案例数据初始化完成 (${cases.length}条)`);
  } else {
    console.log("- 案例已存在，跳过");
  }

  console.log("\n初始化完成！");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
