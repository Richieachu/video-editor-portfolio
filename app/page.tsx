"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Play } from "lucide-react";

type VideoItem =
  | { title: string; isLocal: true; src: string }
  | { title: string; isLocal: false; embedUrl: string };

export default function Home() {
  // ====== QUICK EDITS ======
  const accent = "#C68642"; // caramel
  const firstText = "Richie Jr";
  const secondText = "A Video Editor";

  const calendlyUrl = "https://calendly.com/iamrichiejr/30min";

  // Put your real links here:
  const socials = {
    instagram: "https://www.instagram.com/iamrichiejr",
    tiktok: "https://www.tiktok.com/@iamrichiejr",
    x: "https://x.com/iamrichiejr?s=21",
    whatsapp: "https:///2348121193461?text=Hi%20Richie%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20work%20with%20you.",
  };

  // ====== VIDEO PORTFOLIO (5 items) ======
  const videos: VideoItem[] = useMemo(
  () => [
    {
      title: "Short-form Edit — Hook + pacing",
      isLocal: false,
      embedUrl: "https://player.vimeo.com/video/1160439588?title=0&byline=0&portrait=0",
    },
    
    {
      title: "color-grade",
      isLocal: false,
      embedUrl: "https://player.vimeo.com/video/1160454900?title=0&byline=0&portrait=0",
    },
  ],
  []
);

  // ====== REVIEWS (4) ======
  const reviews = useMemo(
    () => [
      
      
      
      {
        quote:
          "Color work was on point and the audio polish made a huge difference. Super professional, open to revisions, and consistently delivers a final product that feels cinematic.",
        name: "Olivia M.",
        title: "Brand Marketing Lead",
      },
    ],
    []
  );

  // ====== WORKFLOW (hover + tap) ======
  const workflowItems = useMemo(
    () => [
      {
        key: "plan",
        label: "PLAN",
        body: `To ensure we’re all aligned in expectations and creative direction, I’ll have you or your client fill out a Google Form with everything I’ll need to know as the editor to achieve the greatest result with as few revisions as possible.

You can do this on your own time or we can go over it together on a call.

Before beginning the edit, you will upload all footage and content necessary for the edit and you will be invoiced through Stripe.`,
      },
      {
        key: "edit",
        label: "EDIT",
        body: `I’ll create a cinematic edit based on your needs, goals, and vision.

This will include selecting, sequencing, and color grading clips, enhancing raw audio, and adding music, sound design, transitions, effects, brand graphics, and text as needed.`,
      },
      {
        key: "revise",
        label: "REVISE",
        body: `The deliverables will be uploaded to Frame.io where time-stamped comments can be added for any requested changes to achieve your vision. The final version will be delivered with a download option.

Two rounds of revisions are included in my rates.`,
      },
    ],
    []
  );

  const [workflowActive, setWorkflowActive] = useState<string | null>(null);

  // ====== NAV ======
  const navItems = useMemo(
    () => [
      { label: "Videos", href: "#videos" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#Contact" },
    ],
    []
  );

  // ====== TYPEWRITER (type name -> delete -> type role) ======
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typingFirst" | "deletingFirst" | "typingSecond">(
    "typingFirst"
  );

  // ====== ABOUT TAB SWITCHER (skills | gear) ======
  const [aboutTab, setAboutTab] = useState<"skills" | "gear">("skills");

  // ====== CALENDLY MODAL ======
  const [calOpen, setCalOpen] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "typingFirst") {
      if (text.length < firstText.length) {
        timeout = setTimeout(() => setText(firstText.slice(0, text.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setPhase("deletingFirst"), 500);
      }
    } else if (phase === "deletingFirst") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText((prev) => prev.slice(0, -1)), 45);
      } else {
        setPhase("typingSecond");
      }
    } else if (phase === "typingSecond") {
      if (text.length < secondText.length) {
        timeout = setTimeout(() => setText(secondText.slice(0, text.length + 1)), 70);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, firstText, secondText]);

  // Close modal on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    if (!calOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [calOpen]);

  const cursorHidden = phase === "typingSecond" && text.length === secondText.length;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <span className="text-sm font-black tracking-tight">
              <span style={{ color: accent }}>R</span>A
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-200 hover:text-white transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <SocialIcon
              label="Instagram"
              href={socials.instagram}
              icon={
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z" />
                  <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                  <path d="M17.25 6.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                </svg>
              }
            />
           <SocialIcon
  label="TikTok"
  href={socials.tiktok}
  icon={
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M9 3v10.5a3.5 3.5 0 1 1-3-3.465V7.5a6 6 0 1 0 6 6V9.09a8.002 8.002 0 0 0 4 1.16V7.25a4.001 4.001 0 0 1-4-4V3H9z"/>
    </svg>
  }
/>
            <SocialIcon
              label="X"
              href={socials.x}
              icon={
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.6L5.3 22H2l7.3-8.4L1 2h6.9l4.7 6L18.9 2zm-1.2 18h1.9L6.8 3.9H4.7L17.7 20z" />
                </svg>
              }
            />
            <SocialIcon
              label="WhatsApp"
              href={socials.whatsapp}
              icon={
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M20.52 3.48A11.77 11.77 0 0012.03 0C5.44 0 .08 5.36.08 11.95c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.9 11.9 0 005.78 1.47h.01c6.59 0 11.95-5.36 11.95-11.95 0-3.19-1.24-6.18-3.47-8.4zM12.04 21.8h-.01a9.9 9.9 0 01-5.05-1.38l-.36-.21-3.71.97.99-3.62-.23-.37a9.88 9.88 0 01-1.52-5.25c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.15 1.03 7.03 2.9a9.86 9.86 0 012.91 7.02c0 5.47-4.45 9.92-9.97 9.92zm5.76-7.37c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.22-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.22-.32.32-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.79-1.02-2.45-.27-.65-.54-.56-.74-.57h-.63c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.3 3.52 5.58 4.94.78.34 1.39.54 1.87.69.79.25 1.5.22 2.07.13.63-.09 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.13-.3-.21-.62-.37z" />
                </svg>
              }
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16 pt-14">
        {/* Hero */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: accent }}>
              Hello, I&apos;m
            </p>

            <h1 className="mt-2 text-5xl sm:text-7xl font-black tracking-tight">
              {text}
              <span className={`${cursorHidden ? "opacity-0" : "opacity-40"}`}>|</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-neutral-300">
              I help creators turn raw footage into premium high retention content for youtube, instagram and tiktok.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#videos"
                className="rounded-full px-6 py-3 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.03] active:scale-[0.98]"
                style={{ backgroundColor: accent }}
              >
                View My Work
              </a>

              <a
                href="#contact"
                className="rounded-full px-6 py-3 text-sm font-semibold ring-2 ring-white/20 hover:ring-white/40 transition"
              >
               Start a Project
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-full blur-2xl opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(198,134,66,0.55), rgba(0,0,0,0))",
                }}
              />
              <div className="relative h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] overflow-hidden rounded-full ring-4 ring-white/10">
                <Image src="/me.jpg" alt="Portrait" fill className="object-cover" priority />
              </div>
              <div
                className="pointer-events-none absolute -inset-1 rounded-full ring-2"
                style={{ borderColor: accent, borderWidth: 3 }}
              />
            </div>
          </div>
        </div>

       

        {/* Video Portfolio */}
        <section id="videos" className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Video <span style={{ color: accent }}>Edits</span>
            </h2>
          </div>

          <p className="mt-4 max-w-2xl text-neutral-300 leading-relaxed">
            Here are some recent videos i&apos;ve edited.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {videos.map((v, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="relative aspect-video">
                  {v.isLocal ? (
                    <video
                      className="absolute inset-0 h-full w-full"
                      src={v.src}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={v.embedUrl}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <p className="text-sm font-semibold text-neutral-200">{v.title}</p>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Play className="h-4 w-4" />
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rates */}
        <section id="rates" className="mt-28">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
           

              

              <p className="mt-1 text-sm text-neutral-400">
               
              </p>

              <div className="mt-10 space-y-4 text-sm">
                

               
              </div>
            </div>

            <div>
             

              <ul className="mt-8 space-y-3 text-sm text-neutral-300">
                
              </ul>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                About <span style={{ color: accent }}>Me</span>
              </h2>

              <p className="mt-6 max-w-xl text-neutral-300 leading-relaxed">
                I’m Richie Jr, a Video editor and multi-faceted creator.
                <br />
                <br />
                I have a passion for transforming raw footage into
                visually compelling and emotionally resonant stories through intuitive pacing,
                cinematic color grading, and immersive sound design. Are you looking for an
                experienced, creative video editor? Let’s connect and create something unforgettable.
              </p>

              <div className="mt-10 border-b border-white/10">
                <div className="flex items-center gap-8">
                  <button
                    type="button"
                    onClick={() => setAboutTab("skills")}
                    className="pb-3 text-sm font-semibold tracking-wide transition"
                    style={{ color: aboutTab === "skills" ? accent : undefined }}
                  >
                    SKILLS
                    <div
                      className="mt-3 h-[2px] w-full"
                      style={{
                        backgroundColor: aboutTab === "skills" ? accent : "transparent",
                      }}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setAboutTab("gear")}
                    className="pb-3 text-sm font-semibold tracking-wide transition"
                    style={{ color: aboutTab === "gear" ? accent : undefined }}
                  >
                    GEAR & TECH
                    <div
                      className="mt-3 h-[2px] w-full"
                      style={{
                        backgroundColor: aboutTab === "gear" ? accent : "transparent",
                      }}
                    />
                  </button>
                </div>
              </div>

              {aboutTab === "skills" ? (
                <ul className="mt-6 grid grid-cols-2 gap-y-2 text-neutral-200">
                  <li>CapCut</li>
                  <li>Adobe Premiere Pro</li>
                  <li>DaVinci Resolve</li>
                  <li>Color Grading</li>
                  <li>Sound Design</li>
                </ul>
              ) : (
                <div className="mt-6 space-y-4">
                  {/* COMPUTER */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold tracking-[0.25em] text-neutral-300">
                      COMPUTER
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                      <li>
                        <span className="text-neutral-400">Computer:</span> MacBook Pro (2019)
                      </li>
                      <li>
                        <span className="text-neutral-400">Processor:</span> 2.8 GHz Quad-Core Intel
                        Core i7
                      </li>
                      <li>
                        <span className="text-neutral-400">Memory:</span> 16 GB 2133 MHz LPDDR3
                      </li>
                      <li>
                        <span className="text-neutral-400">Graphics:</span> Intel Iris Plus Graphics
                        655 (1536 MB)
                      </li>
                      <li>
                        <span className="text-neutral-400">Display:</span> 13.3-inch Retina (2560 ×
                        1600)
                      </li>
                      <li>
                        <span className="text-neutral-400">OS:</span> macOS Sequoia 15.7.3
                      </li>
                    </ul>
                  </div>

                  {/* VIDEO EDITING SOFTWARE */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold tracking-[0.25em] text-neutral-300">
                      VIDEO EDITING SOFTWARE
                    </p>
                    <ul className="mt-4 grid grid-cols-1 gap-y-2 text-sm text-neutral-200">
                      <li>DaVinci Resolve Studio 20.3</li>
                      <li>CapCut Pro</li>
                    </ul>
                  </div>

                  {/* MUSIC & SOUND DESIGN */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold tracking-[0.25em] text-neutral-300">
                      MUSIC & SOUND DESIGN
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                      <li>Musicbed</li>
                      <li>Splice Creator</li>
                     
                    </ul>
                  </div>

                 

                  {/* FILE SHARING */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold tracking-[0.25em] text-neutral-300">
                      FILE SHARING
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                     
                      <li>Google Drive — 2 TB</li>
                     
                    </ul>
                  </div>

                

                  {/* PROJECT MANAGEMENT */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold tracking-[0.25em] text-neutral-300">
                      PROJECT MANAGEMENT
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                      <li>Google Calendar</li>
                    
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div id="experience">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              
              </h2>

             
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 border-t border-white/10">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Let&apos;s <span style={{ color: accent }}>Connect</span>
              </h2>

              <p className="mt-5 max-w-xl text-neutral-300 leading-relaxed">
                I&apos;m currently open to new opportunities and collaborations. If you have a project
                in mind, a question, or simply want to connect, feel free to reach out.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <SocialCircle
                  label="Instagram"
                  href={socials.instagram}
                  icon={
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z" />
                      <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                      <path d="M17.25 6.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                    </svg>
                  }
                />
                <SocialIcon
  label="TikTok"
  href={socials.tiktok}
  icon={
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M9 3v10.5a3.5 3.5 0 1 1-3-3.465V7.5a6 6 0 1 0 6 6V9.09a8.002 8.002 0 0 0 4 1.16V7.25a4.001 4.001 0 0 1-4-4V3H9z"/>
    </svg>
  }
/>
                <SocialCircle
                  label="X"
                  href={socials.x}
                  icon={
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.6L5.3 22H2l7.3-8.4L1 2h6.9l4.7 6L18.9 2zm-1.2 18h1.9L6.8 3.9H4.7L17.7 20z" />
                    </svg>
                  }
                />
                <SocialCircle
                  label="WhatsApp"
                  href={socials.whatsapp}
                  icon={
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <path d="M20.52 3.48A11.77 11.77 0 0012.03 0C5.44 0 .08 5.36.08 11.95c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.9 11.9 0 005.78 1.47h.01c6.59 0 11.95-5.36 11.95-11.95 0-3.19-1.24-6.18-3.47-8.4zM12.04 21.8h-.01a9.9 9.9 0 01-5.05-1.38l-.36-.21-3.71.97.99-3.62-.23-.37a9.88 9.88 0 01-1.52-5.25c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.15 1.03 7.03 2.9a9.86 9.86 0 012.91 7.02c0 5.47-4.45 9.92-9.97 9.92zm5.76-7.37c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.22-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.22-.32.32-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.79-1.02-2.45-.27-.65-.54-.56-.74-.57h-.63c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.3 3.52 5.58 4.94.78.34 1.39.54 1.87.69.79.25 1.5.22 2.07.13.63-.09 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.13-.3-.21-.62-.37z" />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Calendly card (modal + iframe) */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-neutral-200">Book a 30-min call</p>
                  <p className="mt-2 text-sm text-neutral-400">
                    Click below to schedule a session. 
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCalOpen(true)}
                  className="w-full rounded-xl py-3 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  style={{ backgroundColor: accent }}
                >
                  Schedule with Calendly
                </button>

                {/* Always-working fallback */}
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center text-sm text-neutral-300 underline underline-offset-4 hover:text-white"
                >
                  Or open in a new tab
                </a>
              </div>
            </div>
          </div>

          {/* WORKFLOW (AFTER "LET'S CONNECT") */}
          <section className="mt-20">
            <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
              <div className="text-center">
                <p className="text-sm italic tracking-wide text-neutral-300">workflow</p>
                <div className="mx-auto mt-6 h-px w-2/3 bg-white/15" />
              </div>

              <div className="mt-8 divide-y divide-white/15">
                {workflowItems.map((item) => (
                  <WorkflowRow
                    key={item.key}
                    label={item.label}
                    active={workflowActive === item.key}
                    onEnter={() => setWorkflowActive(item.key)}
                    onLeave={() => setWorkflowActive(null)}
                    onToggle={() =>
                      setWorkflowActive((prev) => (prev === item.key ? null : item.key))
                    }
                    body={item.body}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Reviews (END) */}
          <section id="reviews" className="mt-24 border-t border-white/10 pt-16">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Client <span style={{ color: accent }}>Review</span>
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {reviews.map((r, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-7">
                  <blockquote className="text-lg sm:text-xl leading-relaxed text-neutral-100">
                    <span className="opacity-90">“</span>
                    <span className="text-neutral-200">{r.quote}</span>
                    <span className="opacity-90">”</span>
                  </blockquote>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm">
                      <p className="font-semibold text-neutral-100">{r.name}</p>
                      <p className="text-neutral-400">{r.title}</p>
                    </div>

                    <div
                      className="h-10 w-10 rounded-full ring-1 ring-white/10"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(198,134,66,0.35), rgba(255,255,255,0.02))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-16 border-t border-white/10 pt-10 flex items-center justify-between text-sm text-neutral-400">
            <div className="font-semibold">
              <span style={{ color: accent }}>R</span>A
            </div>
      
          </footer>
        </section>
      </main>

      {/* Calendly Modal */}
      {calOpen && (
        <div
          className="fixed inset-0 z-[9999] grid place-items-center bg-black/70 p-4"
          onMouseDown={() => setCalOpen(false)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold text-neutral-100">Schedule a call</p>
              <button
                type="button"
                onClick={() => setCalOpen(false)}
                className="rounded-lg px-3 py-1 text-sm text-neutral-300 hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="relative h-[70vh] w-full">
              <iframe
                src={`${calendlyUrl}?hide_landing_page_details=1&hide_gdpr_banner=1`}
                className="absolute inset-0 h-full w-full"
                frameBorder="0"
                title="Calendly Scheduling"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <p className="text-4xl sm:text-5xl font-black tracking-tight">{number}</p>
        <p className="mt-1 text-sm text-neutral-300">{label}</p>
      </div>
    </div>
  );
}

function RateRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <span className="text-neutral-300">{label}</span>
      <span className="text-neutral-200 font-medium">{value}</span>
    </div>
  );
}

function WorkflowRow({
  label,
  body,
  active,
  onEnter,
  onLeave,
  onToggle,
}: {
  label: string;
  body: string;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  return (
    <div className="py-5" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={active}
      >
        <span className="text-sm font-semibold tracking-[0.25em] text-neutral-100">
          {label}
        </span>
        <span className="text-neutral-300 text-xl leading-none select-none">+</span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          active ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-neutral-300 whitespace-pre-line">{body}</p>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-neutral-200 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition"
      target="_blank"
      rel="noreferrer"
    >
      {icon}
    </a>
  );
}

function SocialCircle({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-neutral-100 hover:bg-white/10 hover:shadow-[0_0_0_6px_rgba(255,255,255,0.03)] transition"
    >
      <span className="text-neutral-100">{icon}</span>
    </a>
  );
}

function ExperienceItem({
  role,
  company,
  type,
  period,
}: {
  role: string;
  company: string;
  type: string;
  period: string;
}) {
  return (
    <div className="flex items-start justify-between border-b border-white/10 pb-4">
      <div>
        <p className="font-semibold text-neutral-100">{role}</p>
        <p className="text-sm text-neutral-400">{company}</p>
      </div>

      <div className="text-right">
        <p className="text-sm text-neutral-300">{type}</p>
        <p className="text-xs text-neutral-500">{period}</p>
      </div>
    </div>
  );
}
