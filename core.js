import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const cfg = {
  apiKey: "AIzaSyBnnRUE345PuYd9TxXw3-5e6yz5P2I3E38",
  authDomain: "project-5757280868007028495.firebaseapp.com",
  databaseURL: "https://project-5757280868007028495-default-rtdb.firebaseio.com",
  projectId: "project-5757280868007028495",
  storageBucket: "project-5757280868007028495.firebasestorage.app",
  messagingSenderId: "863833238458",
  appId: "1:863833238458:web:4e9b309d3a1a7336c94b83"
};
const app = initializeApp(cfg);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const SITE = (new URLSearchParams(location.search).get("site") || "").toLowerCase();
export const P = p => `sites/${SITE}${p ? "/" + p : ""}`;
export const logout = () => signOut(auth);

// a = لون التمييز | b = لون الغامق (نصوص/فوتر) | d = خلفية الدارك مود
export const THEMES = {
  ocean:  { n: "أوشن",       a: "#00a8e8", b: "#001f3f", d: "#030810" },
  gold:   { n: "ذهبي ملكي",  a: "#c9a227", b: "#1a1405", d: "#0d0a02" },
  rose:   { n: "وردي",       a: "#e11d74", b: "#3b0a24", d: "#12040b" },
  emerald:{ n: "زمردي",      a: "#10b981", b: "#052e22", d: "#02100b" },
  sunset: { n: "غروب",       a: "#f97316", b: "#2a1204", d: "#110802" },
  violet: { n: "بنفسجي",     a: "#8b5cf6", b: "#1e1038", d: "#0a0614" },
  crimson:{ n: "أحمر",       a: "#dc2626", b: "#2b0707", d: "#0f0303" },
  teal:   { n: "تركواز",     a: "#0d9488", b: "#042f2e", d: "#021413" },
  sky:    { n: "سماوي",      a: "#38bdf8", b: "#0c4a6e", d: "#06121c" },
  mono:   { n: "أبيض وأسود", a: "#4b5563", b: "#000000", d: "#050505" }
};

export function applyTheme(s = {}) {
  const t = THEMES[s.theme] || THEMES.ocean, a = s.accent || t.a, b = t.b, d = t.d;
  let el = document.getElementById("theme-style");
  if (!el) { el = document.createElement("style"); el.id = "theme-style"; document.head.appendChild(el); }
  el.textContent = `:root{--primary-accent:${a};--primary-accent-hover:color-mix(in srgb,${a} 80%,#000);--bg-dark-brand:${b};--text-main:${b};--bg-light:color-mix(in srgb,${a} 7%,#fff);--border:color-mix(in srgb,${a} 22%,#fff)}
body.dark-theme{--bg-page:${d};--bg-card:color-mix(in srgb,${a} 7%,${d});--drawer-bg:color-mix(in srgb,${a} 7%,${d});--bg-light:color-mix(in srgb,${a} 12%,${d});--border:color-mix(in srgb,${a} 25%,${d});--header-bg:color-mix(in srgb,${d} 85%,transparent);--text-main:#f1f5f9}`;
}

// بوابة تسجيل الدخول (للوحة الرئيسية ولوحة المنتجات)
export function gate() {
  return new Promise(res => onAuthStateChanged(auth, u => {
    document.getElementById("gate")?.remove();
    if (u) return res(u);
    const g = document.createElement("div"); g.id = "gate";
    g.style.cssText = "position:fixed;inset:0;z-index:9999;background:#0b1020;display:grid;place-items:center;font-family:Cairo,sans-serif;direction:rtl";
    g.innerHTML = `<style>#gate input,#gate button{padding:12px;border-radius:10px;border:1px solid #2a3560;background:#0b1020;color:#fff;font:inherit}#gate button{background:#6366f1;border:0;cursor:pointer;font-weight:700}</style>
<form style="background:#141b34;padding:28px;border-radius:16px;width:min(360px,92vw);display:grid;gap:12px;color:#fff"><h3 style="margin:0">تسجيل الدخول</h3>
<input id="g-e" type="email" placeholder="الإيميل" required><input id="g-p" type="password" placeholder="الباسورد" required><button>دخول</button><small id="g-m" style="color:#f87171"></small></form>`;
    document.body.appendChild(g);
    g.querySelector("form").onsubmit = async e => {
      e.preventDefault();
      try { await signInWithEmailAndPassword(auth, g.querySelector("#g-e").value, g.querySelector("#g-p").value); }
      catch { g.querySelector("#g-m").textContent = "الإيميل أو الباسورد غلط"; }
    };
  }));
}
