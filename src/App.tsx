import { FormEvent, MouseEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Lenis from "lenis";

type Project = {
  title: string;
  label: string;
  description: string;
  image?: string;
  technologies: string[];
  role: string;
  live?: string;
  gameUrl?: string;
  gameTheme?: "serene" | "neon" | "shadow" | "cat";
};

const projects: Project[] = [
  {
    title: "Serene Waters",
    label: "Cozy fishing adventure",
    description:
      "Set sail across a peaceful archipelago, discover new fish, and help restore the natural balance of its lakes and coastlines.",
    technologies: ["Phaser 3", "JavaScript", "Howler.js"],
    role: "Fishing & Boat Adventure",
    gameUrl: "/games/serene-waters.html",
    gameTheme: "serene",
  },
  {
    title: "Neon Dash",
    label: "Interactive arcade game",
    description:
      "A three-lane reflex challenge set in an industrial cyber world. Dodge hazards, read the rhythm, and push your run as far as you can.",
    technologies: ["HTML5 Canvas", "Web Audio API", "TypeScript"],
    role: "Endless Runner",
    gameUrl: "/games/neon-dash.html",
    gameTheme: "neon",
  },
  {
    title: "Street Fighting",
    label: "1v1 action fighter",
    description:
      "An arcade fighting game inspired by classic versus fighters, with punchy hit-stop, responsive controls, and a smooth interface.",
    technologies: ["HTML5 Canvas", "Physics Engine", "Web Audio API"],
    role: "Fighting 1v1",
    gameUrl: "/games/shadow-strike.html",
    gameTheme: "shadow",
  },
  {
    title: "My Little Cat",
    label: "Cozy cat life simulator",
    description:
      "Welcome to Mochi's little world: care for him, play together, and help him feel at home in a warm, detailed bedroom.",
    technologies: ["Three.js", "JavaScript", "WebGL"],
    role: "3D Cat Simulator",
    gameUrl: "/games/my-little-cat.html",
    gameTheme: "cat",
  },
  {
    title: "Web Profile",
    label: "Brand experience",
    description:
      "A modern digital profile showcasing personal identity, professional capabilities, and an interactive web experience.",
    image: "/portfolio/NewNws.png",
    technologies: ["React", "Motion", "Sanity"],
    role: "Web development",
    live: "https://aryasatyanaryama-id.vercel.app",
  },
  {
    title: "Content Creation",
    label: "Social media",
    description:
      "Creative visual storytelling through cinematic video editing, digital content production, and engaging multimedia experiences.",
    image: "/portfolio/Soviet1.jpg",
    technologies: ["Video editing", "Storytelling", "Social media"],
    role: "Content creation",
  },
  {
    title: "Data Analysis",
    label: "Data visualization",
    description:
      "An interactive data workspace that transforms complex spreadsheets into dynamic, real-time visual insights.",
    image: "/portfolio/Excel1.jpg",
    technologies: ["TypeScript", "Canvas", "Node.js"],
    role: "Data analysis",
  },
];

const skills = [
  {
    group: "Frontend",
    name: "React / Next.js",
    detail: "Modern interfaces shaped around speed, clarity, and human interaction.",
  },
  {
    group: "Language",
    name: "TypeScript",
    detail: "Structured, maintainable foundations for complex web experiences.",
  },
  {
    group: "Creative",
    name: "WebGL / Canvas",
    detail: "Visual systems that add depth, motion, and atmosphere to the web.",
  },
  {
    group: "Motion",
    name: "GSAP / Motion",
    detail: "Purposeful movement that guides attention and strengthens storytelling.",
  },
  {
    group: "Backend",
    name: "Node.js",
    detail: "APIs, architecture, and connected digital platforms.",
  },
  {
    group: "Design",
    name: "Figma",
    detail: "Prototyping, design systems, interface thinking, and art direction.",
  },
  {
    group: "Web",
    name: "HTML · CSS · JavaScript",
    detail: "The core craft behind responsive, accessible, and useful websites.",
  },
  {
    group: "Tools",
    name: "VS Code · Creative Cloud",
    detail: "A practical toolkit for development, editing, and digital production.",
  },
];

const journey = [
  {
    date: "2026 — Now",
    title: "Data Analyst & Web Developer",
    place: "PT Astadeca Baswara Persada",
    text: "Analyzing raw material reports, building the company profile site, and designing a raw material ordering catalog.",
  },
  {
    date: "2025 — Now",
    title: "Undergraduate (S1), Digital Business",
    place: "National University of the Republic of Indonesia",
    text: "Focused on digital transformation, e-commerce strategy, and technology-driven business innovation.",
  },
  {
    date: "2021 — 2024",
    title: "Social Sciences Major",
    place: "State Senior High School 1 Telukjambe Timur",
    text: "Completed upper secondary education with a focus on social sciences.",
  },
];

const navItems = ["home", "about", "skills", "projects", "journey", "contact"];
const HOME_WELCOME_DURATION = 2400;

function Icon({
  name,
  size = 18,
}: {
  name:
    | "arrow"
    | "play"
    | "pause"
    | "volume"
    | "mute"
    | "sliders"
    | "close"
    | "back"
    | "copy"
    | "menu"
    | "smile";
  size?: number;
}) {
  const paths: Record<string, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 19 19 5" />
        <path d="M9 5h10v10" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7V5Z" />,
    pause: (
      <>
        <path d="M9 5v14" />
        <path d="M15 5v14" />
      </>
    ),
    volume: (
      <>
        <path d="M5 9v6h4l5 4V5L9 9H5Z" />
        <path d="M18 9a5 5 0 0 1 0 6" />
      </>
    ),
    mute: (
      <>
        <path d="M5 9v6h4l5 4V5L9 9H5Z" />
        <path d="m18 10 4 4m0-4-4 4" />
      </>
    ),
    sliders: (
      <>
        <path d="M4 6h7m4 0h5M4 12h3m4 0h9M4 18h9m4 0h3" />
        <circle cx="13" cy="6" r="2" />
        <circle cx="9" cy="12" r="2" />
        <circle cx="15" cy="18" r="2" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    back: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="11" height="11" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    menu: (
      <>
        <path d="M4 8h16" />
        <path d="M4 16h16" />
      </>
    ),
    smile: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01M15 9h.01" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Bird({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 72 32" aria-hidden="true">
      <path className="wing wing-left" d="M35 18C24 4 9 3 2 10c13-1 20 7 30 14Z" />
      <path className="wing wing-right" d="M37 18C47 5 61 5 70 12 57 10 50 17 39 24Z" />
      <path className="bird-body" d="M27 19c7-5 16-4 22 1-8 1-13 5-17 10l1-7Z" />
    </svg>
  );
}

function BrandFlames({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-fire ${className}`} aria-hidden="true">
      {Array.from({ length: 11 }, (_, index) => (
        <i key={index} />
      ))}
    </span>
  );
}

function AtmosphericWorld({ entered }: { entered: boolean }) {
  const stars = Array.from({ length: 28 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 72}%`,
    delay: `${(i % 9) * -0.7}s`,
  }));
  return (
    <div className={`world ${entered ? "world-entered" : ""}`} aria-hidden="true">
      <div className="sky" />
      <div className="moon">
        <span />
      </div>
      <div className="stars">
        {stars.map((star, i) => (
          <i key={i} style={star} />
        ))}
      </div>
      <div className="cloud cloud-a" />
      <div className="cloud cloud-b" />
      <div className="light-ray ray-a" />
      <div className="forest" />
      <div className="fog fog-a" />
      <div className="fog fog-b" />
      <div className="forest-glow" />
      <div className="glow-rise">
        {Array.from({ length: 8 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${7 + i * 12}%`,
              height: `${22 + (i % 3) * 9}vh`,
              animationDelay: `${-i * 2.1}s`,
              animationDuration: `${14 + (i % 4) * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="dust">
        {Array.from({ length: 18 }, (_, i) => (
          <i key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="environment-birds">
        {Array.from({ length: 6 }, (_, i) => (
          <div className="environment-bird" key={i}>
            <Bird />
          </div>
        ))}
      </div>
      <div className="foreground" />
    </div>
  );
}

function AtmosphericBackgroundView({ entered }: { entered: boolean }) {
  return createPortal(
    <div className="background-scene" aria-hidden="true">
      <AtmosphericWorld entered={entered} />
      <div className="mobile-clouds">
        <div className="cloud cloud-a" />
        <div className="cloud cloud-b" />
        <div className="fog fog-a" />
        <div className="fog fog-b" />
      </div>
      <div className="horizon-clouds">
        <svg
          className="horizon-cloud horizon-cloud-a"
          viewBox="0 0 720 240"
          focusable="false"
        >
          <defs>
            <linearGradient id="cloud-gradient-a" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#b9c9d0" stopOpacity=".25" />
              <stop offset="42%" stopColor="#7893a0" stopOpacity=".19" />
              <stop offset="76%" stopColor="#537a83" stopOpacity=".1" />
              <stop offset="100%" stopColor="#537a83" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#cloud-gradient-a)"
            d="M82 184c-34 0-58-22-58-51 0-29 24-53 55-53 4-36 35-64 74-64 40 0 69 29 73 67 15-27 43-44 76-44 45 0 79 34 81 78 18-36 53-59 93-59 53 0 96 43 96 96 38-5 72 20 72 48 0 24-22 38-53 38H87c-36 0-58-18-57-39 1-15 20-25 52-17Z"
          />
        </svg>
        <svg
          className="horizon-cloud horizon-cloud-b"
          viewBox="0 0 720 240"
          focusable="false"
        >
          <defs>
            <linearGradient id="cloud-gradient-b" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#d0c0a3" stopOpacity=".2" />
              <stop offset="40%" stopColor="#8c9da0" stopOpacity=".16" />
              <stop offset="78%" stopColor="#527b7d" stopOpacity=".09" />
              <stop offset="100%" stopColor="#527b7d" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#cloud-gradient-b)"
            d="M98 183c-39 0-66-25-66-57 0-29 24-52 57-55 10-39 44-66 83-66 38 0 68 25 76 61 19-24 47-38 78-38 43 0 76 28 83 67 18-28 47-44 82-44 48 0 87 36 90 83 35-9 68 12 68 41 0 29-25 43-58 43H99c-40 0-65-17-65-39 0-17 26-30 64-26Z"
          />
        </svg>
      </div>
    </div>,
    document.body,
  );
}

const AtmosphericBackground = memo(AtmosphericBackgroundView);

const BirdCursor = memo(function BirdCursor() {
  const birdRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const last = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const initialPosition = isCoarsePointer
      ? { x: window.innerWidth * 0.72, y: window.innerHeight * 0.28 }
      : { x: -100, y: -100 };
    target.current = initialPosition;
    current.current = initialPosition;
    last.current = initialPosition;

    let frame = 0;
    let lastFrameTime = performance.now();
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let lastTouchTime = -Infinity;
    let scrollVelocity = 0;

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      target.current = { x: event.clientX, y: event.clientY };
      scheduleFrame();
    };
    const down = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      birdRef.current?.classList.add("cursor-click");
    };
    const up = () => birdRef.current?.classList.remove("cursor-click");
    const over = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const interactive = (event.target as HTMLElement).closest(
        "a,button,input,textarea,[role='button']",
      );
      birdRef.current?.classList.toggle("cursor-hover", Boolean(interactive));
    };
    const touchStart = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      target.current = { x: touch.clientX, y: touch.clientY };
      lastTouchTime = performance.now();
      birdRef.current?.classList.add("cursor-click");
      birdRef.current?.classList.remove("cursor-hover");
      scheduleFrame();
    };
    const touchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      target.current = { x: touch.clientX, y: touch.clientY };
      lastTouchTime = performance.now();
      scheduleFrame();
    };
    const scroll = () => {
      if (!isCoarsePointer) return;

      const now = performance.now();
      const scrollY = window.scrollY;
      const deltaY = scrollY - lastScrollY;
      const elapsed = Math.max(now - lastScrollTime, 16);
      scrollVelocity = Math.max(-3, Math.min(3, deltaY / elapsed));
      lastScrollY = scrollY;
      lastScrollTime = now;

      if (now - lastTouchTime < 900) return;

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? scrollY / scrollableHeight : 0;
      const arc = (Math.sin(progress * Math.PI * 4) + 1) / 2;
      target.current = {
        x: window.innerWidth * (0.22 + arc * 0.56),
        y: window.innerHeight * (0.24 + progress * 0.52),
      };
      scheduleFrame();
    };
    const tick = (now: number) => {
      frame = 0;
      const elapsed = Math.min(Math.max(now - lastFrameTime, 0), 50);
      const smoothing = 1 - Math.pow(0.84, elapsed / (1000 / 60));
      lastFrameTime = now;
      current.current.x += (target.current.x - current.current.x) * smoothing;
      current.current.y +=
        (target.current.y - scrollVelocity * 12 - current.current.y) * smoothing;
      const dx = current.current.x - last.current.x;
      const dy = current.current.y - last.current.y;
      const angle = Math.atan2(dy, Math.abs(dx)) * (180 / Math.PI);
      if (birdRef.current) {
        birdRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) rotate(${angle * 0.35}deg) scaleX(${dx < -0.2 ? -1 : 1})`;
        birdRef.current.style.setProperty("--speed", `${Math.min(Math.hypot(dx, dy), 18)}`);
      }
      last.current = { ...current.current };
      scrollVelocity *= Math.pow(0.9, elapsed / (1000 / 60));
      if (
        Math.abs(target.current.x - current.current.x) > 0.1 ||
        Math.abs(target.current.y - current.current.y) > 0.1 ||
        Math.abs(scrollVelocity) > 0.01
      ) {
        scheduleFrame();
      }
    };
    const scheduleFrame = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointerover", over);
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("touchend", up);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    scroll();
    scheduleFrame();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", up);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, []);

  return (
    <div ref={birdRef} className="bird-cursor">
      <span className="cursor-aura" />
      <Bird />
      <i />
      <i />
      <i />
    </div>
  );
});

function Intro({
  onEnter,
  onSkip,
}: {
  onEnter: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="intro" role="dialog" aria-label="Enter portfolio experience">
      <div className="intro-orbit orbit-one" />
      <div className="intro-orbit orbit-two" />
      <div className="intro-birds" aria-hidden="true">
        <div className="intro-bird intro-bird-one">
          <Bird />
        </div>
        <div className="intro-bird intro-bird-two">
          <Bird />
        </div>
      </div>
      <p className="intro-kicker">A digital journey by</p>
      <h1>
        Aryasatya
        <span>Naryama</span>
      </h1>
      <p className="intro-title">Data analyst · Web developer · Creative thinker</p>
      <div className="intro-actions">
        <button className="enter-button magnetic" onClick={onEnter}>
          <BrandFlames className="entrance-fire" />
          <span className="enter-label">Click to enter</span>
          <i />
        </button>
        <button className="skip-button" onClick={onSkip}>
          Welcome..
        </button>
      </div>
      <p className="intro-caption">Enter the unknown</p>
    </div>
  );
}

function EntryLoading({
  welcoming,
  transitioning,
  onComplete,
}: {
  welcoming: boolean;
  transitioning: boolean;
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const isComplete = progress === 100;

  useEffect(() => {
    if (transitioning) return;

    const loadingDuration = 6200;
    let startedAt = 0;
    let frame = 0;
    let completionTimer = 0;

    const updateProgress = (now: number) => {
      if (!startedAt) startedAt = now;
      const nextProgress = Math.min(100, Math.floor(((now - startedAt) / loadingDuration) * 100));
      setProgress(nextProgress);

      if (nextProgress === 100) {
        completionTimer = window.setTimeout(onComplete, 900);
      } else {
        frame = requestAnimationFrame(updateProgress);
      }
    };

    frame = requestAnimationFrame(updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(completionTimer);
    };
  }, [onComplete, transitioning]);

  return (
    <div
      className={`entry-loading${isComplete ? " is-complete" : ""}${welcoming ? " is-welcoming" : ""}${transitioning ? " is-arriving" : ""}`}
    >
      <div className="entry-loading-content">
        <div className="entry-loading-emblem" aria-hidden="true">
          <div className="entry-loading-orbit orbit-one">
            <Bird className="entry-loading-bird" />
          </div>
          <div className="entry-loading-orbit orbit-two">
            <Bird className="entry-loading-bird" />
          </div>
          <div className="entry-loading-orbit orbit-three">
            <Bird className="entry-loading-bird" />
          </div>
          <div className="entry-loading-smile">
            <Icon name="smile" size={38} />
          </div>
        </div>
        <p className="entry-loading-kicker">A digital journey by</p>
        <h2 className="entry-loading-title">
          {isComplete ? "Journey ready" : "Welcome to my Journey"}
        </h2>
        <div
          className="entry-loading-progress"
          role="progressbar"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="entry-loading-percent">{progress}%</p>
        <span className="sr-only" aria-live="polite">
          {isComplete ? "Portfolio ready" : ""}
        </span>
      </div>
      <Bird className="entry-loading-arrival-bird arrival-one" />
      <Bird className="entry-loading-arrival-bird arrival-two" />
    </div>
  );
}

function HomeWelcomeFlight() {
  return (
    <div className="home-welcome-flight" aria-hidden="true">
      <Bird className="home-welcome-bird bird-one" />
      <Bird className="home-welcome-bird bird-two" />
    </div>
  );
}

function MusicPlayer({
  audioRef,
  musicOn,
  musicPending,
  setMusicOn,
  sfxOn,
  setSfxOn,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  musicOn: boolean;
  musicPending: boolean;
  setMusicOn: (value: boolean) => void;
  sfxOn: boolean;
  setSfxOn: (value: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = muted;
  }, [audioRef, volume, muted]);

  return (
    <aside className={`music-player ${expanded ? "expanded" : ""}`}>
      <audio ref={audioRef} src="/Dont.mp3?v=3" loop preload="none" />
      <button
        className="music-main"
        aria-label={musicOn || musicPending ? "Pause ambient music" : "Play ambient music"}
        aria-pressed={musicOn}
        onClick={() => setMusicOn(!(musicOn || musicPending))}
      >
        <span className={`waveform ${musicOn ? "playing" : ""}`}>
          {Array.from({ length: 6 }, (_, i) => (
            <i key={i} />
          ))}
        </span>
        <Icon name={musicOn || musicPending ? "pause" : "play"} size={14} />
      </button>
      <div className="track-info">
        <span>Atmosphere</span>
        <strong>VIBES</strong>
      </div>
      <button
        className={`music-settings-toggle ${expanded ? "active" : ""}`}
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? "Hide sound settings" : "Show sound settings"}
        aria-expanded={expanded}
        aria-controls="music-settings"
      >
        <Icon name="sliders" size={15} />
      </button>
      <div
        id="music-settings"
        className="music-extra"
        aria-hidden={!expanded}
        inert={!expanded}
      >
        <button
          className="icon-button"
          onClick={() => setMuted(!muted)}
          aria-label={muted ? "Unmute music" : "Mute music"}
        >
          <Icon name={muted ? "mute" : "volume"} size={15} />
        </button>
        <label className="music-volume-control">
          <span className="sr-only">Music volume</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            aria-valuetext={`${Math.round(volume * 100)}%`}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
          <span className="music-volume-value">{Math.round(volume * 100)}%</span>
        </label>
        <button
          className={`sfx-toggle ${sfxOn ? "active" : ""}`}
          onClick={() => setSfxOn(!sfxOn)}
          aria-pressed={sfxOn}
        >
          SFX {sfxOn ? "ON" : "OFF"}
        </button>
      </div>
    </aside>
  );
}

function ProjectModal({
  project,
  onClose,
  onPlayGame,
}: {
  project: Project;
  onClose: () => void;
  onPlayGame: (url: string) => void;
}) {
  const gameUrl = project.gameUrl;

  useEffect(() => {
    const key = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", key);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", key);
    };
  }, [onClose]);
  return (
    <div
      className={`modal-backdrop${project.gameTheme ? ` modal-backdrop-game modal-backdrop-game-${project.gameTheme}` : ""}`}
      role="presentation"
      onMouseDown={onClose}
    >
      <article
        className={`project-modal${project.gameTheme ? ` project-modal-game project-modal-game-${project.gameTheme}` : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close project details">
          <Icon name="close" />
        </button>
        <div className="modal-visual">
          {project.gameTheme ? (
            <GameArtwork project={project} />
          ) : (
            <img src={project.image} alt={`${project.title} project preview`} />
          )}
        </div>
        <div className="modal-copy">
          <p className="eyebrow">{project.label}</p>
          <h2 id="project-title">{project.title}</h2>
          {project.gameUrl && (
            <p className={`game-ready-status game-ready-status-${project.gameTheme}`}>
              <i />
              Ready to play // System armed
            </p>
          )}
          <p className="modal-lead">{project.description}</p>
          <div className="modal-facts">
            <div>
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>
            <div>
              <span>{project.gameUrl ? "Developer" : "Technology"}</span>
              <strong>
                {project.gameUrl ? "Aryasatya Naryama" : project.technologies.join(" · ")}
              </strong>
            </div>
          </div>
          {!project.gameUrl && (
            <p className="verified-note">
              This overview reflects the information available in the original portfolio.
            </p>
          )}
          {gameUrl ? (
            <button
              type="button"
              onClick={() => onPlayGame(gameUrl)}
              className="game-start-button"
              data-game={project.gameTheme}
            >
              Start Arya's Game <Icon name="arrow" size={14} />
            </button>
          ) : project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" className="text-link">
              Visit live project <Icon name="arrow" size={14} />
            </a>
          ) : null}
        </div>
      </article>
    </div>
  );
}

function GameOverlay({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  const gamePath = new URL(url, window.location.href).pathname;
  const isNeonDashGame = gamePath.endsWith("/games/neon-dash.html");
  const isStreetFightingGame = gamePath.endsWith("/games/shadow-strike.html");
  const isMyLittleCatGame = gamePath.endsWith("/games/my-little-cat.html");
  const isSereneWatersGame = gamePath.endsWith("/games/serene-waters.html");
  const gameFrameRef = useRef<HTMLIFrameElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    document.body.classList.add("game-open");
    document.documentElement.classList.add("game-playing");
    const handleGameMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== gameFrameRef.current?.contentWindow ||
        event.data?.type !== "portfolio:return-from-game"
      ) {
        return;
      }
      onCloseRef.current();
    };
    window.addEventListener("message", handleGameMessage);
    return () => {
      window.removeEventListener("message", handleGameMessage);
      document.body.classList.remove("game-open");
      document.documentElement.classList.remove("game-playing");
    };
  }, []);

  const overlayClasses = [
    "game-overlay",
    isNeonDashGame && "game-overlay-neon",
    isStreetFightingGame && "game-overlay-fighter",
    isMyLittleCatGame && "game-overlay-cat",
    isSereneWatersGame && "game-overlay-serene",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={overlayClasses}
      role="dialog"
      aria-modal="true"
      aria-label="Game player"
    >
      <button
        className="game-overlay-close"
        onClick={onClose}
        aria-label="Return to portfolio"
      >
        <Icon name="back" />
      </button>
      <iframe
        ref={gameFrameRef}
        src={url}
        title="Interactive portfolio game"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}

function GameArtwork({ project }: { project: Project }) {
  const isNeon = project.gameTheme === "neon";
  const isSerene = project.gameTheme === "serene";
  const isCat = project.gameTheme === "cat";

  return (
    <div className={`game-artwork game-artwork-${project.gameTheme}`} aria-hidden="true">
      <span className="game-art-topline">
        ARYA GAMES // {isSerene ? "VOYAGE 001" : isNeon ? "RUN 001" : isCat ? "ROOM 004" : "ARENA 002"}
      </span>
      {isSerene && (
        <svg
          className="serene-landscape"
          viewBox="0 0 800 500"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <circle cx="602" cy="112" r="52" fill="#f3d89a" opacity=".92" />
          <path d="M0 245 118 150l87 70 124-118 146 141 97-91 132 102v116H0Z" fill="#6c9275" />
          <path d="m0 275 154-93 99 68 151-101 144 119 112-66 140 74v119H0Z" fill="#375f50" />
          <path d="M0 282q130 4 235-12t212 6 191-9 162 12v221H0Z" fill="#205d68" />
          <path
            d="M0 340q87-20 177 0t179 0 180 0 180 0 84-3"
            fill="none"
            stroke="#88c4ad"
            strokeWidth="7"
            opacity=".62"
          />
          <path
            d="M0 392q90-18 180 0t180 0 180 0 180 0 80-3"
            fill="none"
            stroke="#68a9a0"
            strokeWidth="5"
            opacity=".72"
          />
          <path
            d="M0 457q110-24 220 0t220 0 220 0 140-4"
            fill="none"
            stroke="#9bd1bd"
            strokeWidth="4"
            opacity=".5"
          />
          <path d="M70 274q85-85 194-45l54 52H70Z" fill="#315744" />
          <path d="M518 273q74-86 179-28l31 36H518Z" fill="#315744" />
          <path d="M605 224v-74l46 74Z" fill="#f7eed9" />
          <path d="M598 225h62l-10 15h-42Z" fill="#6b4c37" />
          <path d="M604 150v84" stroke="#704f39" strokeWidth="5" />
          <path
            d="M120 239v-41m0 16-17-12m17 24 18-14m-18 9 2 21"
            fill="none"
            stroke="#283f35"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="120" cy="186" r="25" fill="#486f50" />
          <circle cx="100" cy="196" r="18" fill="#587c58" />
          <circle cx="139" cy="198" r="19" fill="#3c6348" />
          <path d="M0 486q150-47 292-11t280 2 228-18v41H0Z" fill="#173f45" opacity=".8" />
        </svg>
      )}
      {isCat && (
        <svg
          className="cat-room-art"
          viewBox="0 0 800 500"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <rect width="800" height="500" fill="#806b60" />
          <path d="M0 0h800v285H0Z" fill="#9b8170" />
          <path d="M0 285h800v215H0Z" fill="#705b50" />
          <path d="M0 278h800v13H0Z" fill="#c4a489" />
          <path d="M0 292h800v5H0Z" fill="#4d403b" opacity=".45" />
          <rect x="548" y="58" width="184" height="164" rx="3" fill="#4b403c" />
          <rect x="558" y="68" width="164" height="144" fill="#36515a" />
          <path d="M558 165q43-48 83-12t81-9v68H558Z" fill="#647b6c" />
          <path d="M558 183q48-34 91-4t73-11v44H558Z" fill="#91a081" opacity=".82" />
          <path d="M638 68v144m-80-73h164" stroke="#d4b99e" strokeWidth="7" />
          <circle cx="690" cy="94" r="13" fill="#e9cf9f" opacity=".9" />
          <path d="M0 418h800m-800 36h800m-650-157v203m170-203v203m170-203v203m170-203v203" stroke="#a38770" strokeWidth="3" opacity=".36" />
          <path d="M76 285v-72m0 26-23-18m23 35 25-21m-25 34 3 21" fill="none" stroke="#584c3d" strokeWidth="8" strokeLinecap="round" />
          <circle cx="76" cy="199" r="29" fill="#63735b" />
          <circle cx="53" cy="211" r="19" fill="#7e8b67" />
          <circle cx="99" cy="211" r="20" fill="#758461" />
          <path d="M211 333h465v106H211Z" fill="#58473f" />
          <path d="M190 306q18-20 41 0h431q24-18 46 2l-17 108H202Z" fill="#e2cdb2" />
          <path d="M202 357q196-32 488 0v55H202Z" fill="#bf9574" />
          <path d="M226 304q80-38 155 2v53H226Z" fill="#f3e5d1" />
          <path d="M235 310q68-28 137 1" fill="none" stroke="#d8c2a8" strokeWidth="5" />
          <g transform="translate(110 0)">
            <ellipse cx="535" cy="311" rx="84" ry="37" fill="#d77d3f" />
            <ellipse cx="562" cy="301" rx="54" ry="34" fill="#e18c4c" />
            <path d="M481 319q-31 34-57 9t-4-34" fill="none" stroke="#d77d3f" strokeWidth="17" strokeLinecap="round" />
            <path d="m469 287 3-35 28 24m39 1 24-27 4 41" fill="#df8747" stroke="#b96334" strokeWidth="4" strokeLinejoin="round" />
            <ellipse cx="501" cy="288" rx="5" ry="7" fill="#473a34" />
            <ellipse cx="535" cy="288" rx="5" ry="7" fill="#473a34" />
            <path d="M512 302q6 5 12 0m-6 0v6m0 0q-7 8-14 1m14-1q7 8 14 1" fill="none" stroke="#744b3b" strokeWidth="3" strokeLinecap="round" />
            <path d="M454 370h19m22 2h19" stroke="#f0c69e" strokeWidth="11" strokeLinecap="round" />
          </g>
          <path d="M0 494q190-22 360 0t440 0v6H0Z" fill="#d5aa78" opacity=".65" />
        </svg>
      )}
      <div className="game-art-center">
        <span>
          {isSerene
            ? "SAIL // DISCOVER // RESTORE"
            : isNeon
              ? "RUN // SURVIVE"
              : isCat
                ? "CARE // PLAY // REST"
                : "FIGHT // ADAPT"}
        </span>
        <strong>
          {isSerene ? (
            <>
              SERENE
              <br />
              WATERS
            </>
          ) : isNeon ? (
            <>
              NEON
              <br />
              DASH
            </>
          ) : isCat ? (
            <>
              MY LITTLE
              <br />
              CAT
            </>
          ) : (
            <>
              STREET
              <br />
              FIGHTING
            </>
          )}
        </strong>
        <i>
          {isSerene
            ? "A QUIETER KIND OF ADVENTURE."
            : isNeon
              ? "THREE LANES. ONE CHANCE."
              : isCat
                ? "MOCHI'S ROOM IS YOURS TO EXPLORE."
                : "ENTER THE ARENA."}
        </i>
      </div>
      <span className="game-art-bottom">
        {isSerene
          ? "NATURE AWAITS"
          : isNeon
            ? "PROTOCOL ACTIVE"
            : isCat
              ? "MOCHI'S ROOM"
              : "SYSTEM ARMED"}{" "}
        <b>{isCat ? "MEET MOCHI ↗" : "PLAY NOW ↗"}</b>
      </span>
    </div>
  );
}

function PerformanceHud() {
  const [fps, setFps] = useState<number | null>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse), (max-width: 680px)").matches
    ) {
      return;
    }

    let frame = 0;
    let frames = 0;
    let intervalStart = performance.now();

    const measure = (now: number) => {
      frame = 0;
      if (document.visibilityState === "hidden") return;

      frames += 1;
      const elapsed = now - intervalStart;
      if (elapsed >= 500) {
        setFps(Math.round((frames * 1000) / elapsed));
        frames = 0;
        intervalStart = now;
      }
      frame = requestAnimationFrame(measure);
    };
    const syncVisibility = () => {
      if (document.visibilityState === "hidden") {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else if (!frame) {
        frames = 0;
        intervalStart = performance.now();
        frame = requestAnimationFrame(measure);
      }
    };

    document.addEventListener("visibilitychange", syncVisibility);
    syncVisibility();
    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <output
      className={`performance-hud${fps !== null && fps < 50 ? " is-low" : ""}`}
      aria-label={`Current frame rate: ${fps ?? "measuring"} frames per second`}
      aria-live="off"
    >
      <i />
      <span>{fps ?? "--"}</span>
      <small>FPS</small>
    </output>
  );
}

export default function App() {
  const returningToProjects =
    typeof window !== "undefined" && window.location.hash === "#projects";
  const [entered, setEntered] = useState(returningToProjects);
  const [introVisible, setIntroVisible] = useState(!returningToProjects);
  const [entryLoading, setEntryLoading] = useState(false);
  const [entryWelcome, setEntryWelcome] = useState(false);
  const [entryTransition, setEntryTransition] = useState(false);
  const [homeWelcome, setHomeWelcome] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [playingGameUrl, setPlayingGameUrl] = useState<string | null>(null);
  const [musicOn, setMusicOnState] = useState(false);
  const [musicPending, setMusicPending] = useState(false);
  const [sfxOn, setSfxOn] = useState(true);
  const [toast, setToast] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const sfxAudioRef = useRef<HTMLAudioElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollProgressRef = useRef<HTMLSpanElement>(null);
  const gameModalTimeoutRef = useRef<number | null>(null);
  const musicRequestRef = useRef(0);
  const navigationTargetRef = useRef<string | null>(null);
  const navigationScrollTimeoutRef = useRef<number | null>(null);

  const completeEntryLoading = useCallback(() => {
    setEntryTransition(true);
    setHomeWelcome(true);
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]').forEach((icon) => {
      icon.href = "/an-mark.svg";
      icon.type = "image/svg+xml";
    });
  }, []);

  useEffect(() => {
    const stopMusic = () => {
      musicRequestRef.current += 1;
      audioRef.current?.pause();
      setMusicOnState(false);
      setMusicPending(false);
    };
    const syncVisibility = () => {
      const isHidden = document.visibilityState === "hidden";
      document.documentElement.classList.toggle("page-hidden", isHidden);
      if (isHidden) stopMusic();
    };

    document.addEventListener("visibilitychange", syncVisibility);
    window.addEventListener("pagehide", stopMusic);
    syncVisibility();
    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
      window.removeEventListener("pagehide", stopMusic);
      document.documentElement.classList.remove("page-hidden");
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".site-header")) setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!entryTransition) return;

    const timer = window.setTimeout(() => {
      setEntryLoading(false);
      setEntryTransition(false);
      setIntroVisible(false);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [entryTransition]);

  useEffect(() => {
    if (!entryWelcome) return;

    const timer = window.setTimeout(() => setEntryWelcome(false), 1800);
    return () => window.clearTimeout(timer);
  }, [entryWelcome]);

  useEffect(() => {
    if (!homeWelcome) return;

    const timer = window.setTimeout(() => setHomeWelcome(false), HOME_WELCOME_DURATION);
    return () => window.clearTimeout(timer);
  }, [homeWelcome]);

  const playSfx = useCallback(() => {
    if (!sfxOn) return;
    const audio = sfxAudioRef.current;
    if (!audio) {
      console.error("Unable to play Bomb.mp3: audio element is unavailable.");
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch((error: unknown) => {
      console.error("Unable to play Bomb.mp3.", error);
      setToast("Bomb.mp3 could not play. Check browser audio settings.");
      window.setTimeout(() => setToast(""), 4000);
    });
  }, [sfxOn]);

  const handleInteractiveSfx = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) return;
    const control = event.target.closest("button,a");
    if (!control) return;
    playSfx();
  };

  const setMusicOn = async (value: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;
    const requestId = ++musicRequestRef.current;

    if (!value) {
      audio.pause();
      setMusicOnState(false);
      setMusicPending(false);
      return;
    }

    setMusicPending(true);
    try {
      await audio.play();
      if (requestId !== musicRequestRef.current) return;
      setMusicOnState(true);
      setMusicPending(false);
      setToast("");
    } catch (error) {
      if (requestId !== musicRequestRef.current) return;
      setMusicOnState(false);
      setMusicPending(false);
      console.error("Unable to play Dont.mp3.", error);
      setToast("Music could not start. Press play to try again.");
      window.setTimeout(() => setToast(""), 4000);
    }
  };

  const enter = () => {
    if (entryLoading) return;
    setEntryWelcome(true);
    setEntryLoading(true);
    setEntered(true);
  };

  const returnToEntrance = () => {
    void setMusicOn(false);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
    setProject(null);
    setMenuOpen(false);
    setActive("home");
    setEntered(false);
    setEntryLoading(false);
    setEntryWelcome(false);
    setEntryTransition(false);
    setHomeWelcome(false);
    setIntroVisible(true);
  };

  useEffect(() => {
    if (
      window.matchMedia(
        "(pointer: coarse), (max-width: 680px), (prefers-reduced-motion: reduce)",
      ).matches
    ) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (introVisible || project) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [introVisible, project]);

  useEffect(() => {
    let lastFlockScrollY = window.scrollY;
    let flockResetTimer = 0;
    let scrollFrame = 0;
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const updateScroll = () => {
      scrollFrame = 0;
      const root = document.documentElement;
      if (window.scrollY > 32) root.classList.add("page-scrolled");
      else if (window.scrollY < 16) root.classList.remove("page-scrolled");
      root.classList.add("page-scrolling");
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      const scrollDelta = window.scrollY - lastFlockScrollY;
      lastFlockScrollY = window.scrollY;
      scrollProgressRef.current?.style.setProperty(
        "transform",
        `scaleX(${Math.min(1, Math.max(0, progress))})`,
      );
      document.documentElement.style.setProperty(
        "--flock-scroll-y",
        `${Math.max(-24, Math.min(24, -scrollDelta * 0.16))}px`,
      );
      window.clearTimeout(flockResetTimer);
      flockResetTimer = window.setTimeout(
        () => {
          root.style.setProperty("--flock-scroll-y", "0px");
          root.classList.remove("page-scrolling");
        },
        180,
      );
    };
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(updateScroll);
    };
    const updatePointer = () => {
      pointerFrame = 0;
      const { style } = document.documentElement;
      style.setProperty("--mouse-x", `${pointerX}px`);
      style.setProperty("--mouse-y", `${pointerY}px`);
      document.documentElement.style.setProperty(
        "--flock-pointer-x",
        `${(pointerX / window.innerWidth - 0.5) * 34}px`,
      );
      document.documentElement.style.setProperty(
        "--flock-pointer-y",
        `${(pointerY / window.innerHeight - 0.5) * 18}px`,
      );
      document.documentElement.style.setProperty(
        "--parallax-x",
        `${(pointerX / window.innerWidth - 0.5) * 18}px`,
      );
      document.documentElement.style.setProperty(
        "--parallax-y",
        `${(pointerY / window.innerHeight - 0.5) * 12}px`,
      );
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(updatePointer);
    };
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const intersectingSections = entries.filter((entry) => entry.isIntersecting);
        intersectingSections.forEach((entry) => entry.target.classList.add("in-view"));

        const activeLine = window.innerHeight * 0.35;
        const pendingTarget = navigationTargetRef.current
          ? document.getElementById(navigationTargetRef.current)
          : null;
        if (pendingTarget) {
          const bounds = pendingTarget.getBoundingClientRect();
          if (bounds.top > activeLine || bounds.bottom <= activeLine) return;
          navigationTargetRef.current = null;
        }

        const activeSection = Array.from(
          document.querySelectorAll<HTMLElement>("section[id]"),
        ).find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= activeLine && bounds.bottom > activeLine;
        });

        if (activeSection) {
          const sectionId = activeSection.id;
          setActive((current) => (current === sectionId ? current : sectionId));
        }
      },
      { rootMargin: "-35% 0px -50%", threshold: 0.01 },
    );
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        }),
      { rootMargin: "-10% 0px -15%", threshold: 0.01 },
    );
    document.querySelectorAll("section[id]").forEach((section) => sectionObserver.observe(section));
    document.querySelectorAll<HTMLElement>(".reveal").forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
      revealObserver.observe(element);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    onScroll();
    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      window.clearTimeout(flockResetTimer);
      document.documentElement.classList.remove("page-scrolled", "page-scrolling");
      if (navigationScrollTimeoutRef.current !== null) {
        window.clearTimeout(navigationScrollTimeoutRef.current);
      }
      if (gameModalTimeoutRef.current !== null) {
        window.clearTimeout(gameModalTimeoutRef.current);
      }
    };
  }, []);

  const scrollTo = (id: string, targetOverride?: HTMLElement) => {
    const target = targetOverride ?? document.getElementById(id);
    if (target) {
      setActive(id);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (navigationScrollTimeoutRef.current !== null) {
        window.clearTimeout(navigationScrollTimeoutRef.current);
        navigationScrollTimeoutRef.current = null;
      }

      const activeLine = window.innerHeight * 0.35;
      const bounds = target.getBoundingClientRect();
      const targetIsActive = bounds.top <= activeLine && bounds.bottom > activeLine;
      navigationTargetRef.current = targetIsActive ? null : id;
      if (!targetIsActive) {
        navigationScrollTimeoutRef.current = window.setTimeout(
          () => {
            navigationTargetRef.current = null;
            navigationScrollTimeoutRef.current = null;
          },
          prefersReducedMotion ? 250 : 1800,
        );
      }

      if (window.location.hash !== `#${id}`) {
        window.history.pushState(null, "", `#${id}`);
      }
      if (lenisRef.current) {
        lenisRef.current.scrollTo(
          target,
          prefersReducedMotion
            ? { immediate: true, offset: targetOverride ? -100 : 0 }
            : { duration: 1.1, offset: targetOverride ? -100 : 0 },
        );
      } else {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    }
    setMenuOpen(false);
  };

  const openGameProject = (item: Project) => {
    if (gameModalTimeoutRef.current !== null) {
      window.clearTimeout(gameModalTimeoutRef.current);
    }

    const target = item.gameTheme
      ? document.getElementById(`project-${item.gameTheme}`)
      : null;
    if (!target) {
      console.error(`Unable to find the project card for "${item.title}".`);
      return;
    }

    scrollTo("projects", target);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gameModalTimeoutRef.current = window.setTimeout(
      () => {
        setProject(item);
        gameModalTimeoutRef.current = null;
      },
      prefersReducedMotion ? 0 : 1150,
    );
  };

  useEffect(() => {
    const syncLocationHash = () => {
      const id = window.location.hash.slice(1);
      if (!navItems.includes(id)) return;
      window.requestAnimationFrame(() => scrollTo(id));
    };

    syncLocationHash();
    window.addEventListener("hashchange", syncLocationHash);
    return () => window.removeEventListener("hashchange", syncLocationHash);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("aryasatyya26@gmail.com");
    setToast("Email copied to clipboard");
    window.setTimeout(() => setToast(""), 2600);
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("subject") || "Portfolio inquiry");
    const message = String(data.get("message") || "");
    window.location.href = `mailto:aryasatyya26@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  return (
    <div
      className={`app ${entered ? "experience-entered" : ""}${
        introVisible ? " intro-visible" : ""
      }${entryLoading ? " entry-loading-active" : ""}`}
      onClickCapture={handleInteractiveSfx}
    >
      <AtmosphericBackground entered={entered} />
      <BirdCursor />
      <PerformanceHud />
      {introVisible && (
        <div className={entryTransition ? "intro-leaving" : ""}>
          <Intro onEnter={enter} onSkip={enter} />
        </div>
      )}
      {entryLoading && (
        <EntryLoading
          welcoming={entryWelcome}
          transitioning={entryTransition}
          onComplete={completeEntryLoading}
        />
      )}
      {homeWelcome && <HomeWelcomeFlight />}

      <div className="scroll-progress" aria-hidden="true">
        <span ref={scrollProgressRef} />
      </div>

      <header className="site-header">
        <button
          className="monogram"
          onClick={returnToEntrance}
          aria-label="ARYASATYA NARYAMA — return to entrance"
        >
          <span className="monogram-symbol">AN</span>
          <span className="brand-wordmark">
            <span>ARYASATYA</span>
            <span>NARYAMA</span>
          </span>
        </button>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          {navItems.map((item, index) => (
            <button
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => scrollTo(item)}
              aria-current={active === item ? "location" : undefined}
            >
              <i>0{index + 1}</i>
              {item}
            </button>
          ))}
        </nav>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <p className="availability">
          <i />
          Indonesia · Open to select work
        </p>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-coordinates">
            <span>06.2088° S</span>
            <span>106.8456° E</span>
          </div>
          <div className="hero-content reveal">
            <div className="hero-greeting-stage">
              <p className="hero-greeting">Haii</p>
              <div className="hero-game-launcher">
                <p>Start Arya's Games</p>
                <button onClick={() => openGameProject(projects[1])}>neon-dash</button>
                <button onClick={() => openGameProject(projects[2])}>street fighting</button>
                <button data-game="serene" onClick={() => openGameProject(projects[0])}>
                  serene waters
                </button>
              </div>
            </div>
            <p className="eyebrow">Data analyst · Web developer</p>
            <h1>
              <span>Aryasatya</span>
              <em>Naryama</em>
            </h1>
            <div className="hero-bottom">
              <p>
                Building modern websites, useful digital experiences, and clear stories from
                complex information.
              </p>
              <div className="hero-actions">
                <button className="primary-button magnetic" onClick={() => scrollTo("projects")}>
                  Explore projects <Icon name="arrow" size={15} />
                </button>
                <button className="quiet-button" onClick={() => scrollTo("contact")}>
                  Start a conversation
                </button>
              </div>
            </div>
          </div>
          <div className="hero-portrait">
            <img
              src="/portfolio/Aryasatya.jpg"
              alt="Aryasatya Naryama outdoors"
              fetchPriority="high"
              decoding="async"
            />
            <span></span>
          </div>
          <button
            className="scroll-cue"
            onClick={() => scrollTo("about")}
            aria-label="Scroll to the about section"
          >
            <span>Scroll to about</span>
            <i />
          </button>
        </section>

        <section id="about" className="chapter about">
          <div className="section-label reveal">
            <span>01</span>
            <i />
            <p>Beyond the surface</p>
          </div>
          <div className="about-grid">
            <div className="about-portrait">
              <img
                src="/portfolio/THEGREAT.jpg"
                alt="Aryasatya Naryama portrait"
                loading="lazy"
                decoding="async"
              />
              <span>Based in Indonesia · Working globally</span>
            </div>
            <div className="about-copy reveal">
              <p className="eyebrow">A story shaped by persistence</p>
              <h2>
                Curiosity becomes craft when it is given <em>purpose.</em>
              </h2>
              <p className="lead">
                I’m a web developer, data analyst, and content creator who turns ambitious ideas
                into modern websites and engaging digital content.
              </p>
              <div className="body-columns">
                <p>
                  Part engineer, part designer, always curious. I develop fast, responsive, and
                  user-friendly websites using modern technologies.
                </p>
                <p>
                  My approach combines practical problem-solving with careful implementation,
                  from the first analysis through the final polished experience.
                </p>
              </div>
              <blockquote>
                Strength is built through mental perseverance—and through honoring the people who
                make the journey worth continuing.
              </blockquote>
              <a className="text-link" href="/portfolio/Aryasatya%20-%20CV.txt" download>
                Download résumé <Icon name="arrow" size={14} />
              </a>
            </div>
          </div>
        </section>

        <section id="skills" className="chapter skills">
          <div className="section-label reveal">
            <span>02</span>
            <i />
            <p>Constellation of craft</p>
          </div>
          <div className="skills-heading reveal">
            <h2>
              Ideas need
              <em>craft.</em>
            </h2>
            <p>
              A focused toolkit for making complex digital experiences feel clear, fast, and
              distinctly human. Select a node to discover its role.
            </p>
          </div>
          <div className="skill-world reveal">
            <div className="skill-orbit orbit-a" />
            <div className="skill-orbit orbit-b" />
            <span className="skill-core">AN</span>
            {skills.map((skill, index) => (
              <button
                className={`skill-node node-${index + 1}`}
                key={skill.name}
                style={{ "--node": index } as React.CSSProperties}
              >
                <i />
                <span>{skill.group}</span>
                <strong>{skill.name}</strong>
                <small>{skill.detail}</small>
              </button>
            ))}
          </div>
        </section>

        <section id="projects" className="chapter projects">
          <div className="section-label reveal">
            <span>03</span>
            <i />
            <p>Selected work</p>
          </div>
          <div className="projects-heading reveal">
            <h2>Projects</h2>
            <p>Proof of thought, shaped into experiences.</p>
          </div>
          <div className="project-list">
            {projects.map((item) => (
              <article
                id={item.gameTheme ? `project-${item.gameTheme}` : undefined}
                className={`project-card${item.gameTheme ? ` project-card-${item.gameTheme}` : ""}`}
                key={item.title}
              >
                <button
                  className="project-visual"
                  onClick={() => setProject(item)}
                  aria-label={`Open ${item.title} project details`}
                >
                  {item.gameTheme ? (
                    <GameArtwork project={item} />
                  ) : (
                    <img
                      src={item.image}
                      alt={`${item.title} preview`}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <span className="project-open">
                    View case <Icon name="arrow" />
                  </span>
                </button>
                <div className="project-copy">
                  <p className="eyebrow">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div>
                    {item.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="journey" className="chapter journey">
          <div className="section-label reveal">
            <span>04</span>
            <i />
            <p>Journey</p>
          </div>
          <div className="journey-layout">
            <div className="journey-sticky reveal">
              <h2>
                Built through
                <em>practice.</em>
              </h2>
              <p>
                A path through social science, digital business, analysis, development, and
                creative production.
              </p>
            </div>
            <div className="timeline">
              {journey.map((item, index) => (
                <article className="timeline-item reveal" key={item.date}>
                  <span className="timeline-index">0{index + 1}</span>
                  <time>{item.date}</time>
                  <h3>{item.title}</h3>
                  <h4>{item.place}</h4>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="chapter contact">
          <div className="contact-bird">
            <Bird />
          </div>
          <div className="section-label reveal">
            <span>05</span>
            <i />
            <p>Final chapter</p>
          </div>
          <div className="contact-heading reveal">
            <p className="eyebrow">The horizon is open</p>
            <h2>
              Let’s create
              <br />
              <em>something meaningful.</em>
            </h2>
          </div>
          <div className="contact-grid reveal">
            <div className="contact-copy">
              <p>
                Have a bold idea, an impossible brief, or simply want to say hello? My inbox is
                open.
              </p>
              <a href="mailto:aryasatyya26@gmail.com">aryasatyya26@gmail.com</a>
              <div className="contact-actions">
                <button className="primary-button" onClick={copyEmail}>
                  Copy email <Icon name="copy" size={15} />
                </button>
                <a
                  className="quiet-button"
                  href="https://www.instagram.com/steadynai"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram @steadynai <Icon name="arrow" size={14} />
                </a>
              </div>
            </div>
            <form onSubmit={submitContact}>
              <label>
                <span>Your name</span>
                <input name="name" required placeholder="Your name" />
              </label>
              <label>
                <span>Email address</span>
                <input name="email" required type="email" placeholder="you@example.com" />
              </label>
              <label>
                <span>Subject</span>
                <input name="subject" required placeholder="A new digital experience" />
              </label>
              <label>
                <span>Tell me about it</span>
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="A few details about your idea..."
                />
              </label>
              <button className="primary-button" type="submit">
                Open email draft <Icon name="arrow" size={15} />
              </button>
            </form>
          </div>
          <footer>
            <p>© 2026 Aryasatya Naryama</p>
            <button onClick={() => scrollTo("home")}>Back to the beginning ↑</button>
            <p>Data · Design · Digital</p>
          </footer>
        </section>
      </main>

      <MusicPlayer
        audioRef={audioRef}
        musicOn={musicOn}
        musicPending={musicPending}
        setMusicOn={setMusicOn}
        sfxOn={sfxOn}
        setSfxOn={setSfxOn}
      />
      {playingGameUrl && (
        <GameOverlay url={playingGameUrl} onClose={() => setPlayingGameUrl(null)} />
      )}
      {project && (
        <ProjectModal
          project={project}
          onClose={() => setProject(null)}
          onPlayGame={(url) => {
            setProject(null);
            setPlayingGameUrl(url);
          }}
        />
      )}
      <div className={`toast ${toast ? "visible" : ""}`} role="status">
        {toast}
      </div>
      <audio
        ref={sfxAudioRef}
        src="/Bomb.mp3?v=3"
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}
