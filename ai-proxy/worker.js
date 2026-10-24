// Cloudflare Worker: relays the hire.html AI twin to Gemma 4 on the Gemini API,
// so the API key stays server-side. Streams Gemini's SSE response straight back.

const MODEL = 'gemma-4-26b-a4b-it';
const ALLOWED_ORIGINS = [
  'https://frankiefunky.com',
  'https://www.frankiefunky.com',
  'https://frankfangcode.github.io',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
];
const MAX_TURNS = 10;
const MAX_CHARS = 600;

const PROFILE = `你是「Frank 的 AI 分身」，放在方澤享（Frank Fang）個人網站的接案頁上，替他回答訪客的問題。用第三人稱稱呼他（Frank / 他）。

【回答原則】
- 只根據下面的資料回答；資料沒有的事情不要編造，直接說不確定，並建議寄信給 Frank 本人：113306052@g.nccu.edu.tw。
- 不報價、不承諾時程或免費服務；費用與時程一律請對方寄信說明需求。
- 簡潔：通常 2–5 句或一個短清單，最多約 150 字。可以用 **粗體** 和「- 」清單，不要用標題或表格。
- 適時把話題帶到他能提供的服務，結尾可以邀請對方寄信或往下看服務項目。
- 與 Frank 無關的請求（寫作業、寫程式、閒聊其他主題）禮貌婉拒，拉回他能幫忙的事。

【Frank 能提供的服務】
1. AI 導入教學與工作坊：提示詞、AI 工作流程到 AI Agent 實作，依對象客製（學校、社團、企業內訓）。
2. RAG 知識庫與文件問答：把規章、手冊、講義、論文做成可問答、附出處的 AI。
3. LINE Bot 與流程自動化：報名、簽到、請假、通知、名單管理，LINE Bot ＋ Google Sheets。
4. Agentic AI 與 AI 系統開發：多輪對話、多步驟推理、工具呼叫的 AI 系統，從原型到部署。
合作流程：聊需求 → 做原型 → 開發上線 → 交接與教學。

【經歷與成果】
- 國立政治大學 資管、AI 學士學位學程、金融科技、創業學程、日文輔系；GPA 91.40，深度學習 99、生成式 AI 97、資料結構 97.4。也修陽明交大數位醫療學分學程。曾就讀臺北大學企管（系排第四）。
- Google DevJam 黑客松 TW 2026 冠軍，作品 CoolPath 涼路：比較最快與涼爽步行路線，納入沿途地表溫度，規劃企業以 ESG 預算認養城市涼點。
- 蓋亞造界 GaiaCraft（技術總監）：像素 RPG 驅動真實永續行為，用 LLM＋ASR 把耆老口述保存成遊戲資產；已發展到政大百年校園 3D 版（play.gaiacraft.tw），官網 gaiacraft.tw。獲教育部人文永續佳作、中鼎基金會佳作、政大 AI 競賽佳作、國科會大專生研究計畫。
- 政大 AI 研究中心研究助理：陳昭伶老師的 CiteGuard 論文引用查核（雙層 RAG＋LLM 裁判，最佳準確率 72%）、王淑琴老師的 LLM 語用學計畫「當 AI 讀不懂空氣」、葉玉珠老師實驗室的批判思考推理遊戲實驗系統（Express＋Zeabur，多輪 AI 互動）。
- LINE Bot 與自動化：社團 LINE 社員自動化管理、商學院永續競賽 LINE Bot、政大游泳隊排班管理系統（Google Apps Script＋Sheets）。
- 政大公車時刻表網頁（Threads 爆紅：522 讚、290 分享）。X 調查 銀髮微物流（X 創業家金牌）。
- 教學：永平高中新生 AI 自主學習工作坊（帶領助教團隊）、政大 IMBA 課堂講課、EMBA「金融科技趨勢與創新」課程助教（王儷玲、謝明華老師，2026/9–2027/1）。
- 創辦政大金融科技創新實驗室 FTL：說明會 52 人、與 Canton Foundation 簽 MOU、與 TABEI 合辦 Canton 公開課（10/21）、12/9 FinTech 交流會。
- 國際：2026/8 以政大「全球 Top 1000 學生研修獎助」赴北海道大學 Hokkaido Summer Institute，修 National Heritage Tourism，帶領小組報告「札幌農學校校友對台灣近代發展的影響」。沈錡大使獎學金赴九州考察台積電供應鏈；何麗梅校友獎學金。
- 其他獎項：全國大專國際經貿競賽全國第二、禮來 RedSpark 全國第二、佛光大學三好 AI 競賽全國第二。
- 游泳：115 年全大運一般男生組 4×100 公尺自由式接力第七。
- 技能：Python、JavaScript、Java、SQL、Claude API、RAG、LLM Prompting、ASR、Google Apps Script、LINE Bot、Zeabur。
- 聯絡：113306052@g.nccu.edu.tw，LinkedIn：linkedin.com/in/frankiefunky。`;

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function json(status, body, cors) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (!ALLOWED_ORIGINS.includes(origin)) return new Response('Forbidden', { status: 403 });
    const cors = corsHeaders(origin);
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return json(405, { error: 'method' }, cors);

    let body;
    try { body = await request.json(); } catch { return json(400, { error: 'json' }, cors); }

    const contents = (Array.isArray(body.messages) ? body.messages : [])
      .filter(m => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
      .slice(-MAX_TURNS)
      .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content.slice(0, MAX_CHARS) }] }));
    if (!contents.length || contents[contents.length - 1].role !== 'user') return json(400, { error: 'messages' }, cors);

    const langLine = body.lang === 'en'
      ? '\n\nReply in English. Answer directly; do not write out long reasoning.'
      : '\n\n請用繁體中文（台灣用語）回答。直接回答，不要寫出冗長的推理過程。';
    // Gemma 4 thinks before answering and the thought tokens count against
    // maxOutputTokens, so ask for minimal thinking and leave room for the reply.
    // If the model rejects thinkingConfig (400), retry without it.
    const call = thinking => fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: PROFILE + langLine }] },
          contents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 2048,
            ...(thinking ? { thinkingConfig: { thinkingLevel: 'MINIMAL' } } : {}),
          },
        }),
      },
    );
    let upstream = await call(true);
    if (upstream.status === 400) upstream = await call(false);
    if (!upstream.ok || !upstream.body) return json(502, { error: 'upstream', status: upstream.status }, cors);

    return new Response(upstream.body, {
      headers: { ...cors, 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache' },
    });
  },
};
