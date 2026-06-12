<p align="center">
  <img src="public/emblem.png" width="110" alt="MACROVLAB Emblem" />
</p>

<h1 align="center">MACROVLAB — Landing Page</h1>

<p align="center">
  <strong>Prótese Dentária · CADDesign Premium</strong><br/>
  Porto Velho, Rondônia · Brasil
</p>

<p align="center">
  <img src="public/scanner.png" width="420" alt="Scanner e prótese MACROVLAB" />
</p>

---

## Visão Geral

Landing page institucional da **Macrovlab**, laboratório de prótese dentária e CADDesign de Porto Velho (RO). Identidade visual azul + dourado com animações cinematográficas, canvas de partículas interativo global e fluxo digital completo para captação de dentistas parceiros.

---

## Preview das Seções

<table>
  <tr>
    <td align="center">
      <img src="public/rebrand-evoluimos.png" width="260" alt="Rebrand Evoluímos" /><br/>
      <sub>Rebrand — TM Studio → Macrovlab</sub>
    </td>
    <td align="center">
      <img src="public/post-02-cad.png" width="260" alt="Projetos CAD" /><br/>
      <sub>Planejamento CAD</sub>
    </td>
    <td align="center">
      <img src="public/post-01-digital.png" width="260" alt="Fluxo Digital" /><br/>
      <sub>Fluxo 100% Digital</sub>
    </td>
  </tr>
</table>

---

## Galeria de Conteúdo

<table>
  <tr>
    <td><img src="public/dental_cad_design.png" width="190" alt="CAD Design" /></td>
    <td><img src="public/dental_zirconia_crown.png" width="190" alt="Coroa Zircônia" /></td>
    <td><img src="public/dental_veneers.png" width="190" alt="Facetas" /></td>
    <td><img src="public/dental_finished_smile.png" width="190" alt="Sorriso Finalizado" /></td>
  </tr>
  <tr>
    <td align="center"><sub>CAD Design</sub></td>
    <td align="center"><sub>Zircônia Multilayer</sub></td>
    <td align="center"><sub>Facetas e.max</sub></td>
    <td align="center"><sub>Resultado Final</sub></td>
  </tr>
</table>

<table>
  <tr>
    <td><img src="public/post-03-fluxos.png" width="190" alt="Fluxos Digitais" /></td>
    <td><img src="public/post-04-tecnologia.png" width="190" alt="Tecnologia" /></td>
    <td><img src="public/dental_handcraft.png" width="190" alt="Maquiagem Artesanal" /></td>
    <td><img src="public/dental_lab_setup.png" width="190" alt="Lab Setup" /></td>
  </tr>
  <tr>
    <td align="center"><sub>Fluxos Digitais</sub></td>
    <td align="center"><sub>Tecnologia Aplicada</sub></td>
    <td align="center"><sub>Maquiagem Cerâmica</sub></td>
    <td align="center"><sub>Central CAD/CAM</sub></td>
  </tr>
</table>

---

## Stack

| Camada | Tecnologia |
|---|---|
| UI | React 18 + TypeScript |
| Build | Vite + HMR |
| Backend | Hono (Cloudflare Workers) |
| Deploy | Cloudflare Workers (edge global) |
| Estilo | CSS custom — design system azul + dourado |

---

## Funcionalidades

- **Canvas de partículas interativo global** — segue o mouse em toda a página com linhas douradas
- **Hero animado** — scanner de prótese com badges flutuantes e animação float
- **Seção Rebrand** — narrativa visual da evolução TM Studio → Macrovlab
- **Comparador Before/After** — slider de drag: modelo CAD vs peça finalizada
- **Workflow em 5 abas** — etapas do fluxo operacional com imagens e estatísticas
- **Simulador de orçamento** — calcula preço e prazo por restauração, material e urgência
- **Portal de Envio de Casos** — formulário com código de rastreamento gerado
- **Galeria @macrovlab** — grid estilo Instagram com hover
- **Depoimentos** de cirurgiões-dentistas
- **FAQ** com acordeão animado
- **Responsivo** — desktop, tablet e mobile com menu burger

---

## Desenvolvimento

```bash
npm install
npm run dev
# http://localhost:5173
```

## Build e Deploy

```bash
npm run build
npm run deploy        # Cloudflare Workers
npx wrangler tail     # logs em tempo real
```

---

## Estrutura

```
src/
  react-app/
    App.tsx       # componente principal — toda a página
    index.css     # design system (variáveis, layout, responsividade)
  worker/
    index.ts      # backend Hono (Cloudflare Workers)
public/
  emblem.png              # emblema dourado Macrovlab
  scanner.png             # hero — scanner com prótese
  rebrand-evoluimos.png   # seção de rebrand
  post-0{1-4}-*.png       # galeria e workflow
  dental_*.png            # imagens clínicas
```

---

## Desenvolvido por

**Sandro Torres · ST Developer**

[![Instagram](https://img.shields.io/badge/@sandro__torres__saylou-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/sandro_torres_saylou/)
[![WhatsApp](https://img.shields.io/badge/+55%2092%2098447--4314-25D366?style=flat&logo=whatsapp&logoColor=white)](https://wa.me/5592984474314)

---

**Cliente:** Macrovlab — Porto Velho, Rondônia · BR
