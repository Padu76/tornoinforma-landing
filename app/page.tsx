// E:\tornoinforma-landing\app\page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"coaching" | "corso">("coaching");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const waLink = (msg: string) =>
    `https://wa.me/3478881515?text=${encodeURIComponent(msg)}`;

  const faq = [
    {
      q: "Come funziona il coaching a distanza?",
      a: "Dopo una valutazione iniziale via questionario, ricevi il tuo piano personalizzato (allenamento + alimentazione). Mi contatti via WhatsApp per aggiornamenti, domande o revisioni. Tutto avviene in remoto: puoi allenarti in palestra, a casa o all'aperto.",
    },
    {
      q: "Posso allenarmi senza attrezzatura?",
      a: "Assolutamente sì. Il piano viene costruito sulla tua disponibilità reale: a casa con pochi attrezzi, in palestra attrezzata o in mezzo alla natura. Decidi tu.",
    },
    {
      q: "Qual è la differenza tra coaching e corso?",
      a: "Il coaching è un percorso guidato con me: hai un PT che ti segue, revisiona il piano e ti risponde. Il corso è autonomo: acquisti una volta, accedi per sempre ai contenuti e li segui al tuo ritmo.",
    },
    {
      q: "L'ebook è davvero gratuito?",
      a: "Sì. 'Torno in Forma' — la guida completa su motivazione, alimentazione e allenamento — è inclusa in regalo con qualsiasi percorso tu scelga, coaching o corso.",
    },
    {
      q: "Quanto tempo devo dedicare agli allenamenti?",
      a: "Il minimo efficace. I piani sono costruiti per dare risultati reali con 3-5 sessioni a settimana da 30-60 minuti. Niente sprechi di tempo.",
    },
    {
      q: "Posso cambiare piano durante il percorso?",
      a: "Sì. Se nel corso del coaching le tue esigenze cambiano — per lavoro, viaggi o risultati raggiunti — adattiamo tutto senza costi extra.",
    },
  ];

  return (
    <main className="tif-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --black: #080808;
          --dark: #111111;
          --card: #161616;
          --border: rgba(255,255,255,0.07);
          --orange: #e8560a;
          --orange-light: #ff6b1a;
          --white: #f5f2ee;
          --muted: rgba(245,242,238,0.5);
          --font-display: 'Bebas Neue', sans-serif;
          --font-body: 'Barlow', sans-serif;
        }

        .tif-root {
          background: var(--black);
          color: var(--white);
          font-family: var(--font-body);
          font-weight: 400;
          overflow-x: hidden;
        }

        /* ── NAV ─────────────────────────────────────────── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: background .3s, backdrop-filter .3s, border-color .3s;
          border-bottom: 1px solid transparent;
          padding: 0 2rem;
        }
        .nav.scrolled {
          background: rgba(8,8,8,.92);
          backdrop-filter: blur(16px);
          border-color: var(--border);
        }
        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }
        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.6rem;
          letter-spacing: .08em;
          color: var(--white);
          text-decoration: none;
        }
        .nav-logo span { color: var(--orange); }
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          align-items: center;
        }
        .nav-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: .9rem;
          font-weight: 500;
          letter-spacing: .04em;
          text-transform: uppercase;
          transition: color .2s;
        }
        .nav-links a:hover { color: var(--white); }
        .nav-cta {
          background: var(--orange);
          color: var(--white) !important;
          padding: .5rem 1.25rem;
          border-radius: 2px;
        }
        .nav-cta:hover { background: var(--orange-light); color: var(--white) !important; }
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .nav-hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--white);
          transition: .3s;
        }
        .nav-mobile {
          display: none;
          flex-direction: column;
          background: rgba(8,8,8,.98);
          padding: 1.5rem 2rem;
          gap: 1.2rem;
        }
        .nav-mobile.open { display: flex; }
        .nav-mobile a {
          color: var(--muted);
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: .04em;
          text-transform: uppercase;
          transition: color .2s;
        }
        .nav-mobile a:hover { color: var(--white); }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-hamburger { display: flex; }
        }

        /* ── HERO ────────────────────────────────────────── */
        .hero {
          min-height: 100svh;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: url('/hero-bg.jpg') center/cover no-repeat;
          filter: brightness(.28) saturate(.6);
          transform: scale(1.03);
          animation: heroZoom 12s ease-out forwards;
        }
        @keyframes heroZoom {
          from { transform: scale(1.08); }
          to   { transform: scale(1.0); }
        }
        .hero-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: .5;
          pointer-events: none;
        }
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(232,86,10,.12) 0%,
            transparent 50%,
            rgba(0,0,0,.6) 100%
          );
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 8rem 2rem 4rem;
          width: 100%;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          background: rgba(232,86,10,.15);
          border: 1px solid rgba(232,86,10,.3);
          border-radius: 2px;
          padding: .35rem .9rem;
          font-size: .78rem;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--orange-light);
          margin-bottom: 1.5rem;
          animation: fadeUp .8s .2s both;
        }
        .hero-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--orange);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: .5; transform: scale(1.4); }
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 10vw, 8rem);
          line-height: .95;
          letter-spacing: .02em;
          animation: fadeUp .8s .3s both;
          max-width: 800px;
        }
        .hero-title em {
          font-style: normal;
          color: var(--orange);
          display: block;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          font-weight: 300;
          color: var(--muted);
          max-width: 520px;
          line-height: 1.7;
          margin: 1.5rem 0 2.5rem;
          animation: fadeUp .8s .45s both;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          animation: fadeUp .8s .6s both;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          background: var(--orange);
          color: var(--white);
          padding: .9rem 2rem;
          font-size: .95rem;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          border-radius: 2px;
          text-decoration: none;
          transition: background .2s, transform .2s;
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover { background: var(--orange-light); transform: translateY(-2px); }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          background: transparent;
          color: var(--white);
          padding: .9rem 2rem;
          font-size: .95rem;
          font-weight: 500;
          letter-spacing: .06em;
          text-transform: uppercase;
          border-radius: 2px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.25);
          transition: border-color .2s, color .2s;
          cursor: pointer;
        }
        .btn-ghost:hover { border-color: var(--white); }
        .hero-stats {
          display: flex;
          gap: 2.5rem;
          margin-top: 4rem;
          animation: fadeUp .8s .75s both;
          flex-wrap: wrap;
        }
        .hero-stat strong {
          display: block;
          font-family: var(--font-display);
          font-size: 2.8rem;
          color: var(--orange);
          letter-spacing: .04em;
          line-height: 1;
        }
        .hero-stat span {
          font-size: .8rem;
          font-weight: 500;
          color: var(--muted);
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .hero-scroll {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .5rem;
          color: var(--muted);
          font-size: .7rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          animation: fadeIn 1s 1.5s both;
        }
        .hero-scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, var(--orange), transparent);
          animation: scrollLine 2s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0%,100% { opacity: 1; transform: scaleY(1); }
          50%      { opacity: .4; transform: scaleY(.6); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── SECTION UTILS ────────────────────────────────── */
        .section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
        }
        .section-label {
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: .75rem;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 4rem);
          letter-spacing: .03em;
          line-height: 1;
          margin-bottom: 1rem;
        }
        .section-sub {
          font-size: 1.05rem;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.7;
          max-width: 580px;
        }
        .divider {
          width: 100%;
          height: 1px;
          background: var(--border);
        }

        /* ── CHI SONO ─────────────────────────────────────── */
        .about {
          background: var(--dark);
          padding: 6rem 2rem;
        }
        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .about-img-wrap {
          position: relative;
        }
        .about-img-wrap img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          object-position: top center;
          border-radius: 2px;
          filter: grayscale(.3) contrast(1.1);
          display: block;
        }
        .about-img-badge {
          position: absolute;
          bottom: -1.5rem;
          right: -1.5rem;
          background: var(--orange);
          padding: 1.2rem 1.5rem;
          border-radius: 2px;
        }
        .about-img-badge strong {
          display: block;
          font-family: var(--font-display);
          font-size: 2.2rem;
          line-height: 1;
          color: var(--white);
        }
        .about-img-badge span {
          font-size: .75rem;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: rgba(255,255,255,.8);
        }
        .about-text blockquote {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          letter-spacing: .04em;
          line-height: 1.2;
          color: var(--white);
          border-left: 3px solid var(--orange);
          padding-left: 1.5rem;
          margin: 1.5rem 0 2rem;
        }
        .about-text p {
          color: var(--muted);
          line-height: 1.8;
          margin-bottom: 1.2rem;
          font-size: 1rem;
        }
        .about-text p strong { color: var(--white); font-weight: 600; }
        .about-pills {
          display: flex;
          flex-wrap: wrap;
          gap: .6rem;
          margin-top: 2rem;
        }
        .about-pill {
          background: rgba(255,255,255,.05);
          border: 1px solid var(--border);
          border-radius: 2px;
          padding: .35rem .85rem;
          font-size: .78rem;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .about-profile-link {
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          margin-top: 1.8rem;
          padding: .7rem 1.2rem;
          border: 1px solid var(--border);
          border-radius: 2px;
          text-decoration: none;
          color: var(--muted);
          font-size: .82rem;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          transition: border-color .2s, color .2s;
          background: rgba(255,255,255,.02);
        }
        .about-profile-link:hover {
          border-color: var(--orange);
          color: var(--white);
        }
        .about-profile-link span {
          color: var(--orange);
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .about-inner { grid-template-columns: 1fr; gap: 3rem; }
          .about-img-badge { right: 1rem; bottom: -1rem; }
        }

        /* ── PERCORSI (TAB) ──────────────────────────────── */
        .percorsi-bg { background: var(--black); }
        .tab-switch {
          display: flex;
          gap: 0;
          background: rgba(255,255,255,.04);
          border: 1px solid var(--border);
          border-radius: 3px;
          padding: 4px;
          margin: 2.5rem 0 3rem;
          width: fit-content;
        }
        .tab-btn {
          padding: .7rem 1.8rem;
          border-radius: 2px;
          border: none;
          background: transparent;
          color: var(--muted);
          font-family: var(--font-body);
          font-size: .85rem;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background .2s, color .2s;
        }
        .tab-btn.active {
          background: var(--orange);
          color: var(--white);
        }

        /* coaching cards */
        .coaching-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 3px;
          overflow: hidden;
        }
        .coaching-card {
          background: var(--card);
          padding: 2rem 1.75rem;
          position: relative;
          transition: background .2s;
        }
        .coaching-card:hover { background: #1c1c1c; }
        .coaching-card.featured {
          background: var(--dark);
          border-top: 2px solid var(--orange);
        }
        .coaching-card.featured::before {
          content: 'PIÙ SCELTO';
          position: absolute;
          top: -1px; right: 1.5rem;
          background: var(--orange);
          color: var(--white);
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .15em;
          padding: .2rem .6rem;
        }
        .card-plan {
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: .5rem;
        }
        .card-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          letter-spacing: .05em;
          margin-bottom: .3rem;
        }
        .card-price {
          font-family: var(--font-display);
          font-size: 3rem;
          letter-spacing: .02em;
          line-height: 1;
          margin: 1rem 0 .3rem;
        }
        .card-price-note {
          font-size: .78rem;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }
        .card-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: .7rem;
          margin-bottom: 2rem;
        }
        .card-features li {
          display: flex;
          gap: .6rem;
          align-items: flex-start;
          font-size: .9rem;
          color: var(--muted);
          line-height: 1.4;
        }
        .card-features li::before {
          content: '→';
          color: var(--orange);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .card-gift {
          display: flex;
          align-items: center;
          gap: .5rem;
          background: rgba(232,86,10,.1);
          border: 1px solid rgba(232,86,10,.25);
          border-radius: 2px;
          padding: .5rem .75rem;
          margin-top: auto;
          font-size: .78rem;
          font-weight: 600;
          color: var(--orange-light);
          letter-spacing: .04em;
        }
        @media (max-width: 900px) {
          .coaching-grid { grid-template-columns: 1fr; }
        }

        /* corso card */
        .corso-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 3px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .corso-content {
          padding: 3rem;
        }
        .corso-price-box {
          background: var(--dark);
          border-left: 1px solid var(--border);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 1.5rem;
        }
        .corso-price-label {
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .corso-price {
          font-family: var(--font-display);
          font-size: 5rem;
          letter-spacing: .02em;
          line-height: 1;
          color: var(--white);
        }
        .corso-price-note {
          font-size: .85rem;
          color: var(--muted);
          margin-top: -.5rem;
        }
        .corso-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: .6rem;
          margin: 1.5rem 0;
        }
        .corso-features li {
          display: flex;
          gap: .6rem;
          align-items: flex-start;
          font-size: .9rem;
          color: var(--muted);
        }
        .corso-features li::before {
          content: '✓';
          color: var(--orange);
          flex-shrink: 0;
          font-weight: 700;
        }
        @media (max-width: 768px) {
          .corso-card { grid-template-columns: 1fr; }
          .corso-price-box { border-left: none; border-top: 1px solid var(--border); }
        }

        /* ── COME FUNZIONA ────────────────────────────────── */
        .process-bg { background: var(--dark); }
        .process-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-top: 3rem;
          position: relative;
        }
        .process-steps::before {
          content: '';
          position: absolute;
          top: 2.2rem;
          left: calc(12.5% + 1.5rem);
          right: calc(12.5% + 1.5rem);
          height: 1px;
          background: linear-gradient(to right, var(--orange), rgba(232,86,10,.2));
          pointer-events: none;
        }
        .process-step {
          padding: 0 1.5rem 2rem;
          text-align: center;
        }
        .step-num {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--black);
          border: 2px solid var(--orange);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 1.2rem;
          color: var(--orange);
          margin: 0 auto 1.2rem;
          position: relative;
          z-index: 1;
        }
        .step-title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          letter-spacing: .06em;
          margin-bottom: .5rem;
        }
        .step-desc {
          font-size: .85rem;
          color: var(--muted);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .process-steps { grid-template-columns: 1fr 1fr; }
          .process-steps::before { display: none; }
        }
        @media (max-width: 480px) {
          .process-steps { grid-template-columns: 1fr; }
        }

        /* ── TRASFORMAZIONI ──────────────────────────────── */
        .trasf-bg { background: var(--black); }
        .trasf-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 3px;
          margin-top: 3rem;
        }
        .trasf-item {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--card);
        }
        .trasf-item img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(.4) contrast(1.1);
          transition: filter .4s, transform .4s;
        }
        .trasf-item:hover img { filter: grayscale(0) contrast(1); transform: scale(1.04); }
        .trasf-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }
        .trasf-badge {
          background: var(--orange);
          color: var(--white);
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: .25rem .6rem;
          border-radius: 1px;
        }
        @media (max-width: 900px) {
          .trasf-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 540px) {
          .trasf-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── EBOOK OMAGGIO ────────────────────────────────── */
        .ebook-bg { background: var(--dark); }
        .ebook-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 5rem;
          align-items: center;
        }
        .ebook-mockup {
          position: relative;
          flex-shrink: 0;
        }
        .ebook-mockup-img {
          width: 240px;
          aspect-ratio: 2/3;
          object-fit: cover;
          border-radius: 4px;
          box-shadow: -12px 12px 40px rgba(232,86,10,.25), 0 0 0 1px rgba(255,255,255,.06);
          display: block;
        }
        .ebook-gift-tag {
          position: absolute;
          top: -1rem;
          right: -1.5rem;
          background: var(--orange);
          color: var(--white);
          font-family: var(--font-display);
          font-size: 1.1rem;
          letter-spacing: .1em;
          padding: .4rem .8rem;
          border-radius: 2px;
          transform: rotate(3deg);
        }
        .ebook-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 2rem 0;
        }
        .ebook-feature {
          display: flex;
          gap: .75rem;
          align-items: flex-start;
        }
        .ebook-feature-icon {
          width: 36px;
          height: 36px;
          border-radius: 2px;
          background: rgba(232,86,10,.1);
          border: 1px solid rgba(232,86,10,.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 1rem;
        }
        .ebook-feature-text strong {
          display: block;
          font-size: .85rem;
          font-weight: 600;
          margin-bottom: .15rem;
        }
        .ebook-feature-text span {
          font-size: .78rem;
          color: var(--muted);
        }
        @media (max-width: 768px) {
          .ebook-inner { grid-template-columns: 1fr; gap: 3rem; }
          .ebook-features { grid-template-columns: 1fr; }
          .ebook-mockup-img { width: 180px; }
        }

        /* ── FAQ ─────────────────────────────────────────── */
        .faq-bg { background: var(--black); }
        .faq-list {
          margin-top: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .faq-item {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 2px;
          overflow: hidden;
        }
        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: none;
          border: none;
          color: var(--white);
          font-family: var(--font-body);
          font-size: .95rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: background .2s;
        }
        .faq-question:hover { background: rgba(255,255,255,.03); }
        .faq-icon {
          font-size: 1.2rem;
          color: var(--orange);
          flex-shrink: 0;
          transition: transform .25s;
        }
        .faq-answer {
          font-size: .9rem;
          color: var(--muted);
          line-height: 1.7;
          padding: 0 1.5rem 1.25rem;
          max-height: 0;
          overflow: hidden;
          transition: max-height .3s ease, padding .3s;
        }
        .faq-answer.open {
          max-height: 200px;
          padding-bottom: 1.25rem;
        }

        /* ── CTA FINALE ──────────────────────────────────── */
        .cta-final {
          background: var(--dark);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 6rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-final::before {
          content: '';
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(232,86,10,.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-final-inner {
          max-width: 640px;
          margin: 0 auto;
          position: relative;
        }
        .cta-final-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          letter-spacing: .03em;
          line-height: 1;
          margin-bottom: 1.2rem;
        }
        .cta-final-title em {
          font-style: normal;
          color: var(--orange);
        }
        .cta-final-sub {
          font-size: 1rem;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }
        .cta-final-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        /* ── FOOTER ──────────────────────────────────────── */
        .footer {
          background: var(--black);
          padding: 3rem 2rem;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .footer-logo {
          font-family: var(--font-display);
          font-size: 1.4rem;
          letter-spacing: .08em;
          color: var(--white);
          text-decoration: none;
        }
        .footer-logo span { color: var(--orange); }
        .footer-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          flex-wrap: wrap;
        }
        .footer-links a {
          font-size: .8rem;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: .06em;
          text-transform: uppercase;
          transition: color .2s;
        }
        .footer-links a:hover { color: var(--white); }
        .footer-copy {
          font-size: .78rem;
          color: rgba(245,242,238,.25);
          letter-spacing: .04em;
          width: 100%;
          text-align: center;
          margin-top: 1.5rem;
        }

        /* ── WA FLOAT ─────────────────────────────────────── */
        .wa-float {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 200;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #25d366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,.4);
          transition: transform .2s;
        }
        .wa-float:hover { transform: scale(1.08); }
        .wa-float svg { width: 26px; height: 26px; }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            TORNO<span>.</span>IN<span>.</span>FORMA
          </a>
          <ul className="nav-links">
            <li><a href="#percorsi">Percorsi</a></li>
            <li><a href="#come-funziona">Come funziona</a></li>
            <li><a href="#trasformazioni">Risultati</a></li>
            <li><a href="#corso">Il Corso</a></li>
            <li>
              <a className="nav-cta" href={waLink("Ciao Andrea! Vorrei sapere di più sul coaching a distanza.")}>
                Inizia Ora
              </a>
            </li>
          </ul>
          <button className="nav-hamburger" onClick={() => setMenuOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
        <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
          <a href="#percorsi" onClick={() => setMenuOpen(false)}>Percorsi</a>
          <a href="#come-funziona" onClick={() => setMenuOpen(false)}>Come funziona</a>
          <a href="#trasformazioni" onClick={() => setMenuOpen(false)}>Risultati</a>
          <a href="#corso" onClick={() => setMenuOpen(false)}>Il Corso</a>
          <a href={waLink("Ciao Andrea! Vorrei sapere di più sul coaching a distanza.")} style={{color:"var(--orange)"}}>
            Inizia Ora
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grain" />
        <div className="hero-gradient" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-dot" />
            Coaching Online · Personal Trainer Certificato
          </div>
          <h1 className="hero-title">
            Il tuo<br />
            corpo<br />
            <em>cambia.</em>
          </h1>
          <p className="hero-sub">
            Ti seguo a distanza con un piano di allenamento e alimentazione costruito su di te. Ovunque tu sia, qualunque sia il tuo punto di partenza.
          </p>
          <div className="hero-actions">
            <a href={waLink("Ciao Andrea! Ho visto il sito tornoinforma.it e vorrei iniziare il percorso di coaching.")}
               className="btn-primary">
              Inizia il Percorso →
            </a>
            <a href="#corso" className="btn-ghost">
              Scopri il Corso
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>500+</strong>
              <span>Trasformazioni</span>
            </div>
            <div className="hero-stat">
              <strong>12</strong>
              <span>Anni di Esperienza</span>
            </div>
            <div className="hero-stat">
              <strong>95%</strong>
              <span>Soddisfazione</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          Scorri
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ── CHI SONO ── */}
      <section className="about" id="chi-sono">
        <div className="about-inner">
          <div className="about-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/app-pt.jpg" alt="Andrea Padoan Personal Trainer Verona" />
            <div className="about-img-badge">
              <strong>12</strong>
              <span>Anni di<br />Esperienza</span>
            </div>
          </div>
          <div className="about-text">
            <div className="section-label">Chi sono</div>
            <h2 className="section-title">Mi chiamo<br />Andrea Padoan.</h2>
            <blockquote>
              "Sono stato anche io come te."
            </blockquote>
            <p>
              Dopo oltre <strong>12 anni in ruoli manageriali</strong> nel Marketing e nelle Vendite, tornavo a casa la sera e premevo il pulsante OFF. Stanco, immobile, senza tempo per me.
            </p>
            <p>
              Poi ho capito che <strong>la mia missione era un'altra</strong>: aiutare le persone a ritrovare la forma fisica e l'energia che credevano di aver perso. Ho trasformato quella passione nel mio lavoro.
            </p>
            <p>
              Oggi seguo clienti da tutta Italia <strong>a distanza</strong>, con piani personalizzati su allenamento, alimentazione e mentalità. Puoi allenarti a casa, in palestra o all'aperto — <strong>il metodo si adatta a te, non il contrario.</strong>
            </p>
            <div className="about-pills">
              <span className="about-pill">Personal Trainer Certificato</span>
              <span className="about-pill">Lifestyle Coach</span>
              <span className="about-pill">Fondatore Tribù Studio Verona</span>
              <span className="about-pill">Coaching Online</span>
            </div>
            <a
              href="https://www.personaltrainerverona.it"
              target="_blank"
              rel="noopener noreferrer"
              className="about-profile-link"
            >
              <span>→</span> Scopri il mio profilo completo
            </a>
          </div>
        </div>
      </section>

      {/* ── PERCORSI ── */}
      <section className="percorsi-bg" id="percorsi">
        <div className="section">
          <div className="section-label">I Percorsi</div>
          <h2 className="section-title">Scegli come<br />vuoi cambiare.</h2>
          <p className="section-sub">
            Due strade, un obiettivo. Coaching con me o corso autonomo: in entrambi i casi ricevi l'ebook "Torno in Forma" in omaggio.
          </p>

          <div className="tab-switch">
            <button
              className={`tab-btn${activeTab === "coaching" ? " active" : ""}`}
              onClick={() => setActiveTab("coaching")}
            >
              Coaching a Distanza
            </button>
            <button
              className={`tab-btn${activeTab === "corso" ? " active" : ""}`}
              onClick={() => setActiveTab("corso")}
            >
              Corso Digitale
            </button>
          </div>

          {activeTab === "coaching" && (
            <div className="coaching-grid">
              {/* START */}
              <div className="coaching-card">
                <div className="card-plan">Start</div>
                <div className="card-title">4 Settimane</div>
                <div className="card-price">€99</div>
                <div className="card-price-note">Pagamento unico</div>
                <ul className="card-features">
                  <li>Piano allenamento personalizzato</li>
                  <li>Piano alimentare base</li>
                  <li>Check iniziale di valutazione</li>
                  <li>Supporto via WhatsApp</li>
                  <li>Adatto a casa, palestra o outdoor</li>
                </ul>
                <a href={waLink("Ciao Andrea! Vorrei iniziare con il piano Start (4 settimane).")} className="btn-primary" style={{width:"100%", justifyContent:"center", marginBottom:"1rem"}}>
                  Inizia Ora →
                </a>
                <div className="card-gift">🎁 Ebook "Torno in Forma" in omaggio</div>
              </div>
              {/* PRO */}
              <div className="coaching-card featured">
                <div className="card-plan">Pro</div>
                <div className="card-title">8 Settimane</div>
                <div className="card-price">€179</div>
                <div className="card-price-note">Pagamento unico</div>
                <ul className="card-features">
                  <li>Piano allenamento completo e progressivo</li>
                  <li>Piano alimentare avanzato con macro</li>
                  <li>2 revisioni del programma</li>
                  <li>Chat diretta con Andrea</li>
                  <li>Accesso Meal Prep Planner</li>
                </ul>
                <a href={waLink("Ciao Andrea! Vorrei iniziare con il piano Pro (8 settimane).")} className="btn-primary" style={{width:"100%", justifyContent:"center", marginBottom:"1rem"}}>
                  Inizia Ora →
                </a>
                <div className="card-gift">🎁 Ebook "Torno in Forma" in omaggio</div>
              </div>
              {/* ELITE */}
              <div className="coaching-card">
                <div className="card-plan">Elite</div>
                <div className="card-title">12 Settimane</div>
                <div className="card-price">€249</div>
                <div className="card-price-note">Pagamento unico</div>
                <ul className="card-features">
                  <li>Coaching continuativo personalizzato</li>
                  <li>Revisioni illimitate del piano</li>
                  <li>Chiamate mensili con Andrea</li>
                  <li>Supporto prioritario 7 giorni su 7</li>
                  <li>Accesso Community VIP</li>
                </ul>
                <a href={waLink("Ciao Andrea! Vorrei iniziare con il piano Elite (12 settimane).")} className="btn-primary" style={{width:"100%", justifyContent:"center", marginBottom:"1rem"}}>
                  Inizia Ora →
                </a>
                <div className="card-gift">🎁 Ebook "Torno in Forma" in omaggio</div>
              </div>
            </div>
          )}

          {activeTab === "corso" && (
            <div className="corso-card" id="corso">
              <div className="corso-content">
                <div className="card-plan">Corso Digitale · Accesso a Vita</div>
                <h3 className="section-title" style={{fontSize:"2rem", marginBottom:"1rem"}}>
                  Torno in Forma<br />— Il Corso Completo
                </h3>
                <p style={{color:"var(--muted)", lineHeight:1.7, fontSize:".95rem", marginBottom:"1.5rem"}}>
                  5 moduli, 20 lezioni, 20 worksheet scaricabili. Paghi una volta, accedi per sempre. Nessun abbonamento, nessun coaching: impari al tuo ritmo e applichi subito.
                </p>
                <ul className="corso-features">
                  <li>20 lezioni approfondite su motivazione, alimentazione, allenamento</li>
                  <li>20 worksheet PDF compilabili — uno per lezione</li>
                  <li>La sfida dei 30 giorni con piano dettagliato</li>
                  <li>Un modulo a settimana per applicare davvero i contenuti</li>
                  <li>Accesso a vita — torna quando vuoi</li>
                  <li>~13 ore di contenuto totale</li>
                </ul>
                <div className="card-gift" style={{marginTop:"1.5rem"}}>🎁 Ebook "Torno in Forma" incluso in omaggio</div>
              </div>
              <div className="corso-price-box">
                <div>
                  <div className="corso-price-label">Accesso Completo</div>
                  <div className="corso-price">€249</div>
                  <div className="corso-price-note">pagamento unico · accesso a vita</div>
                </div>
                <a href="/corso" className="btn-primary" style={{width:"100%", justifyContent:"center"}}>
                  Scopri il Corso →
                </a>
                <p style={{fontSize:".78rem", color:"var(--muted)"}}>
                  Pagamento sicuro via PayPal
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section className="process-bg" id="come-funziona">
        <div className="section">
          <div className="section-label">Il Metodo</div>
          <h2 className="section-title">Come funziona<br />il coaching a distanza.</h2>
          <div className="process-steps">
            {[
              { n: "1", t: "Valutazione", d: "Compili un questionario dettagliato su obiettivi, disponibilità, livello attuale e preferenze alimentari." },
              { n: "2", t: "Piano su Misura", d: "Ricevi il tuo programma di allenamento e piano alimentare personalizzato entro 48 ore." },
              { n: "3", t: "Ti Alleni", d: "Segui il piano dove vuoi — casa, palestra o outdoor. Con le app integrate hai tutto a portata di mano." },
              { n: "4", t: "Monitori e Cresci", d: "Mi aggiorni regolarmente. Revisiono, adatto, motivo. Tu vedi i risultati." },
            ].map(s => (
              <div className="process-step" key={s.n}>
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.t}</div>
                <p className="step-desc">{s.d}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center", marginTop:"3rem"}}>
            <a href={waLink("Ciao Andrea! Vorrei capire meglio come funziona il coaching a distanza.")} className="btn-primary">
              Hai Domande? Scrivimi →
            </a>
          </div>
        </div>
      </section>

      {/* ── TRASFORMAZIONI ── */}
      <section className="trasf-bg" id="trasformazioni">
        <div className="section">
          <div className="section-label">I Risultati</div>
          <h2 className="section-title">500+ persone hanno<br />già cambiato.</h2>
          <p className="section-sub">
            Clienti reali, risultati reali. Nessun fotoritocco, solo il metodo giusto e la costanza che ti aiuto a costruire.
          </p>
        </div>
        <div className="trasf-grid">
          {[1,2,3,4,5,6,7,8,9,10].map(i => (
            <div className="trasf-item" key={i}>
              <img src={`/transformations/transformation-${i}.jpg`} alt={`Trasformazione ${i}`} />
              <div className="trasf-item-overlay">
                <span className="trasf-badge">12 Settimane</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center", padding:"3rem 2rem 0"}}>
          <a href={waLink("Ciao Andrea! Ho visto le trasformazioni e voglio essere il prossimo.")} className="btn-primary">
            Voglio Essere il Prossimo →
          </a>
        </div>
      </section>

      {/* ── EBOOK OMAGGIO ── */}
      <section className="ebook-bg">
        <div className="ebook-inner">
          <div className="ebook-mockup">
            <img className="ebook-mockup-img" src="/book-cover.jpg" alt="Ebook Torno in Forma" />
            <div className="ebook-gift-tag">GRATIS</div>
          </div>
          <div>
            <div className="section-label">In Omaggio con Ogni Percorso</div>
            <h2 className="section-title">L'Ebook<br />"Torno in Forma"</h2>
            <p className="section-sub" style={{marginBottom:"1.5rem"}}>
              La guida completa che ho scritto per trasformare corpo e mentalità: motivazione, alimentazione, piano di allenamento e la sfida dei 30 giorni. Tua gratis quando inizi il percorso.
            </p>
            <div className="ebook-features">
              {[
                { icon: "🧠", t: "Mindset & Motivazione", d: "Come costruire abitudini che durano" },
                { icon: "🥗", t: "Alimentazione Pratica", d: "Meal prep, macronutrienti e piani per ogni obiettivo" },
                { icon: "🏋️", t: "Schede di Allenamento", d: "Per casa, palestra, over 60 e dimagrimento" },
                { icon: "📅", t: "Sfida dei 30 Giorni", d: "Un piano progressivo settimana per settimana" },
              ].map(f => (
                <div className="ebook-feature" key={f.t}>
                  <div className="ebook-feature-icon">{f.icon}</div>
                  <div className="ebook-feature-text">
                    <strong>{f.t}</strong>
                    <span>{f.d}</span>
                  </div>
                </div>
              ))}
            </div>
            <a href={waLink("Ciao Andrea! Vorrei iniziare un percorso e ricevere l'ebook in omaggio.")} className="btn-primary">
              Inizia e Ricevi l'Ebook Gratis →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-bg">
        <div className="section">
          <div className="section-label">Domande Frequenti</div>
          <h2 className="section-title">Hai dubbi?<br />Li risolviamo.</h2>
          <div className="faq-list">
            {faq.map((item, i) => (
              <div className="faq-item" key={i}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {item.q}
                  <span className="faq-icon" style={{transform: openFaq===i ? "rotate(45deg)" : "none"}}>+</span>
                </button>
                <div className={`faq-answer${openFaq === i ? " open" : ""}`}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:"2.5rem"}}>
            <a href={waLink("Ciao Andrea! Ho una domanda prima di iniziare il percorso.")} className="btn-ghost">
              Non hai trovato la risposta? Scrivimi →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="cta-final">
        <div className="cta-final-inner">
          <div className="section-label" style={{display:"block", textAlign:"center", marginBottom:"1rem"}}>Il momento è adesso</div>
          <h2 className="cta-final-title">
            Il primo passo<br />è il <em>più difficile.</em><br />Fallo con me.
          </h2>
          <p className="cta-final-sub">
            Non aspettare il lunedì, la dieta perfetta o il momento giusto. Inizia da dove sei, con quello che hai. Ci penso io al resto.
          </p>
          <div className="cta-final-actions">
            <a href={waLink("Ciao Andrea! Sono pronto a iniziare il mio percorso di trasformazione.")} className="btn-primary">
              Inizia il Percorso →
            </a>
            <a href="/corso" className="btn-ghost">
              Scopri il Corso
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <a href="#" className="footer-logo">
            TORNO<span>.</span>IN<span>.</span>FORMA
          </a>
          <ul className="footer-links">
            <li><a href="#percorsi">Percorsi</a></li>
            <li><a href="#come-funziona">Come Funziona</a></li>
            <li><a href="#trasformazioni">Risultati</a></li>
            <li><a href="/corso">Il Corso</a></li>
            <li><a href="/privacy-policy">Privacy</a></li>
            <li><a href="/cookie-policy">Cookie</a></li>
            <li><a href="https://www.personaltrainerverona.it" target="_blank" rel="noopener noreferrer">Sito PT Verona</a></li>
          </ul>
          <div className="footer-copy">
            © {new Date().getFullYear()} Torno in Forma · Andrea Padoan Personal Trainer · P.IVA 04058990237
            · <a href="mailto:info@tornoinforma.it" style={{color:"inherit"}}>info@tornoinforma.it</a>
            · <a href="https://wa.me/393478881515" style={{color:"inherit"}}>347 888 1515</a>
          </div>
        </div>
      </footer>

      {/* ── WA FLOAT ── */}
      <a href={waLink("Ciao Andrea!")} className="wa-float" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3C9 3 3.4 8.6 3.4 15.6c0 2.3.6 4.5 1.8 6.5L3 29l7.2-2.3c1.9 1 4 1.6 6.2 1.6h.1C23 28.3 28.6 22.7 28.6 15.6 28.6 8.6 23 3 16 3z" fill="white"/>
          <path d="M22.3 19.3c-.3-.2-1.9-1-2.2-1.1-.3-.1-.6-.2-.9.2-.3.3-.9 1.1-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.7-.8c.2-.3.2-.5.3-.8.1-.3 0-.6-.1-.8-.1-.2-.9-2.1-1.2-2.9-.3-.7-.6-.6-.9-.6h-.7c-.3 0-.7.1-1 .5-.3.3-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.3 2.6 3.9 6.3 5.5.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.2-.4-.3-.7-.5z" fill="#25d366"/>
        </svg>
      </a>
    </main>
  );
}