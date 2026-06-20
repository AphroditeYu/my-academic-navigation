import React, { useState, useEffect, useRef } from "react";
import {
  Wrench,
  BookOpen,
  Globe,
  FileSignature,
  Search,
  Layers,
  FolderSync,
  MessageSquare,
  GraduationCap,
  Coins,
  Settings,
  Plus,
  Trash2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ExternalLink,
  ChevronRight,
  Info,
  Users,
  Clock,
  Sparkles,
  HelpCircle,
  X,
  Heart,
  Music,
  Check,
  RotateCcw,
  CloudSun,
  AlertCircle,
  ArrowRight,
  Phone
} from "lucide-react";
import MusicPlayer from "./MusicPlayer";
import { Category, CharacterPreset, ChatHistoryItem, CustomBookmark } from "./types";
import { INITIAL_CATEGORIES, CHARACTER_PRESETS } from "./data";
export default function App() {
  // Navigation & Category Filtering
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchEngine, setSearchEngine] = useState<string>("site"); // site, bing, google, wanfang, baidu, xmol, pubmed, github, translate

  // Custom Bookmarks State
  const [customBookmarks, setCustomBookmarks] = useState<CustomBookmark[]>(() => {
    try {
      const stored = localStorage.getItem("custom_bookmarks");
      return stored ? JSON.parse(stored) : [
        { id: "cb1", categoryId: "tools", name: "学术猫论坛", url: "https://xueshumao.com", description: "次元主人的秘密科学基地" }
      ];
    } catch {
      return [];
    }
  });

  // New custom bookmark modal inputs
  const [showAddBookmark, setShowAddBookmark] = useState(false);
  const [newBookmarkName, setNewBookmarkName] = useState("");
  const [newBookmarkUrl, setNewBookmarkUrl] = useState("");
  const [newBookmarkDesc, setNewBookmarkDesc] = useState("");
  const [newBookmarkCategory, setNewBookmarkCategory] = useState("tools");

  // Chat & Scholar Companion State
  const [currentCharacterId, setCurrentCharacterId] = useState<string>("yukari");
  const [chatHistory, setChatHistory] = useState<Record<string, ChatHistoryItem[]>>(() => {
    return {
      yukari: [
        {
          id: "init1",
          sender: "companion",
          text: "欢迎回来，大师主人！(✿＞◡＜) 小希今天也准备好了顶级算力，要陪主人一起攻克那篇厉害的学术论文哦！主人加油！有什么词句需要我翻译、润色或者简单解释的，尽管交给我吧！",
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        }
      ],
      reina: [
        {
          id: "init2",
          sender: "companion",
          text: "哼，你终于想起要做学术了吗？(ー`´ー) 真是的。动作快一点，把你的文章草稿拿过来，我帮你批注。别误会，我只是见不得粗糙的研究罢了！",
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        }
      ],
      mona: [
        {
          id: "init3",
          sender: "companion",
          text: "欢迎踏入寻求星穹誓约的科学图书馆，奥术同盟者！✦☆(๑✪▽✪๑)☆✦ 今天要施展何种阶位的检索仪式？萌娜乐意为您调制学术咒语！",
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
  });
  const [chatInput, setChatInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [companionAction, setCompanionAction] = useState<string>("chat"); // chat, translate, polish, explain
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Live System State
  const [currentTime, setCurrentTime] = useState<string>("");
  const [systemPing, setSystemPing] = useState<number>(31);

  // Navigation Sidebar collapsed on mobile
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Expand/Collapse all categories
  const [allCategoriesExpanded, setAllCategoriesExpanded] = useState<boolean>(true);

  const [writingExpanded, setWritingExpanded] = useState<boolean>(false);
  const [selectedWritingSubId, setSelectedWritingSubId] = useState<string | null>(null);

  // Search Engine Translation / Input Redirection
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(true);

  // Modals & popups
  const [activeModal, setActiveModal] = useState<"about" | "qr" | "group" | "cooperation" | null>(null);

  // Diandian Cat Images State
  const [diandianIndex, setDiandianIndex] = useState<number>(0);
  const [diandianPets, setDiandianPets] = useState<number>(0);
  const ASSETS_BASE_URL = "https://mysite-1316679115.cos.ap-guangzhou.myqcloud.com";
  const diandianImages = [
    {
      src: `${ASSETS_BASE_URL}/images/diandian_pose1.jpg`,
      description: ""
    },
    {
      src: `${ASSETS_BASE_URL}/images/diandian_pose2.jpg`,
      description: ""
    },
    {
      src: `${ASSETS_BASE_URL}/images/diandian_pose3.jpg`,
      description: ""
    },
    {
      src: `${ASSETS_BASE_URL}/images/diandian_pose4.jpg`,
      description: ""
    },
    {
      src: `${ASSETS_BASE_URL}/images/diandian_pose5.jpg`,
      description: ""
    },
    {
      src: `${ASSETS_BASE_URL}/images/diandian_pose6.jpg`,
      description: ""
    },
    {
      src: `${ASSETS_BASE_URL}/images/diandian_pose7.jpg`,
      description: ""
    },
    {
      src: `${ASSETS_BASE_URL}/images/diandian_pose8.jpg`,
      description: ""
    }
  ];

  // Music Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [currentAudioProgress, setCurrentAudioProgress] = useState<number>(35); // simulated percent
  const tracks = [
    { title: "Cyberpunk Lofi for Coding", artist: "Virtual Yukari", duration: "3:45", color: "bg-anime-pink" },
    { title: "Neuroscience Garden Loop", artist: "Reina_Ambient", duration: "4:12", color: "bg-anime-purple" },
    { title: "Galactic Truth Summoning", artist: "Mona_Witchcore", duration: "5:08", color: "bg-anime-blue" }
  ];

  // Daily Academic Divination Fortune
  const [academicFortune, setAcademicFortune] = useState<{ fortune: string; tip: string; rate: string }>({
    fortune: "太甚大吉 (Awesome!)",
    tip: "论文投递一审通过概率提升 88%，非常适合爆肝论文大纲！",
    rate: "✦✦✦✦✦"
  });

  // Track active companion details
  const selectedCharacter = CHARACTER_PRESETS.find(c => c.id === currentCharacterId) || CHARACTER_PRESETS[0];

  // Initialize clock and simulation loops
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("zh-CN", { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    // Weather and ping fluctuation simulation
    const telemetryInterval = setInterval(() => {
      setSystemPing(prev => Math.max(12, Math.min(99, prev + (Math.random() > 0.5 ? 4 : -4))));
      setCurrentAudioProgress(prev => {
        if (!isPlaying) return prev;
        const next = prev + 1;
        return next > 100 ? 0 : next;
      });
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(telemetryInterval);
    };
  }, [isPlaying]);

  // Scroll to bottom on dynamic chat additions
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, currentCharacterId, isTyping]);

  // 猫咪图片自动轮播，每10秒切换一张
  useEffect(() => {
    const timer = setInterval(() => {
      setDiandianIndex(prev => (prev + 1) % diandianImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [diandianImages.length]);

  // Generate a random academic divination
  const refreshFortune = () => {
    const fortunes = [
      { fortune: "学术大吉!! 🌸", tip: "写完的论文语句十分通顺，审稿人心情极佳，宜多喝温水、爆肝草稿！", rate: "✦✦✦✦✦" },
      { fortune: "灵感泉涌!! 💡", tip: "突然想到了极其精妙的研究方向。建议找娇羞的【冷雅】润色一番！", rate: "✦✦✦✦" },
      { fortune: "中规中矩 🍵", tip: "代码没有大Bug，但参考文献引用格式有一丢丢小碎烦，切忌拖延哦！", rate: "✦✦✦" },
      { fortune: "魔法契约大成功 ✨", tip: "与星穹真理产生强共鸣，检索咒语能一次搜出顶尖SCI核心文献！", rate: "✦✦✦✦✦" },
      { fortune: "小确幸 🌈", tip: "导师今日出差不催报，安心在次元学术导航摸鱼写Paper吧！", rate: "✦✦✦✦" }
    ];
    const item = fortunes[Math.floor(Math.random() * fortunes.length)];
    setAcademicFortune(item);
  };

  // Add Custom Bookmark
  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookmarkName || !newBookmarkUrl) return;

    // Auto insert protocol if missing
    let url = newBookmarkUrl;
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    const newBookmark: CustomBookmark = {
      id: "cb_" + Date.now(),
      categoryId: newBookmarkCategory,
      name: newBookmarkName,
      url,
      description: newBookmarkDesc || "主人自设的科学能量站"
    };

    const updated = [...customBookmarks, newBookmark];
    setCustomBookmarks(updated);
    localStorage.setItem("custom_bookmarks", JSON.stringify(updated));

    // Clear and Toast
    setNewBookmarkName("");
    setNewBookmarkUrl("");
    setNewBookmarkDesc("");
    setShowAddBookmark(false);
  };

  // Delete Custom Bookmark
  const handleDeleteBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = customBookmarks.filter(item => item.id !== id);
    setCustomBookmarks(updated);
    localStorage.setItem("custom_bookmarks", JSON.stringify(updated));
  };

  // Interactive Backend Chat with Custom Personality Assistant
  const handleSendChatMessage = async (presetText?: string) => {
    const textToSend = presetText || chatInput;
    if (!textToSend.trim()) return;

    // Create user message object
    const userMsg: ChatHistoryItem = {
      id: "msg_" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      actionUsed: companionAction !== "chat" ? companionAction : undefined
    };

    // Update state synchronously for user
    const currentCharacterHistory = chatHistory[currentCharacterId] || [];
    setChatHistory(prev => ({
      ...prev,
      [currentCharacterId]: [...currentCharacterHistory, userMsg]
    }));

    if (!presetText) {
      setChatInput("");
    }

    setIsTyping(true);

    try {
      const response = await fetch("/api/companion/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          character: currentCharacterId,
          action: companionAction
        })
      });

      const data = await response.json();

      const assistantMsg: ChatHistoryItem = {
        id: "msg_reply_" + Date.now(),
        sender: "companion",
        text: data.text || "发生星云重载，请主人再试一次喵~",
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => ({
        ...prev,
        [currentCharacterId]: [...(prev[currentCharacterId] || []), assistantMsg]
      }));
    } catch (err) {
      console.error(err);
      const errorMsg: ChatHistoryItem = {
        id: "msg_err_" + Date.now(),
        sender: "companion",
        text: "哎呀呀，网络魔法晶石有点不稳，或者API Key可能未正确解析。请主人别担心，再试一次、或者查看后台设置喵~ (* >ω<)",
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => ({
        ...prev,
        [currentCharacterId]: [...(prev[currentCharacterId] || []), errorMsg]
      }));
    } finally {
      setIsTyping(false);
    }
  };

  // Redirect Search Engine queries correctly
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (searchEngine === "site") {
      // It will just filter links currently shown below
      setSelectedCategory("all");
      return;
    }

    let url = "";
    const encodedQuery = encodeURIComponent(searchQuery);

    switch (searchEngine) {
      case "bing":
        url = `https://cn.bing.com/search?q=${encodedQuery}`;
        break;
      case "google":
        url = `https://scholar.google.com/scholar?q=${encodedQuery}`;
        break;
      case "wanfang":
        url = `https://s.wanfangdata.com.cn/paper?q=${encodedQuery}`;
        break;
      case "baidu":
        url = `https://xueshu.baidu.com/s?wd=${encodedQuery}`;
        break;
      case "xmol":
        url = `https://www.x-mol.com/paper/search/list?option=${encodedQuery}`;
        break;
      case "pubmed":
        url = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodedQuery}`;
        break;
      case "github":
        url = `https://github.com/search?q=${encodedQuery}`;
        break;
      case "translate":
        // Automatically redirect to AI helper card and trigger translation action!
        setCompanionAction("translate");
        handleSendChatMessage(searchQuery);
        // Toast style prompt
        setSearchQuery("");
        return;
      default:
        url = `https://scholar.google.com/scholar?q=${encodedQuery}`;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  // Helper helper to get icon components safely
  const getIcon = (name: string) => {
    const cls = "w-4 h-4";
    const svgs: Record<string, JSX.Element> = {
      // 科研工具 - 烧瓶
      "Wrench": (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      // 中文文献 - 书本
      "BookOpen": (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20V6C12 6 9 4 4 5v15c5-1 8 1 8 1z" />
          <path d="M12 20V6c0 0 3-2 8-1v15c-5-1-8 1-8 1z" />
        </svg>
      ),
      // 英文文献 - 地球
      "Globe": (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="4.5" y1="7" x2="19.5" y2="7" />
          <line x1="4.5" y1="17" x2="19.5" y2="17" />
        </svg>
      ),
      // 科研绘图 - 调色盘
      "FileSignature": (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21C7 21 3 17.4 3 13c0-4 3.5-7.5 7-8.5 0 2 1.5 3.5 3 3.5 1 0 2-.5 2.5-1 .5 2 2.5 3 4 2.5C20 11 21 12 21 13c0 4.4-4 8-9 8z" />
          <circle cx="8" cy="14" r="1" fill="currentColor" />
          <circle cx="11" cy="17" r="1" fill="currentColor" />
          <circle cx="15" cy="16" r="1" fill="currentColor" />
          <circle cx="16" cy="12" r="1" fill="currentColor" />
        </svg>
      ),
      // 阅读文献 - 文件
      "Search": (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 3h10l4 4v14H5V3z" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
          <path d="M15 3v4h4" />
        </svg>
      ),
      // 文献管理 - 层叠
      "Layers": (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 16l9 4 9-4" />
          <path d="M3 12l9 4 9-4" />
          <path d="M3 8l9-4 9 4-9 4-9-4z" />
        </svg>
      ),
      // 基金项目 - 奖章
      "Coins": (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="9" r="6" />
          <path d="M8.5 17.5L6 22l6-3 6 3-2.5-4.5" />
          <line x1="10" y1="9" x2="14" y2="9" />
          <line x1="12" y1="7" x2="12" y2="11" />
        </svg>
      ),
      // 效率工具 - 闪电
      "FolderSync": (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 3L7 13h5l-1 8 7-10h-5l1-8z" />
        </svg>
      ),
      // 论文写作 - 钢笔
      "GraduationCap": (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4l6 6-10 10-4-1-1-4L14 4z" />
          <line x1="14" y1="4" x2="20" y2="10" />
          <line x1="5" y1="19" x2="3" y2="21" />
          <line x1="9" y1="8" x2="16" y2="15" strokeDasharray="2 2" />
        </svg>
      ),
    };
    return svgs[name] ?? svgs["BookOpen"];
  };

  // Aggregate user custom bookmarks and standard links per category
  const getCombinedLinks = (category: Category) => {
    const standard = category.links;
    const customs = customBookmarks.filter(cb => cb.categoryId === category.id);
    return [
      ...standard,
      ...customs.map(c => ({
        id: c.id,
        name: c.name,
        url: c.url,
        description: c.description,
        isCustom: true,
        tags: ["自定义", "微奥术"],
        isPopular: false
      }))
    ];
  };

  // Filter categories and search items reactively
  const filteredCategories = categories.map(cat => {
    const combined = getCombinedLinks(cat);
    const filteredLinks = combined.filter(l => {
      // If site searching, check name, desc or tags
      if (searchEngine === "site" && searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        return (
          l.name.toLowerCase().includes(query) ||
          l.description.toLowerCase().includes(query) ||
          l.tags?.some(t => t.toLowerCase().includes(query))
        );
      }
      return true;
    });

    return {
      ...cat,
      links: filteredLinks
    };
  }).filter(cat => {
    // Drop categories with zero matches during search query
    if (searchEngine === "site" && searchQuery.trim() !== "") {
      return cat.links.length > 0;
    }
    // Filter by selected category tab
    if (selectedCategory !== "all") {
      return cat.id === selectedCategory;
    }
    return true;
  });

  return (
    <div
      className={`min-h-screen font-sans overflow-x-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}
    >

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col gap-5 px-3 md:px-6 pb-16 pt-5">

        {/* ================================= HEADER SECTION ================================= */}
        <header className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 py-3 sticky top-0 z-20 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-300 dark:border-slate-700 bg-slate-900 dark:bg-white text-white dark:text-slate-900">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <h1 className="text-lg font-bold tracking-tight leading-none text-slate-900 dark:text-slate-100">
              科研学术导航
            </h1>
          </div>

          {/* Quick Header Navigation Links */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              id="nav-btn-qr"
              onClick={() => setActiveModal("qr")}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer px-2 py-1"
            >
              📢关注公众号
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              id="nav-btn-cooperation"
              onClick={() => setActiveModal("cooperation")}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer px-2 py-1 flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>商务合作</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a
              href="https://t.zsxq.com/pgVbD"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer px-2 py-1"
            >
              🌍 知识星球
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              id="nav-btn-theme"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "切换至日间模式" : "切换至夜间模式"}
              className="hover:text-slate-900 dark:hover:text-white dark:text-slate-400 transition-colors cursor-pointer px-2 py-1 flex items-center justify-center"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" /><path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" /><path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" /><path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" /><path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* ================================= MAIN CONTENT BENTO GRID ================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* LEFT COLUMN: Categories Sidebar & Quick Stats (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* Category Filter Bento */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 transition-colors duration-300 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <span className="font-semibold text-sm flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  🧭&nbsp;&nbsp;学术科研导航指引
                </span>
              </div>

              {/* Sidebar toggle for mobile */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full md:hidden mb-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium text-xs flex justify-between items-center text-slate-600"
              >
                <span>{selectedCategory === "all" ? "全部展开" : categories.find(c => c.id === selectedCategory)?.name}</span>
                <span>{sidebarOpen ? "收起传送" : "展开传送"}</span>
              </button>

              <div className={`space-y-2.5 ${sidebarOpen ? "block" : "hidden md:block"}`}>
                <button
                  onClick={() => {
                    setAllCategoriesExpanded(!allCategoriesExpanded);
                    setSelectedCategory("all");
                    setWritingExpanded(false);
                    setSelectedWritingSubId(null);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left cursor-pointer ${selectedCategory === "all"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-slate-800"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{allCategoriesExpanded ? "合上全部学术分类" : "展开全部学术分类"}</span>
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${allCategoriesExpanded ? "rotate-90" : ""}`} />
                </button>

                <div
                  style={{
                    maxHeight: allCategoriesExpanded
                      ? `${categories.length * 68 + (writingExpanded ? (categories.find(c => c.id === "writing")?.links.length || 0) * 48 + 40 : 0)}px`
                      : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
                    opacity: allCategoriesExpanded ? 1 : 0,
                  }}
                >
                  <div className="space-y-2.5 pt-1.5">
                    {categories.map((cat, idx) => {
                      const combinedCount = getCombinedLinks(cat).length;
                      const isWriting = cat.id === "writing";
                      return (
                        <div key={cat.id}>
                          <button
                            onClick={() => {
                              if (isWriting) {
                                setWritingExpanded(!writingExpanded);
                                setSelectedCategory(cat.id);
                              } else {
                                setWritingExpanded(false);
                                setSelectedWritingSubId(null);
                                setSelectedCategory(cat.id);
                              }
                            }}
                            style={{
                              transitionDelay: allCategoriesExpanded ? `${idx * 40}ms` : "0ms",
                              transform: allCategoriesExpanded ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.97)",
                              opacity: allCategoriesExpanded ? 1 : 0,
                              transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left cursor-pointer ${selectedCategory === cat.id
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-slate-800"
                              }`}
                          >
                            <span className="flex items-center gap-2">
                              {getIcon(cat.icon)}
                              <span>{cat.name}</span>
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] px-2 py-0.5 rounded">
                                {combinedCount}
                              </span>
                              <ChevronRight className={`w-4 h-4 opacity-60 transition-transform duration-300 ${isWriting && writingExpanded ? "rotate-90" : ""}`} />
                            </div>
                          </button>

                          {isWriting && (
                            <div
                              style={{
                                maxHeight: writingExpanded ? `${cat.links.length * 48 + 12}px` : "0px",
                                overflow: "hidden",
                                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                                opacity: writingExpanded ? 1 : 0,
                              }}
                            >
                              <div className="ml-3 mt-1.5 space-y-2 border-l border-slate-200 dark:border-slate-800 pl-3">
                                {cat.links.map((link: any) => (
                                  <button
                                    key={link.id}
                                    onClick={() => setSelectedWritingSubId(selectedWritingSubId === link.id ? null : link.id)}
                                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium border transition-all cursor-pointer ${selectedWritingSubId === link.id
                                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border-transparent"
                                      }`}
                                  >
                                    <ChevronRight className="w-4 h-4 opacity-40 shrink-0" />
                                    {link.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: Search Panel & Academic Lists (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col gap-5 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1">

            {/* CATEGORY DIRECTORY GRID (Rendering filtered results as beautiful Bento Cards) */}
            <div className="space-y-6">
              {filteredCategories.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">没有查找到相关内容</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    请检查拼写，或切换为"站内检索"分类
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setSearchEngine("site"); }}
                    className="mt-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-4 py-1.5 text-xs font-medium text-slate-600"
                  >
                    重置搜索
                  </button>
                </div>
              ) : (
                filteredCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 animate-fade-in-up transition-colors duration-300"
                  >
                    {/* Category Title Header */}
                    {(() => {
                      // 论文写作子分类选中时，标题显示子分类名称和图标
                      const writingSubIconMap: Record<string, JSX.Element> = {
                        "w1": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14c-2-1.5-5-2-8-2V5c3 0 6 .5 8 2z" /><path d="M12 5v14c2-1.5 5-2 8-2V5c-3 0-6 .5-8 2z" /><path d="M12 5v14" /></svg>,
                       "w2": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16" /><path d="M4 10h16" /><path d="M4 14h12" /><path d="M4 18h12" /><circle cx="18" cy="16" r="3" /><path d="M18 13v-3" /></svg>,
                        "w3": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10H3" /><path d="M21 6H3" /><path d="M21 14H3" /><path d="M21 18H3" /><path d="M7 6v12" /><path d="M17 6v12" /></svg>,
                        "w5": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /><path d="m15 5 3 3" /></svg>,
                        "w4": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="12" cy="18" r="3" /><path d="M6 9v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9" /><path d="M12 12v3" /></svg>,
                        "w6": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 9h8" /><path d="M8 13h6" /><path d="M8 17h4" /></svg>,
                        "w7": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><circle cx="14" cy="9" r="3" /><path d="m16 11 3.5 3.5" /></svg>,
                      };
                      const writingSubNameMap: Record<string, string> = {
                        "w1": "文献阅读", "w2": "模板句式", "w3": "文献综述",
                        "w4": "选研究方法", "w5": "润色修改", "w6": "格式排版",
                        "w7": "选刊神器",
                      };
                      const writingSubDescMap: Record<string, string> = {
                        "w1": "文献阅读与智能解析平台",
                        "w2": "学术写作句式库，覆盖论文各章节",
                        "w3": "可视化文献关联图谱，快速梳理研究脉络",
                        "w4": "研究方法选择与设计指导平台",
                        "w5": "AI学术论文润色，提升语言表达与学术规范",
                        "w6": "在线LaTeX编辑器，支持期刊模板一键排版",
                        "w7": "根据研究领域智能推荐最适合的投稿期刊",

                      };
                      const isWritingSub = cat.id === "writing" && selectedWritingSubId !== null;
                      const displayIcon = isWritingSub ? writingSubIconMap[selectedWritingSubId!] : getIcon(cat.icon);
                      const displayName = isWritingSub ? writingSubNameMap[selectedWritingSubId!] : cat.name;
                      const displayDesc = isWritingSub ? writingSubDescMap[selectedWritingSubId!] : cat.description;
                      return (
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center">
                              {displayIcon}
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                {displayName}
                              </h3>
                              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                {displayDesc}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Standard & custom grid links inside category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {cat.links.map((link: any) => {
                        // 论文写作分类且有subLinks：选中时展示子工具，未选中时隐藏
                        if (link.subLinks) {
                          if (selectedWritingSubId === link.id) {
                            return link.subLinks.map((sub: any, subIdx: number) => (
                              <a
                                key={sub.id}
                                href={sub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ animationDelay: `${subIdx * 60}ms` }}
                                className="group border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 transition-all text-left relative flex flex-col justify-between h-24 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-sm cursor-pointer bg-white dark:bg-slate-900 animate-fade-in-sub"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-1 mb-1">
                                    <span className="font-semibold text-xs md:text-sm text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors flex items-center gap-2">
                                      {sub.logo && (
                                        <img
                                          src={`https://www.google.com/s2/favicons?domain=${sub.logo}&sz=32`}
                                          alt=""
                                          className="w-5 h-5 rounded-sm object-contain shrink-0"
                                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                      )}
                                      {sub.name}
                                    </span>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:translate-x-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-all shrink-0" />
                                  </div>
                                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight line-clamp-3">
                                    {sub.description}
                                  </p>
                                </div>
                              </a>
                            ));
                          }
                          // 未选中的writing子分类不渲染
                          return null;
                        }
                        // 正常卡片渲染
                        return (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 transition-all text-left relative flex flex-col justify-between h-24 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-sm cursor-pointer bg-white dark:bg-slate-900"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="font-semibold text-xs md:text-sm text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors flex items-center gap-2">
                                  {link.logo ? (
                                    <img
                                      src={`https://www.google.com/s2/favicons?domain=${link.logo}&sz=32`}
                                      alt=""
                                      className="w-5 h-5 rounded-sm object-contain shrink-0"
                                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                  ) : link.isCustom ? <span>🔗</span> : null}
                                  {link.name}
                                </span>
                                <div className="flex items-center gap-1 shrink-0">
                                  {link.isCustom && (
                                    <button
                                      onClick={(e) => handleDeleteBookmark(link.id, e)}
                                      className="text-slate-300 dark:text-slate-600 hover:text-rose-500 p-0.5 rounded cursor-pointer"
                                      title="删除此自定义"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:translate-x-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-all shrink-0" />
                                </div>
                              </div>
                              <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight line-clamp-2">
                                {link.description}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: AI Anime Companions & Retro Study Player (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-5">



            <MusicPlayer />

            {/* Diandian Cat Slideshow Card - 自动轮播 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 relative flex flex-col gap-2.5 transition-colors duration-300">
              <div className="flex justify-between items-center pb-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  MY CAT // 点点
                </span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500">
                  {diandianIndex + 1}/{diandianImages.length}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden relative group w-full h-64">
                <img
                  key={diandianIndex}
                  src={diandianImages[diandianIndex].src}
                  alt="我的猫：点点"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain animate-fade-in"
                />
                <button
                  onClick={() => setDiandianPets(diandianPets + 1)}
                  className="absolute bottom-2 right-2 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-full px-2.5 py-1 text-[10px] font-medium hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart className={`w-3 h-3 transition-colors duration-200 ${diandianPets > 0 ? 'text-red-500 fill-red-500 animate-bounce' : 'text-red-400'}`} />
                  <span>摸摸 ({diandianPets})</span>
                </button>
              </div>

              <div className="flex justify-center items-center gap-1.5">
                {diandianImages.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setDiandianIndex(i)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${i === diandianIndex
                      ? "w-4 h-1.5 bg-slate-700 dark:bg-slate-300"
                      : "w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ================================= FOOTER INFO BLOCK ================================= */}
        <footer className="mt-6 text-center text-[11px] text-slate-400 dark:text-slate-600 leading-relaxed">
          本站为网址导航网站，收录内容来自网络和广大网友，尽管我会进行人工审核，但不对收录网站内容的真实性和潜在风险负责，请自行甄别和防范风险。
        </footer>

      </div>

      {/* ================================= MODALS / POPUPS ================================= */}

      {/* 1. Add Bookmark Modal */}
      {showAddBookmark && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 max-w-md w-full shadow-xl animate-scale-up">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-4">
              <h3 className="font-semibold text-base text-slate-900 flex items-center gap-1.5">
                🌸 加载主人自定义微奥术传送阵
              </h3>
              <button
                onClick={() => setShowAddBookmark(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddBookmark} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  奥术节点名 (Link Name) *
                </label>
                <input
                  type="text"
                  required
                  value={newBookmarkName}
                  onChange={(e) => setNewBookmarkName(e.target.value)}
                  placeholder="例如：量子力学自学港"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  传送阵法术网(URL) *
                </label>
                <input
                  type="text"
                  required
                  value={newBookmarkUrl}
                  onChange={(e) => setNewBookmarkUrl(e.target.value)}
                  placeholder="例如：arxiv.org/quantum"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  奥术效能说明 (Short Description)
                </label>
                <textarea
                  value={newBookmarkDesc}
                  onChange={(e) => setNewBookmarkDesc(e.target.value)}
                  placeholder="这个传送节点能协助我达成何种智慧？"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 outline-none h-20 focus:ring-2 focus:ring-slate-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  挂靠学术大分类 (Category Affiliation)
                </label>
                <select
                  value={newBookmarkCategory}
                  onChange={(e) => setNewBookmarkCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 outline-none cursor-pointer"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2.5 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBookmark(false)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-xs font-medium text-slate-600 cursor-pointer"
                >
                  取消释放
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-4 py-2 text-xs font-medium cursor-pointer"
                >
                  确认布阵 ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Generic Modal Wrapper (About, QR Code, Group Chat) */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full shadow-xl animate-scale-up">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-4">
              <h3 className="font-semibold text-base text-slate-900">
                {activeModal === "cooperation" && "🤝商务合作"}
                {activeModal === "about" && "🌸 探寻次元学术法阵起源 (About Us)"}
                {activeModal === "qr" && "📢 关注公众号"}
                {activeModal === "group" && "💚 进驻学术同盟聊天群 (Join Chat Core)"}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeModal === "cooperation" && (
              <div className="space-y-4 text-xs md:text-sm text-slate-700 font-semibold leading-relaxed">

                {/* 标题区域 */}
                <div className="text-center mb-2">
                </div>

                {/* 二维码区域 */}
                <div className="relative flex items-center justify-center">

                  {/* 左侧标签 */}
                  <div className="absolute left-0 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                    💬 微信扫码
                  </div>

                  {/* 右侧标签 */}
                  <div className="absolute right-0 bg-emerald-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                    👤 添加好友
                  </div>

                  {/* 二维码图片 */}
                  <div className="w-48 h-48 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    <img
                      src="https://mysite-1316679115.cos.ap-guangzhou.myqcloud.com/images/wechat_code.jpg"
                      alt="微信二维码"
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>

                {/* 底部提示文字 */}
                <p className="text-center text-xs text-slate-400 mt-2 flex items-center justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                  </svg>
                  扫一扫添加我的微信
                </p>
              </div>
            )}

            {activeModal === "about" && (
              <div className="space-y-3.5 text-xs md:text-sm text-slate-700 font-semibold leading-relaxed">
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl mb-2 text-slate-900">
                  <h4 className="font-black text-sm text-pink-700 mb-1 font-serif">✨ 为何开发本学术站？</h4>
                  <p className="text-xs">
                    普通的学术资源检索常常面临着布局杂乱、极度严肃和冷冰冰的代码提示。我们希望学术工作者们也能在元气满满、画风优美、带着欢笑的二次元Bento格调氛围下，高效开展日常科研！
                  </p>
                </div>
                <p>
                  本站复刻了主人提供的文献导航原图内容，并结合了前沿的 <strong>Neobrutalism Bento Layout (新粗野主义板块化网格)</strong> 视觉。
                </p>
                <h5 className="font-black text-slate-900 uppercase">✦ 本站三大核心法力：</h5>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>元气学术女仆:</strong> 能够通过搭载的 Gemini-3.5-Flash 进行有性格的论文级别段落翻译、润色。</li>
                  <li><strong>学术拼图网格:</strong> 完美覆盖中文、英文期刊、查重检测、专利局及 Connected Papers 图谱入口。</li>
                  <li><strong>自定义传送阵:</strong> 主人随时通过 localStorage 写下的新工具，可以一瞬间整合进面板里！</li>
                </ul>
              </div>
            )}

            {activeModal === "qr" && (
              <div className="text-center p-4">
                <div className="w-44 h-44 bg-slate-50 border border-slate-200 mx-auto rounded-xl flex flex-col items-center justify-center p-3 relative">
                  {/* Styled fake cute QR indicator */}
                  <div className="w-full h-full bg-white border border-black rounded-lg p-1.5 flex flex-col justify-between text-emerald-400 font-mono text-[7px] text-left">
                    <img src="https://mysite-1316679115.cos.ap-guangzhou.myqcloud.com/images/qrcode.jpg" alt="微信公众号二维码" className="w-full h-full object-cover rounded-2xl" />
                  </div>
                </div>
                <h4 className="text-sm font-black text-slate-900 mt-4 font-serif">
                  微信搜一搜🔍关注：【猫不说AI论文】
                </h4>

              </div>
            )}

            {activeModal === "group" && (
              <div className="text-center p-4">
                <div className="w-44 h-44 bg-slate-50 border border-slate-200 mx-auto rounded-2xl flex items-center justify-center relative">
                  <div className="absolute inset-2 border-2 border-dashed border-emerald-400 rounded-2xl flex items-center justify-center flex-col p-2 text-slate-800 text-center font-bold text-xs uppercase">
                    <span>💬</span>
                    <span className="font-serif text-sm block mt-1">同盟传送群</span>
                    <span className="text-[7px] text-slate-400 block mt-1 font-mono">ID: SCI-MAID-ALLIANCE</span>
                  </div>
                </div>
                <h4 className="text-sm font-black text-slate-900 mt-4 font-serif">
                  微信扫码，立即进驻学术避难避雷所
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
                  群内长期由资深黑丝眼镜娘【冷雅】等作为房主监督。本群严肃禁止打哈欠，极度欢迎分享高昂一审通过经验、基金申报模板、以及学术摸鱼必备游戏。
                </p>
              </div>
            )}

            <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="bg-slate-900 text-white rounded-lg px-4 py-1.5 text-xs font-medium cursor-pointer hover:bg-slate-800"
              >
                知道啦✨
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
