// src/react-app/App.tsx

import React, { useState, useEffect, useRef } from "react";

// Inline Custom SVG Icons to ensure zero external dependency errors and premium styling control
const ToothIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 2C8.5 2 6.5 4 6.5 7.5c0 2.5 1.5 4.5 2 6.5.3 1.2.5 3 0 4.5-.3.9-.9 1.5-1.5 2.5C6 22.5 8 22 10.5 22c1 0 1.5-.5 1.5-1.5 0 1 .5 1.5 1.5 1.5 2.5 0 4.5.5 3.5-1.5-.6-1-1.2-1.6-1.5-2.5-.5-1.5-.3-3.3 0-4.5.5-2 2-4 2-6.5C17.5 4 15.5 2 12 2z" />
    <path d="M9 7c0-1 1-1.5 2-1.5" />
  </svg>
);

const ScanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <path d="M12 8v8" />
  </svg>
);

const CpuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z" />
    <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQAccordionItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-header">
        <span className="faq-question">{question}</span>
        <span className="faq-toggle-icon" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3.75V14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </div>
      <div className="faq-body">
        <p style={{ fontSize: "0.95rem" }}>{answer}</p>
      </div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Before/After interactive slider states
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // Workflow states
  const [activeStep, setActiveStep] = useState(0);

  // Case Calculator states
  const [workType, setWorkType] = useState("coroa_zirconia");
  const [material, setMaterial] = useState("zirconia_mult");
  const [toothShade, setToothShade] = useState("A2");
  const [urgency, setUrgency] = useState("padrao");
  const [dentistName, setDentistName] = useState("");
  const [dentistCro, setDentistCro] = useState("");
  const [dentistPhone, setDentistPhone] = useState("");
  const [caseSubmitted, setCaseSubmitted] = useState(false);
  const [caseCode, setCaseCode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  // Track scroll position for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle slide movement
  const handleSliderMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleSliderMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  // Calculate price and date based on options
  const calculatePrice = () => {
    let basePrice = 0;
    
    switch (workType) {
      case "coroa_zirconia":
        basePrice = 390;
        break;
      case "lente_emax":
        basePrice = 480;
        break;
      case "sobre_implante":
        basePrice = 710;
        break;
      case "placa_miorrelaxante":
        basePrice = 190;
        break;
      default:
        basePrice = 390;
    }

    // Material additions
    if (material === "emax_cad") {
      basePrice += 50;
    } else if (material === "zirconia_mult_4d") {
      basePrice += 40;
    }

    // Urgency additions
    if (urgency === "express") {
      basePrice += 90;
    }

    return basePrice;
  };

  // Calculate estimated delivery date
  useEffect(() => {
    const today = new Date();
    let businessDaysToAdd = urgency === "express" ? 2 : 5;
    
    // Add business days manually
    let count = 0;
    const finalDate = new Date(today);
    while (count < businessDaysToAdd) {
      finalDate.setDate(finalDate.getDate() + 1);
      const day = finalDate.getDay();
      if (day !== 0 && day !== 6) { // Skip Sat and Sun
        count++;
      }
    }

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    setDeliveryDate(finalDate.toLocaleDateString('pt-BR', options));
  }, [urgency, workType]);

  const handleRegisterCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dentistName || !dentistCro || !dentistPhone) {
      alert("Por favor, preencha todos os campos do dentista para simular o caso.");
      return;
    }
    
    // Generate simulated case code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const stateSuffix = "RO";
    setCaseCode(`MCV-2026-${randomNum}-${stateSuffix}`);
    setCaseSubmitted(true);
  };

  const resetForm = () => {
    setCaseSubmitted(false);
    setDentistName("");
    setDentistCro("");
    setDentistPhone("");
  };

  const workflowSteps = [
    {
      title: "Escaneamento & Envio",
      tag: "Etapa 01",
      tech: "Sistemas STL/PLY Abertos",
      desc: "O dentista realiza o escaneamento intraoral do paciente em seu próprio consultório. O arquivo de malha 3D (STL ou PLY) é enviado diretamente para nós por meio do nosso formulário ou integradores como Medit Link, Align iTero, ou Carestream.",
      stat: "Compatibilidade: 100%"
    },
    {
      title: "Planejamento CAD",
      tag: "Etapa 02",
      tech: "Exocad DentalDB & 3Shape",
      desc: "Nossos projetistas especializados importam o modelo digital no software CAD para desenhar a coroa ou lente de contato. Mapeamos com precisão micrométrica a margem de término, pontos de contato e a oclusão fisiológica correta.",
      stat: "Margem de Erro: < 5 mícrons"
    },
    {
      title: "Fresagem CNC & CAM",
      tag: "Etapa 03",
      tech: "Fresadoras Alemãs de 5 Eixos",
      desc: "O projeto CAD é enviado à central de usinagem. Nossa fresadora esculpe o bloco de zircônia multilayer ou dissilicato de lítio utilizando brocas diamantadas resfriadas a ar, garantindo estabilidade e integridade estrutural extrema.",
      stat: "Velocidade: 60.000 RPM"
    },
    {
      title: "Arte e Maquiagem",
      tag: "Etapa 04",
      tech: "Cerâmica Feldspática Artesanal",
      desc: "As peças fresadas passam pela sinterização térmica e, em seguida, são submetidas à maquiagem artística realizada à mão por técnicos experientes. Aplicamos texturas e cores na escala Vita para obter translucidez e opalescência idênticas aos dentes naturais.",
      stat: "Personalização: Exclusiva"
    },
    {
      title: "Logística Inteligente",
      tag: "Etapa 05",
      tech: "Desinfecção UV-C & Entrega Express",
      desc: "Após o controle de qualidade final em microscópio, as próteses são esterilizadas em câmara UV-C, embaladas a vácuo em embalagem cirúrgica e despachadas por portador expresso para o seu consultório em tempo recorde.",
      stat: "Logística: Rastreamento em tempo real"
    }
  ];

  return (
    <>
      {/* Background Decor */}
      <div className="bg-grid"></div>
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <a href="#hero" className="logo-brand">
            <ToothIcon />
            <span>MACROV<span className="gradient-text-teal">LAB</span></span>
            <span className="logo-dot"></span>
          </a>
          <ul className="nav-links">
            <li><a href="#servicos" className="nav-link">Serviços</a></li>
            <li><a href="#estetica" className="nav-link">Estética 3D</a></li>
            <li><a href="#workflow" className="nav-link">Fluxo Digital</a></li>
            <li><a href="#simulador" className="nav-link">Simulador de Envio</a></li>
            <li><a href="#faq" className="nav-link">Dúvidas</a></li>
            <li><a href="#simulador" className="btn btn-secondary nav-link" style={{ padding: "8px 20px" }}>Acessar Portal</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-tag animate-float">
                <SparklesIcon />
                <span>Fluxo 100% Digital Integrado</span>
              </div>
              <h1>
                Precisão <span className="gradient-text-teal">Microscópica</span>, Estética Natural.
              </h1>
              <p style={{ fontSize: "1.25rem", marginBottom: "32px", color: "var(--text-secondary)" }}>
                Elevando o padrão das reabilitações protéticas. Conecte o scanner do seu consultório à nossa central CAD/CAM e ofereça restaurações perfeitas em zircônia e dissilicato em até 48 horas.
              </p>
              
              <div className="hero-buttons">
                <a href="#simulador" className="btn btn-primary btn-pulse">
                  Simular Envio de Caso
                  <ArrowRightIcon />
                </a>
                <a href="#workflow" className="btn btn-secondary">
                  Ver Fluxo de Trabalho
                </a>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-num">99.9%</span>
                  <span className="stat-label">Adaptação Clínica Sem Ajuste</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">72h</span>
                  <span className="stat-label">Prazo Médio de Entrega</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">&lt; 5µ</span>
                  <span className="stat-label">Precisão CAD/CAM alemã</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-wrapper">
                <img 
                  src="/dental_zirconia_crown.png" 
                  alt="Modelo 3D de Coroa de Zircônia Macrov Lab" 
                  className="visual-image" 
                />
                <div className="floating-badge badge-top-right">
                  <div className="badge-icon">
                    <CpuIcon />
                  </div>
                  <div className="badge-text">
                    <span className="badge-title">Zircônia 4D-Pro</span>
                    <span className="badge-sub">Translucidez Multicamada</span>
                  </div>
                </div>
                
                <div className="floating-badge badge-bottom-left">
                  <div className="badge-icon" style={{ color: "var(--accent-purple)" }}>
                    <ShieldCheckIcon />
                  </div>
                  <div className="badge-text">
                    <span className="badge-title">Garantia Macrov</span>
                    <span className="badge-sub">5 Anos de Assistência</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="section" style={{ background: "rgba(11, 15, 25, 0.4)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Nossos Produtos</span>
            <h2>Próteses de Alta Performance</h2>
            <p className="section-desc">Restaurações anatômicas sob medida projetadas digitalmente e finalizadas por mestres ceramistas.</p>
          </div>

          <div className="cards-grid">
            {/* Service 1 */}
            <div className="glass-panel service-card">
              <div className="service-card-img-wrapper">
                <img src="/dental_veneers.png" alt="Lentes de Contato" className="service-card-img" />
              </div>
              <div className="service-card-content">
                <div className="card-icon-container">
                  <ToothIcon />
                </div>
                <h3>Lentes de Contato & Facetas</h3>
                <p style={{ marginBottom: "20px" }}>
                  Facetas cerâmicas ultra finas (até 0.3mm de espessura) fabricadas em dissilicato de lítio (original IPS e.max). Entrega estética natural insuperável, com adaptação marginal impecável.
                </p>
                <div className="card-badge">Ideal para Estética Anterior</div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="glass-panel service-card" style={{ borderColor: "rgba(139, 92, 246, 0.2)" }}>
              <div className="service-card-img-wrapper">
                <img src="/dental_zirconia_crown.png" alt="Coroas em Zircônia" className="service-card-img" />
              </div>
              <div className="service-card-content">
                <div className="card-icon-container" style={{ background: "rgba(139, 92, 246, 0.08)", color: "var(--accent-purple)" }}>
                  <CpuIcon />
                </div>
                <h3>Coroas em Zircônia Premium</h3>
                <p style={{ marginBottom: "20px" }}>
                  Coroas totais monolíticas de zircônia multicamadas (Yttria graduada). Excelente resistência flexural de 1200 MPa combinada com translucidez ideal. Acabamento maquiado ou estratificado.
                </p>
                <div className="card-badge">Perfeita para Posteriores e Pontes</div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="glass-panel service-card">
              <div className="service-card-img-wrapper">
                <img src="/dental_cad_design.png" alt="Restaurações sobre Implantes" className="service-card-img" />
              </div>
              <div className="service-card-content">
                <div className="card-icon-container">
                  <ScanIcon />
                </div>
                <h3>Restaurações sobre Implantes</h3>
                <p style={{ marginBottom: "20px" }}>
                  Pilares personalizados (Abutments) em titânio e zircônia híbrida acoplados a coroas cimentadas ou aparafusadas. Ajuste micrométrico que previne afrouxamento de parafusos e peri-implantite.
                </p>
                <div className="card-badge">Alta Tecnologia Cirúrgica</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Visualizer Section */}
      <section id="estetica" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Estética de Elite</span>
            <h2>Da Malha Digital ao Sorriso Real</h2>
            <p className="section-desc">Deslize o cursor sobre a imagem para ver a precisão da estrutura interna de malha CAD (esquerda) se transformando no brilho natural da cerâmica finalizada (direita).</p>
          </div>

          <div className="comparison-container" ref={containerRef} onMouseMove={onMouseMove} onTouchMove={onTouchMove}>
            <div className="comparison-wrapper">
              {/* "Before" Side (CAD Wireframe styling) */}
              <div className="comp-img comp-before" style={{ width: "100%", height: "100%" }}>
                <img 
                  src="/dental_zirconia_crown.png" 
                  alt="CAD Digital Design Model" 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    filter: "grayscale(1) contrast(1.3) brightness(0.6) sepia(1) hue-rotate(140deg) saturate(3)"
                  }} 
                />
                {/* Tech scanline effect overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'radial-gradient(circle, transparent 40%, rgba(7, 10, 19, 0.4) 100%), linear-gradient(0deg, rgba(0, 242, 254, 0.1) 1px, transparent 1px)',
                  backgroundSize: '100% 100%, 100% 4px',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}></div>
              </div>

              {/* "After" Side (Finished Real Restorations) */}
              <div 
                className="comp-img comp-after" 
                style={{ 
                  width: "100%", 
                  height: "100%",
                  clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`
                }}
              >
                <img 
                  src="/dental_zirconia_crown.png" 
                  alt="Restauração de Cerâmica Finalizada Macrov" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>

              {/* Slider Handle */}
              <div className="comp-slider-handle" style={{ left: `${sliderPos}%` }}>
                <div className="comp-slider-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="8 18 2 12 8 6" />
                    <polyline points="16 6 22 12 16 18" />
                  </svg>
                </div>
              </div>

              {/* Labels */}
              <div className="comp-label label-before">Modelo CAD Virtual</div>
              <div className="comp-label label-after">Coroa Multilayer Pronta</div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Workflow Section (CAD/CAM Process) */}
      <section id="workflow" className="section" style={{ background: "rgba(11, 15, 25, 0.3)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Fluxo Operacional</span>
            <h2>A Jornada do Seu Trabalho</h2>
            <p className="section-desc">Entenda como a integração entre odontologia digital e processos industriais reduz prazos de entrega e elimina reajustes clínicos.</p>
          </div>

          <div className="workflow-nav">
            {workflowSteps.map((step, idx) => (
              <button 
                key={idx} 
                className={`workflow-tab-btn ${activeStep === idx ? "active" : ""}`}
                onClick={() => setActiveStep(idx)}
              >
                <span className="step-num-circle" style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: activeStep === idx ? "var(--accent-teal)" : "rgba(255,255,255,0.1)",
                  color: activeStep === idx ? "#070a13" : "var(--text-secondary)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: "bold"
                }}>{idx + 1}</span>
                {step.title}
              </button>
            ))}
          </div>

          <div className="glass-panel workflow-content">
            <div className="workflow-info">
              <span className="workflow-step-tag">{workflowSteps[activeStep].tag}</span>
              <h3 style={{ fontSize: "1.8rem", color: "var(--accent-teal)", marginBottom: "8px" }}>
                {workflowSteps[activeStep].title}
              </h3>
              <p style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Tecnologia: <span style={{ color: "var(--text-primary)" }}>{workflowSteps[activeStep].tech}</span>
              </p>
              <p style={{ marginBottom: "24px", fontSize: "1.05rem" }}>
                {workflowSteps[activeStep].desc}
              </p>
              
              <div style={{
                background: "rgba(255,255,255,0.02)",
                padding: "16px",
                borderRadius: "8px",
                borderLeft: "3px solid var(--accent-purple)",
                fontWeight: "600",
                color: "var(--text-primary)"
              }}>
                {workflowSteps[activeStep].stat}
              </div>
            </div>

            <div className="workflow-visual">
              <img 
                src={
                  activeStep === 0 ? "/dental_cad_design.png" :
                  activeStep === 1 ? "/dental_cad_design.png" :
                  activeStep === 2 ? "/dental_lab_setup.png" :
                  activeStep === 3 ? "/dental_handcraft.png" :
                  "/dental_finished_smile.png"
                } 
                alt={workflowSteps[activeStep].title} 
              />
              <div className="workflow-visual-overlay">
                <div>
                  <h4 style={{ color: "var(--accent-teal)", fontSize: "1rem", fontWeight: "700" }}>
                    {activeStep === 0 ? "Envio Digital de STL" :
                     activeStep === 1 ? "Modelagem CAD Exocad" :
                     activeStep === 2 ? "Usinagem CNC Alemã" :
                     activeStep === 3 ? "Maquiagem Cerâmica Estética" :
                     "Prótese Cimentada Final"}
                  </h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                    {activeStep === 0 ? "Importação segura de malha 3D." :
                     activeStep === 1 ? "Ajuste milimétrico de oclusão." :
                     activeStep === 2 ? "Fresagem robotizada de 5 eixos." :
                     activeStep === 3 ? "Glaze e caracterização artística." :
                     "Entrega e adaptação clínica imediata."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case submission portal simulator */}
      <section id="simulador" className="section" style={{ borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Área do Dentista</span>
            <h2>Portal de Coletas e Envio de Casos</h2>
            <p className="section-desc">Faça uma simulação de orçamento e prazo de entrega para o primeiro trabalho do seu consultório.</p>
          </div>

          <div className="glass-panel portal-grid" style={{ padding: "40px" }}>
            <div className="portal-form-side">
              <h3 style={{ marginBottom: "24px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
                Especificações do Trabalho
              </h3>
              
              {!caseSubmitted ? (
                <form onSubmit={handleRegisterCase}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="work-type">Tipo de Restauração</label>
                    <select 
                      id="work-type" 
                      className="form-select"
                      value={workType}
                      onChange={(e) => setWorkType(e.target.value)}
                    >
                      <option value="coroa_zirconia">Coroa Total Monolítica Zircônia</option>
                      <option value="lente_emax">Lente de Contato Cerâmica (IPS e.max)</option>
                      <option value="sobre_implante">Coroa / Pilar sobre Implante</option>
                      <option value="placa_miorrelaxante">Placa de Bruxismo Prensada CAD/CAM</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="material">Material de Confecção</label>
                    <select 
                      id="material" 
                      className="form-select"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                    >
                      <option value="zirconia_mult">Zircônia Multilayer (Translúcida)</option>
                      <option value="zirconia_mult_4d">Zircônia 4D-Pro Ultra High Translucency</option>
                      <option value="emax_cad">Dissilicato de Lítio (IPS e.max original)</option>
                      <option value="pmma">Resina Acrílica PMMA de Alta Densidade (Provisório)</option>
                    </select>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="tooth-shade">Cor do Dente (Escala Vita)</label>
                      <select 
                        id="tooth-shade" 
                        className="form-select"
                        value={toothShade}
                        onChange={(e) => setToothShade(e.target.value)}
                      >
                        <option value="A1">A1 (Claro)</option>
                        <option value="A2">A2 (Padrão)</option>
                        <option value="A3">A3 (Médio)</option>
                        <option value="B1">B1 (Muito Claro)</option>
                        <option value="BL2">Bleach 2 (Clareado)</option>
                        <option value="BL4">Bleach 4 (Clareado Natural)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="urgency">Prioridade do Caso</label>
                      <select 
                        id="urgency" 
                        className="form-select"
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                      >
                        <option value="padrao">Padrão (5 dias úteis)</option>
                        <option value="express">Express (48h úteis - + R$ 90)</option>
                      </select>
                    </div>
                  </div>

                  <h3 style={{ margin: "24px 0 16px 0", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", fontSize: "1.2rem" }}>
                    Dados para Coleta / Faturamento
                  </h3>

                  <div className="form-group">
                    <label className="form-label" htmlFor="dentist-name">Nome do Cirurgião-Dentista</label>
                    <input 
                      id="dentist-name" 
                      type="text" 
                      className="form-input" 
                      placeholder="Dr. / Dra. Exemplo" 
                      value={dentistName}
                      onChange={(e) => setDentistName(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="cro">Número do CRO</label>
                      <input 
                        id="cro" 
                        type="text" 
                        className="form-input" 
                        placeholder="0000-RO" 
                        value={dentistCro}
                        onChange={(e) => setDentistCro(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">WhatsApp para Contato</label>
                      <input 
                        id="phone" 
                        type="tel" 
                        className="form-input" 
                        placeholder="(69) 99999-0000" 
                        value={dentistPhone}
                        onChange={(e) => setDentistPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-pulse" style={{ width: "100%", marginTop: "12px" }}>
                    <ToothIcon />
                    Registrar e Solicitar Coleta
                  </button>
                </form>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", textAlign: "center", padding: "20px 0" }}>
                  <div style={{ 
                    width: "70px", 
                    height: "70px", 
                    borderRadius: "50%", 
                    background: "rgba(16, 185, 129, 0.1)", 
                    border: "2px solid #10b981",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px auto"
                  }}>
                    <CheckIcon />
                  </div>
                  <h3 style={{ color: "#10b981", fontSize: "1.6rem", marginBottom: "12px" }}>Solicitação Registrada!</h3>
                  <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                    O caso foi enviado para a triagem digital da <strong>@macrovlab</strong>. O código gerado para rastreamento é:
                  </p>
                  <div style={{ 
                    background: "rgba(255,255,255,0.03)", 
                    border: "1px solid var(--border-color)", 
                    padding: "16px", 
                    borderRadius: "8px", 
                    fontFamily: "monospace", 
                    fontSize: "1.2rem", 
                    fontWeight: "bold",
                    color: "var(--accent-teal)",
                    letterSpacing: "0.05em",
                    marginBottom: "32px"
                  }}>
                    {caseCode}
                  </div>
                  <div className="success-badge" style={{ textAlign: "left", marginBottom: "32px" }}>
                    <div>
                      <strong>Próximo passo:</strong> Um de nossos protéticos entrará em contato via WhatsApp no número <strong>{dentistPhone}</strong> em até 15 minutos para obter o link do arquivo STL ou coordenar o motoboy para coleta do molde físico.
                    </div>
                  </div>
                  <button onClick={resetForm} className="btn btn-secondary">
                    Simular Novo Caso
                  </button>
                </div>
              )}
            </div>

            <div className="portal-calc-side" style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ marginBottom: "24px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
                Detalhamento & Prazos
              </h3>
              
              <div className="calc-summary" style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div className="summary-row">
                    <span>Laboratório Responsável</span>
                    <span className="summary-value">Macrov Lab (Porto Velho)</span>
                  </div>
                  <div className="summary-row">
                    <span>Restaurador Selecionado</span>
                    <span className="summary-value" style={{ textTransform: "capitalize" }}>
                      {workType.replace("_", " ")}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span>Material de Escolha</span>
                    <span className="summary-value" style={{ textTransform: "capitalize" }}>
                      {material.replace("_", " ")}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span>Matiz de Cor</span>
                    <span className="summary-value">{toothShade} (Escala Vita 3D)</span>
                  </div>
                  <div className="summary-row">
                    <span>Prazo de Produção</span>
                    <span className="summary-value" style={{ color: urgency === "express" ? "#f59e0b" : "var(--text-primary)", fontWeight: "bold" }}>
                      {urgency === "express" ? "Express (48 horas úteis)" : "Normal (5 dias úteis)"}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span>Coleta de Arquivos</span>
                    <span className="summary-value">Portal de Upload Seguro (SSL)</span>
                  </div>
                </div>

                <div style={{ marginTop: "40px", borderTop: "1px solid var(--border-color)", paddingTop: "24px" }}>
                  <div className="summary-row" style={{ borderBottom: "none" }}>
                    <div>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "block" }}>Entrega Prevista para o Consultório</span>
                      <strong style={{ fontSize: "1.25rem", color: "var(--accent-teal)" }}>{deliveryDate}</strong>
                    </div>
                  </div>
                  <div className="summary-row" style={{ borderBottom: "none", background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "10px", marginTop: "16px" }}>
                    <div>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "block" }}>Preço Médio Estimado da Unidade</span>
                      <span className="summary-value highlight" style={{ fontSize: "1.6rem", color: "var(--accent-teal)" }}>
                        R$ {calculatePrice().toFixed(2)}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", maxWidth: "150px", textAlign: "right" }}>
                      *Faturamento mensal em fatura única B2B para clínicas cadastradas.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section id="instagram" className="section" style={{ borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Galeria @macrovlab</span>
            <h2>Bastidores & Casos Clínicos</h2>
            <p className="section-desc">
              Confira as imagens do nosso dia a dia clínico e laboratorial publicadas em nosso perfil no Instagram. Acompanhe a evolução das reabilitações 100% digitais.
            </p>
          </div>

          {/* Instagram Profile Header Mockup */}
          <div className="instagram-profile-card glass-panel">
            <div className="instagram-avatar-wrapper">
              <div className="instagram-avatar-ring">
                <div className="instagram-avatar">
                  <img src="/dental_veneers.png" alt="Macrov Lab Logo Avatar" />
                </div>
              </div>
            </div>
            <div className="instagram-profile-info">
              <div className="instagram-profile-top">
                <a href="https://instagram.com/macrovlab" target="_blank" rel="noreferrer" className="instagram-username">
                  @macrovlab
                  <span className="instagram-verify-badge" title="Conta Oficial Verificada">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                  </span>
                </a>
                <a href="https://instagram.com/macrovlab" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: "6px 16px", fontSize: "0.85rem", borderRadius: "8px" }}>
                  Seguir
                </a>
              </div>
              <div className="instagram-stats">
                <span className="instagram-stat-item"><strong>6</strong> posts</span>
                <span className="instagram-stat-item"><strong>2.4k</strong> seguidores</span>
                <span className="instagram-stat-item"><strong>182</strong> seguindo</span>
              </div>
              <div className="instagram-bio">
                <strong>Macrov Lab | Prótese Dentária Digital</strong><br />
                🔬 Reabilitação Oral de Alta Performance<br />
                💻 Fluxo 100% Digital CAD/CAM (Exocad & 3Shape)<br />
                📍 Porto Velho, Rondônia
              </div>
            </div>
          </div>

          {/* Instagram 3x2 Grid */}
          <div className="instagram-grid">
            {/* Post 1: Veneers */}
            <div className="instagram-post" onClick={() => window.open("https://instagram.com/macrovlab", "_blank")}>
              <img src="/dental_veneers.png" alt="Lentes de Contato Odontológicas" className="instagram-post-img" />
              <div className="instagram-post-overlay">
                <div className="instagram-post-stats">
                  <span className="instagram-post-stat">❤️ 142</span>
                  <span className="instagram-post-stat">💬 12</span>
                </div>
                <p className="instagram-post-caption">
                  Lentes de contato ultrafinas em dissilicato de lítio (IPS e.max). Perfeição em translucidez e fidelidade marginal. ✨ #lentesdecontatodental #esteticadental #macrovlab
                </p>
              </div>
            </div>

            {/* Post 2: Zirconia Crown */}
            <div className="instagram-post" onClick={() => window.open("https://instagram.com/macrovlab", "_blank")}>
              <img src="/dental_zirconia_crown.png" alt="Coroa Total em Zircônia Multicamadas" className="instagram-post-img" />
              <div className="instagram-post-overlay">
                <div className="instagram-post-stats">
                  <span className="instagram-post-stat">❤️ 98</span>
                  <span className="instagram-post-stat">💬 8</span>
                </div>
                <p className="instagram-post-caption">
                  Coroa monolítica de zircônia multicamadas 4D-Pro. Unindo alta resistência (1200 MPa) e estética natural. 💎 #zirconiadental #protesedentaria #cadcam
                </p>
              </div>
            </div>

            {/* Post 3: CAD Design */}
            <div className="instagram-post" onClick={() => window.open("https://instagram.com/macrovlab", "_blank")}>
              <img src="/dental_cad_design.png" alt="Planejamento Digital no Exocad" className="instagram-post-img" />
              <div className="instagram-post-overlay">
                <div className="instagram-post-stats">
                  <span className="instagram-post-stat">❤️ 215</span>
                  <span className="instagram-post-stat">💬 24</span>
                </div>
                <p className="instagram-post-caption">
                  Desenho virtual no Exocad. Mapeamento micrométrico dos contatos oclusais e margens para zero ajuste clínico. 💻 #exocad #fluxodigital #odontologia
                </p>
              </div>
            </div>

            {/* Post 4: Handcraft Paint */}
            <div className="instagram-post" onClick={() => window.open("https://instagram.com/macrovlab", "_blank")}>
              <img src="/dental_handcraft.png" alt="Maquiagem e Glaze Cerâmico" className="instagram-post-img" />
              <div className="instagram-post-overlay">
                <div className="instagram-post-stats">
                  <span className="instagram-post-stat">❤️ 167</span>
                  <span className="instagram-post-stat">💬 19</span>
                </div>
                <p className="instagram-post-caption">
                  A arte que complementa a tecnologia. Caracterização manual minuciosa para replicar a opalescência do esmalte natural. 🎨🖌️ #proteseartesanal #estetica #vita3d
                </p>
              </div>
            </div>

            {/* Post 5: Finished Smile */}
            <div className="instagram-post" onClick={() => window.open("https://instagram.com/macrovlab", "_blank")}>
              <img src="/dental_finished_smile.png" alt="Resultado Clínico Cimentado" className="instagram-post-img" />
              <div className="instagram-post-overlay">
                <div className="instagram-post-stats">
                  <span className="instagram-post-stat">❤️ 312</span>
                  <span className="instagram-post-stat">💬 37</span>
                </div>
                <p className="instagram-post-caption">
                  Mais um sorriso transformado por nossos parceiros com reabilitações Macrov. A beleza do natural na odontologia digital. 😁🙌 #sorrisoperfeito #reabilitacaooral
                </p>
              </div>
            </div>

            {/* Post 6: Lab Setup Milling */}
            <div className="instagram-post" onClick={() => window.open("https://instagram.com/macrovlab", "_blank")}>
              <img src="/dental_lab_setup.png" alt="Fresadora CNC 5 Eixos" className="instagram-post-img" />
              <div className="instagram-post-overlay">
                <div className="instagram-post-stats">
                  <span className="instagram-post-stat">❤️ 119</span>
                  <span className="instagram-post-stat">💬 5</span>
                </div>
                <p className="instagram-post-caption">
                  Central de fresagem a todo vapor. Tecnologia alemã de 5 eixos garantindo a máxima fidelidade na usinagem dos blocos. ⚙️🤖 #cadcamlab #fresadora #tecnologia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dentist Testimonials */}
      <section id="depoimentos" className="section" style={{ background: "rgba(11, 15, 25, 0.4)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Casos Clínicos de Sucesso</span>
            <h2>O que dizem os cirurgiões-dentistas</h2>
            <p className="section-desc">Depoimentos reais de profissionais que transformaram sua rotina e a satisfação de seus pacientes com a @macrovlab.</p>
          </div>

          <div className="testimonials-grid">
            <div className="glass-panel test-card">
              <p className="test-text">
                "Desde que migramos para o fluxo 100% digital com a Macrov Lab, o tempo de cadeira dos meus pacientes reduziu muito. As lentes de contato em e.max encaixam perfeitamente na primeira prova, com zero necessidade de ajustes. A qualidade do design de oclusão deles no software é impecável."
              </p>
              <div className="test-profile">
                <div className="test-avatar">DR</div>
                <div>
                  <h4 className="test-name">Dr. Daniel Rodrigues</h4>
                  <p className="test-clinic">Reabilitação Oral & Estética - CRO 2942-RO</p>
                </div>
              </div>
            </div>

            <div className="glass-panel test-card" style={{ borderColor: "rgba(0, 242, 254, 0.2)" }}>
              <p className="test-text">
                "O suporte deles é o grande diferencial. Sempre que tenho um caso complexo de implante múltiplo, o designer me chama em videoconferência no Exocad para refinarmos juntos as diretrizes da coroa antes da fresagem. Isso me traz uma segurança clínica absurda."
              </p>
              <div className="test-profile">
                <div className="test-avatar" style={{ color: "var(--accent-purple)" }}>AM</div>
                <div>
                  <h4 className="test-name">Dra. Aline Medeiros</h4>
                  <p className="test-clinic">Implantodontista - CRO 4108-RO</p>
                </div>
              </div>
            </div>

            <div className="glass-panel test-card">
              <p className="test-text">
                "Impressionante a agilidade no serviço Express. Tivemos uma emergência de fratura de coroa anterior de um paciente que viajaria no dia seguinte. Enviamos o STL pela manhã e no final da tarde a coroa de Zircônia Multilayer pintada e glazeada estava no meu consultório. Trabalho impecável."
              </p>
              <div className="test-profile">
                <div className="test-avatar">RC</div>
                <div>
                  <h4 className="test-name">Dr. Ricardo Costa</h4>
                  <p className="test-clinic">Clínica Sorriso Moderno - CRO 3319-RO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Quick Contact Section */}
      <section id="faq" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Perguntas Frequentes</span>
            <h2>Esclareça Suas Dúvidas</h2>
            <p className="section-desc">Informações rápidas sobre envio de arquivos, prazos e faturamento para novos consultórios parceiros.</p>
          </div>

          <div className="faq-grid">
            <div className="faq-questions-side">
              <FAQAccordionItem 
                question="Quais modelos de scanners intraorais são compatíveis?"
                answer="Somos 100% integrados com sistemas abertos. Você pode nos enviar arquivos no formato STL, PLY ou OBJ gerados por qualquer scanner intraoral do mercado, incluindo Medit, iTero, Trios 3Shape, Carestream, Dentsply Sirona (Primescan) e Owandy."
              />
              <FAQAccordionItem 
                question="Como é feita a coleta física se eu não possuir scanner?"
                answer="Se você ainda utiliza moldagem convencional de silicone, nós fazemos a coleta física do molde em seu consultório (região de Porto Velho). Escaneamos o modelo de gesso com scanner de bancada industrial em nosso laboratório para inseri-lo no fluxo digital sem custo adicional."
              />
              <FAQAccordionItem 
                question="Qual é o prazo de garantia oferecido para as próteses?"
                answer="Oferecemos uma garantia oficial de 5 anos para todas as nossas reabilitações estruturais confeccionadas em Zircônia pura (monolítica e maquiada) e de 2 anos para as restaurações em dissilicato de lítio (IPS e.max), cobrindo quebras e falhas do material sob uso fisiológico."
              />
              <FAQAccordionItem 
                question="Como funciona o faturamento e as formas de pagamento?"
                answer="Para consultórios parceiros e dentistas cadastrados, o faturamento é mensal via boleto bancário direto, enviado no início do mês subsequente com o descritivo de todos os casos concluídos. Também aceitamos cartões de crédito e PIX com desconto à vista."
              />
            </div>

            <div className="glass-panel contact-card">
              <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", color: "var(--accent-teal)" }}>
                Fale Diretamente Conosco
              </h3>
              <p style={{ fontSize: "0.95rem" }}>
                Tem um caso atípico de alta complexidade ou gostaria de agendar uma visita para conhecer nossa central CAD/CAM? Fale direto com a nossa gerência de suporte clínico.
              </p>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <PhoneIcon />
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block" }}>WhatsApp Suporte Técnico</span>
                  <a href="https://wa.me/5569999990000" target="_blank" rel="noreferrer" style={{ color: "var(--text-primary)", fontWeight: "bold", textDecoration: "none" }}>
                    (69) 99999-0000
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon" style={{ color: "var(--accent-purple)" }}>
                  <ToothIcon />
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block" }}>E-mail de Cadastro</span>
                  <a href="mailto:macrovlab@gmail.com" style={{ color: "var(--text-primary)", fontWeight: "bold", textDecoration: "none" }}>
                    macrovlab@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <CalendarIcon />
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block" }}>Localização do Laboratório</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: "bold" }}>
                    Porto Velho, Rondônia - RO
                  </span>
                </div>
              </div>

              <a href="https://wa.me/5569999990000" target="_blank" rel="noreferrer" className="btn btn-primary btn-pulse" style={{ marginTop: "12px" }}>
                <PhoneIcon />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="#hero" className="logo-brand" style={{ marginBottom: "20px" }}>
                <ToothIcon />
                <span>MACROV<span className="gradient-text-teal">LAB</span></span>
                <span className="logo-dot"></span>
              </a>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
                Laboratório odontológico especializado em reabilitações estéticas e estruturais de alta precisão via fluxo 100% digital CAD/CAM.
              </p>
            </div>

            <div>
              <h4 className="footer-title">Navegação</h4>
              <ul className="footer-links">
                <li><a href="#servicos" className="footer-link">Serviços</a></li>
                <li><a href="#estetica" className="footer-link">Estética 3D</a></li>
                <li><a href="#workflow" className="footer-link">Fluxo CAD/CAM</a></li>
                <li><a href="#simulador" className="footer-link">Simulador de Casos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Materiais</h4>
              <ul className="footer-links">
                <li><a href="#servicos" className="footer-link">Zircônia Multicamadas</a></li>
                <li><a href="#servicos" className="footer-link">Dissilicato de Lítio (e.max)</a></li>
                <li><a href="#servicos" className="footer-link">Resina de Alta Definição PMMA</a></li>
                <li><a href="#servicos" className="footer-link">Pilares Personalizados Ti/Zr</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Contato & Suporte</h4>
              <ul className="footer-links">
                <li><span className="footer-link">(69) 99999-0000</span></li>
                <li><span className="footer-link">macrovlab@gmail.com</span></li>
                <li><span className="footer-link">Porto Velho - Rondônia</span></li>
                <li><span className="footer-link">Atendimento: Seg a Sex - 8h às 18h</span></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copy">
              &copy; {new Date().getFullYear()} Macrov Lab. Todos os direitos reservados. Macrov S.p Serviços em Prótese Dentária Ltda.
            </span>
            <div className="social-links">
              <a href="https://instagram.com/macrovlab" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://wa.me/5569999990000" target="_blank" rel="noreferrer" className="social-link" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
