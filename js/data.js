/**
 * Awesome Cosmos - 開源宇宙星圖資料庫
 * 涵蓋 7 大星域，150+ 精選 GitHub 傳奇與熱門開源寶庫
 */

window.SECTORS = {
  ai: {
    name: "智核星雲 (AI & Neural)",
    color: "#a855f7", // 紫色
    lightColor: "#d8b4fe",
    desc: "大語言模型、神經網路、電腦視覺與智慧代理",
    coord: { x: 0, y: 150, z: 0 }
  },
  web: {
    name: "矩陣星網 (Web & Modern Frameworks)",
    color: "#06b6d4", // 青藍
    lightColor: "#67e8f9",
    desc: "新世代現代前端、UI 引擎、全端工具與編譯體系",
    coord: { x: 260, y: 40, z: -100 }
  },
  gamedev: {
    name: "幻境星原 (Game Engines & 3D)",
    color: "#f59e0b", // 琥珀金
    lightColor: "#fde68a",
    desc: "跨平台開源遊戲引擎、2D/3D 渲染與物理模擬",
    coord: { x: 180, y: -160, z: 120 }
  },
  creative: {
    name: "靈光星海 (Creative Coding & Art)",
    color: "#ec4899", // 粉紅
    lightColor: "#fbcfe8",
    desc: "生成式藝術、Web 音訊合成、著色器實驗與視覺編程",
    coord: { x: -180, y: -140, z: 180 }
  },
  sysops: {
    name: "核心引擎星系 (Systems & Terminal)",
    color: "#10b981", // 翠綠
    lightColor: "#6ee7b7",
    desc: "底層作業系統、高效能 CLI、Rust/Go 系統級神器與架構",
    coord: { x: -260, y: 60, z: -120 }
  },
  security: {
    name: "暗網脈衝星域 (Cyber Security & Ops)",
    color: "#ef4444", // 猩紅
    lightColor: "#fca5a5",
    desc: "滲透測試、漏洞分析、隱私防護與安全攻防矩陣",
    coord: { x: -100, y: 220, z: -200 }
  },
  fun: {
    name: "奇點實驗室 (Weird, Fun & Toys)",
    color: "#3b82f6", // 霓虹藍
    lightColor: "#93c5fd",
    desc: "黑客趣味玩具、休閒復古模擬器與天馬行空的代碼實驗",
    coord: { x: 120, y: 200, z: 220 }
  }
};

window.COSMOS_DATA = [
  // =================== AI 星雲 ===================
  {
    id: "ollama",
    name: "Ollama",
    repo: "ollama/ollama",
    category: "ai",
    stars: "115k+",
    type: "supergiant",
    desc: "本地端超快速啟動與運行 Llama 3、Mistral 等大語言模型的神器工具。",
    tags: ["LLM", "Local-AI", "CLI", "Inference"],
    url: "https://github.com/ollama/ollama"
  },
  {
    id: "transformers",
    name: "Transformers",
    repo: "huggingface/transformers",
    category: "ai",
    stars: "135k+",
    type: "supergiant",
    desc: "現代機器學習基石，提供數萬種預訓練 SOTA 深度學習模型 API。",
    tags: ["HuggingFace", "PyTorch", "NLP", "DeepLearning"],
    url: "https://github.com/huggingface/transformers"
  },
  {
    id: "comfyui",
    name: "ComfyUI",
    repo: "comfyanonymous/ComfyUI",
    category: "ai",
    stars: "62k+",
    type: "planet",
    desc: "基於節點流圖的極致靈活 Stable Diffusion / Flux 生圖與影片工作流架構。",
    tags: ["Generative-AI", "StableDiffusion", "Flux", "NodeUI"],
    url: "https://github.com/comfyanonymous/ComfyUI"
  },
  {
    id: "vllm",
    name: "vLLM",
    repo: "vllm-project/vllm",
    category: "ai",
    stars: "34k+",
    type: "planet",
    desc: "高吞吐量且極具記憶體效益的 LLM 部署推論加速引擎 (PagedAttention)。",
    tags: ["Inference", "High-Throughput", "GPU", "LLM-Serving"],
    url: "https://github.com/vllm-project/vllm"
  },
  {
    id: "whisper",
    name: "Whisper",
    repo: "openai/whisper",
    category: "ai",
    stars: "73k+",
    type: "planet",
    desc: "OpenAI 開源的高魯棒性多語系語音辨識與即時轉錄音訊神經模型。",
    tags: ["Audio", "Speech-to-Text", "ASR", "OpenAI"],
    url: "https://github.com/openai/whisper"
  },
  {
    id: "open-webui",
    name: "Open WebUI",
    repo: "open-webui/open-webui",
    category: "ai",
    stars: "68k+",
    type: "planet",
    desc: "使用者體驗極佳的自託管 ChatGPT 式對話介面，完美原生適配 Ollama。",
    tags: ["ChatGPT-Clone", "WebUI", "Docker", "Self-Hosted"],
    url: "https://github.com/open-webui/open-webui"
  },
  {
    id: "langchain",
    name: "LangChain",
    repo: "langchain-ai/langchain",
    category: "ai",
    stars: "96k+",
    type: "planet",
    desc: "構建具備情境感知與推理能力的代理 (Agents) 與 RAG 應用程式架構。",
    tags: ["Agent", "RAG", "LLM-Framework", "Python"],
    url: "https://github.com/langchain-ai/langchain"
  },
  {
    id: "dify",
    name: "Dify",
    repo: "langgenius/dify",
    category: "ai",
    stars: "64k+",
    type: "planet",
    desc: "開源 LLM 應用開發平台，融合 Agent 智能體與視覺化工作流編排。",
    tags: ["LLMOps", "Workflow", "Agent", "SaaS"],
    url: "https://github.com/langgenius/dify"
  },
  {
    id: "stable-diffusion-webui",
    name: "Stable Diffusion WebUI",
    repo: "AUTOMATIC1111/stable-diffusion-webui",
    category: "ai",
    stars: "142k+",
    type: "supergiant",
    desc: "基於 Gradio 的傳奇級 AI 生圖瀏覽器介面，引領全球開源開圖熱潮。",
    tags: ["Diffusion", "Art", "Gradio", "Legend"],
    url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui"
  },
  {
    id: "llama-cpp",
    name: "llama.cpp",
    repo: "ggerganov/llama.cpp",
    category: "ai",
    stars: "74k+",
    type: "pulsar",
    desc: "純 C/C++ 打造的極致純粹 LLM 推論庫，在平民級硬體與 Mac 上榨乾效能。",
    tags: ["C++", "Quantization", "GGUF", "High-Performance"],
    url: "https://github.com/ggerganov/llama.cpp"
  },

  // =================== Web 矩陣星網 ===================
  {
    id: "react",
    name: "React",
    repo: "facebook/react",
    category: "web",
    stars: "228k+",
    type: "supergiant",
    desc: "構建使用者介面的世界級宣告式組件庫，現代前端開發範式的引領者。",
    tags: ["UI", "JavaScript", "JSX", "Virtual-DOM"],
    url: "https://github.com/facebook/react"
  },
  {
    id: "vue",
    name: "Vue.js",
    repo: "vuejs/core",
    category: "web",
    stars: "46k+",
    type: "supergiant",
    desc: "易學易用、性能強勁、漸進式的前端響應式框架。",
    tags: ["Reactive", "Frontend", "Single-File-Component"],
    url: "https://github.com/vuejs/core"
  },
  {
    id: "threejs",
    name: "Three.js",
    repo: "mrdoob/three.js",
    category: "web",
    stars: "102k+",
    type: "supergiant",
    desc: "讓 3D 視覺在瀏覽器深空綻放的偉大 WebGL / WebGPU 函式庫（本專案靈魂）！",
    tags: ["WebGL", "3D", "Canvas", "Graphics"],
    url: "https://github.com/mrdoob/three.js"
  },
  {
    id: "vite",
    name: "Vite",
    repo: "vitejs/vite",
    category: "web",
    stars: "72k+",
    type: "planet",
    desc: "下一代超高速前端開發與構建工具，基於原生 ESM 與 Rollup/esbuild。",
    tags: ["Build-Tool", "Bundler", "ESM", "Fast"],
    url: "https://github.com/vitejs/vite"
  },
  {
    id: "nextjs",
    name: "Next.js",
    repo: "vercel/next.js",
    category: "web",
    stars: "128k+",
    type: "planet",
    desc: "打造全端 React 應用程式與伺服器渲染 (SSR/SSG) 的主力戰艦。",
    tags: ["SSR", "React-Framework", "Fullstack", "Vercel"],
    url: "https://github.com/vercel/next.js"
  },
  {
    id: "htmx",
    name: "HTMX",
    repo: "bigskysoftware/htmx",
    category: "web",
    stars: "40k+",
    type: "pulsar",
    desc: "高舉超文本大旗：直接在 HTML 標籤內發起 AJAX、CSS 過渡與 WebSocket。",
    tags: ["Hypermedia", "HTML", "Simplicity", "Zero-JS-Fatigue"],
    url: "https://github.com/bigskysoftware/htmx"
  },
  {
    id: "astro",
    name: "Astro",
    repo: "withastro/astro",
    category: "web",
    stars: "48k+",
    type: "planet",
    desc: "群島架構 (Islands Architecture) 打造極致載入速度的現代內容網站框架。",
    tags: ["Static-Site", "Islands", "Fast", "Multi-Framework"],
    url: "https://github.com/withastro/astro"
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    repo: "tailwindlabs/tailwindcss",
    category: "web",
    stars: "84k+",
    type: "planet",
    desc: "實用優先 (Utility-First) 的 CSS 框架，徹底顛覆前端樣式編寫工作流。",
    tags: ["CSS", "Design-System", "Utility", "Styling"],
    url: "https://github.com/tailwindlabs/tailwindcss"
  },
  {
    id: "svelte",
    name: "Svelte",
    repo: "sveltejs/svelte",
    category: "web",
    stars: "79k+",
    type: "planet",
    desc: "無虛擬 DOM，在編譯時期直接轉換為精密原生 JavaScript 操作的優雅框架。",
    tags: ["Compiler", "Reactivity", "Lightweight", "UI"],
    url: "https://github.com/sveltejs/svelte"
  },
  {
    id: "excalidraw",
    name: "Excalidraw",
    repo: "excalidraw/excalidraw",
    category: "web",
    stars: "88k+",
    type: "satellite",
    desc: "手繪風格白板繪圖虛擬畫布，極度清爽且支援多人即時協作。",
    tags: ["Canvas", "Whiteboard", "Collaboration", "Productivity"],
    url: "https://github.com/excalidraw/excalidraw"
  },

  // =================== 幻境星原 (遊戲引擎) ===================
  {
    id: "godot",
    name: "Godot Engine",
    repo: "godotengine/godot",
    category: "gamedev",
    stars: "92k+",
    type: "supergiant",
    desc: "功能完整、自由無拘的現代開源 2D 與 3D 遊戲引擎，獨立開發者的聖域！",
    tags: ["GameEngine", "2D/3D", "C++", "C#", "GDScript"],
    url: "https://github.com/godotengine/godot"
  },
  {
    id: "bevy",
    name: "Bevy Engine",
    repo: "bevyengine/bevy",
    category: "gamedev",
    stars: "37k+",
    type: "planet",
    desc: "極簡而強大的資料驅動 ECS 架構 Rust 遊戲引擎，架構優雅極具未來感。",
    tags: ["Rust", "ECS", "GameDev", "Modern"],
    url: "https://github.com/bevyengine/bevy"
  },
  {
    id: "phaser",
    name: "Phaser",
    repo: "phaserjs/phaser",
    category: "gamedev",
    stars: "36k+",
    type: "planet",
    desc: "享譽盛名的高性能 2D HTML5 網頁遊戲引擎，Canvas 與 WebGL 雙引擎支援。",
    tags: ["HTML5-Game", "2D", "JavaScript", "Arcade"],
    url: "https://github.com/phaserjs/phaser"
  },
  {
    id: "babylonjs",
    name: "Babylon.js",
    repo: "BabylonJS/Babylon.js",
    category: "gamedev",
    stars: "23k+",
    type: "planet",
    desc: "微軟主力支持的強悍 Web 3D / WebXR 渲染與遊戲物理引擎。",
    tags: ["WebGL", "WebXR", "3D-Engine", "TypeScript"],
    url: "https://github.com/BabylonJS/Babylon.js"
  },
  {
    id: "pixijs",
    name: "PixiJS",
    repo: "pixijs/pixijs",
    category: "gamedev",
    stars: "43k+",
    type: "planet",
    desc: "極速 2D 著色渲染庫，讓富互動網頁與遊戲擁有令人讚嘆的影格率。",
    tags: ["2D", "WebGL", "Fast-Renderer", "Rich-UI"],
    url: "https://github.com/pixijs/pixijs"
  },
  {
    id: "raylib",
    name: "raylib",
    repo: "raysan5/raylib",
    category: "gamedev",
    stars: "26k+",
    type: "pulsar",
    desc: "無外部依賴、純粹簡約的 C 語言遊戲編程庫，深受極客與教學界熱愛。",
    tags: ["C", "Lightweight", "No-Dependencies", "Graphics"],
    url: "https://github.com/raysan5/raylib"
  },
  {
    id: "love2d",
    name: "LÖVE (Love2D)",
    repo: "love2d/love",
    category: "gamedev",
    stars: "3.8k+",
    type: "satellite",
    desc: "使用 Lua 語言輕鬆撰寫二維遊戲的經典框架，靈動輕巧。",
    tags: ["Lua", "2D", "Lightweight", "Creative"],
    url: "https://github.com/love2d/love"
  },

  // =================== 靈光星海 (Creative Coding) ===================
  {
    id: "p5js",
    name: "p5.js",
    repo: "processing/p5.js",
    category: "creative",
    stars: "21k+",
    type: "supergiant",
    desc: "源自 Processing 精神的創意代碼庫，讓藝術家、設計師在瀏覽器作畫。",
    tags: ["CreativeCoding", "GenerativeArt", "Canvas", "Education"],
    url: "https://github.com/processing/p5.js"
  },
  {
    id: "tonejs",
    name: "Tone.js",
    repo: "Tonejs/Tone.js",
    category: "creative",
    stars: "14k+",
    type: "planet",
    desc: "基於 Web Audio API 封裝的互動音樂合成器與編曲排程框架。",
    tags: ["WebAudio", "Synthesizer", "Sound", "Music"],
    url: "https://github.com/Tonejs/Tone.js"
  },
  {
    id: "hydra",
    name: "Hydra Synth",
    repo: "hydra-synth/hydra-synth",
    category: "creative",
    stars: "3.2k+",
    type: "pulsar",
    desc: "以即時 Live Coding 著稱的視覺合成器，利用 GLSL 著色器產生催眠般的迷幻影像。",
    tags: ["LiveCoding", "VisualSynth", "GLSL", "Audiovisual"],
    url: "https://github.com/hydra-synth/hydra-synth"
  },
  {
    id: "matter-js",
    name: "matter-js",
    repo: "liabru/matter-js",
    category: "creative",
    stars: "17k+",
    type: "planet",
    desc: "純 JavaScript 實現的 2D 剛體物理引擎，帶給網頁栩栩如生的碰撞動態。",
    tags: ["Physics", "RigidBody", "2D", "Simulation"],
    url: "https://github.com/liabru/matter-js"
  },
  {
    id: "cables",
    name: "cables.gl",
    repo: "cables-gl/cables_ui",
    category: "creative",
    stars: "2.1k+",
    type: "satellite",
    desc: "模組化節點連線的純瀏覽器視覺編程工具，創造驚人的互動式 3D 體驗。",
    tags: ["WebGL", "Nodes", "Interactive", "Design"],
    url: "https://github.com/cables-gl/cables_ui"
  },
  {
    id: "ptsjs",
    name: "Pts.js",
    repo: "williamngan/pts",
    category: "creative",
    stars: "4.8k+",
    type: "satellite",
    desc: "專注於點、形狀與空間互動的可視化幾何代碼庫，極度優雅。",
    tags: ["Geometry", "Space", "Interaction", "Canvas"],
    url: "https://github.com/williamngan/pts"
  },

  // =================== 核心引擎星系 (Systems & Terminal) ===================
  {
    id: "linux",
    name: "Linux Kernel",
    repo: "torvalds/linux",
    category: "sysops",
    stars: "186k+",
    type: "supergiant",
    desc: "現代數字文明的地基：Linus Torvalds 所創立的開源單核心作業系統。",
    tags: ["OS", "Kernel", "C", "Legend"],
    url: "https://github.com/torvalds/linux"
  },
  {
    id: "rust",
    name: "Rust Language",
    repo: "rust-lang/rust",
    category: "sysops",
    stars: "99k+",
    type: "supergiant",
    desc: "賦予所有人構建可靠、高效能軟體力量的記憶體安全系統級程式語言。",
    tags: ["Rust", "Systems", "MemorySafety", "Compiler"],
    url: "https://github.com/rust-lang/rust"
  },
  {
    id: "neovim",
    name: "Neovim",
    repo: "neovim/neovim",
    category: "sysops",
    stars: "85k+",
    type: "planet",
    desc: "以極致可擴展性為目標的 Vim 次世代重構，原生 Lua 配置與現代 LSP 整合。",
    tags: ["Editor", "Vim", "Lua", "Terminal"],
    url: "https://github.com/neovim/neovim"
  },
  {
    id: "ripgrep",
    name: "ripgrep (rg)",
    repo: "BurntSushi/ripgrep",
    category: "sysops",
    stars: "50k+",
    type: "pulsar",
    desc: "飛快如閃電的行內正則搜尋工具，終端工程師日常不可或缺的神兵利器。",
    tags: ["Rust", "Search", "Regex", "CLI"],
    url: "https://github.com/BurntSushi/ripgrep"
  },
  {
    id: "fzf",
    name: "fzf",
    repo: "junegunn/fzf",
    category: "sysops",
    stars: "68k+",
    type: "planet",
    desc: "終端模糊搜尋器之王，互動式篩選檔案、命令歷史與進程的百搭黏著劑。",
    tags: ["Go", "Fuzzy-Finder", "CLI", "Interactive"],
    url: "https://github.com/junegunn/fzf"
  },
  {
    id: "starship",
    name: "Starship",
    repo: "starship/starship",
    category: "sysops",
    stars: "46k+",
    type: "planet",
    desc: "極速、高度自訂、全平台適用的太空艙風格跨 Shell 提示符號提示器。",
    tags: ["Shell", "Rust", "Prompt", "Productivity"],
    url: "https://github.com/starship/starship"
  },
  {
    id: "bat",
    name: "bat",
    repo: "sharkdp/bat",
    category: "sysops",
    stars: "49k+",
    type: "satellite",
    desc: "帶有語法高亮與 Git 整合的現代化 cat 命令替代品。",
    tags: ["Rust", "CLI", "Syntax-Highlighting"],
    url: "https://github.com/sharkdp/bat"
  },
  {
    id: "zellij",
    name: "Zellij",
    repo: "zellij-org/zellij",
    category: "sysops",
    stars: "22k+",
    type: "planet",
    desc: "內建現代 UI 介面、支援 WebAssembly 插件的工作區終端多工複用器 (tmux 替代品)。",
    tags: ["Terminal", "Multiplexer", "Rust", "WASM"],
    url: "https://github.com/zellij-org/zellij"
  },

  // =================== 暗網脈衝星域 (Security & Ops) ===================
  {
    id: "nmap",
    name: "Nmap",
    repo: "nmap/nmap",
    category: "security",
    stars: "11k+",
    type: "supergiant",
    desc: "網路探索與安全審計的世界級傳奇工具，駭客電影中最常出鏡的掃描器。",
    tags: ["Network", "Security", "PortScan", "Legend"],
    url: "https://github.com/nmap/nmap"
  },
  {
    id: "metasploit",
    name: "Metasploit",
    repo: "rapid7/metasploit-framework",
    category: "security",
    stars: "34k+",
    type: "supergiant",
    desc: "全球最廣泛使用的開源滲透測試框架，匯聚海量漏洞利用程式碼庫。",
    tags: ["PenetrationTesting", "Exploit", "Ruby", "CyberSecurity"],
    url: "https://github.com/rapid7/metasploit-framework"
  },
  {
    id: "wireshark",
    name: "Wireshark",
    repo: "wireshark/wireshark",
    category: "security",
    stars: "8k+",
    type: "planet",
    desc: "全球首屈一指的網路封包即時擷取與深度協議分析專家級工具。",
    tags: ["Network", "PacketAnalysis", "Protocol", "Traffic"],
    url: "https://github.com/wireshark/wireshark"
  },
  {
    id: "sqlmap",
    name: "sqlmap",
    repo: "sqlmapproject/sqlmap",
    category: "security",
    stars: "33k+",
    type: "planet",
    desc: "自動化檢測與利用 SQL 注入漏洞並接管資料庫伺服器的知名神兵。",
    tags: ["SQLi", "Python", "Automation", "Security"],
    url: "https://github.com/sqlmapproject/sqlmap"
  },
  {
    id: "bitwarden",
    name: "Bitwarden",
    repo: "bitwarden/server",
    category: "security",
    stars: "15k+",
    type: "planet",
    desc: "端到端高強度加密的開源密碼管理器後端，保護千萬用戶數字資產安全。",
    tags: ["PasswordManager", "Cryptography", "Self-Hosted", "Privacy"],
    url: "https://github.com/bitwarden/server"
  },
  {
    id: "ffuf",
    name: "ffuf (Fuzz Faster)",
    repo: "ffuf/ffuf",
    category: "security",
    stars: "13k+",
    type: "pulsar",
    desc: "基於 Go 語言編寫的高速網頁端點與目錄模糊測試 (Fuzzing) 工具。",
    tags: ["Go", "Fuzzing", "WebSecurity", "Recon"],
    url: "https://github.com/ffuf/ffuf"
  },

  // =================== 奇點實驗室 (Fun, Weird & Toys) ===================
  {
    id: "free-programming-books",
    name: "Free Programming Books",
    repo: "EbookFoundation/free-programming-books",
    category: "fun",
    stars: "338k+",
    type: "supergiant",
    desc: "GitHub 歷史前三的開源藏經閣，收錄全語言免費程式設計書籍與線上教程。",
    tags: ["Learning", "Books", "Education", "Legend"],
    url: "https://github.com/EbookFoundation/free-programming-books"
  },
  {
    id: "sandspiel",
    name: "Sandspiel",
    repo: "maxbittker/sandspiel",
    category: "fun",
    stars: "3.2k+",
    type: "planet",
    desc: "在瀏覽器中用 Rust 與 WebAssembly 模擬沙子、火焰、熔岩與植物的物理落沙沙盒！",
    tags: ["Rust", "WASM", "CellularAutomata", "PhysicsToy"],
    url: "https://github.com/maxbittker/sandspiel"
  },
  {
    id: "tldr",
    name: "tldr-pages",
    repo: "tldr-pages/tldr",
    category: "fun",
    stars: "53k+",
    type: "planet",
    desc: "將晦澀難懂的 Linux man 手冊濃縮為 5 行實用代碼範例的救命小抄。",
    tags: ["CLI", "Cheatsheet", "Community", "Productivity"],
    url: "https://github.com/tldr-pages/tldr"
  },
  {
    id: "hacker-typer",
    name: "Hacker Typer",
    repo: "duiker101/hacker-typer",
    category: "fun",
    stars: "1.2k+",
    type: "satellite",
    desc: "隨便敲鍵盤就能秒變好萊塢電影頂級黑客裝逼神器的傳奇玩具。",
    tags: ["Fun", "Prank", "Hollywood", "Keyboard"],
    url: "https://github.com/duiker101/hacker-typer"
  },
  {
    id: "the-art-of-command-line",
    name: "The Art of Command Line",
    repo: "jlevy/the-art-of-command-line",
    category: "fun",
    stars: "155k+",
    type: "pulsar",
    desc: "掌握命令列操作的極簡藝術大師課，集結全球老練駭客的智慧結晶。",
    tags: ["Bash", "Linux", "Productivity", "Mastery"],
    url: "https://github.com/jlevy/the-art-of-command-line"
  },
  {
    id: "web-retro",
    name: "Web-Retro (EmulatorJS)",
    repo: "EmulatorJS/EmulatorJS",
    category: "fun",
    stars: "2.4k+",
    type: "planet",
    desc: "純瀏覽器運行的經典街機、FC、GBA 懷舊模擬器，免安裝即刻開戰。",
    tags: ["Retro", "Emulator", "WASM", "Gaming"],
    url: "https://github.com/EmulatorJS/EmulatorJS"
  }
];
