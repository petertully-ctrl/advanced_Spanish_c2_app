// ============================================================
// SETUP INSTRUCTIONS (CodeSandbox)
// 1. Go to codesandbox.io → Create Sandbox → React
// 2. In the file panel, click src/App.js and REPLACE everything with this file
// 3. Open package.json and add to "dependencies":
//      "tesseract.js": "^5.0.0"
//    CodeSandbox will auto-install it.
// 4. That's it — hit Save and it runs!
// ============================================================

import { useState, useRef } from "react";
import Tesseract from "tesseract.js";

// ── Vocabulary data ──────────────────────────────────────────
const INITIAL_VOCAB = [
  { es: "la inanición", en: "starvation", type: "noun" },
  { es: "titubear", en: "to hesitate", type: "verb" },
  { es: "agazapar", en: "to crouch", type: "verb" },
  { es: "ir al garete", en: "to go off the rails / go under", type: "phrase" },
  { es: "forzosa", en: "forced / compulsory", type: "adj" },
  { es: "insomne", en: "sleepless / insomniac", type: "adj" },
  { es: "yacer", en: "to lie buried", type: "verb" },
  { es: "la encrucijada", en: "crossroads", type: "noun" },
  { es: "el umbral", en: "threshold", type: "noun" },
  { es: "el retrete", en: "toilet", type: "noun" },
  { es: "las habladurías", en: "rumours / gossip", type: "noun" },
  { es: "armonizar", en: "to match / harmonise", type: "verb" },
  { es: "el calvario", en: "ordeal / torture", type: "noun" },
  { es: "tiesa", en: "stiff / tense", type: "adj" },
  { es: "degollar", en: "to slit the throat", type: "verb" },
  { es: "el luto", en: "mourning", type: "noun" },
  { es: "la comadrona", en: "midwife", type: "noun" },
  { es: "husmear", en: "to sniff around / pry", type: "verb" },
  { es: "al acecho", en: "lurking / on the prowl", type: "phrase" },
  { es: "grueso/a", en: "stout / stocky", type: "adj" },
  { es: "la esquela", en: "funeral notice / obituary", type: "noun" },
  { es: "amortiguar", en: "to muffle / cushion", type: "verb" },
  { es: "la podredumbre", en: "rottenness / decay", type: "noun" },
  { es: "el ebanista", en: "cabinetmaker", type: "noun" },
  { es: "los encajes", en: "lace", type: "noun" },
  { es: "el organdí", en: "organdie (sheer fabric)", type: "noun" },
  { es: "rebuscar", en: "to rummage / search through", type: "verb" },
  { es: "malsana", en: "unhealthy / unwholesome", type: "adj" },
  { es: "la oblea", en: "wafer", type: "noun" },
  { es: "antaño", en: "yesteryear / long ago", type: "adv" },
  { es: "suplir", en: "to replace / substitute for", type: "verb" },
  { es: "enorgullecer", en: "to fill with pride", type: "verb" },
  { es: "asomarse", en: "to lean out / peer out", type: "verb" },
  { es: "fulgurante", en: "flashing / dazzling", type: "adj" },
  { es: "indeleble", en: "indelible / permanent", type: "adj" },
  { es: "aniquilar", en: "to annihilate", type: "verb" },
  { es: "lamentar", en: "to regret / lament", type: "verb" },
  { es: "las nalgas", en: "buttocks", type: "noun" },
  { es: "los cimientos", en: "foundations", type: "noun" },
  { es: "rezumar", en: "to ooze / exude", type: "verb" },
  { es: "descascarillar", en: "to chip / flake off", type: "verb" },
  { es: "las peladuras", en: "peelings / scraps", type: "noun" },
  { es: "desvelar", en: "to reveal / uncover", type: "verb" },
  { es: "el estropajo", en: "scouring pad", type: "noun" },
  { es: "cerrado/a", en: "musty / stuffy", type: "adj" },
  { es: "ávida", en: "eager / avid", type: "adj" },
  { es: "deambular", en: "to wander / roam", type: "verb" },
  { es: "el pillín", en: "little rascal", type: "noun" },
  { es: "subyacente", en: "underlying", type: "adj" },
  { es: "errar", en: "to roam / err", type: "verb" },
  { es: "las tinieblas", en: "darkness / shadows", type: "noun" },
  { es: "hinchar", en: "to inflate / swell", type: "verb" },
  { es: "sempiterno/a", en: "everlasting / eternal", type: "adj" },
  { es: "la grieta", en: "crack / fissure", type: "noun" },
  { es: "revolotear", en: "to flutter / flit", type: "verb" },
  { es: "la guirnalda", en: "garland / wreath", type: "noun" },
  { es: "el desvanecimiento", en: "fading / fainting", type: "noun" },
  { es: "aguzar", en: "to prick up (ears) / sharpen", type: "verb" },
  { es: "el tufillo", en: "whiff / slight smell", type: "noun" },
  { es: "asediar", en: "to besiege / harass", type: "verb" },
  { es: "diminuto/a", en: "tiny / minuscule", type: "adj" },
  { es: "atenuar", en: "to ease / lessen", type: "verb" },
  { es: "acechar", en: "to stalk / lurk", type: "verb" },
  { es: "la rendija", en: "crack / gap / slit", type: "noun" },
  { es: "los peldaños", en: "steps / rungs", type: "noun" },
  { es: "de reojo", en: "out of the corner of one's eye", type: "phrase" },
  { es: "cavar", en: "to dig", type: "verb" },
  { es: "estallar", en: "to explode / burst", type: "verb" },
  { es: "las riendas", en: "reins", type: "noun" },
  { es: "tabicar", en: "to board up / wall off", type: "verb" },
  { es: "de par en par", en: "wide open", type: "phrase" },
  { es: "los transeúntes", en: "passersby", type: "noun" },
  { es: "prodigar", en: "to lavish / be generous with", type: "verb" },
  { es: "las entrañas", en: "entrails / depths", type: "noun" },
  { es: "trastocar", en: "to disrupt / turn upside down", type: "verb" },
  { es: "voz ronca", en: "hoarse voice / roar", type: "phrase" },
  { es: "transcurrir", en: "to pass (of time)", type: "verb" },
  { es: "los enterradores", en: "gravediggers", type: "noun" },
  { es: "las llagas", en: "sores / wounds", type: "noun" },
  { es: "las grietas", en: "chaps / cracks in skin", type: "noun" },
  { es: "los puños", en: "cuffs / fists", type: "noun" },
  { es: "los claveles", en: "carnations", type: "noun" },
  { es: "arrojar", en: "to throw / yield", type: "verb" },
  { es: "el mirlo", en: "blackbird", type: "noun" },
  { es: "el pasamanos", en: "banister / handrail", type: "noun" },
  { es: "el enano", en: "dwarf", type: "noun" },
  { es: "el forro", en: "lining (of clothing)", type: "noun" },
  { es: "sin rechistar", en: "without complaint", type: "phrase" },
  { es: "reluciente", en: "shining / gleaming", type: "adj" },
  { es: "el cabritillo", en: "kid leather / young goat", type: "noun" },
  { es: "mortecino/a", en: "faint / dying / dim", type: "adj" },
  { es: "rasgado/a", en: "almond-shaped (eyes)", type: "adj" },
  { es: "henchido/a", en: "swollen / puffed up", type: "adj" },
  { es: "la sacerdotisa", en: "priestess", type: "noun" },
  { es: "mascullar", en: "to mumble / mutter", type: "verb" },
  { es: "desgranar", en: "to shell / thresh / reel off", type: "verb" },
  { es: "el escalafón", en: "ladder / ranking scale", type: "noun" },
  { es: "los tallos", en: "stems / stalks", type: "noun" },
  { es: "sempiterna cantinela", en: "the same old story", type: "phrase" },
  { es: "la reválida", en: "final exams", type: "noun" },
  { es: "a rastras", en: "dragging / reluctantly", type: "phrase" },
  { es: "la rotundidad", en: "forcefulness / roundness", type: "noun" },
  { es: "vetusto/a", en: "ancient / decrepit", type: "adj" },
  { es: "aplacar", en: "to appease / placate", type: "verb" },
  { es: "a horcajadas", en: "astride / straddling", type: "phrase" },
  { es: "rebosar", en: "to overflow / brim over", type: "verb" },
  { es: "aturdir", en: "to stun / daze", type: "verb" },
  { es: "el marfil", en: "ivory", type: "noun" },
  { es: "el martillo", en: "hammer", type: "noun" },
  { es: "los alfileres", en: "pins", type: "noun" },
  { es: "trazar", en: "to trace / draw", type: "verb" },
  { es: "la motita", en: "tiny speck / fleck", type: "noun" },
  { es: "la pita", en: "string / agave fibre", type: "noun" },
  { es: "sollozar", en: "to sob", type: "verb" },
  { es: "la gavilla", en: "sheaf / bundle", type: "noun" },
  { es: "el torbellino", en: "whirlwind / tornado", type: "noun" },
  { es: "aferrar", en: "to grasp / cling to", type: "verb" },
  { es: "arraigado/a", en: "deep-rooted / established", type: "adj" },
  { es: "inculcado/a", en: "instilled / ingrained", type: "adj" },
  { es: "el cohete", en: "rocket / firework", type: "noun" },
  { es: "la campesina", en: "peasant woman", type: "noun" },
  { es: "entrecano/a", en: "greying / salt-and-pepper", type: "adj" },
  { es: "el parloteo", en: "chatter / prattle", type: "noun" },
  { es: "el mimbre", en: "wicker / willow", type: "noun" },
  { es: "el verdugo", en: "executioner / tormentor", type: "noun" },
];

// ── Helpers ──────────────────────────────────────────────────
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function parseVocabLines(text) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(.+?)\s*[-–—]\s*(.+)$/);
      return match
        ? { es: match[1].trim(), en: match[2].trim(), type: "noun" }
        : null;
    })
    .filter(Boolean);
}

const TYPE_COLORS = {
  verb: { bg: "#AFA9EC", text: "#26215C" },
  noun: { bg: "#9FE1CB", text: "#04342C" },
  adj: { bg: "#C0DD97", text: "#173404" },
  phrase: { bg: "#F4C0D1", text: "#4B1528" },
  adv: { bg: "#FAC775", text: "#412402" },
};

// ── Main component ────────────────────────────────────────────
export default function FlashcardApp() {
  const [allWords, setAllWords] = useState(INITIAL_VOCAB);
  const [deck, setDeck] = useState(() => shuffle(INITIAL_VOCAB));
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showSpanish, setShowSpanish] = useState(true);
  const [filterMode, setFilterMode] = useState("all");
  const [scores, setScores] = useState({});
  const [addTab, setAddTab] = useState("paste"); // "paste" | "camera"
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [pasteText, setPasteText] = useState("");

  // Camera / OCR state
  const [cameraActive, setCameraActive] = useState(false);
  const [ocrStatus, setOcrStatus] = useState("");
  const [ocrWords, setOcrWords] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // ── Derived values ──────────────────────────────────────────
  const filteredDeck =
    filterMode === "review"
      ? deck.filter((w) => scores[w.es] === "bad")
      : filterMode === "good"
      ? deck.filter((w) => scores[w.es] === "good")
      : deck;

  const total = filteredDeck.length;
  const idx = total > 0 ? cardIndex % total : 0;
  const card = filteredDeck[idx];
  const known = Object.values(scores).filter((v) => v === "good").length;
  const review = Object.values(scores).filter((v) => v === "bad").length;

  // ── Card actions ────────────────────────────────────────────
  function navigate(dir) {
    setFlipped(false);
    setTimeout(() => {
      setCardIndex(
        (i) =>
          (((i + dir) % Math.max(total, 1)) + Math.max(total, 1)) %
          Math.max(total, 1)
      );
    }, 50);
  }

  function markCard(result) {
    if (!card) return;
    setScores((s) => ({ ...s, [card.es]: result }));
    navigate(1);
  }

  function addWordsToDeck(newWords) {
    const updated = [...allWords, ...newWords];
    setAllWords(updated);
    setDeck(shuffle(updated));
    setCardIndex(0);
    setFlipped(false);
  }

  // ── Paste add ───────────────────────────────────────────────
  function handlePasteAdd() {
    const words = parseVocabLines(pasteText);
    if (!words.length) return;
    addWordsToDeck(words);
    setPasteText("");
    setShowAddPanel(false);
  }

  // ── Camera ──────────────────────────────────────────────────
  async function startCamera() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // rear camera on phones
      });
      streamRef.current = s;
      videoRef.current.srcObject = s;
      setCameraActive(true);
      setOcrStatus("Point camera at your vocab list");
    } catch {
      setOcrStatus("Camera unavailable — try uploading a photo instead.");
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }

  function takePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    stopCamera();
    runOCR(imageData);
  }

  // ── OCR ─────────────────────────────────────────────────────
  async function runOCR(imageData) {
    setOcrStatus("Scanning… this may take a moment");
    setOcrWords([]);
    try {
      const result = await Tesseract.recognize(imageData, "spa+eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setOcrStatus(`Reading… ${Math.round(m.progress * 100)}%`);
          }
        },
      });
      const words = parseVocabLines(result.data.text);
      if (words.length === 0) {
        setOcrStatus(
          "No words detected. Try better lighting, or paste manually."
        );
      } else {
        setOcrStatus(`${words.length} word(s) detected — review below`);
        setOcrWords(words);
      }
    } catch {
      setOcrStatus("Scan failed. Try again or paste manually.");
    }
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => runOCR(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function confirmOcrWords() {
    addWordsToDeck(ocrWords);
    setOcrWords([]);
    setOcrStatus("Words added!");
    setShowAddPanel(false);
  }

  // ── Styles (inline — no extra CSS file needed) ──────────────
  const s = {
    app: {
      maxWidth: 520,
      margin: "0 auto",
      padding: "20px 16px",
      fontFamily: "system-ui, sans-serif",
      color: "#1a1a1a",
    },
    cardScene: {
      perspective: 1000,
      width: "100%",
      height: 200,
      cursor: "pointer",
      margin: "12px 0",
    },
    cardBody: (flipped) => ({
      position: "relative",
      width: "100%",
      height: "100%",
      transformStyle: "preserve-3d",
      transition: "transform 0.45s cubic-bezier(.4,2,.3,1)",
      transform: flipped ? "rotateY(180deg)" : "none",
    }),
    cardFace: {
      position: "absolute",
      inset: 0,
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
      borderRadius: 16,
      border: "1px solid #e5e7eb",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    },
    cardBack: {
      transform: "rotateY(180deg)",
    },
    badge: (type) => ({
      position: "absolute",
      top: 10,
      right: 10,
      fontSize: 11,
      padding: "2px 8px",
      borderRadius: 20,
      background: TYPE_COLORS[type]?.bg || "#e5e7eb",
      color: TYPE_COLORS[type]?.text || "#333",
      fontWeight: 600,
    }),
    word: {
      fontSize: "clamp(20px, 5vw, 28px)",
      fontWeight: 600,
      textAlign: "center",
      lineHeight: 1.3,
    },
    hint: {
      fontSize: 11,
      color: "#9ca3af",
      marginTop: 10,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
    translation: {
      fontSize: "clamp(16px, 4vw, 22px)",
      color: "#374151",
      textAlign: "center",
      lineHeight: 1.4,
    },
    seg: {
      display: "flex",
      background: "#f3f4f6",
      borderRadius: 20,
      padding: 3,
    },
    segBtn: (active) => ({
      fontSize: 12,
      padding: "5px 12px",
      borderRadius: 20,
      border: "none",
      cursor: "pointer",
      background: active ? "#fff" : "transparent",
      color: active ? "#111" : "#6b7280",
      fontWeight: active ? 600 : 400,
      boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
    }),
    iconBtn: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      border: "1px solid #e5e7eb",
      background: "#f9fafb",
      cursor: "pointer",
      fontSize: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    navBtn: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      border: "1px solid #e5e7eb",
      background: "#f9fafb",
      cursor: "pointer",
      fontSize: 18,
      color: "#6b7280",
    },
    scoreBtnBad: {
      flex: 1,
      maxWidth: 160,
      padding: "10px",
      borderRadius: 10,
      border: "1px solid #fca5a5",
      background: "#fef2f2",
      color: "#dc2626",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
    },
    scoreBtnGood: {
      flex: 1,
      maxWidth: 160,
      padding: "10px",
      borderRadius: 10,
      border: "1px solid #86efac",
      background: "#f0fdf4",
      color: "#16a34a",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
    },
    statCard: {
      flex: 1,
      background: "#f9fafb",
      borderRadius: 10,
      padding: "8px 12px",
      textAlign: "center",
      border: "1px solid #f3f4f6",
    },
    panel: {
      background: "#f9fafb",
      borderRadius: 14,
      border: "1px solid #e5e7eb",
      padding: 16,
      marginTop: 12,
    },
    tab: (active) => ({
      flex: 1,
      padding: "7px",
      borderRadius: 8,
      border: "1px solid " + (active ? "#d1d5db" : "#e5e7eb"),
      background: active ? "#fff" : "transparent",
      color: active ? "#111" : "#6b7280",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: active ? 600 : 400,
    }),
    textarea: {
      width: "100%",
      border: "1px solid #d1d5db",
      borderRadius: 8,
      padding: "8px 10px",
      fontSize: 13,
      fontFamily: "inherit",
      resize: "vertical",
      minHeight: 90,
    },
    primaryBtn: {
      width: "100%",
      marginTop: 8,
      padding: 10,
      borderRadius: 8,
      border: "none",
      background: "#7c3aed",
      color: "#fff",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
    },
    camBtn: {
      width: "100%",
      padding: 10,
      borderRadius: 8,
      border: "1px solid #d1d5db",
      background: "#fff",
      fontSize: 14,
      cursor: "pointer",
      marginBottom: 6,
    },
  };

  const pct = total > 1 ? Math.round((idx / (total - 1)) * 100) : 100;

  return (
    <div style={s.app}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>Palabras nuevas</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            {allWords.length} words · {known} known · {review} reviewing
          </div>
        </div>
        <button style={s.iconBtn} onClick={() => setShowAddPanel((v) => !v)}>
          ＋
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[
          ["Total", allWords.length, "#111"],
          ["Known", known, "#16a34a"],
          ["Review", review, "#dc2626"],
        ].map(([label, val, color]) => (
          <div key={label} style={s.statCard}>
            <div style={{ fontSize: 20, fontWeight: 700, color }}>{val}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 10,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={s.seg}>
          {[
            ["es", "ES → EN"],
            ["en", "EN → ES"],
          ].map(([dir, label]) => (
            <button
              key={dir}
              style={s.segBtn(showSpanish === (dir === "es"))}
              onClick={() => {
                setShowSpanish(dir === "es");
                setFlipped(false);
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={s.seg}>
          {[
            ["all", "All"],
            ["review", "Review"],
            ["good", "Known"],
          ].map(([val, label]) => (
            <button
              key={val}
              style={s.segBtn(filterMode === val)}
              onClick={() => {
                setFilterMode(val);
                setCardIndex(0);
                setFlipped(false);
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          style={s.iconBtn}
          title="Shuffle"
          onClick={() => {
            setDeck(shuffle(allWords));
            setCardIndex(0);
            setFlipped(false);
          }}
        >
          ⇄
        </button>
      </div>

      {/* Progress */}
      <div
        style={{
          height: 3,
          background: "#f3f4f6",
          borderRadius: 2,
          overflow: "hidden",
          marginBottom: 4,
        }}
      >
        <div
          style={{
            height: "100%",
            width: pct + "%",
            background: "#7c3aed",
            borderRadius: 2,
            transition: "width 0.3s",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#9ca3af",
          marginBottom: 12,
        }}
      >
        <span>
          Card {total > 0 ? idx + 1 : 0} of {total}
        </span>
        <span>{pct}%</span>
      </div>

      {/* Card */}
      <div style={s.cardScene} onClick={() => setFlipped((f) => !f)}>
        <div style={s.cardBody(flipped)}>
          {/* Front */}
          <div style={s.cardFace}>
            {card && <div style={s.badge(card.type)}>{card.type}</div>}
            <div style={s.word}>
              {card ? (showSpanish ? card.es : card.en) : "—"}
            </div>
            <div style={s.hint}>tap to reveal</div>
          </div>
          {/* Back */}
          <div style={{ ...s.cardFace, ...s.cardBack, background: "#fafbff" }}>
            <div style={s.translation}>
              {card ? (showSpanish ? card.en : card.es) : "—"}
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 10 }}>
              {card ? (showSpanish ? card.es : card.en) : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Score buttons (shown after flip) */}
      {flipped && card && (
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            margin: "8px 0",
          }}
        >
          <button style={s.scoreBtnBad} onClick={() => markCard("bad")}>
            ✗ Review again
          </button>
          <button style={s.scoreBtnGood} onClick={() => markCard("good")}>
            ✓ Got it!
          </button>
        </div>
      )}

      {/* Nav */}
      <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          margin: "10px 0",
        }}
      >
        <button style={s.navBtn} onClick={() => navigate(-1)}>
          ←
        </button>
        <button style={s.navBtn} onClick={() => navigate(1)}>
          →
        </button>
      </div>

      {/* Add panel */}
      {showAddPanel && (
        <div style={s.panel}>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>Add words</div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            <button
              style={s.tab(addTab === "paste")}
              onClick={() => setAddTab("paste")}
            >
              Paste text
            </button>
            <button
              style={s.tab(addTab === "camera")}
              onClick={() => setAddTab("camera")}
            >
              Camera / photo
            </button>
          </div>

          {/* ── Paste tab ── */}
          {addTab === "paste" && (
            <div>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
                One word per line: <em>spanish - english</em>
              </div>
              <textarea
                style={s.textarea}
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={
                  "titubear - to hesitate\nla encrucijada - crossroads"
                }
              />
              <button style={s.primaryBtn} onClick={handlePasteAdd}>
                Add to deck
              </button>
            </div>
          )}

          {/* ── Camera tab ── */}
          {addTab === "camera" && (
            <div>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
                Point your camera at a vocab list written as{" "}
                <em>word - translation</em>. Claude will read it and add the
                words.
              </div>

              {/* Live video preview */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: "100%",
                  borderRadius: 8,
                  display: cameraActive ? "block" : "none",
                  marginBottom: 8,
                  background: "#000",
                }}
              />

              {/* Hidden canvas for snapshot */}
              <canvas ref={canvasRef} style={{ display: "none" }} />

              {/* Status message */}
              {ocrStatus && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    textAlign: "center",
                    marginBottom: 8,
                  }}
                >
                  {ocrStatus}
                </div>
              )}

              {/* Camera controls */}
              {!cameraActive ? (
                <button style={s.camBtn} onClick={startCamera}>
                  📷 Open camera
                </button>
              ) : (
                <>
                  <button
                    style={{
                      ...s.camBtn,
                      background: "#7c3aed",
                      color: "#fff",
                      border: "none",
                    }}
                    onClick={takePhoto}
                  >
                    ⊙ Take photo & scan
                  </button>
                  <button style={s.camBtn} onClick={stopCamera}>
                    ✕ Stop camera
                  </button>
                </>
              )}

              {/* File upload fallback */}
              <div
                style={{
                  fontSize: 11,
                  color: "#9ca3af",
                  textAlign: "center",
                  margin: "4px 0",
                }}
              >
                or upload a photo
              </div>
              <button
                style={s.camBtn}
                onClick={() => fileInputRef.current.click()}
              >
                📁 Choose photo from library
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />

              {/* OCR preview & confirm */}
              {ocrWords.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div
                    style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}
                  >
                    {ocrWords.length} word(s) detected:
                  </div>
                  <div
                    style={{
                      maxHeight: 160,
                      overflowY: "auto",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      padding: 8,
                      fontSize: 13,
                      background: "#fff",
                    }}
                  >
                    {ocrWords.map((w, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "3px 0",
                          borderBottom: "1px solid #f3f4f6",
                        }}
                      >
                        <strong>{w.es}</strong> — {w.en}
                      </div>
                    ))}
                  </div>
                  <button style={s.primaryBtn} onClick={confirmOcrWords}>
                    Add {ocrWords.length} word(s) to deck
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
