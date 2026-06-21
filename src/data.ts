import { Category, WallpaperPreset, CharacterPreset } from "./types";

export const WALLPAPER_PRESETS: WallpaperPreset[] = [

];

export const CHARACTER_PRESETS: CharacterPreset[] = [];

export const INITIAL_CATEGORIES: Category[] = [
  //科研工具
  {
    id: "tools",
    name: "科研工具",
    icon: "Wrench",
    description: "好用的科研工具",
    color: "from-amber-400 to-orange-500",
    links: [
      {
        id: "t1",
        name: "Ai2 Paper Finder",
        url: "https://asta.allen.ai/",
        logo: "asta.allen.ai",
        description: "Allen Institute提供的AI论文检索工具，可通过语义理解快速定位相关学术论文。",
        isPopular: true,
      },
      {
        id: "t2",
        name: "Sci-Hub",
        url: "https://www.sci-hub.pub/",
        logo: "www.sci-hub.pub",
        description: "一个具有争议性的论文获取平台，可绕过付费墙访问大量学术论文全文。",
        isPopular: true,
      },
      {
        id: "t3",
        name: "Semantic Scholar",
        url: "https://www.semanticscholar.org",
        logo: "semanticscholar.org",
        description: "AI驱动的学术搜索引擎，可智能提取论文关键信息并辅助理解研究内容。",
      },
      {
        id: "t4",
        name: "Book学术",
        url: "https://m.booksci.cn/",
        logo: "booksci.cn",
        description: "可使用积分求助付费文献，很多文献都能免费下载",
      },
      {
        id: "t5",
        name: "Citely",
        url: "https://citely.ai/",
        logo: "citely.ai",
        description: "AI驱动的文献引用与检索工具，可快速生成、分析和追踪学术引用关系。",
      },
      {
        id: "t6",
        name: "Scispace",
        url: "https://scispace.com/",
        logo: "scispace.com",
        description: "一站式AI科研平台，支持论文搜索、阅读解析、问答与学术写作辅助。",
      },
      {
        id: "t7",
        name: "Perplexity",
        url: "https://www.perplexity.ai/",
        logo: "www.perplexity.ai",
        description: "带引用来源的AI搜索引擎，可实时检索网络信息并生成结构化答案。",
      },
      {
        id: "t8",
        name: "FutureHouse",
        url: "https://platform.futurehouse.org/",
        logo: "futurehouse.org",
        description: "面向科研自动化的AI平台，提供文献分析、假设生成与“AI科学家”级研究代理能力。",
      },
      {
        id: "t9",
        name: "Elicit",
        url: "https://elicit.com/",
        logo: "elicit.com",
        description: "AI文献综述工具，可自动检索论文、提取信息并生成结构化研究证据表。",
      },
{
        id: "t10",
        name: "科研绘图配色推荐器",
        url: "https://lcpmgh.com",
        logo: "lcpmgh.com",
        description: "面向科研绘图的在线配色工具，提供多种预设顶刊配色方案，并支持自定义颜色组合与可视化预览。",
      },
    ]
  },
  //中文文献
  {
    id: "ch-lit",
    name: "中文文献",
    icon: "BookOpen",
    description: "国内顶级学术数据库与国家期刊",
    color: "from-amber-400 to-orange-500",
    links: [
      {
        id: "c1",
        name: "中国知网 CNKI",
        url: "https://www.cnki.net",
        logo: "cnki.net",
        description: "国内最权威的综合学术数据库，收录期刊、学位论文、会议论文等多类型文献资源。",
        isPopular: true,
      },
      {
        id: "c2",
        name: "万方数据",
        url: "https://www.wanfangdata.com.cn",
        logo: "wanfangdata.com.cn",
        description: "国内重要的学术信息平台，提供期刊、学位论文、专利、标准等多元化科技文献服务。",
      },
      {
        id: "c3",
        name: "维普期刊网",
        url: "http://www.cqvip.com",
        logo: "www.cqvip.com",
        description: "以中文科技期刊为核心的数据库，覆盖大量期刊论文并提供文献检索与分析服务。",
      },
      {
        id: "c4",
        name: "百度学术",
        url: "https://xueshu.baidu.com",
        logo: "xueshu.baidu.com",
        description: "免费的学术搜索引擎，聚合国内外论文资源，支持跨数据库快速检索与引用查询。",
      },
      {
        id: "c5",
        name: "国家哲学社会科学文献中心",
        url: "https://www.ncpssd.org/",
        logo: "www.ncpssd.org",
        description: "国家级公益学术平台，重点提供哲学社会科学领域的期刊、图书与开放获取文献。",

      },
      {
        id: "c6",
        name: "Pubscholar",
        url: "https://pubscholar.cn/",
        logo: "pubscholar.cn",
        description: "面向科研的免费文献发现平台，整合多来源学术资源，支持论文检索与开放获取链接。",
      }
    ]
  },
  //英文文献
  {
    id: "en-lit",
    name: "英文文献",
    icon: "Globe",
    description: "国际顶尖学术、学科核心期刊搜索",
    color: "from-blue-400 to-indigo-500",
    links: [
      {
        id: "e1",
        name: "Google Scholar",
        url: "https://scholar.google.com",
        logo: "scholar.google.com",
        description: "全球最大的综合性学术搜索引擎，可检索论文、引用与各类学术资源。",
        isPopular: true,
      },
      {
        id: "e2",
        name: "PubMed (PMC)",
        url: "https://pubmed.ncbi.nlm.nih.gov",
        logo: "pubmed.ncbi.nlm.nih.gov",
        description: "美国国家医学图书馆旗下数据库，专注生物医学与生命科学文献，PMC提供免费全文。",
      },
      {
        id: "e3",
        name: "arXiv 预印本库",
        url: "https://arxiv.org",
        logo: "arxiv.org",
        description: "全球知名预印本平台，涵盖物理、数学、计算机等领域，论文可在正式发表前公开获取。",
        isPopular: true,
      },
      {
        id: "e4",
        name: "IEEE Xplore",
        url: "https://ieeexplore.ieee.org",
        logo: "ieeexplore.ieee.org",
        description: "电气电子与计算机工程领域权威数据库，收录IEEE期刊、会议论文与技术标准。",
      },
      {
        id: "e5",
        name: "Web of Science",
        url: "https://www.webofscience.com",
        logo: "clarivate.com",
        description: "国际权威引文数据库，用于高水平期刊检索、文献计量分析与科研评价。",
      },
      {
        id: "e6",
        name: "X-mol",
        url: "https://www.x-mol.net/",
        logo: "x-mol.net",
        description: "科研社交与信息平台，提供学术资讯、论文推荐和科研交流服务。",
      },
      {
        id: "e7",
        name: "Scopus",
        url: "https://www.scopus.com",
        logo: "https://www.scopus.com",
        description: "Elsevier旗下大型摘要与引文数据库，覆盖多学科，用于科研分析与文献追踪。",
      },
      {
        id: "e8",
        name: "DOAJ",
        url: "https://doaj.org",
        logo: "doaj.org",
        description: "开放获取期刊目录数据库，收录全球高质量OA期刊，强调免费与开放出版。",
      },
      {
        id: "e9",
        name: "OpenAlex",
        url: "https://openalex.org/",
        logo: "openalex.org",
        description: "开放学术知识图谱数据库，提供论文、作者、机构等科研关系数据服务。",
      },
      {
        id: "e10",
        name: "ACS美国化学学会",
        url: "https://pubs.acs.org/",
        logo: "pubs.acs.org",
        description: "提供化学及相关交叉学科的高质量期刊、论文与开放获取资源。",
      },
      {
        id: "e11",
        name: "Europe PMC",
        url: "https://europepmc.org/",
        logo: "europepmc.org",
        description: "欧洲生命科学文献数据库，收录生物医学论文、预印本及专利等开放科研资源。",
      },
      {
        id: "e12",
        name: "Oatd",
        url: "https://oatd.org",
        logo: "oatd.org",
        description: "全球开放获取学位论文检索平台，汇集多国家高校的硕博论文资源。",
      },
            {
        id: "e13",
        name: "WeLib",
        url: "https://welib.org/",
        logo: "welib.org/",
        description: "一个提供电子书与学术资源检索与在线阅读的平台.",
      }
    ]
  },
  //科研绘图
  {
    id: "drawing",
    name: "科研绘图",
    icon: "FileSignature",
    description: "实测好用的绘图工具",
    color: "from-red-400 to-pink-500",
    links: [
      {
        id: "d1",
        name: "Plottie",
        url: "https://plottie.art/",
        logo: "plottie.art",
        description: "提供生物科研风格插图与可编辑SVG素材，用于论文与科研示意图制作。",
        isPopular: true,
      },
      {
        id: "d2",
        name: "Hiplot",
        url: "https://hiplot.cn/",
        logo: "hiplot.cn",
        description: "在线生信与数据可视化平台，支持上传数据快速生成多种科研图表。",
      },
      {
        id: "d3",
        name: "Bioart Source",
        url: "https://bioart.niaid.nih.gov/",
        logo: "bioart.niaid.nih.gov",
        description: "生物医学插画素材库，提供高质量科研插图与实验示意图资源。",
      },
      {
        id: "d4",
        name: "Bioicons",
        url: "https://bioicons.com/",
        logo: "bioicons.com",
        description: "生命科学领域的开源图标库，可免费下载用于科研绘图与论文示意图。",
      },
      {
        id: "d5",
        name: "Scidraw",
        url: "https://scidraw.io/",
        logo: "scidraw.io",
        description: "科研绘图资源社区，提供标准化生物医学实验与结构示意图素材。",
      },
      {
        id: "d6",
        name: "Biorender",
        url: "https://www.cleanpng.com/",
        logo: "cleanpng.com",
        description: "专业生命科学绘图平台，提供模板化工具快速生成论文级科研插图。",
      },
      {
        id: "d7",
        name: "ChiPlot",
        url: "https://www.chiplot.online/",
        logo: "chiplot.online",
        description: "科研图表模板与可视化平台，提供论文级标准图形快速生成与编辑功能。",
      },
      {
        id: "d8",
        name: "Flourish",
        url: "https://flourish.studio/",
        logo: "flourish.studio",
        description: "交互式数据可视化工具，可快速制作动态图表与网页级可视化展示。",
      },
      {
        id: "d9",
        name: "Graphpad",
        url: "https://www.graphpad.com/",
        logo: "graphpad.com",
        description: "经典科研统计绘图软件，广泛用于实验数据分析与论文级图表绘制。",
      },
      {
        id: "d10",
        name: "Biogdp",
        url: "https://biogdp.com/",
        logo: "biogdp.com",
        description: "科研图形模板与生物医学绘图资源平台，辅助快速生成论文标准示意图。",
      },
    ]
  },
  // 论文写作分类
  {
    id: "writing",
    name: "论文写作",
    icon: "GraduationCap",
    description: "选刊、润色、排版及写作全流程工具",
    color: "from-violet-400 to-purple-500",
    links: [
      //文献阅读
      {
        id: "w1",
        name: "文献阅读",
        url: "",
        description: "文献阅读与智能解析平台",
        isPopular: true,
        subLinks: [
          {
            id: "w1-1",
            name: "Shcolaread",
            url: "https://www.scholaread.cn/",
            logo: "www.scholaread.cn",
            description: "一站式论文阅读工具，提供高亮标注、翻译与AI辅助理解功能，提升文献阅读效率。"
          },
          {
            id: "w1-2",
            name: "Ponder",
            url: "https://ponder.ing/zh",
            logo: "ponder.ing",
            description: "AI学术阅读与知识整理工具，可对论文内容进行总结、提问与结构化理解。"
          },
          {
            id: "w1-3",
            name: "NoteBookLM",
            url: "https://notebooklm.google.com/",
            logo: "notebooklm.google.com",
            description: "Google推出的AI知识笔记工具，可基于文档进行总结、问答与知识整合。"
          },
          {
            id: "w1-4",
            name: "沉浸式翻译",
            url: "https://immersivetranslate.com",
            logo: "immersivetranslate.com",
            description: "浏览器双语对照翻译插件，支持网页与PDF实时翻译，提升外文文献阅读体验。"
          },
        ]
      },
      //模板句式
      {
        id: "w2",
        name: "模板句式",
        url: "",
        description: "学术写作句式库，覆盖论文各章节",
        isPopular: true,
        subLinks: [
          { id: "w2-1", name: "Manchester Academic Phrasebank", url: "https://www.phrasebank.manchester.ac.uk", logo: "manchester.ac.uk", description: "学术写作句式模板库，提供论文写作中常用表达与结构化语言参考。" },
          { id: "w2-2", name: "Ref-n-write", url: "https://www.ref-n-write.com", logo: "ref-n-write.com", description: "面向学术写作的 Word/文档插件，提供论文短语库、改写建议与跨文献表达参考。" },
          { id: "w2-3", name: "Citexs", url: "https://www.citexs.com/", logo: "www.citexs.com", description: "科研信息与论文分析平台，提供文献检索、趋势分析与学术资源整合服务。" },
          { id: "w2-4", name: "Sacred Heart Library", url: "https://library.sacredheart.edu/c.php?g=29803&p=185901", logo: "sacredheart.edu", description: "高校学术资源导航平台，提供数据库访问与研究学习支持服务。" },
          { id: "w2-5", name: "TTU Library Guides", url: "https://guides.library.ttu.edu/", logo: "library.ttu.edu", description: "学术研究指南平台，提供数据库使用、文献检索与研究方法指导资源。" },
        ]
      },
      //文献综述
      {
        id: "w3",
        name: "文献综述",
        url: "",
        description: "可视化文献关联图谱，快速梳理研究脉络",
        isPopular: true,
        subLinks: [
          {
            id: "w3-1",
            name: "Connected Papers",
            url: "https://www.connectedpapers.com",
            logo: "connectedpapers.com",
            description: "通过文献网络图可视化相关论文，帮助用户快速发现领域内关键研究与关联工作。"
          },
          {
            id: "w3-2",
            name: "ResearchRabbit",
            url: "https://www.researchrabbit.ai",
            logo: "researchrabbit.ai",
            description: "基于论文引用关系的智能文献探索工具，可构建研究网络并持续推荐相关新论文。"
          },
          {
            id: "w3-3",
            name: "Litmaps",
            url: "https://www.litmaps.com/",
            logo: "www.litmaps.com",
            description: "以时间线和引用网络为核心的文献追踪工具，帮助用户动态监控研究领域发展。"
          },
          {
            id: "w3-4",
            name: "Paper Digest",
            url: "https://www.paperdigest.org/",
            logo: "www.paperdigest.org",
            description: "AI驱动的论文摘要与解读工具，可快速提炼论文核心内容与研究贡献。"
          },
          {
            id: "w3-5",
            name: "Open Knowledge Maps",
            url: "https://openknowledgemaps.org/",
            logo: "openknowledgemaps.org",
            description: "开放学术知识图谱平台，以可视化方式展示研究主题及相关文献分布。"
          },
          {
            id: "w3-6",
            name: "Inciteful",
            url: "https://inciteful.xyz/",
            logo: "inciteful.xyz",
            description: "基于引用分析的文献发现工具，可生成论文关系网络并辅助构建研究脉络。"
          }
        ]
      },
      //选研究方法
      {
        id: "w4",
        name: "选研究方法",
        url: "",
        description: "研究方法选择与设计指导平台",
        subLinks: [
          { id: "w4-1", name: "MethodSpace", url: "https://www.methodspace.com", logo: "methodspace.com", description: "科研方法论社区平台，聚焦研究设计、方法学习与学术交流。" },
          { id: "w4-2", name: "Research Methodology Guide", url: "https://research-methodology.net", logo: "research-methodology.net", description: "系统化研究方法学习网站，涵盖定性、定量及混合研究方法框架。" },
          { id: "w4-3", name: "STAR Protocols", url: "https://www.cell.com", logo: "cell.com", description: "Cell Press旗下实验方法期刊，提供标准化可复现实验操作流程。" },
        ]
      },
      //润色修改
      {
        id: "w5",
        name: "润色修改",
        url: "",
        description: "AI学术论文润色，提升语言表达与学术规范",
        isPopular: true,
        subLinks: [
          { id: "w5-1", name: "Paperpal", url: "https://www.paperpal.com", logo: "paperpal.com", description: "AI学术写作助手，提供论文润色、语言优化与投稿级英文改写支持。" },
          { id: "w5-2", name: "QuillBot", url: "https://quillbot.com", logo: "quillbot.com", description: "AI改写与写作辅助工具，支持句子改写、摘要生成与语法优化。" },
          { id: "w5-3", name: "Grammarly", url: "https://www.grammarly.com", logo: "grammarly.com", description: "智能英文写作工具，提供语法检查、风格优化与学术写作建议。" },
          { id: "w5-4", name: "DeepL Write", url: "https://www.deepl.com/write", logo: "deepl.com", description: "高质量AI英文润色工具，强调语义自然性与学术表达流畅度优化。" },
        ]
      },
      //格式排版
      {
        id: "w6",
        name: "格式排版",
        url: "",
        description: "在线LaTeX编辑器，支持期刊模板一键排版",
        subLinks: [
          { id: "w6-1", name: "Overleaf", url: "https://www.overleaf.com", logo: "overleaf.com", description: "在线LaTeX编辑器，支持期刊模板一键排版" },
          { id: "w6-2", name: "Citation Machine", url: "https://www.citationmachine.net", logo: "citationmachine.net", description: "自动生成各格式引用，支持APA/MLA/Chicago" },
        ]
      },
      //选刊神器
      {
        id: "w7",
        name: "选刊神器",
        url: "",
        description: "根据研究领域智能推荐最适合的投稿期刊",
        isPopular: true,
        subLinks: [
          {
            id: "w7-1",
            name: "Journal Finder (Elsevier)",
            url: "https://journalfinder.elsevier.com",
            logo: "elsevier.com",
            description: "Elsevier官方选刊工具，输入摘要自动推荐期刊"
          },
          {
            id: "w7-2",
            name: "Springer Journal Suggester",
            url: "https://journalsuggester.springer.com",
            logo: "springer.com",
            description: "Springer官方期刊推荐，支持标题摘要智能匹配"
          },
          {
            id: "w7-3",
            name: "Jane",
            url: "https://jane.biosemantics.org",
            logo: "jane.biosemantics.org",
            description: "生物医学领域期刊推荐，基于PubMed语义匹配"
          },
        ]
      },
    ]
  },
  //文献管理
  {
    id: "management",
    name: "文献管理",
    icon: "Layers",
    description: "收藏引用梳理、多设备云同步与论文插表",
    color: "from-lime-400 to-green-500",
    links: [
      {
        id: "m1",
        name: "Zotero",
        url: "https://www.zotero.org",
        logo: "zotero.org",
        description: "免费开源的文献管理工具，支持一键抓取文献、自动生成引用与构建个人知识库。",
        isPopular: true,
      },
      {
        id: "m2",
        name: "EndNote",
        url: "https://endnote.com",
        logo: "endnote.com",
        description: "专业级文献管理软件，广泛用于科研写作与期刊投稿，支持强大的引用与格式管理功能。",
      },
      {
        id: "m3",
        name: "Mendeley",
        url: "https://www.mendeley.com",
        logo: "mendeley.com",
        description: "集文献管理与学术社交于一体的平台，可同步论文、生成引用并发现相关研究。",
      }
    ]
  },
  //基金项目
  {
    id: "funds",
    name: "基金项目",
    icon: "Coins",
    description: "科研金主、国家级青年重点面上资助立项查询",
    color: "from-slate-400 to-slate-500",
    links: [
      {
        id: "f1",
        name: "国家自然科学基金 NSFC",
        url: "https://www.nsfc.gov.cn",
        logo: "www.nsfc.gov.cn",
        description: "中国科研人员最常申请的高质量项目资助官网平台",
        isPopular: true,
      },
      {
        id: "f2",
        name: "ISISNSFC 信息系统",
        url: "https://grants.nsfc.gov.cn",
        logo: "grants.nsfc.gov.cn",
        description: "自然科学基金立项跟踪、查阅资助比例及填写结项书入口",
      },
      {
        id: "f3",
        name: "MedPeer",
        url: "https://user.medpeer.cn",
        logo: "medpeer.cn",
        description: "面向科研人员的国自然项目数据与分析平台，提供基金热点挖掘与选题辅助功能。",
      },
      {
        id: "f4",
        name: "国家自然科学基金大数据门户",
        url: "https://kd.nsfc.cn/",
        logo: "kd.nsfc.cn",
        description: "国家自然科学基金官方数据平台，用于项目检索、统计分析与科研合作关系挖掘。",
      },
      {
        id: "f5",
        name: "国社科基金项目数据库",
        url: "https://fz.people.com.cn",
        logo: "fz.people.com.cn",
        description: "国家社会科学基金项目检索系统，提供社科类立项项目、成果与研究方向查询服务。",
      },
      {
        id: "f6",
        name: "青塔.自科云",
        url: "https://fund.cingta.com/",
        logo: "fund.cingta.com",
        description: "科研大数据分析平台，覆盖全球基金项目数据，支持选题分析与资助趋势挖掘。",
      },
      {
        id: "f7",
        name: "科学网基金",
        url: "https://fund.sciencenet.cn/",
        logo: "fund.sciencenet.cn",
        description: "面向科研人员的基金信息与申报辅助平台，提供项目动态与申报资讯整合服务。",
      },
      {
        id: "f8",
        name: "再问科研",
        url: "https://www.izaiwen.cn/",
        logo: "www.izaiwen.cn",
        description: "AI驱动的科研问答与选题工具，可基于基金数据进行研究方向推荐与问题解析。",
      },
    ]
  },
  //效率工具
  {
    id: "efficiency",
    name: "效率工具",
    icon: "FolderSync",
    description: "实测好用的效率工具",
    color: "from-slate-400 to-slate-500",
    links: [
      {
        id: "e1",
        name: "百度脑图",
        url: "https://naotu.baidu.com",
        logo: "naotu.baidu.com",
        description: "在线思维导图工具，可快速创建、整理和分享结构化知识与思维框架。",
        isPopular: true,
      },
      {
        id: "e2",
        name: "Simpletex",
        url: "https://simpletex.cn/",
        logo: "simpletex.cn",
        description: "AI数学公式识别与转换工具，可将图片中的公式快速转为LaTeX或可编辑文本。",
        isPopular: true,
      },
      {
        id: "e3",
        name: "EasyScholar",
        url: "https://www.easyscholar.cc/",
        logo: "easyscholar.cc",
        description: "快速判断文献是否值得读的浏览器扩展插件",
        isPopular: true,
      },
      {
        id: "e4",
        name: "Vectorizer",
        url: "https://vectorizer.com/zh/",
        logo: "vectorizer.com",
        description: "在线位图转矢量工具，可将PNG/JPG图片一键转换为可编辑的SVG矢量图形。",
        isPopular: true,
      },
      {
        id: "e5",
        name: "Goblin.tools",
        url: "https://goblin.tools/",
        logo: "goblin.tools",
        description: "输入任务会被细化为具体步骤并进行时间规划",
        isPopular: true,
      },
      {
        id: "e6",
        name: "Napkin",
        url: "https://www.napkin.ai/",
        logo: "napkin.ai",
        description: "AI驱动的可视化工具，可将文本、想法或内容快速转化为结构化图示与视觉表达。",
        isPopular: true,
      },
      {
        id: "e7",
        name: "Drawnix",
        url: "https://drawnix.com/",
        logo: "drawnix.com",
        description: "在线白板与流程图工具，支持自由绘图、结构化表达与多人协作设计。",
        isPopular: true,
      },
      {
        id: "e8",
        name: "Draw.io",
        url: "https://app.diagrams.net",
        logo: "app.diagrams.net",
        description: "经典免费流程图与架构图工具，支持本地与云端存储，适合专业图表绘制。",
        isPopular: true,
      },
      {
        id: "e9",
        name: "ChartCube",
        url: "https://chartcube.alipay.com",
        logo: "alipay.com",
        description: "蚂蚁推出的数据可视化工具，可快速生成标准化图表与业务分析图形。",
        isPopular: true,
      },
      {
        id: "e10",
        name: "优品PPT",
        url: "https://www.ypppt.com/",
        logo: "www.ypppt.com",
        description: "免费PPT模板资源平台，提供大量高质量演示文稿模板与设计素材下载。",
        isPopular: true,
      },
      {
        id: "e11",
        name: "RoboNeo",
        url: "https://www.roboneoai.art/",
        logo: "www.roboneoai.art",
        description: "AI艺术与创意生成工具，可将文本或想法转化为视觉作品与数字艺术内容。",
      },
    ],
  },
];
