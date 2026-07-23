import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Code,
  Brain,
  Cloud,
  Rocket,
  CheckCircle2,
  Star,
  Sparkles,
  Play,
  Shield,
  Headphones,
  Layers,
  Lock,
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useQuery } from "@tanstack/react-query";

/** Dashboard mock shown in the hero — replace public/hero.png */
const HERO_DASHBOARD_IMAGE = "/hero.png";

/**
 * Trusted-by company logos — add files under public/clients/
 * With 4 or fewer logos the row stays static (no slide).
 */
const TRUSTED_LOGOS = [
  { name: "Company 1", src: "/clients/company-1.png" },
  { name: "Company 2", src: "/clients/company-2.png" },
  { name: "Company 3", src: "/clients/company-3.png" },
  { name: "Company 4", src: "/clients/company-4.png" },
] as const;

const TRUSTED_SLIDE_THRESHOLD = 5;

export default function Home() {
  const defaultContent = {
    hero: {
      tagline: "Modern systems for complex businesses",
      heading: "Systems that scale,",
      headingAccent: "every day.",
      description:
        "We design and build ERP platforms, websites, and custom software that streamline operations and help your business grow with confidence.",
      buttons: { primary: "Start Your Project", secondary: "See Our Work" },
    },
    stats: [
      { label: "Projects Delivered", value: "100+" },
      { label: "Happy Clients", value: "50+" },
      { label: "Team Experts", value: "25+" },
      { label: "Years Experience", value: "5+" },
    ],
    trustedBy: {
      title: "Trusted by growing teams",
    },
    features: {
      title: "Why Choose Knocker AI?",
      subtitle:
        "We combine technical expertise with creative innovation to deliver exceptional results that drive real business value.",
      items: [
        {
          title: "Web Development",
          description:
            "Custom, responsive, and high-performance websites tailored to your brand using modern frameworks like React and Next.js.",
          image:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
        },
        {
          title: "AI Solutions",
          description:
            "Intelligent automation, predictive analytics, and custom LLM integrations to optimize your operations.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
        },
        {
          title: "Cloud Systems",
          description:
            "Scalable, secure, and cost-effective cloud infrastructure design and management on AWS, Azure, or GCP.",
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
        },
        {
          title: "Digital Growth",
          description:
            "Strategic SEO, performance marketing, and conversion rate optimization to accelerate your market presence.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
        },
        {
          title: "ERP Systems",
          description:
            "Complete enterprise resource planning solutions to streamline your business processes and improve operational efficiency.",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
        },
      ],
    },
    projects: {
      title: "Featured Projects",
      subtitle: "A glimpse into our recent success stories.",
      buttonText: "View All Projects",
      items: [
        {
          title: "AI-Powered Analytics",
          desc: "Predictive market trends for retail.",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
          tag: "AI & ML",
        },
        {
          title: "EduTech Platform",
          desc: "Interactive LMS with real-time video.",
          image:
            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
          tag: "Web Dev",
        },
        {
          title: "FinTech Wallet",
          desc: "Secure mobile digital wallet.",
          image:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
          tag: "Mobile App",
        },
      ],
    },
    process: {
      title: "DEVELOPMENT PROCESS",
      subtitle:
        "Agile software development methodology that delivers high-quality solutions",
      steps: [
        {
          title: "PLANNING",
          desc: "Requirements analysis, user stories, and project roadmap creation",
          hex: "0x01",
        },
        {
          title: "DESIGN",
          desc: "UI/UX design, system architecture, and database modeling",
          hex: "0x02",
        },
        {
          title: "DEVELOPMENT",
          desc: "Agile coding sprints with continuous integration and testing",
          hex: "0x03",
        },
        {
          title: "DEPLOYMENT",
          desc: "Production launch with monitoring and ongoing maintenance",
          hex: "0x04",
        },
      ],
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle:
        "Real feedback from companies who trusted us with their digital transformation",
      items: [
        {
          quote:
            "Knocker AI transformed our outdated system into a modern, efficient platform. The AI integration saved us hours of manual work every day.",
          author: "Sarah J.",
          role: "CTO, TechFlow",
        },
        {
          quote:
            "The team's attention to detail and design aesthetics is unmatched. Our new landing page conversion rate doubled within a month.",
          author: "Michael R.",
          role: "Marketing Director, GrowthCo",
        },
        {
          quote:
            "Professional, timely, and incredibly skilled. They didn't just build what we asked for; they improved upon our initial ideas.",
          author: "Emily T.",
          role: "Founder, StartUp X",
        },
      ],
    },
    cta: {
      title: "Ready to Transform Your Business?",
      description:
        "Let's collaborate to build something extraordinary. Whether you need a simple website or a complex AI system, we have the expertise to help.",
      buttons: { primary: "Get in Touch", secondary: "Learn About Us" },
    },
    newsletter: {
      title: "Stay Ahead of the Curve",
      description:
        "Subscribe to our newsletter for the latest insights on AI, Tech trends, and Knocker AI updates.",
      buttonText: "Subscribe",
    },
  };
  const { data: apiContent, isLoading } = useQuery({
    queryKey: ["homeContent"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/content/home");
        if (!res.ok) return null;
        const json = await res.json();
        const data = json?.data ?? json;
        // Only use API data if it has the expected shape
        if (data?.hero?.buttons?.primary) return data;
        return null;
      } catch {
        return null;
      }
    },
  });
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  const content = apiContent ?? defaultContent;
  const heroStats = (content.stats ?? defaultContent.stats).slice(0, 3);
  const heroFeatures = [
    { icon: Layers, label: "ERP & Custom Systems" },
    { icon: Code, label: "Modern Web Apps" },
    { icon: Lock, label: "Secure Architecture" },
    { icon: Headphones, label: "Ongoing Support" },
  ];
  const hasAccent = Boolean(
    (content.hero as { headingAccent?: string }).headingAccent,
  );
  const headingMain = hasAccent
    ? content.hero.heading
    : defaultContent.hero.heading;
  const headingAccent =
    (content.hero as { headingAccent?: string }).headingAccent ??
    defaultContent.hero.headingAccent;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section — split composition */}
      <AnimatedSection
        disableAnimation
        className="relative overflow-x-hidden bg-[hsl(40_30%_96%)] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:min-h-[min(100svh,920px)] lg:pt-28 lg:pb-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--primary)/0.08),_transparent_55%)]" />

        <div className="relative z-10 grid w-full items-center gap-4 px-4 sm:gap-5 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.2fr)] lg:gap-1 lg:px-0 lg:pl-8 xl:gap-0 xl:pl-12 2xl:pl-16">
          {/* Left column */}
          <div className="relative z-20 mx-auto flex w-full max-w-xl flex-col lg:mx-0 lg:max-w-none lg:pr-0 lg:py-6 xl:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <img
                src="/light_logo.png"
                alt="Knocker AI"
                width={220}
                className="object-contain max-w-[min(220px,70vw)]"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {content.hero.tagline}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="mb-5 max-w-xl text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-foreground"
            >
              <span className="font-display">{headingMain}</span>{" "}
              <span className="font-script text-primary">{headingAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {content.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mb-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    size="lg"
                    className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/25"
                  >
                    {content.hero.buttons.primary}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/portfolio">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-white text-primary shadow-sm">
                    <Play className="h-4 w-4 fill-current" />
                  </span>
                  {content.hero.buttons.secondary}
                </motion.a>
              </Link>
            </motion.div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.48 }}
              className="mb-5 grid grid-cols-3 gap-2 rounded-[1.75rem] border border-white/70 bg-white/80 p-4 shadow-[0_12px_40px_-16px_rgba(30,60,120,0.25)] backdrop-blur-sm sm:gap-4 sm:p-6"
            >
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`px-1 text-center sm:px-2 ${index > 0 ? "border-l border-border/60" : ""}`}
                >
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-9 sm:w-9">
                    {index === 0 ? (
                      <Rocket className="h-4 w-4" />
                    ) : index === 1 ? (
                      <Shield className="h-4 w-4" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </div>
                  <div className="text-xl font-bold text-foreground sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium text-muted-foreground sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Feature bar */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.58 }}
              className="grid grid-cols-2 gap-3 rounded-[1.75rem] bg-[hsl(215_35%_22%)] px-4 py-4 text-white sm:grid-cols-4 sm:gap-2 sm:px-5 sm:py-5"
            >
              {heroFeatures.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 sm:justify-center sm:flex-col sm:text-center lg:flex-row lg:text-left"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-[11px] font-medium leading-tight sm:text-xs">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — full-width tilted dashboard mock */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative z-10 w-full lg:h-full lg:min-h-[min(72svh,700px)] lg:self-stretch"
          >
            <div className="pointer-events-none absolute -right-8 top-1/2 h-[70%] w-[70%] -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute bottom-8 left-4 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />

            <div
              className="relative flex h-full w-full items-center justify-center lg:justify-end"
              style={{ perspective: "min(1800px, 120vw)" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{
                  opacity: 1,
                  y: [0, -14, 0],
                  rotateY: 12,
                  rotateX: 5,
                  rotateZ: 4,
                }}
                transition={{
                  opacity: { duration: 0.7, delay: 0.2 },
                  y: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.9,
                  },
                  rotateY: { duration: 0.9, delay: 0.25 },
                  rotateX: { duration: 0.9, delay: 0.25 },
                  rotateZ: { duration: 0.9, delay: 0.25 },
                }}
                className="relative w-full origin-center sm:w-[94%] lg:origin-left lg:w-[110%] lg:-translate-x-[2%] xl:w-[114%]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="overflow-hidden rounded-xl border border-white/60 bg-white shadow-[0_30px_80px_-20px_rgba(30,60,120,0.45)] ring-1 ring-black/5 sm:rounded-2xl">
                  <img
                    src={HERO_DASHBOARD_IMAGE}
                    alt="Knocker AI system dashboard"
                    className="block h-auto w-full object-cover object-top aspect-[16/11] max-h-[min(58svh,520px)] sm:max-h-[min(62svh,600px)] lg:aspect-auto lg:max-h-[min(72svh,720px)] lg:min-h-[min(52svh,560px)]"
                    onError={(e) => {
                      e.currentTarget.src = "/hero-mock.jpg";
                    }}
                  />
                </div>

                {/* Soft floating accent cards */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className="absolute -left-2 bottom-[12%] hidden rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:block"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Analytics
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    Live system metrics
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 }}
                  className="absolute -right-1 top-[10%] hidden rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-xl backdrop-blur md:block"
                  style={{ transform: "translateZ(48px)" }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Uptime
                  </p>
                  <p className="text-lg font-bold text-primary">99.9%</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Trusted-by company logos */}
      <AnimatedSection className="border-y border-border/40 bg-background/80 py-10">
        <div className="container mx-auto px-4">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {(content as { trustedBy?: { title?: string } }).trustedBy?.title ??
              defaultContent.trustedBy.title}
          </p>
          {(() => {
            const logos = [...TRUSTED_LOGOS];
            const shouldSlide = logos.length >= TRUSTED_SLIDE_THRESHOLD;
            const LogoRow = ({
              items,
              keyPrefix,
            }: {
              items: typeof logos;
              keyPrefix: string;
            }) => (
              <>
                {items.map((logo, i) => (
                  <div
                    key={`${keyPrefix}-${logo.name}-${i}`}
                    className="mx-5 flex h-16 w-36 shrink-0 items-center justify-center sm:mx-8 sm:h-20 sm:w-44 md:h-24 md:w-52"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="max-h-14 max-w-full object-contain transition-transform duration-300 hover:scale-105 sm:max-h-16 md:max-h-20"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.style.display = "none";
                        const fallback =
                          el.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <span
                      className="hidden h-14 w-full items-center justify-center rounded-lg border border-dashed border-border/70 text-xs font-medium text-muted-foreground"
                      aria-hidden
                    >
                      {logo.name}
                    </span>
                  </div>
                ))}
              </>
            );

            if (!shouldSlide) {
              return (
                <div className="flex flex-wrap items-center justify-center gap-y-4">
                  <LogoRow items={logos} keyPrefix="static" />
                </div>
              );
            }

            const repeated = [...logos, ...logos, ...logos, ...logos];
            return (
              <div
                className="flex overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}
              >
                <div
                  className="flex shrink-0 items-center"
                  style={{ animation: "marquee-infinite 28s linear infinite" }}
                >
                  <LogoRow items={repeated} keyPrefix="slide" />
                </div>
              </div>
            );
          })()}
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      {/* <AnimatedSection className="pt-10 pb-16 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mb-10"
          >
            <img
              src="/dark_logo.png"
              alt="Knocker AI"
              width={220}
              className="object-contain max-w-[80vw]"
            />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {content.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection> */}

      {/* Features Section */}
      <AnimatedSection className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              {content.features.title}
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-xl leading-relaxed">
              {content.features.subtitle}
            </p>
          </motion.div>

          <div className="space-y-24">
            {content.features.items.map((feature, index) => {
              const icons = [
                <Code className="h-12 w-12" />,
                <Brain className="h-12 w-12" />,
                <Cloud className="h-12 w-12" />,
                <Rocket className="h-12 w-12" />,
                <CheckCircle2 className="h-12 w-12" />,
              ];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="absolute hidden lg:block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      className="w-24 h-0.5 bg-gradient-to-r from-primary to-primary/50 origin-center"
                    >
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <div
                        className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </motion.div>
                  </div>

                  <div className="flex-1 glass-card p-8 rounded-3xl hover-lift border border-border/50 hover:border-primary/30 transition-all duration-500 group relative">
                    <div className="mb-6 p-4 rounded-2xl bg-primary w-fit text-white group-hover:scale-110 transition-transform duration-300">
                      {icons[index] || <Code className="h-12 w-12" />}
                    </div>
                    <h3
                      className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  <div className="flex-1 flex justify-center relative">
                    <div className="w-80 h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-primary/20 hover:border-primary/40">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Projects Section */}
      <AnimatedSection className="py-24 bg-gradient-to-b from-muted/10 to-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                {content.projects.title}
              </h2>
              <p className="text-muted-foreground max-w-2xl text-xl leading-relaxed">
                {content.projects.subtitle}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="hidden md:flex hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-primary/30 hover:border-primary"
                >
                  {content.projects.buttonText}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {content.projects.items.map((project, i) => (
              <Link key={i} href="/portfolio">
                <motion.div
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative h-64 rounded-xl overflow-hidden mb-4 shadow-3d-md hover:shadow-3d-lg transition-shadow">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-xs font-medium">
                        {project.tag}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link href="/portfolio">
              <Button variant="outline">
                {content.projects.buttonText}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection className="py-32 relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
          <div className="absolute top-0 left-1/4 w-px h-full bg-primary/20 animate-pulse"></div>
          <div
            className="absolute top-0 right-1/3 w-px h-full bg-primary/20 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div className="relative mb-8">
              <motion.h2 className="text-6xl md:text-8xl font-bold text-primary relative z-10">
                {content.process.title}
              </motion.h2>
            </motion.div>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {content.process.subtitle}
            </p>
          </motion.div>

          <div className="relative max-w-7xl mx-auto">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
              viewBox="0 0 1200 400"
            >
              <motion.path
                d="M 100 200 Q 300 100 500 200 T 900 200 L 1100 200"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
              <motion.circle
                cx="300"
                cy="150"
                r="4"
                fill="currentColor"
                className="text-primary"
                opacity="0.6"
                animate={{ r: [4, 8, 4], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="700"
                cy="250"
                r="4"
                fill="currentColor"
                className="text-primary"
                opacity="0.6"
                animate={{ r: [4, 8, 4], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.process.steps.map((step, i) => {
                const icons = [
                  "https://fonts.gstatic.com/s/i/materialiconsoutlined/assignment/v6/24px.svg",
                  "https://fonts.gstatic.com/s/i/materialiconsoutlined/design_services/v6/24px.svg",
                  "https://fonts.gstatic.com/s/i/materialiconsoutlined/code/v6/24px.svg",
                  "https://fonts.gstatic.com/s/i/materialiconsoutlined/rocket_launch/v6/24px.svg",
                ];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 60, rotateX: -30 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: i * 0.4,
                      duration: 1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -25,
                      scale: 1.08,
                      rotateY: 8,
                      transition: { duration: 0.4, type: "spring" },
                    }}
                    className="relative group perspective-1000"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute -inset-1 bg-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>

                    <div className="absolute -top-6 right-4 z-30">
                      <span className="text-xs font-mono text-primary bg-background px-2 py-1 rounded border border-primary/30">
                        {step.hex}
                      </span>
                    </div>

                    <div className="relative bg-background/80 backdrop-blur-xl rounded-3xl p-8 border border-primary/20 group-hover:border-primary/60 transition-all duration-500 overflow-hidden shadow-lg group-hover:shadow-xl">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-primary animate-pulse"></div>
                        <div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                      </div>

                      <motion.div
                        className="relative text-6xl mb-6 flex justify-center"
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, 360],
                          transition: { duration: 0.8 },
                        }}
                      >
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500"></div>
                        <img
                          src={icons[i] || icons[0]}
                          alt={step.title}
                          className="relative z-10 w-16 h-16 filter brightness-0 invert"
                        />
                      </motion.div>

                      <h3
                        className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300"
                        style={{ fontFamily: "Rajdhani, sans-serif" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                        {step.desc}
                      </p>

                      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          transition={{ delay: i * 0.3 + 1, duration: 1.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/20 to-background">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              {content.testimonials.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {content.testimonials.subtitle}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.testimonials.items.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full glass-card border-2 border-border/50 hover:border-primary/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="pt-8 pb-6 relative z-10">
                    <div className="absolute top-4 right-4 text-6xl text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                      "
                    </div>

                    <div className="mb-6 flex gap-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg text-foreground mb-8 leading-relaxed italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">4.9/5</span>
                <span className="text-sm">Average Rating</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-border"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">50+</span>
                <span className="text-sm">Happy Clients</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-border"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">100%</span>
                <span className="text-sm">Project Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-16 text-center border border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6 text-primary"
              >
                {content.cta.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
              >
                {content.cta.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="text-lg px-10 py-4 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
                    >
                      {content.cta.buttons.primary}
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/about">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-10 py-4 border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      {content.cta.buttons.secondary}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Final CTA Section */}
      <AnimatedSection className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 shadow-xl border-2 border-primary/20 text-center relative overflow-hidden group hover:border-primary/40 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Have a Project in Mind?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Tell us about your idea and we'll help you build it. Free
                consultation, no commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="px-10 py-4 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30"
                    >
                      Start a Project{" "}
                      <ArrowRight className="ml-2 h-5 w-5 inline" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/portfolio">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-10 py-4 border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      View Our Work
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}
