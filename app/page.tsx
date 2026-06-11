
"use client";


import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Crown,
  Cpu,
  Eye,
  Flame,
  Gamepad2,
  Keyboard,
  Loader2,
  Shirt,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Watch,
  X,
  Zap,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

/* Custom hook to fetch remaining founder spots */
function useRemainingSpots() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRemaining = async () => {
      try {
        const { count, error } = await supabase
          .from("waitlist" as never)
          .select("*", { count: "exact", head: true } as never);
        
        if (error) throw error;
        setRemaining(Math.max(0, 100 - (count || 0)));
      } catch (err) {
        console.error("Failed to fetch remaining spots:", err);
        setRemaining(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRemaining();
    
    // Refresh every 5 seconds
    const interval = setInterval(fetchRemaining, 5000);
    return () => clearInterval(interval);
  }, []);

  return { remaining, loading };
}


/* ---------------------------- DATA ---------------------------- */

const CATEGORIES = [
  { name: "Sneakers", count: "1,420", tag: "Grails", Icon: Flame },
  { name: "Pokémon Cards", count: "PSA 10", tag: "Graded", Icon: Sparkles },
  { name: "Gaming", count: "Retro", tag: "Sealed", Icon: Gamepad2 },
  { name: "Watches", count: "Horology", tag: "Rare", Icon: Watch },
  { name: "Streetwear", count: "Archive", tag: "Hype", Icon: Zap },
  { name: "Manga", count: "1st Print", tag: "Library", Icon: Eye },
  { name: "Keyboards", count: "Custom", tag: "GMK", Icon: Keyboard },
  { name: "Collectibles", count: "Rare", tag: "Vault", Icon: Star },
  { name: "Jerseys", count: "Vintage", tag: "Signed", Icon: Shirt },
  { name: "Gaming Consoles", count: "Boxed", tag: "Rare", Icon: Cpu },
  { name: "Handhelds", count: "Original", tag: "CIB", Icon: Smartphone },
  { name: "Retro Tech", count: "Sealed", tag: "Grail", Icon: Cpu },
];

const WHY = [
  { title: "Verified Students", body: "Every collector is matched to a verified campus identity. No catfish. No bots.", Icon: ShieldCheck },
  { title: "Trusted Transactions", body: "Escrow-backed trades and reputation that follows you across every drop.", Icon: CheckCircle2 },
  { title: "Campus Discovery", body: "See what your campus is hunting in real time. Local first, global next.", Icon: Eye },
  { title: "Collector Reputation", body: "Earn a verifiable trade record. Build status that money can't buy.", Icon: Crown },
];

const PERKS = [
  "Founder Badge",
  "Priority Beta Access",
  "Private Collector Community",
  "Future Rewards",
  "Direct Feedback Access",
];

const STATS = [
  { label: "Founding Collectors", value: 87, suffix: "" },
  { label: "Interested Students", value: 312, suffix: "" },
  { label: "Campus Requests", value: 14, suffix: "" },
  { label: "Beta Launches", value: 1, suffix: "" },
];

const FAQ = [
  { q: "What is SOL3?", a: "SOL3 is a verified campus marketplace where collectors buy, sell, trade and discover rare items inside trusted student communities. Think SNKRS-grade scarcity, GOAT-grade trust — built natively for your campus." },
  { q: "Who can join?", a: "We're launching exclusively for MIT Pune students. The first 100 verified collectors become Founders and shape the platform." },
  { q: "When does beta launch?", a: "Closed beta opens to Founders first, with a full campus rollout shortly after. Founders are notified before anyone else." },
  { q: "Is it only for students?", a: "For launch, yes. Verification is what makes SOL3 different. We expand campus-by-campus to keep trust intact." },
  { q: "What collectibles are supported?", a: "Sneakers, Pokémon cards, gaming, watches, streetwear, manga, keyboards and rare collectibles. New categories are unlocked by collector demand." },
];

/* ---------------------------- NAV ---------------------------- */

function Nav({ onCTA }: { onCTA: () => void }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => scrollY.on("change", (y) => setScrolled(y > 24)), [scrollY]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <div
          className={`flex w-full items-center justify-between rounded-full border transition-all duration-500 ${
            scrolled
              ? "border-white/10 bg-black/60 px-5 py-2.5 backdrop-blur-xl"
              : "border-transparent bg-transparent px-2 py-2"
          }`}
        >
          <a href="#top" className="flex items-center gap-2">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-black text-black">
              S
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            </span>
            <span className="text-[15px] font-bold tracking-[0.18em] text-white">SOL3</span>
          </a>

          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] text-zinc-400 md:flex">
            <a href="#categories" className="transition hover:text-white">Categories</a>
            <a href="#why" className="transition hover:text-white">Why SOL3</a>
            <a href="#founder" className="transition hover:text-white">Founder</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </nav>

          <button
            onClick={onCTA}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-zinc-200"
          >
            <span className="hidden sm:inline">Become an Early Collector</span>
            <span className="sm:hidden">Early Access</span>
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}

/* ---------------------------- HERO ---------------------------- */

function Hero({ onCTA }: { onCTA: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const { remaining, loading } = useRemainingSpots();

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-40 pb-32 sm:pt-48 sm:pb-40">
      {/* gradient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.10),transparent)] blur-3xl" />
        <div className="absolute -left-40 top-40 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.18),transparent)] blur-3xl" />
        <div className="absolute -right-40 top-60 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(236,72,153,0.15),transparent)] blur-3xl" />
      </div>

      {/* grid lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-5 text-center sm:px-8 flex flex-col items-center justify-center">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-300 backdrop-blur-xl"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Verified Campus Marketplace
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 font-display text-[14vw] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white sm:text-[120px] lg:text-[170px]"
        >
          Built For
          <br />
          <span className="bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">Collectors</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 max-w-xl text-balance text-base text-zinc-400 sm:text-lg"
        >
          Buy, sell, trade and discover rare collectibles inside trusted student communities.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button onClick={onCTA} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:scale-[1.02]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Become an Early Collector
            <ArrowRight className="h-4 w-4" />
          </button>
          <a href="#categories" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.05]">
            Explore Categories
            <ChevronDown className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Founder scarcity card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.85 }}
          className="w-full max-w-xl mt-20"
        >
          <div className="glow-ring relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-6 backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-500">Founder Spots</div>
                  <div className="font-display text-2xl font-bold text-white">
                    {loading ? (
                      <span className="text-zinc-600">...</span>
                    ) : remaining !== null ? (
                      <>
                        {100 - remaining} <span className="text-zinc-600">/ 100</span>
                      </>
                    ) : (
                      <span className="text-zinc-600">? / 100</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Pill>Founder</Pill>
                <Pill>Early Access</Pill>
                <Pill>Beta</Pill>
              </div>
            </div>
            <div className="relative mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: remaining !== null ? `${((100 - remaining) / 100) * 100}%` : "0%" }}
                transition={{ duration: 1.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-white via-white to-zinc-400"
              />
            </div>
            <div className="mt-3 text-left text-[11px] uppercase tracking-[0.25em] text-zinc-500">
              {loading ? (
                <span>Loading...</span>
              ) : remaining !== null ? (
                remaining > 0 ? (
                  <>
                    <span className="text-emerald-300 font-semibold">{remaining} spot{remaining === 1 ? '' : 's'} remaining</span>
                  </>
                ) : (
                  <span className="text-red-300 font-semibold">All spots claimed</span>
                )
              ) : (
                <span>Unable to load</span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-300 sm:inline-block">
      {children}
    </span>
  );
}

/* ---------------------------- SECTION HEADER ---------------------------- */

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400">
        <span className="h-1 w-1 rounded-full bg-white" />
        {eyebrow}
      </div>
      <h2 className="font-display text-balance text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl">
        {title}
      </h2>
      {sub && <p className="mx-auto mt-5 max-w-xl text-base text-zinc-400">{sub}</p>}
    </div>
  );
}

/* ---------------------------- CATEGORIES ---------------------------- */

function Categories() {
  return (
    <section id="categories" className="relative px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Twelve Verticals" title={<>The Collector<br />Universe</>} sub="From grail sneakers to retro tech. Every category curated for the obsessed." />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={c.name} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ name, count, tag, Icon, index }: { name: string; count: string; tag: string; Icon: typeof Flame; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-6, 6]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left - rect.width / 2);
        my.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 transition-colors hover:border-white/20"
    >
      {/* shine */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.1),transparent_40%)]" />
      </div>
      <div className="absolute right-4 top-4">
        <span className="rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-300 backdrop-blur">{tag}</span>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-500">{count}</div>
          <div className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">{name}</div>
          <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-400 transition group-hover:text-white">
            Browse <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------- WHY ---------------------------- */

function Why() {
  return (
    <section id="why" className="relative px-5 py-32 sm:px-8">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-[400px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="The Problem"
          title={<>Collectors deserve<br />better than chaos.</>}
          sub="Fragmented Discords, sketchy DMs, fake grails. SOL3 collapses it into one trusted surface."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <WhyCard key={w.title} {...w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCard({ title, body, Icon, index }: { title: string; body: string; Icon: typeof Flame; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-6 backdrop-blur transition-colors hover:border-white/20"
    >
      <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/[0.04] opacity-0 blur-2xl transition group-hover:opacity-100" />
    </motion.div>
  );
}

/* ---------------------------- FOUNDER ---------------------------- */

function Founder({ onCTA }: { onCTA: () => void }) {
  const { remaining } = useRemainingSpots();
  
  return (
    <section id="founder" className="relative px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-8 sm:p-16 noise">
          <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent)] blur-3xl" />
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-300 w-fit">
                <Crown className="h-3 w-3" /> Founder Collector Program
              </div>
              <h2 className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-7xl">
                The first 100<br />never pay<br />for status.
              </h2>
              <p className="mt-6 max-w-md text-base text-zinc-400">Founder Collectors get permanent access, voice, and verifiable status across every drop SOL3 ever ships.</p>
              
              {remaining !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 w-fit"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold text-emerald-300">{remaining} spots remaining</span>
                </motion.div>
              )}
              
              <button onClick={onCTA} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:scale-[1.02] w-fit">
                Claim Founder Badge <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
            </div>
            <div className="grid gap-4">
              {PERKS.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">{p}</span>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500 shrink-0">Included</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- STATS ---------------------------- */

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString()}</span>;
}

function Stats() {
  return (
    <section className="relative px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Live Demand" title={<>The signal is<br />already loud.</>} />
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-black p-8 sm:p-10">
              <div className="font-display text-5xl font-black tracking-tighter text-white sm:text-6xl">
                <CountUp value={s.value} />
                {s.suffix}
              </div>
              <div className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- FAQ ---------------------------- */

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHeader eyebrow="FAQ" title={<>Questions,<br />answered.</>} />
        <div className="space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-white/[0.03]"
                >
                  <span className="text-base font-semibold text-white sm:text-lg">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-white">
                    <span className="block h-3 w-px bg-white" />
                    <span className="block h-px w-3 -translate-x-[7px] bg-white" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-zinc-400">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- FOOTER CTA + FOOTER ---------------------------- */

function FinalCTA({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="relative px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="font-display text-balance text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-8xl"
        >
          Your campus.<br />Your grail.<br /><span className="bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">Your turn.</span>
        </motion.h2>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-10">
          <button onClick={onCTA} className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:scale-[1.02]">
            Become an Early Collector <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-black text-black">S</span>
          <span className="text-xs font-bold tracking-[0.2em] text-white">SOL3 © 2026</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Built For Collectors.</div>
      </div>
    </footer>
  );
}

/* ---------------------------- MODAL ---------------------------- */

type FormState = { name: string; email: string; instagram: string; college: string; collector_interest: string };

function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", instagram: "", college: "MIT Pune", collector_interest: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { remaining, loading: spotsLoading } = useRemainingSpots();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => { onClose(); setTimeout(() => setSuccess(false), 400); }, 2800);
    return () => clearTimeout(t);
  }, [success, onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.collector_interest.trim()) {
      setError("Please fill in the required fields.");
      return;
    }
    setLoading(true);
    const { error: insertError } = await supabase.from("waitlist" as never).insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      instagram: form.instagram.trim() || null,
      college: form.college.trim() || null,
      collector_interest: form.collector_interest.trim(),
    } as never);
    setLoading(false);
    if (insertError) {
      if (insertError.code === "23505") setError("You're already on the list. We've got you.");
      else setError(insertError.message || "Something went wrong. Try again.");
      return;
    }

    if (!insertError) {
      await fetch("/api/send-welcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          name: form.name.trim(),
        }),
      });
    }

    setSuccess(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glow-ring relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950 to-black p-7"
          >
            <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:bg-white/10 hover:text-white" aria-label="Close">
              <X className="h-4 w-4" />
            </button>

            {!success ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-300">
                  <Crown className="h-3 w-3" /> Founder Application
                </div>
                <h3 className="mt-5 font-display text-3xl font-black uppercase leading-[0.95] tracking-tight text-white">
                  Claim your<br />Founder spot.
                </h3>
                <div className="mt-3 flex items-center gap-2">
                  {spotsLoading ? (
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <div className="h-2 w-2 rounded-full bg-zinc-600 animate-pulse" />
                      <span>Checking availability...</span>
                    </div>
                  ) : remaining !== null ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-sm text-emerald-300"
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>
                        {remaining > 0 
                          ? `${remaining} spot${remaining === 1 ? '' : 's'} left` 
                          : "All spots taken"
                        } • Verified collectors only.
                      </span>
                    </motion.div>
                  ) : (
                    <p className="text-sm text-zinc-400">Verified collectors only.</p>
                  )}
                </div>

                <form onSubmit={submit} className="mt-7 space-y-4">
                  <Field label="Full Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
                  <Field label="Email" required type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@campus.edu" />
                  <Field label="Instagram" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} placeholder="@handle" />
                  <Field label="College" value={form.college} onChange={(v) => setForm({ ...form, college: v })} placeholder="MIT Pune" />
                  <Field label="What do you collect?" required value={form.collector_interest} onChange={(v) => setForm({ ...form, collector_interest: v })} placeholder="Sneakers, Pokémon, watches…" />

                  {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</div>}

                  <button
                    type="submit"
                    disabled={loading || spotsLoading}
                    className="group relative mt-3 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:scale-[1.01] disabled:opacity-60"
                  >
                    {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Joining…</>) : remaining === 0 ? (<>Spots Filled</>) : (<>Claim Founder Badge <ArrowRight className="h-4 w-4" /></>)}
                  </button>
                  <p className="pt-2 text-center text-[10px] uppercase tracking-[0.25em] text-zinc-600">No spam. Just drops.</p>
                </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-3xl">🚀</div>
                <h3 className="mt-6 font-display text-3xl font-black uppercase tracking-tight text-white">Welcome,<br />Founder.</h3>
                <p className="mt-3 text-sm text-zinc-400">You've secured early access to SOL3.<br />We'll contact you before launch.</p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Founder Badge Secured
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, placeholder, required, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">
        {label}{required && <span className="text-white">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={200}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-white/40 focus:bg-white/[0.06]"
      />
    </label>
  );
}

/* ---------------------------- PAGE ---------------------------- */

function LaunchPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      <Nav onCTA={openModal} />
      <Hero onCTA={openModal} />
      <Categories />
      <Why />
      <Founder onCTA={openModal} />
      <Stats />
      <FAQSection />
      <FinalCTA onCTA={openModal} />
      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
export default LaunchPage;