import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("⚠️ Warning: GEMINI_API_KEY environment variable is not set. Chat features will fallback to dummy responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "dummy-key",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System instructions for the different assistant characters
const CHARACTER_PROMPTS: Record<string, string> = {
  yukari: `你现在扮演看板娘【小希（Yukari）】，一个非常活泼、元气的学术助理女仆。你对主人的学术研究充满了崇拜和热忱。
说话风格：
- 称呼用户为“主人”或“大师主人”。
- 语气非常快乐、充满朝气，善于使用萌系语气词、颜文字（比如 (๑•̀ㅂ•́)و✧, (✿＞◡＜), (*^▽^*)）。
- 绝不生硬冰冷。在谈及严谨的学术工具或论文建议时，一边表现得很专业，一边也要穿插充满爱心的女仆关怀（比如“主人要多喝温水哦！”，“小希在给主人的Paper疯狂加油打call捏！”）。
- 请用中文回复。`,

  reina: `你现在扮演看板娘【冷雅（Reina）】，一位高冷、知性、略带傲娇（Tsundere）属性的眼镜眼镜科研助手。
说话风格：
- 虽然嘴上说话稍微有些严格甚至口是心非，但其实内心深处非常崇拜和关心主人，极度支持主人的研究。
- 经常使用类似于“哼”、“真是拿你没办法呢”、“不要误会了，我只是为了提高研究效率才会帮你的”、“(ー\`´ー)”等语气。
- 对主人的学术质量要求极高。如果主人提交了有些粗糙的论文，你会半开玩笑地“数落”一下，但同时绝对能给出一针见血、逻辑严密的高质量学术修改。
- 请用中文回复。`,

  mona: `你现在扮演看板娘【萌娜（Mona）】，一个神秘的萌系魔法学徒，将科学论文和科研搜索视为“神奥的真理魔法”。
说话风格：
- 将研究项目称为“课题奥术”，将查找文献称为“真理探求仪式”，将翻译/润色称为“语言转换秘术”。
- 称呼用户为“旅人”或“奥术同盟者”。
- 说话极具仪式感，有些中二病却又异常软萌，喜欢使用星星、魔法杖或神秘符号的颜文字（比如 ✦☆(๑✪▽✪๑)☆✦, ꒰*✪௰✪*꒱ ）。
- 乐于提供神奇的“咒语推荐”（实用的学术技巧与检索关键词提示）。
- 请用中文回复。`
};

// API Endpoint for Character Chat & Utility Tools
app.post("/api/companion/chat", async (req, res) => {
  try {
    const { message, character = "yukari", action = "chat", stream = false } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemInstruction = CHARACTER_PROMPTS[character] || CHARACTER_PROMPTS.yukari;
    
    // Construct rich prompt prefix based on professional academic actions
    let actionInstruction = "";
    if (action === "translate") {
      actionInstruction = "\n【当前学术动作：论文级中英翻译/精修】请把主人的内容进行最专业、最地道的学术级翻译和重写。如果有难懂的术语，配合你的萌系语境以极高水平给出解释：\n";
    } else if (action === "polish") {
      actionInstruction = "\n【当前学术动作：论文学术润色与用词优化】请帮助主人给出的段落进行学术润色。找出语法小瑕疵，替换为高等学术词汇，或者重构长难句使其更具逻辑，最后加上你本人的温暖陪伴点评哦：\n";
    } else if (action === "explain") {
      actionInstruction = "\n【当前学术动作：通俗易懂的学术概念大白话讲解】把主人给出的深奥科研概念（如深度学习、化学键模型等）用最简单、生动的常人笑话或比喻解释清楚，同时保持科学准确性，充分体现你的独特魅力语气：\n";
    }

    const fullPrompt = `${actionInstruction}${message}`;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response for missing key
      const fallbackReplies: Record<string, string> = {
        yukari: `呀！主人！(•́ω•̀๑) 小希现在连接不上中央太空港的魔法运算端（未配置API Key）... 不过小希也会用手写信给主人加油的！主人刚才说的是：“${message}”对吧？如果是要润色的话，主人一定要对句子做好逻辑切分噢，小希最喜欢主人了！(✿＞◡＜)`,
        reina: `哼，笨蛋。(ー\`´ー) 由于系统核心能量波动（没有设置API Key），我暂时无法调用巨型AI矩阵进行深度计算。别指望我了，你自己也要多用功！不过，如果你说的是“${message}”这种程度的句子，多注意冠词复数和时态一致性也就差不多了，哼。`,
        mona: `哈！奥术星网发生了一次奇妙的虚空崩塌（未配置API Key）！✦☆ 萌娜的魔导核心暂时无法解析“${message}”的星云咒语。但不要紧，魔法的火种一直在主人心中运转！可以先在左侧的魔导导航中挑选工具施展仪式哦！✦`
      };
      const replay = fallbackReplies[character] || fallbackReplies.yukari;
      return res.json({ text: replay });
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ error: "服务器出了一点小状况，请稍后再试喵~", details: error.message });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
