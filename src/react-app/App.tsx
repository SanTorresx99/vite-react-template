// src/react-app/App.tsx
// MACROVLAB — Landing cinematográfica · Identidade Azul + Dourado

import React, { useState, useEffect, useRef } from "react";

/* ─── Particle Canvas ─── */
interface PCOpts { density?: number; maxLink?: number; speed?: number; drift?: number; sizeMul?: number; }

const ParticleCanvas: React.FC<{
  opts?: PCOpts;
  className?: string;
  style?: React.CSSProperties;
  mouseRef?: React.RefObject<{ x: number; y: number }>;
}> = ({ opts, className = "particle-canvas", style, mouseRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optsRef   = useRef(opts);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Capture non-null refs for use in closures
    const cvs: HTMLCanvasElement = canvas;
    const cx: CanvasRenderingContext2D = ctx;

    const { density = 0.00009, maxLink = 150, speed = 0.18, sizeMul = 1, drift = 0 } = optsRef.current ?? {};
    type Pt = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let w = 0, h = 0, dpr = 1, pts: Pt[] = [], rafId = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      w = cvs.clientWidth; h = cvs.clientHeight;
      cvs.width = w * dpr; cvs.height = h * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: Math.max(28, Math.round(w * h * density)) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed + drift,
        vy: (Math.random() - 0.5) * speed,
        r: (Math.random() * 1.6 + 0.6) * sizeMul,
        a: Math.random() * 0.5 + 0.3,
      }));
    }

    function draw() {
      const mx = mouseRef?.current?.x ?? -9999;
      const my = mouseRef?.current?.y ?? -9999;
      cx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const pi = pts[i], pj = pts[j];
          const dist = Math.hypot(pi.x - pj.x, pi.y - pj.y);
          if (dist < maxLink) {
            cx.strokeStyle = `rgba(217,164,65,${((1 - dist / maxLink) * 0.5).toFixed(3)})`;
            cx.lineWidth = 0.6;
            cx.beginPath(); cx.moveTo(pi.x, pi.y); cx.lineTo(pj.x, pj.y); cx.stroke();
          }
        }
      }
      for (const p of pts) {
        const dm = Math.hypot(p.x - mx, p.y - my);
        let glow = p.a;
        if (dm < 170) {
          const ratio = 1 - dm / 170;
          glow = Math.min(1, p.a + ratio * 0.6);
          cx.strokeStyle = `rgba(244,212,136,${(ratio * 0.5).toFixed(3)})`;
          cx.lineWidth = 0.7;
          cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(mx, my); cx.stroke();
        }
        cx.beginPath();
        cx.fillStyle = `rgba(244,212,136,${glow.toFixed(3)})`;
        cx.shadowColor = "rgba(244,212,136,.9)"; cx.shadowBlur = p.r * 4;
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2); cx.fill();
        cx.shadowBlur = 0;
      }
      rafId = requestAnimationFrame(draw);
    }

    let rtimer = 0;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onResize = () => {
      clearTimeout(rtimer);
      rtimer = window.setTimeout(() => { resize(); cancelAnimationFrame(rafId); start(); }, 180);
    };
    window.addEventListener("resize", onResize);

    function start() {
      resize(); cancelAnimationFrame(rafId);
      if (!mq.matches) { draw(); } else {
        cx.clearRect(0, 0, w, h);
        for (const p of pts) { cx.beginPath(); cx.fillStyle = `rgba(244,212,136,${p.a})`; cx.arc(p.x, p.y, p.r, 0, Math.PI * 2); cx.fill(); }
      }
    }
    start();
    return () => { cancelAnimationFrame(rafId); clearTimeout(rtimer); window.removeEventListener("resize", onResize); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={canvasRef} className={className} style={style} />;
};

/* ─── SVG Icons ─── */
const ToothIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M12 4c-3 0-4 2-4 5 0 4 1.2 11 2.4 11 .9 0 1-3 1.6-3s.7 3 1.6 3c1.2 0 2.4-7 2.4-11 0-3-1-5-4-5Z"/>
  </svg>
);

const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M12 3l7 4v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V7l7-4Z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ─── FAQ Accordion ─── */
interface FAQItemProps { question: string; answer: string; }

const FAQAccordionItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-header">
        <span className="faq-question">{question}</span>
        <span className="faq-toggle-icon" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3.75V14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </div>
      <div className="faq-body">
        <p style={{ fontSize: ".94rem" }}>{answer}</p>
      </div>
    </div>
  );
};

/* ─── Main App ─── */
export default function App() {
  const [isScrolled,   setIsScrolled]   = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [sliderPos,    setSliderPos]    = useState(50);
  const [activeStep,   setActiveStep]   = useState(0);
  const [workType,     setWorkType]     = useState("coroa_zirconia");
  const [material,     setMaterial]     = useState("zirconia_mult");
  const [toothShade,   setToothShade]   = useState("A2");
  const [urgency,      setUrgency]      = useState("padrao");
  const [dentistName,  setDentistName]  = useState("");
  const [dentistCro,   setDentistCro]   = useState("");
  const [dentistPhone, setDentistPhone] = useState("");
  const [caseSubmitted,setCaseSubmitted]= useState(false);
  const [caseCode,     setCaseCode]     = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const containerRef  = useRef<HTMLDivElement>(null);
  const heroMouseRef  = useRef({ x: -9999, y: -9999 });

  /* scroll lock for navbar */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* reveal on scroll */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* close menu on nav link click */
  const closeMenu = () => setMenuOpen(false);

  /* before/after slider */
  const handleSliderMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setSliderPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
    }
  };
  const onMouseMove = (e: React.MouseEvent) => handleSliderMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => { if (e.touches[0]) handleSliderMove(e.touches[0].clientX); };

  /* price calculator */
  const calculatePrice = () => {
    const base: Record<string, number> = { coroa_zirconia: 390, lente_emax: 480, sobre_implante: 710, placa_miorrelaxante: 190 };
    let p = base[workType] ?? 390;
    if (material === "emax_cad") p += 50;
    if (material === "zirconia_mult_4d") p += 40;
    if (urgency === "express") p += 90;
    return p;
  };

  /* delivery date */
  useEffect(() => {
    const today = new Date();
    const days = urgency === "express" ? 2 : 5;
    let count = 0;
    const d = new Date(today);
    while (count < days) { d.setDate(d.getDate() + 1); const wd = d.getDay(); if (wd !== 0 && wd !== 6) count++; }
    setDeliveryDate(d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }));
  }, [urgency, workType]);

  const handleRegisterCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dentistName || !dentistCro || !dentistPhone) { alert("Por favor, preencha todos os campos do dentista."); return; }
    const code = `MCV-2026-${Math.floor(1000 + Math.random() * 9000)}-RO`;
    setCaseCode(code); setCaseSubmitted(true);
  };

  const resetForm = () => { setCaseSubmitted(false); setDentistName(""); setDentistCro(""); setDentistPhone(""); };

  /* workflow steps */
  const workflowSteps = [
    { title: "Escaneamento & Envio",   tag: "Etapa 01", tech: "Sistemas STL/PLY Abertos",       desc: "O dentista realiza o escaneamento intraoral e envia o arquivo de malha 3D (STL ou PLY) diretamente para nós por meio do nosso formulário ou via Medit Link, Align iTero ou Carestream.", stat: "Compatibilidade: 100%" },
    { title: "Planejamento CAD",       tag: "Etapa 02", tech: "Exocad DentalDB & 3Shape",        desc: "Nossos projetistas importam o modelo digital no software CAD e desenham a coroa ou faceta com precisão micrométrica, mapeando margem de término, pontos de contato e oclusão fisiológica.", stat: "Margem de Erro: < 5 mícrons" },
    { title: "Fresagem CNC & CAM",     tag: "Etapa 03", tech: "Fresadoras Alemãs de 5 Eixos",    desc: "O projeto CAD é enviado à central de usinagem. Nossa fresadora esculpe o bloco de zircônia multilayer ou dissilicato de lítio com brocas diamantadas resfriadas a ar.", stat: "Velocidade: 60.000 RPM" },
    { title: "Arte e Maquiagem",       tag: "Etapa 04", tech: "Cerâmica Feldspática Artesanal",  desc: "As peças fresadas passam pela sinterização térmica e pela maquiagem artística realizada à mão por técnicos experientes. Aplicamos texturas e cores na escala Vita para translucidez idêntica ao dente natural.", stat: "Personalização: Exclusiva" },
    { title: "Logística Inteligente",  tag: "Etapa 05", tech: "Desinfecção UV-C & Entrega Express", desc: "Após controle de qualidade em microscópio, as próteses são esterilizadas em câmara UV-C, embaladas a vácuo e despachadas por portador expresso para o seu consultório.", stat: "Logística: Rastreamento em tempo real" },
  ];

  return (
    <>
      {/* Background decorative */}
      <div className="bg-grid" />
      <div className="bg-glow-1" />
      <div className="bg-glow-2" />

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <a href="#top" className="logo-brand" aria-label="MACROVLAB">
            <img src="/emblem.png" alt="MACROVLAB emblem" className="logo-emblem" />
            <span className="logo-wordmark">MACROV<span className="lab">LAB</span></span>
            <span className="logo-dot" />
          </a>
          <ul className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
            <li><a href="#manifesto" className="nav-link" onClick={closeMenu}>Manifesto</a></li>
            <li><a href="#jornada"   className="nav-link" onClick={closeMenu}>A Jornada</a></li>
            <li><a href="#solucoes"  className="nav-link" onClick={closeMenu}>Soluções</a></li>
            <li><a href="#simulador" className="nav-link" onClick={closeMenu}>Simulador</a></li>
            <li><a href="#galeria"   className="nav-link" onClick={closeMenu}>Galeria</a></li>
            <li><a href="#contato"   className="nav-link btn btn-gold" style={{ padding: "10px 20px", borderRadius: "999px" }} onClick={closeMenu}>Fale conosco</a></li>
          </ul>
          <button className="burger-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header
        className="hero" id="top"
        onMouseMove={e => { const b = e.currentTarget.getBoundingClientRect(); heroMouseRef.current = { x: e.clientX - b.left, y: e.clientY - b.top }; }}
        onMouseLeave={() => { heroMouseRef.current = { x: -9999, y: -9999 }; }}
      >
        <ParticleCanvas
          className="particle-canvas-hero"
          opts={{ density: 0.00011, maxLink: 155, speed: 0.22, sizeMul: 1.1 }}
          mouseRef={heroMouseRef}
        />

        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-tag">
                <SparklesIcon />
                <span>Prótese Dentária · CADDesign Premium</span>
              </div>

              <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>
                Estamos<br />
                <b className="gold-text">evoluindo.</b>
              </h1>

              <p style={{ fontSize: "clamp(17px, 1.5vw, 20px)", maxWidth: "520px", marginTop: "10px" }}>
                Da tradição à inovação. Unimos arte protética e tecnologia CAD/CAM de ponta para moldar o futuro de sorrisos perfeitos — com precisão de micra.
              </p>

              <div className="hero-buttons">
                <a href="#solucoes" className="btn btn-gold btn-pulse">Conhecer o laboratório <ArrowRight /></a>
                <a href="#simulador" className="btn btn-ghost">Enviar um caso</a>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-num">100%</span>
                  <span className="stat-label">Fluxo digital</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">±0,01<span style={{ fontSize: "1rem" }}>mm</span></span>
                  <span className="stat-label">Precisão</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">CAD/CAM</span>
                  <span className="stat-label">Tecnologia própria</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-wrapper">
                <div className="visual-halo" />
                <img src="/scanner.png" alt="Scanner e fresadora MACROVLAB" className="visual-image" />
                <div className="floating-badge badge-top-right">
                  <div className="badge-icon"><CpuIcon /></div>
                  <div className="badge-text">
                    <span className="badge-title">Zircônia 4D-Pro</span>
                    <span className="badge-sub">Translucidez Multicamada</span>
                  </div>
                </div>
                <div className="floating-badge badge-bottom-left">
                  <div className="badge-icon" style={{ color: "var(--accent-purple)" }}><ShieldCheckIcon /></div>
                  <div className="badge-text">
                    <span className="badge-title">Garantia Macrov</span>
                    <span className="badge-sub">5 Anos de Assistência</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scrollcue">
          <span>Role</span>
          <span className="bar" />
        </div>
      </header>

      {/* ── REBRAND BAND ── */}
      <section className="rebrand-band reveal">
        <div className="container">
          <div className="rebrand-wrap">
            <div className="rebrand-side">
              <span className="rebrand-chip">Antes</span>
              <div className="rebrand-old"><span>TM</span></div>
              <span className="rebrand-chip" style={{ opacity: .6 }}>Studio Digital</span>
            </div>
            <div className="rebrand-mid">
              <div className="rebrand-title">Evoluímos</div>
              <span className="rebrand-arrow">→</span>
              <p className="rebrand-desc">
                A mesma essência, agora em uma nova era de tecnologia e inovação. Não mudamos apenas o nome — construímos uma identidade que representa tudo aquilo que nos tornamos.
              </p>
            </div>
            <div className="rebrand-side">
              <span className="rebrand-chip">Agora</span>
              <div className="rebrand-new"><img src="/emblem.png" alt="MACROVLAB" /></div>
              <span className="rebrand-chip gold-text" style={{ fontWeight: 700 }}>MACROVLAB</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section
        className="section"
        id="manifesto"
        style={{ background: "linear-gradient(180deg, var(--bg-2), var(--panel))", textAlign: "center", overflow: "hidden" }}
      >
        <ParticleCanvas opts={{ density: 0.00006, maxLink: 140, speed: 0.14, drift: 0.05, sizeMul: 0.9 }} style={{ opacity: .55 }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <span className="eyebrow center reveal">A evolução é nossa essência</span>
          <h2 className="reveal d1" style={{ fontWeight: 300, fontSize: "clamp(34px,5.2vw,72px)", marginTop: "28px", maxWidth: "1000px", margin: "28px auto 0" }}>
            <span style={{ fontWeight: 300, display: "block" }}>Da tradição</span>
            à <b className="gold-text">inovação.</b>
          </h2>
          <p className="reveal d2" style={{ marginTop: "28px", fontSize: "19px", maxWidth: "560px", margin: "28px auto 0" }}>
            Cada avanço molda o futuro de sorrisos perfeitos.
          </p>
        </div>
      </section>

      {/* ── JORNADA / PROCESS ── */}
      <section className="section" id="jornada" style={{ background: "var(--panel)", borderTop: "1px solid var(--line-soft)" }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow center reveal">A jornada digital</span>
            <h2 className="reveal d1">Do papel ao sorriso, <b className="gold-text">100% digital.</b></h2>
            <p className="section-desc reveal d2">Um fluxo contínuo que une precisão, inovação e eficiência em cada etapa do trabalho protético.</p>
          </div>

          <div className="process-grid">
            {[
              { n:"01", title:"Tudo começou no", hl:"digital",   desc:"Do esboço à era digital: a base de conhecimento e o olhar artesanal que sustentam cada projeto.",                                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5C4.7 19 4 18.3 4 17.5V5.5Z"/><path d="M20 5.5C20 4.7 19.3 4 18.5 4H13v15h5.5c.8 0 1.5-.7 1.5-1.5V5.5Z"/><path d="M7 8h2M7 11h2M15 8h2M15 11h2"/></svg> },
              { n:"02", title:"Projetos",         hl:"CAD",       desc:"Planejamento digital com precisão para resultados previsíveis e totalmente personalizados.",                                          icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4"/><path d="M9.5 10.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5"/></svg> },
              { n:"03", title:"Fluxos",           hl:"digitais",  desc:"Integração completa — escaneamento, design, planejamento e fabricação em um só ecossistema.",                                         icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="6" r="2.4"/><circle cx="5" cy="18" r="2.4"/><circle cx="19" cy="18" r="2.4"/><path d="M12 8.4v3.6M12 12l-5.3 3.8M12 12l5.3 3.8"/></svg> },
              { n:"04", title:"Tecnologia",       hl:"aplicada",  desc:"Soluções que unem precisão, inovação e eficiência para transformar sorrisos.",                                                          icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="7" r="3.2"/><path d="M9.4 9.4 8 22M14.6 9.4 16 22M8.6 14h6.8M8.2 18h7.6"/></svg> },
            ].map((s, i) => (
              <div key={i} className={`step-card reveal ${i > 0 ? `d${i}` : ""}`}>
                <div className="step-nl" />
                <div className="step-card-top">
                  <span className="step-num">{s.n}</span>
                  <span className="step-ic">{s.icon}</span>
                </div>
                <h3>{s.title} <span className="g">{s.hl}</span></h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUÇÕES ── */}
      <section className="section" id="solucoes" style={{ background: "linear-gradient(180deg, var(--bg), var(--panel) 50%, var(--bg))" }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow center reveal">Soluções</span>
            <h2 className="reveal d1">Tecnologia aplicada <b className="gold-text">à odontologia.</b></h2>
            <p className="section-desc reveal d2">Trabalhos protéticos de alta complexidade entregues com a previsibilidade do fluxo digital.</p>
          </div>

          <div className="svc-grid">
            {[
              { title:"Prótese sobre implante",   desc:"Coroas, barras e protocolos parafusados com encaixe passivo e estética natural.",              tag:"CAD/CAM · Zircônia",     delay:"",
                icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="6" r="3.2"/><path d="M9.4 9 8.5 14h7l-.9-5M9 17h6M9.6 20h4.8"/></svg> },
              { title:"Coroas & facetas",         desc:"Restaurações cerâmicas usinadas com fidelidade de cor, forma e textura.",                      tag:"Dissilicato · Cerâmica", delay:"d1",
                icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 4c-3 0-4 2-4 5 0 4 1.2 11 2.4 11 .9 0 1-3 1.6-3s.7 3 1.6 3c1.2 0 2.4-7 2.4-11 0-3-1-5-4-5Z"/></svg> },
              { title:"Planejamento digital",     desc:"Design do sorriso (DSD) e mock-up virtual para aprovação antes da execução.",                  tag:"DSD · Wax-up digital",  delay:"d2",
                icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="11" rx="1.5"/><path d="M8 20h8M12 16v4"/><path d="M8.5 11c1-1.6 2-2.2 3.5-2.2S14.5 9.4 15.5 11"/></svg> },
              { title:"Fluxo digital completo",   desc:"Do escaneamento intraoral à fabricação, em um processo integrado e rastreável.",               tag:"Scan · Design · Mill",  delay:"",
                icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12a8 8 0 0 1 13.7-5.6M20 12A8 8 0 0 1 6.3 17.6"/><path d="M17 3v4h-4M7 21v-4h4"/></svg> },
              { title:"Atendimento ao dentista",  desc:"Suporte técnico próximo, prazos confiáveis e logística para todo o Brasil.",                  tag:"Parceria clínica",      delay:"d1",
                icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 7h14v10H5zM5 7l7 5 7-5"/><circle cx="18" cy="6" r="2.4" fill="currentColor" stroke="none"/></svg> },
              { title:"Garantia de qualidade",    desc:"Conferência dimensional e controle de cada peça antes da entrega final.",                      tag:"Controle ±0,01mm",      delay:"d2",
                icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l7 4v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V7l7-4Z"/><path d="m9 12 2 2 4-4"/></svg> },
            ].map((s, i) => (
              <article key={i} className={`svc reveal ${s.delay}`}>
                <div className="ic">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="tag">{s.tag}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTÉTICA (before/after slider) ── */}
      <section className="section" id="estetica" style={{ background: "var(--panel)", borderTop: "1px solid var(--line-soft)" }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow center reveal">Estética de Elite</span>
            <h2 className="reveal d1">Da malha digital ao <b className="gold-text">sorriso real.</b></h2>
            <p className="section-desc reveal d2">Deslize o cursor sobre a imagem para ver a estrutura CAD se transformando no brilho da cerâmica finalizada.</p>
          </div>

          <div className="comparison-container reveal" ref={containerRef} onMouseMove={onMouseMove} onTouchMove={onTouchMove}>
            <div className="comparison-wrapper">
              <div className="comp-img comp-before">
                <img src="/post-02-cad.png" alt="Projeto CAD Digital"
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(.9) contrast(1.2) brightness(.65) sepia(.8) hue-rotate(170deg) saturate(2.5)" }}
                />
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(0deg, rgba(0,180,200,.08) 1px, transparent 1px)", backgroundSize: "100% 4px", zIndex: 2, pointerEvents: "none" }} />
              </div>
              <div className="comp-img comp-after" style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}>
                <img src="/post-01-digital.png" alt="Restauração Finalizada" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="comp-slider-handle" style={{ left: `${sliderPos}%` }}>
                <div className="comp-slider-button">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="8 18 2 12 8 6"/>
                    <polyline points="16 6 22 12 16 18"/>
                  </svg>
                </div>
              </div>
              <div className="comp-label label-before">Modelo CAD Virtual</div>
              <div className="comp-label label-after">Coroa Multilayer Pronta</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOWCASE / CAD DESIGNER ── */}
      <section className="section" id="tecnologia" style={{ borderTop: "1px solid var(--line-soft)" }}>
        <div className="container">
          <div className="showcase-grid">
            <div className="showcase-media reveal">
              <img src="/post-02-cad.png" alt="Software CAD Designer planejando arcada dentária" />
            </div>
            <div className="reveal d1">
              <span className="eyebrow">CAD Designer</span>
              <h2 style={{ marginTop: "20px" }}>Planejamento com <b className="gold-text">precisão absoluta.</b></h2>
              <ul className="showcase-list">
                <li><span className="ck">✓</span><span><b>Escaneamento de alta resolução</b> — modelos digitais fiéis em poucos minutos.</span></li>
                <li><span className="ck">✓</span><span><b>Design paramétrico</b> — morphing, espessura e oclusão controladas no detalhe.</span></li>
                <li><span className="ck">✓</span><span><b>Resultados previsíveis</b> — o que se projeta é exatamente o que se entrega.</span></li>
                <li><span className="ck">✓</span><span><b>Fabricação integrada</b> — usinagem e impressão diretamente do projeto aprovado.</span></li>
              </ul>
              <a href="#simulador" className="btn btn-ghost" style={{ marginTop: "34px" }}>Solicitar um projeto <ArrowRight /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKFLOW (Process tabs) ── */}
      <section className="section" id="workflow" style={{ background: "var(--panel)", borderTop: "1px solid var(--line-soft)" }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow center reveal">Fluxo Operacional</span>
            <h2 className="reveal d1">A jornada do <b className="gold-text">seu trabalho.</b></h2>
            <p className="section-desc reveal d2">Entenda como a integração entre odontologia digital e processos industriais reduz prazos e elimina reajustes clínicos.</p>
          </div>

          <div className="workflow-nav">
            {workflowSteps.map((step, idx) => (
              <button key={idx} className={`workflow-tab-btn ${activeStep === idx ? "active" : ""}`} onClick={() => setActiveStep(idx)}>
                <span className="step-num-circle" style={{ background: activeStep === idx ? "var(--gold)" : "rgba(255,255,255,.08)", color: activeStep === idx ? "#231703" : "var(--muted)" }}>{idx + 1}</span>
                {step.title}
              </button>
            ))}
          </div>

          <div className="glass-panel workflow-content">
            <div className="workflow-info">
              <span className="workflow-step-tag">{workflowSteps[activeStep].tag}</span>
              <h3 style={{ fontSize: "1.75rem", color: "var(--gold-lt)", marginTop: "8px", marginBottom: "8px" }}>{workflowSteps[activeStep].title}</h3>
              <p style={{ fontSize: ".84rem", fontWeight: 700, color: "var(--muted)", marginBottom: "18px", textTransform: "uppercase", letterSpacing: ".05em" }}>
                Tecnologia: <span style={{ color: "var(--ink)" }}>{workflowSteps[activeStep].tech}</span>
              </p>
              <p style={{ marginBottom: "24px", fontSize: "1.03rem" }}>{workflowSteps[activeStep].desc}</p>
              <div style={{ background: "rgba(217,164,65,.05)", padding: "14px 18px", borderRadius: "8px", borderLeft: "3px solid var(--gold)", fontWeight: 600, color: "var(--ink)" }}>
                {workflowSteps[activeStep].stat}
              </div>
            </div>
            <div className="workflow-visual">
              <img
                src={["/post-01-digital.png","/post-02-cad.png","/dental_lab_setup.png","/dental_handcraft.png","/dental_finished_smile.png"][activeStep]}
                alt={workflowSteps[activeStep].title}
              />
              <div className="workflow-visual-overlay">
                <div>
                  <h4 style={{ color: "var(--gold-lt)", fontSize: "1rem", fontWeight: 700 }}>
                    {["Envio Digital de STL","Modelagem CAD Exocad","Usinagem CNC Alemã","Maquiagem Cerâmica","Prótese Cimentada Final"][activeStep]}
                  </h4>
                  <p style={{ color: "var(--muted)", fontSize: ".78rem" }}>
                    {["Importação segura de malha 3D.","Ajuste milimétrico de oclusão.","Fresagem robotizada de 5 eixos.","Glaze e caracterização artística.","Entrega e adaptação imediata."][activeStep]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIMULADOR DE ENVIO ── */}
      <section className="section" id="simulador" style={{ borderTop: "1px solid var(--line-soft)" }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow center reveal">Área do Dentista</span>
            <h2 className="reveal d1">Portal de Coletas e <b className="gold-text">Envio de Casos</b></h2>
            <p className="section-desc reveal d2">Faça uma simulação de orçamento e prazo de entrega para o primeiro trabalho do seu consultório.</p>
          </div>

          <div className="glass-panel portal-grid" style={{ padding: "40px" }}>
            <div>
              <h3 style={{ marginBottom: "24px", borderBottom: "1px solid var(--line-soft)", paddingBottom: "12px" }}>Especificações do Trabalho</h3>

              {!caseSubmitted ? (
                <form onSubmit={handleRegisterCase}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="work-type">Tipo de Restauração</label>
                    <select id="work-type" className="form-select" value={workType} onChange={e => setWorkType(e.target.value)}>
                      <option value="coroa_zirconia">Coroa Total Monolítica Zircônia</option>
                      <option value="lente_emax">Lente de Contato Cerâmica (IPS e.max)</option>
                      <option value="sobre_implante">Coroa / Pilar sobre Implante</option>
                      <option value="placa_miorrelaxante">Placa de Bruxismo CAD/CAM</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="material">Material de Confecção</label>
                    <select id="material" className="form-select" value={material} onChange={e => setMaterial(e.target.value)}>
                      <option value="zirconia_mult">Zircônia Multilayer (Translúcida)</option>
                      <option value="zirconia_mult_4d">Zircônia 4D-Pro Ultra High Translucency</option>
                      <option value="emax_cad">Dissilicato de Lítio (IPS e.max original)</option>
                      <option value="pmma">Resina PMMA de Alta Densidade (Provisório)</option>
                    </select>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="tooth-shade">Cor (Escala Vita)</label>
                      <select id="tooth-shade" className="form-select" value={toothShade} onChange={e => setToothShade(e.target.value)}>
                        <option value="A1">A1 (Claro)</option>
                        <option value="A2">A2 (Padrão)</option>
                        <option value="A3">A3 (Médio)</option>
                        <option value="B1">B1 (Muito Claro)</option>
                        <option value="BL2">Bleach 2 (Clareado)</option>
                        <option value="BL4">Bleach 4 (Clareado Natural)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="urgency">Prioridade</label>
                      <select id="urgency" className="form-select" value={urgency} onChange={e => setUrgency(e.target.value)}>
                        <option value="padrao">Padrão (5 dias úteis)</option>
                        <option value="express">Express (48h úteis — +R$ 90)</option>
                      </select>
                    </div>
                  </div>

                  <h3 style={{ margin: "24px 0 16px", borderBottom: "1px solid var(--line-soft)", paddingBottom: "12px", fontSize: "1.1rem" }}>
                    Dados para Coleta / Faturamento
                  </h3>

                  <div className="form-group">
                    <label className="form-label" htmlFor="dentist-name">Nome do Cirurgião-Dentista</label>
                    <input id="dentist-name" type="text" className="form-input" placeholder="Dr. / Dra. Exemplo" value={dentistName} onChange={e => setDentistName(e.target.value)} required />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="cro">Número do CRO</label>
                      <input id="cro" type="text" className="form-input" placeholder="0000-RO" value={dentistCro} onChange={e => setDentistCro(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">WhatsApp para Contato</label>
                      <input id="phone" type="tel" className="form-input" placeholder="(69) 99999-0000" value={dentistPhone} onChange={e => setDentistPhone(e.target.value)} required />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-gold btn-pulse" style={{ width: "100%", marginTop: "12px" }}>
                    <ToothIcon />
                    Registrar e Solicitar Coleta
                  </button>
                </form>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0", textAlign: "center" }}>
                  <div style={{ width: 70, height: 70, borderRadius: "50%", background: "rgba(16,185,129,.10)", border: "2px solid #10b981", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                    <CheckIcon />
                  </div>
                  <h3 style={{ color: "#10b981", fontSize: "1.55rem", marginBottom: "12px" }}>Solicitação Registrada!</h3>
                  <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
                    O caso foi enviado para a triagem digital da <strong style={{ color: "var(--gold)" }}>@macrovlab</strong>. Código de rastreamento:
                  </p>
                  <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid var(--line-soft)", padding: "16px", borderRadius: "8px", fontFamily: "monospace", fontSize: "1.2rem", fontWeight: "bold", color: "var(--gold-lt)", letterSpacing: ".06em", marginBottom: "28px", width: "100%" }}>
                    {caseCode}
                  </div>
                  <div className="success-badge" style={{ textAlign: "left", width: "100%" }}>
                    <div>
                      <strong>Próximo passo:</strong> Um de nossos protéticos entrará em contato via WhatsApp no número <strong>{dentistPhone}</strong> em até 15 minutos para obter o arquivo STL ou coordenar a coleta.
                    </div>
                  </div>
                  <button onClick={resetForm} className="btn btn-ghost" style={{ marginTop: "24px" }}>Simular Novo Caso</button>
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ marginBottom: "24px", borderBottom: "1px solid var(--line-soft)", paddingBottom: "12px" }}>Detalhamento & Prazos</h3>
              <div className="calc-summary" style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  {[
                    ["Laboratório Responsável", "Macrov Lab (Porto Velho)"],
                    ["Restaurador Selecionado", workType.replace(/_/g, " ")],
                    ["Material de Escolha",     material.replace(/_/g, " ")],
                    ["Matiz de Cor",            `${toothShade} (Escala Vita 3D)`],
                    ["Prazo de Produção",       urgency === "express" ? "Express (48h úteis)" : "Normal (5 dias úteis)"],
                    ["Coleta de Arquivos",      "Portal de Upload Seguro (SSL)"],
                  ].map(([label, val], i) => (
                    <div key={i} className="summary-row">
                      <span style={{ color: "var(--muted)" }}>{label}</span>
                      <span className="summary-value" style={{ textTransform: "capitalize" }}>{val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "36px", borderTop: "1px solid var(--line-soft)", paddingTop: "22px" }}>
                  <div className="summary-row" style={{ borderBottom: "none" }}>
                    <div>
                      <span style={{ fontSize: ".84rem", color: "var(--muted)", display: "block" }}>Entrega Prevista</span>
                      <strong style={{ fontSize: "1.2rem", color: "var(--gold-lt)" }}>{deliveryDate}</strong>
                    </div>
                  </div>
                  <div className="summary-row" style={{ borderBottom: "none", background: "rgba(217,164,65,.04)", padding: "16px", borderRadius: "10px", marginTop: "14px" }}>
                    <div>
                      <span style={{ fontSize: ".84rem", color: "var(--muted)", display: "block" }}>Preço Médio Estimado / Unidade</span>
                      <span className="summary-value highlight" style={{ fontSize: "1.6rem" }}>R$ {calculatePrice().toFixed(2)}</span>
                    </div>
                    <span style={{ fontSize: ".74rem", color: "var(--muted)", maxWidth: "140px", textAlign: "right" }}>
                      *Faturamento mensal em fatura única B2B para clínicas cadastradas.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERIA / INSTAGRAM ── */}
      <section className="section" id="galeria" style={{ background: "var(--panel)", borderTop: "1px solid var(--line-soft)" }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow center reveal">@macrovlab</span>
            <h2 className="reveal d1">Nossa evolução, <b className="gold-text">post a post.</b></h2>
            <p className="section-desc reveal d2">Acompanhe os bastidores, projetos e a nova era do laboratório no Instagram.</p>
          </div>

          <div className="gallery-grid">
            {[
              { src: "/post-01-digital.png",     label: "Tudo começou no digital",    delay: "" },
              { src: "/post-02-cad.png",          label: "Projetos CAD",               delay: "d1" },
              { src: "/post-03-fluxos.png",       label: "Fluxos digitais",            delay: "d2" },
              { src: "/post-04-tecnologia.png",   label: "Tecnologia aplicada",        delay: "d3" },
            ].map((g, i) => (
              <div key={i} className={`g-card reveal ${g.delay}`} onClick={() => window.open("https://instagram.com/macrovlab", "_blank")}>
                <img src={g.src} alt={g.label} />
                <span className="g-card-label">◎ Ver post</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "44px" }} className="reveal">
            <a href="https://www.instagram.com/macrovlab/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Seguir @macrovlab <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="section" id="depoimentos" style={{ borderTop: "1px solid var(--line-soft)" }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow center reveal">Casos Clínicos de Sucesso</span>
            <h2 className="reveal d1">O que dizem os <b className="gold-text">cirurgiões-dentistas</b></h2>
            <p className="section-desc reveal d2">Depoimentos reais de profissionais que transformaram sua rotina com a @macrovlab.</p>
          </div>

          <div className="testimonials-grid">
            {[
              { initials:"DR", name:"Dr. Daniel Rodrigues", clinic:"Reabilitação Oral & Estética — CRO 2942-RO", text:"Desde que migramos para o fluxo 100% digital com a Macrov Lab, o tempo de cadeira dos meus pacientes reduziu muito. As lentes de contato em e.max encaixam perfeitamente na primeira prova, com zero necessidade de ajustes." },
              { initials:"AM", name:"Dra. Aline Medeiros",  clinic:"Implantodontista — CRO 4108-RO",              text:"O suporte deles é o grande diferencial. Sempre que tenho um caso complexo de implante múltiplo, o designer me chama em videoconferência no Exocad para refinarmos juntos antes da fresagem. Isso me traz uma segurança clínica absurda." },
              { initials:"RC", name:"Dr. Ricardo Costa",    clinic:"Clínica Sorriso Moderno — CRO 3319-RO",       text:"Enviamos o STL pela manhã e no final da tarde a coroa de Zircônia Multilayer pintada e glazeada estava no consultório. Impressionante a agilidade no serviço Express. Trabalho impecável." },
            ].map((t, i) => (
              <div key={i} className={`glass-panel test-card reveal ${i > 0 ? `d${i}` : ""}`}>
                <p className="test-text">{t.text}</p>
                <div className="test-profile">
                  <div className="test-avatar">{t.initials}</div>
                  <div>
                    <h4 className="test-name">{t.name}</h4>
                    <p className="test-clinic">{t.clinic}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" id="faq" style={{ background: "var(--panel)", borderTop: "1px solid var(--line-soft)" }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow center reveal">Perguntas Frequentes</span>
            <h2 className="reveal d1">Esclareça suas <b className="gold-text">dúvidas</b></h2>
            <p className="section-desc reveal d2">Informações rápidas sobre envio de arquivos, prazos e faturamento para novos consultórios parceiros.</p>
          </div>

          <div className="faq-grid">
            <div className="faq-questions-side reveal">
              <FAQAccordionItem question="Quais scanners intraorais são compatíveis?" answer="Somos 100% integrados com sistemas abertos. Você pode nos enviar arquivos STL, PLY ou OBJ gerados por qualquer scanner — Medit, iTero, Trios 3Shape, Carestream, Dentsply Sirona (Primescan) e Owandy." />
              <FAQAccordionItem question="Como é feita a coleta física sem scanner?" answer="Se você ainda utiliza moldagem convencional de silicone, fazemos a coleta física do molde em seu consultório (região de Porto Velho). Escaneamos o modelo de gesso com scanner de bancada industrial em nosso laboratório, sem custo adicional." />
              <FAQAccordionItem question="Qual é o prazo de garantia das próteses?" answer="Oferecemos 5 anos de garantia para reabilitações em Zircônia pura e 2 anos para restaurações em dissilicato de lítio (IPS e.max), cobrindo quebras e falhas do material sob uso fisiológico normal." />
              <FAQAccordionItem question="Como funciona o faturamento e as formas de pagamento?" answer="Para consultórios parceiros cadastrados, o faturamento é mensal via boleto bancário com descritivo de todos os casos do mês. Também aceitamos cartões de crédito e PIX com desconto à vista." />
            </div>

            <div className="glass-panel contact-card reveal d1">
              <h3 style={{ borderBottom: "1px solid var(--line-soft)", paddingBottom: "12px", color: "var(--gold-lt)", marginBottom: "20px" }}>
                Fale Diretamente Conosco
              </h3>
              <p style={{ fontSize: ".94rem" }}>
                Tem um caso atípico ou gostaria de agendar uma visita para conhecer nossa central CAD/CAM? Fale com nossa gerência de suporte clínico.
              </p>

              {[
                { icon: <PhoneIcon />, label: "WhatsApp Suporte Técnico",  content: <a href="https://wa.me/5569999990000" target="_blank" rel="noreferrer" style={{ color: "var(--ink)", fontWeight: "bold" }}>(69) 99999-0000</a> },
                { icon: <ToothIcon />, label: "E-mail de Cadastro",        content: <a href="mailto:macrovlab@gmail.com" style={{ color: "var(--ink)", fontWeight: "bold" }}>macrovlab@gmail.com</a>, iconColor: "var(--accent-purple)" },
                { icon: <CalendarIcon />, label: "Localização do Laboratório", content: <span style={{ color: "var(--ink)", fontWeight: "bold" }}>Porto Velho, Rondônia — RO</span> },
              ].map((item, i) => (
                <div key={i} className="contact-info-item">
                  <div className="contact-icon" style={item.iconColor ? { color: item.iconColor } : undefined}>{item.icon}</div>
                  <div>
                    <span style={{ fontSize: ".78rem", color: "var(--muted)", display: "block" }}>{item.label}</span>
                    {item.content}
                  </div>
                </div>
              ))}

              <a href="https://wa.me/5569999990000" target="_blank" rel="noreferrer" className="btn btn-gold btn-pulse" style={{ marginTop: "24px", width: "100%" }}>
                <PhoneIcon /> Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="contato">
        <div className="container">
          <div className="cta-box reveal">
            <ParticleCanvas opts={{ density: 0.00006, maxLink: 120, speed: 0.12, sizeMul: 0.85 }} />
            <div>
              <span className="eyebrow">Vamos evoluir juntos</span>
              <h2 style={{ marginTop: "18px" }}>Pronto para entregar <b className="gold-text">sorrisos perfeitos?</b></h2>
              <p style={{ marginTop: "18px", fontSize: "18px", maxWidth: "440px" }}>
                Envie seu caso ou fale com nossa equipe. Atendemos clínicas e dentistas que buscam o padrão premium em prótese digital.
              </p>
            </div>
            <div className="cta-acts">
              <a href="https://wa.me/5569999990000" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Falar no WhatsApp</a>
              <a href="mailto:macrovlab@gmail.com" className="btn btn-ghost">Enviar e-mail</a>
              <span className="cta-note">Resposta em até 24h úteis</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="#top" className="logo-brand" style={{ marginBottom: "18px" }}>
                <img src="/emblem.png" alt="MACROVLAB" className="logo-emblem" style={{ width: "38px" }} />
                <span className="logo-wordmark">MACROV<span className="lab">LAB</span></span>
              </a>
              <p style={{ fontSize: "14.5px", color: "var(--muted)", maxWidth: "300px", marginTop: "16px" }}>
                Prótese dentária e CADDesign premium. Da tradição à inovação — a evolução é nossa essência.
              </p>
            </div>

            <div>
              <h4 className="footer-title">Laboratório</h4>
              <ul className="footer-links">
                <li><a href="#manifesto" className="footer-link">Manifesto</a></li>
                <li><a href="#jornada"   className="footer-link">A Jornada</a></li>
                <li><a href="#solucoes"  className="footer-link">Soluções</a></li>
                <li><a href="#tecnologia" className="footer-link">Tecnologia</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Soluções</h4>
              <ul className="footer-links">
                <li><a href="#solucoes" className="footer-link">Prótese sobre implante</a></li>
                <li><a href="#solucoes" className="footer-link">Coroas & facetas</a></li>
                <li><a href="#solucoes" className="footer-link">Planejamento digital</a></li>
                <li><a href="#solucoes" className="footer-link">Fluxo digital</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Contato</h4>
              <ul className="footer-links">
                <li><a href="https://wa.me/5569999990000"                  target="_blank" rel="noopener noreferrer" className="footer-link">WhatsApp</a></li>
                <li><a href="mailto:macrovlab@gmail.com"                   className="footer-link">macrovlab@gmail.com</a></li>
                <li><a href="https://instagram.com/macrovlab"              target="_blank" rel="noopener noreferrer" className="footer-link">@macrovlab</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copy">
              © {new Date().getFullYear()} MACROVLAB · Prótese Dentária · CADDesign Premium
            </span>
            <div className="social-links">
              <a href="https://instagram.com/macrovlab" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://wa.me/5569999990000" target="_blank" rel="noreferrer" className="social-link" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 21l1.6-4.4A8 8 0 1 1 8 19.4L3 21Z"/><path d="M8.5 8.5c-.3 1.5 2.3 5.2 4 6 .8.4 1.8.6 2.5-.2.4-.5.3-1-.2-1.4-.6-.4-1.4-.9-2-.3-.4.4-1.6-.4-2.3-1.6-.5-.9.1-1.3.4-1.8.3-.5.1-1.1-.3-1.5-.4-.4-1.2-.5-1.8 0Z" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
