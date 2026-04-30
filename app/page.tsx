"use client";

import * as React from "react";
import Image from "next/image";
import { FadeIn, Stagger, StaggerItem, TextReveal, CountUp, Spotlight, Marquee, Magnetic, EKGLine, HeartbeatIcon, DnaHelix } from "@/components/motion-primitives";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Navbar } from "@/components/navbar";
import {
  ArrowRight,
  Mail,
  ExternalLink,
  Activity,
  Atom,
  Wind,
  Dna,
  GraduationCap,
  Microscope,
  MapPin,
  Calendar,
  Link as LinkIcon,
  AtSign,
  BookOpen,
  Quote,
  Sparkles,
  Award,
  Users,
  Phone,
  FlaskConical,
  Beaker,
  Heart,
} from "lucide-react";

function Linkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
    </svg>
  );
}

type Pub = { title: string; journal: string; year: number; cites: number | null; authors?: string; doi?: string };

const publications: Pub[] = [
  { title: "Methylation of the Plant Flavonoid Fisetin to Geraldol Enhances Cardioprotective Efficacy via PI3K/Akt-Dependent Mitochondrial Preservation", journal: "Pharmacological Research – Natural Products", year: 2026, cites: null, authors: "Prem PN, Sivakumar B, Yegneshwaran V, Boovarahan SR, Kurian GA" },
  { title: "Pre-Conditioning and Post-Conditioning of Ischemia Reperfused Rat Hearts", journal: "Journal of Biochemical and Molecular Toxicology", year: 2025, cites: 1, authors: "Sivakumar B, Kurian GA" },
  { title: "PM2.5 Induced Vascular and Myocardial Calcification Impairs Ischemia-reperfusion Tolerance via Mitochondrial Dysregulation", journal: "Cell Biochemistry and Biophysics", year: 2025, cites: 1, authors: "Sivakumar B, Kurian GA" },
  { title: "Sodium thiosulfate mitigates PM2.5-induced cardiotoxicity by preservation of mitochondrial function", journal: "Fundamental & Clinical Pharmacology", year: 2025, cites: null, authors: "Sivakumar B, Kurian GA" },
  { title: "Mitigating PM2.5 Induced Myocardial Metal Deposition Through Sodium Thiosulfate", journal: "Environmental Toxicology", year: 2025, cites: 3, authors: "Sivakumar B, Kurian GA" },
  { title: "Comparative evaluation of single and multiple exposure to PM2.5 in respirable air on cardiac physiology, structure and function in a Wistar rat model", journal: "Journal of Environmental Sciences (China)", year: 2025, cites: 2, authors: "Sivakumar B, Kurian GA" },
  { title: "Temporal dynamics of PM2.5 induced cell death: Emphasizing inflammation as key mediator in the late stages of prolonged myocardial toxicity", journal: "Experimental Cell Research", year: 2025, cites: 1, authors: "Sivakumar B, Kurian GA" },
  { title: "Mitochondrial Toxicity of PM2.5 Leads to Cardiac Failure: A Comparative Evaluation of PM2.5 from Ambient Air, Diesel Exhaust and SRM 2975", journal: "International Journal of Environmental Research", year: 2025, cites: 1, authors: "Sivakumar B, Kurian GA" },
  { title: "Mitochondrial proteases in cancer development and progression", journal: "Pathophysiological Aspects of Proteases in Cancer (Book)", year: 2025, cites: null, authors: "Kurian GA, Sivakumar B" },
  { title: "The Worsening of Myocardial Ischemia–Reperfusion Injury in Uremic Cardiomyopathy is Further Aggravated by PM2.5 Exposure", journal: "Cardiovascular Toxicology", year: 2024, cites: 5, authors: "Sivakumar B, Kurian GA" },
  { title: "Investigating the temporal link between PM2.5 exposure and acceleration of myocardial ischemia reperfusion injury", journal: "Environmental Pollution", year: 2024, cites: 6, authors: "Sivakumar B, Kurian GA" },
  { title: "PM2.5 toxicity in blood impairs cardiac redox balance and promotes mitochondrial dysfunction in rat heart", journal: "Journal of Biochemical and Molecular Toxicology", year: 2024, cites: 11, authors: "Sivakumar B, Kurian GA" },
  { title: "Increased Susceptibility of Cardiac Tissue to PM2.5-Induced Toxicity in Uremic Cardiomyopathic Rats", journal: "Environmental Toxicology", year: 2024, cites: null, authors: "Sivakumar B, Kurian GA" },
  { title: "DNA hypomethylation by fisetin preserves mitochondria functional genes and contributes to the protection of I/R rat heart", journal: "Functional & Integrative Genomics", year: 2023, cites: 9, authors: "Boovarahan SR, Balu K, Prem P, Sivakumar B, Kurian GA" },
  { title: "PM2.5 Exposure-Linked Mitochondrial Dysfunction Negates SB216763-Mediated Cardio-Protection against Myocardial Ischemia–Reperfusion Injury", journal: "Life", year: 2023, cites: 4, authors: "Sivakumar B, Nadeem A, Dar MA, Kurian GA" },
  { title: "Exposure to real ambient particulate matter inflicts cardiac electrophysiological disturbances, vascular calcification, and mitochondrial bioenergetics decline", journal: "Environmental Science and Pollution Research", year: 2023, cites: 10, authors: "Sivakumar B, Kurian GA" },
  { title: "PM2.5-Induced Cardiac Structural Modifications and Declined Pro-Survival Signalling Pathways", journal: "Cells", year: 2023, cites: 4, authors: "Sivakumar B, Ali N, Ahmad SF, Nadeem A, Waseem M, Kurian GA" },
  { title: "PM2.5 from diesel exhaust attenuated fisetin mediated cytoprotection in H9c2 cardiomyocytes", journal: "Drug and Chemical Toxicology", year: 2023, cites: 11, authors: "Sivakumar B, Kurian GA" },
  { title: "Long-term administration of fisetin was not as effective as short term in ameliorating IR injury in isolated rat heart", journal: "Naunyn-Schmiedeberg's Archives of Pharmacology", year: 2022, cites: 5, authors: "Prem PN, Sivakumar B, Boovarahan SR, Kurian GA" },
  { title: "Consequential Impact of Particulate Matter Linked Inter-Fibrillar Mitochondrial Dysfunction", journal: "Biology (Basel)", year: 2022, cites: 17, authors: "Sivakumar B, AlAsmari AF, Ali N, Waseem M, Kurian GA" },
  { title: "Fisetin Preserves Interfibrillar Mitochondria to Protect Against Myocardial Ischemia-Reperfusion Injury", journal: "Cell Biochemistry and Biophysics", year: 2022, cites: 21, authors: "Shanmugam K, Prem PN, Boovarahan SR, Sivakumar B, Kurian GA" },
  { title: "PM2.5 Exposure Lowers Mitochondrial Endurance During Cardiac Recovery in a Rat Model of Myocardial Infarction", journal: "Cardiovascular Toxicology", year: 2022, cites: 13, authors: "Sivakumar B, Kurian GA" },
  { title: "Inhalation of PM2.5 from diesel exhaust promotes impairment of mitochondrial bioenergetics", journal: "Inhalation Toxicology", year: 2022, cites: 12, authors: "Sivakumar B, Kurian GA" },
  { title: "Diesel particulate matter exposure deteriorates cardiovascular health", journal: "Chemico-Biological Interactions", year: 2022, cites: 25, authors: "Sivakumar B, Kurian GA" },
  { title: "Mitochondria and traffic-related air pollution linked coronary artery calcification", journal: "Reviews on Environmental Health", year: 2021, cites: 12, authors: "Sivakumar B, Kurian GA" },
  { title: "Fisetin Attenuates Myocardial Ischemia-Reperfusion Injury by Activating the RISK Signaling Pathway", journal: "Frontiers in Pharmacology", year: 2021, cites: 49, authors: "Shanmugam K, Boovarahan SR, Prem P, Sivakumar B, Kurian GA" },
];

const research = [
  {
    icon: Heart,
    title: "Hemorrhagic Myocardial Infarction",
    desc: "Investigating pathophysiological mechanisms of hemorrhagic myocardial infarction and heme-driven tissue injury at Indiana University Indianapolis.",
    tags: ["Translational", "Reperfusion injury"],
    metric: { value: "Current", label: "Focus area" },
  },
  {
    icon: Activity,
    title: "Diabetic Cardiomyopathy & NETs",
    desc: "Examined impaired neutrophil extracellular trap (NET) formation and its role in cardiac inflammation and tissue damage.",
    tags: ["Immunology", "NETosis", "Inflammation"],
    metric: { value: "2024–25", label: "Cincinnati" },
  },
  {
    icon: Wind,
    title: "PM2.5 Cardiotoxicity",
    desc: "Designed whole-body PM2.5 exposure systems and characterized mitochondrial, electrophysiological, and vascular damage in rat hearts.",
    tags: ["Air pollution", "Exposure chamber", "ECG"],
    metric: { value: "15+", label: "Papers" },
  },
  {
    icon: Atom,
    title: "Mitochondrial Bioenergetics",
    desc: "Interfibrillar vs. subsarcolemmal isolation, Oxygraph respiration, ETC activity, and oxidative stress profiling.",
    tags: ["IFM / SSM", "Oxygraph", "ETC"],
    metric: { value: "Core", label: "Expertise" },
  },
  {
    icon: Dna,
    title: "Epigenetics & Signaling",
    desc: "DNA methylation, RISK pathway, PI3K/AKT/mTOR/NF-κB axis, and GSK3β modulation for cardioprotection.",
    tags: ["Methylation", "RISK pathway", "PI3K/AKT"],
    metric: { value: "5+", label: "Pathways" },
  },
  {
    icon: FlaskConical,
    title: "Fisetin Pharmacology",
    desc: "Multi-route dosing (IP, IV, SC), pharmacokinetics, and mechanism studies of the flavonoid fisetin in IR injury.",
    tags: ["Pharmacological studies"],
    metric: { value: "7+", label: "Studies" },
  },
];

const experience = [
  { role: "Postdoctoral Research Fellow", org: "Indiana University Indianapolis", dept: "Hemorrhagic myocardial infarction · Heme-driven tissue injury", period: "2025 — Present", location: "Indianapolis, IN", current: true },
  { role: "Postdoctoral Research Fellow", org: "University of Cincinnati", dept: "NET formation in diabetic cardiomyopathy · Cardiac immunology", period: "2024 — 2025", location: "Cincinnati, OH" },
  { role: "Senior Research Fellow (ICMR)", org: "Indian Council of Medical Research", dept: "PM2.5 whole-body exposure · Multi-disease rat models · Langendorff", period: "2023 — 2024", location: "India" },
  { role: "Junior Research Fellow (DST)", org: "Department of Science & Technology", dept: "CRG/2021/000227 · Mitochondrial changes in myocardial IR under DPM exposure", period: "2022", location: "India" },
  { role: "Junior Research Fellow (DST)", org: "Department of Science & Technology", dept: "EMR/2017/000669 · Fisetin: a novel drug in myocardial IR injury", period: "2018 — 2021", location: "India" },
  { role: "Research Intern", org: "Amrita Institute of Medical Sciences", dept: "Nanoscience & Molecular Medicine", period: "2017", location: "India" },
];

const education = [
  { degree: "Ph.D. Biomedical Science", uni: "SASTRA Deemed University", year: "2024", project: "PM2.5 in the respirable air; heart at risk — cardiovascular impact and cardio-protection strategies" },
  { degree: "M.Sc. Human Genetics & Molecular Biology", uni: "Bharathiar University", year: "2018", project: "Cytogenetical & molecular analysis of ApoE gene in Alzheimer's patients" },
  { degree: "B.Sc. Zoology", uni: "Mahatma Gandhi University", year: "2016", project: "Migration patterns of Chestnut-headed Bee-eaters in Kerala" },
];

const honors = [
  { year: "2024", title: "Best PhD Thesis Award in Sciences", org: "SASTRA University, India" },
  { year: "2023", title: "ICMR Senior Research Fellowship", org: "Indian Council of Medical Research" },
  { year: "2018", title: "Third Rank — M.Sc. Program", org: "Bharathiar University, India" },
  { year: "2017", title: "Best Science Magazine Award", org: "Zoological Society of Kerala — Oikos'16" },
  { year: "2016", title: "Editor, Oikos'16 University Magazine", org: "Mahatma Gandhi University" },
  { year: "2013–2016", title: "Best Presenter (3 consecutive years)", org: "Zoological Fest, Kerala" },
];

const workshops = [
  { title: "Cell Culture Techniques", detail: "National workshop with DST-SERB (2023) · 200+ students trained across four years" },
  { title: "Experimental Cardiology Workshop", detail: "2019 · 50+ students · Designed, coordinated, and led demonstrations" },
  { title: "Cell Biology Workshop", detail: "2019 · 50+ students · Planning, execution, and oral presentations" },
  { title: "Research Mentor & TA, SASTRA", detail: "2020–2022 · Mentored 100+ BTech/MTech/MSc students on research projects" },
];

const reviewerJournals = [
  "Cell Communication and Signaling",
  "Diabetology & Metabolic Syndrome",
  "Free Radical Biology and Medicine",
  "Frontiers in Public Health",
  "Phytomedicine",
  "Neurochemical Research",
  "Cardiovascular Toxicology",
  "Journal of Herbal Medicine",
  "Heliyon (Cell Press)",
  "Biomedical Journal of Scientific and Technical Research",
];

const techniques = [
  "Langendorff Isolated Heart",
  "Mitochondrial Isolation (IFM/SSM)",
  "Oxygraph Respiration",
  "ECG & Hemodynamics (LabChart)",
  "Western Blot · Blue Native PAGE",
  "PCR · RT-PCR · ELISA",
  "Immunohistochemistry",
  "Flow Cytometry",
  "Immunofluorescence",
  "TUNEL · Masson's Trichrome · Van-Kossa",
  "PM2.5 Inhalation Chambers",
  "H9C2 · 3T3 · NRK52E · RAW264.7 · HT29",
  "Primary Cardiomyocyte Isolation",
  "Organ Bath Vascular Studies",
  "GraphPad Prism · ImageJ · Biorender",
];

const years = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.4]);

  return (
    <div className="min-h-screen">
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left" style={{ scaleX: progress, backgroundColor: "var(--heart)" }} />
      <Navbar />

      {/* Hero */}
      <section id="top" className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 overflow-hidden">
        <Spotlight />
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsl(var(--foreground)/0.08),transparent)]" />
          <motion.div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
            style={{
              backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black, transparent)",
              y: heroY,
            }}
          />
          <motion.div
            className="absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--heart-soft), transparent 70%)" }}
            animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-20 right-0 h-[500px] w-[500px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--neon-violet), transparent 70%)", opacity: 0.18 }}
            animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--neon-cyan), transparent 70%)", opacity: 0.14 }}
            animate={{ x: [0, 50, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 opacity-60">
            <EKGLine className="h-full w-full" />
          </div>
        </div>

        <motion.div className="max-w-6xl mx-auto" style={{ opacity: heroOpacity }}>
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
            <div>
              {/* Mobile-only premium profile card */}
              <motion.div
                className="lg:hidden mb-8 relative rounded-2xl overflow-hidden border border-[var(--heart)]/30 bg-gradient-to-br from-[var(--heart-soft)] via-card to-card shadow-2xl shadow-[var(--heart-soft)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Smooth breathing glow */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(60% 80% at 30% 0%, var(--heart-soft), transparent 70%)",
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative p-4 flex items-center gap-4">
                  <div className="relative shrink-0">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{ boxShadow: ["0 0 0 0 var(--heart-soft)", "0 0 0 12px transparent"] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-[var(--heart)]/60">
                      <Image src="/bhavana.jpg" alt="Dr. Bhavana Sivakumar" fill sizes="80px" className="object-cover" priority />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider px-2 py-1 rounded-full bg-background/70 border border-[var(--heart)]/40 text-[var(--heart)] mb-1.5">
                      <HeartbeatIcon size={10} /> LIVE · 72 BPM
                    </div>
                    <div className="font-semibold text-sm leading-tight">Dr. Bhavana Sivakumar</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Postdoctoral Fellow</div>
                    <div className="text-[10px] text-muted-foreground/80">Indiana University Indianapolis</div>
                  </div>
                </div>
                <div className="relative grid grid-cols-3 border-t border-border/50 divide-x divide-border/50 bg-background/40">
                  <div className="px-3 py-2.5 text-center">
                    <div className="text-base font-bold tabular-nums text-[var(--heart)]">27<span className="text-xs">+</span></div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">Papers</div>
                  </div>
                  <div className="px-3 py-2.5 text-center">
                    <div className="text-base font-bold tabular-nums text-[var(--heart)]">312</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">Citations</div>
                  </div>
                  <div className="px-3 py-2.5 text-center">
                    <div className="text-base font-bold tabular-nums text-[var(--heart)]">11</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">h-index</div>
                  </div>
                </div>
                <EKGLine className="absolute bottom-0 left-0 right-0 h-6 w-full opacity-30" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Badge variant="secondary" className="mb-6 gap-2 py-1.5 px-3 hidden md:inline-flex">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Postdoctoral Research Fellow · Indiana University Indianapolis
                </Badge>
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
                <TextReveal text="Dr. Bhavana" />
                <br />
                <TextReveal text="Sivakumar, PhD" delay={0.2} />
              </h1>
              <motion.p
                className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Translational cardiometabolic scientist with deep expertise in{" "}
                <span className="text-foreground font-medium">in vivo pharmacology</span>,{" "}
                <span className="text-foreground font-medium">cardiovascular disease models</span>, and{" "}
                <span className="text-foreground font-medium">mitochondrial biology</span>. Proven track record of leading end-to-end experimental programs to uncover disease mechanisms and inform therapeutic target validation. Experienced in integrating physiology, molecular data, and clinical samples to drive translational insights.
              </motion.p>
              <motion.div
                className="mt-4 flex items-center gap-4 text-sm text-muted-foreground flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Indianapolis, IN</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="inline-flex items-center gap-1.5"><Microscope className="h-3.5 w-3.5" /> Indiana University Indianapolis</span>
              </motion.div>
              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Magnetic>
                  <a href="#publications" className={buttonVariants({ size: "lg", className: "rounded-full group" })}>
                    View publications <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="mailto:bhavana95sivakumar@gmail.com" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full" })}>
                    <Mail className="mr-1 h-4 w-4" /> Email
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="https://www.linkedin.com/in/bhavana-sivakumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full hover:text-[#0A66C2] hover:border-[#0A66C2]/40" })}
                  >
                    <Linkedin className="mr-1 h-4 w-4" /> LinkedIn
                  </a>
                </Magnetic>
              </motion.div>
            </div>

            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 40, rotateY: -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <Card className="w-80 border-border/60 shadow-2xl shadow-[var(--heart-soft)] overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[var(--heart-soft)] via-foreground/5 to-transparent">
                  <Image
                    src="/bhavana.jpg"
                    alt="Dr. Bhavana Sivakumar"
                    fill
                    className="object-cover object-center"
                    sizes="320px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                  <EKGLine className="absolute bottom-3 left-0 right-0 h-10 w-full opacity-80" />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-mono tracking-wider px-2 py-1 rounded-full bg-background/80 backdrop-blur border border-[var(--heart)]/40 text-[var(--heart)]">
                    <HeartbeatIcon size={10} /> LIVE · 72 BPM
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <div className="font-semibold text-lg">Dr. Bhavana Sivakumar</div>
                    <div className="text-sm text-muted-foreground">Postdoctoral Research Fellow</div>
                    <div className="text-xs text-muted-foreground">Indiana University Indianapolis</div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground"><GraduationCap className="h-3.5 w-3.5" /> PhD, SASTRA University (2024)</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><BookOpen className="h-3.5 w-3.5" /> 27+ publications</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><Quote className="h-3.5 w-3.5" /> 312 citations · h-index 11</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><Award className="h-3.5 w-3.5" /> Best PhD Thesis, SASTRA 2024</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats */}
          <Stagger className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border">
            {[
              { n: 27, suffix: "+", l: "Publications" },
              { n: 312, suffix: "", l: "Citations" },
              { n: 11, suffix: "", l: "h-index" },
              { n: 30, suffix: "+", l: "Journals reviewed" },
            ].map((s) => (
              <StaggerItem key={s.l} className="bg-background px-6 py-6 group hover:bg-muted/50 transition">
                <div className="text-3xl md:text-4xl font-bold tracking-tight tabular-nums">
                  <CountUp to={s.n} suffix={s.suffix} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-16 sm:py-24 px-5 sm:px-6 border-t">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <FadeIn>
            <div className="text-xs font-mono text-muted-foreground mb-2">01 — ABOUT</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Background</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              A translational researcher bridging molecular pharmacology, mitochondrial biology, and cardiac pathology.
            </p>
          </FadeIn>
          <FadeIn delay={0.15} className="md:col-span-2 space-y-5 text-muted-foreground leading-relaxed">
            <p className="text-foreground text-lg leading-relaxed">
              Dr. Bhavana Sivakumar is a translational cardiovascular researcher whose work bridges
              molecular pharmacology, mitochondrial biology, immunology, and cardiac pathology. Her research
              focuses on understanding the cellular and molecular mechanisms that drive cardiac injury and
              disease progression, with the goal of identifying therapeutic strategies that protect and
              restore heart function.
            </p>
            <p>
              She is currently a Postdoctoral Research Fellow at Indiana University Indianapolis. Her
              current research focuses on understanding the mechanisms by which an iron-containing molecule
              called heme contributes to tissue injury after a hemorrhagic myocardial infarction, a severe
              heart attack where blood seeps through damaged capillaries onto dying heart tissue after blood
              flow is restored to a damaged artery. Her goal is to help scientists identify strategies that
              could reduce or prevent this damage.
            </p>
            <p>
              Previously, at the University of Cincinnati, she investigated immune-mediated mechanisms in
              diabetic cardiomyopathy. Her doctoral research at SASTRA University focused on cardiovascular
              injury and therapeutic intervention, earning her the Best PhD Thesis Award in Sciences in 2024.
            </p>
            <p>
              Across her academic career, Dr. Sivakumar has developed expertise in cardiovascular disease
              models, mitochondrial function, molecular pharmacology, immunology, epigenetics, and
              cell-based research. She has contributed to more than 27 peer-reviewed publications in journals
              including <em>Environmental Pollution</em>, <em>Frontiers in Pharmacology</em>,{" "}
              <em>Phytomedicine</em>, <em>Journal of Environmental Sciences</em>,{" "}
              <em>Cardiovascular Toxicology</em>, <em>Cells</em>, <em>Chemico-Biological Interactions</em>{" "}
              and many others.
            </p>
            <p>
              Her long-term research goal is to advance mechanistic discoveries into clinically meaningful
              interventions that improve outcomes in cardiovascular disease.
            </p>
          </FadeIn>
        </div>

        {/* Techniques marquee */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="text-xs font-mono text-muted-foreground mb-4 text-center">CORE TECHNIQUES</div>
          <Marquee duration={45}>
            {techniques.map((t, i) => (
              <span key={i} className="text-sm text-muted-foreground px-4 py-2 rounded-full border border-border/60 bg-background/50 shrink-0">
                {t}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="py-16 sm:py-24 px-5 sm:px-6 border-t bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-[0.03] text-foreground grain" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--heart)]/50 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <FadeIn className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="text-xs font-mono text-[var(--heart)] mb-2 flex items-center gap-2">
                <HeartbeatIcon size={12} /> 02 — RESEARCH
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Focus areas</h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Six interconnected threads — from the mitochondrion to the whole heart — chasing cardioprotection.
              </p>
            </div>
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles className="h-3 w-3" /> Interdisciplinary
            </Badge>
          </FadeIn>
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {research.map(({ icon: Icon, title, desc, tags, metric }, i) => (
              <StaggerItem key={title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full"
                >
                  <Card className="group relative overflow-hidden border-border/60 transition hover:border-[var(--heart)]/40 hover:shadow-2xl hover:shadow-[var(--heart-soft)] h-full bg-background/70 backdrop-blur">
                    <motion.div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), var(--heart-soft), transparent 60%)",
                      }}
                    />
                    <div className="absolute top-0 left-0 h-full w-[3px] bg-gradient-to-b from-transparent via-[var(--heart)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 p-4 text-7xl font-bold text-foreground/[0.04] font-mono leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <CardHeader className="relative">
                      <div className="flex items-start justify-between">
                        <motion.div
                          className="h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--heart)] to-[var(--heart)]/70 text-white flex items-center justify-center shadow-lg shadow-[var(--heart-soft)]"
                          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.div>
                        <div className="text-right">
                          <div className="text-lg font-bold tabular-nums text-[var(--heart)]">{metric.value}</div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{metric.label}</div>
                        </div>
                      </div>
                      <CardTitle className="text-lg mt-4 group-hover:text-[var(--heart)] transition-colors">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {tags.map((t) => (
                          <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border border-border/80 bg-background/50 text-muted-foreground group-hover:border-[var(--heart)]/30 group-hover:text-foreground transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Experience + Education timeline */}
      <section id="experience" className="py-16 sm:py-24 px-5 sm:px-6 border-t">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-xs font-mono text-muted-foreground mb-2">03 — EXPERIENCE</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">Career journey</h2>
          </FadeIn>
          <div className="relative">
            <motion.div
              className="absolute left-4 top-2 w-px bg-foreground origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: "calc(100% - 1rem)" }}
            />
            <Stagger className="space-y-6">
              {experience.map((e) => (
                <StaggerItem key={e.role + e.org + e.period} className="relative pl-12">
                  <motion.div
                    className="absolute left-0 top-1.5 h-8 w-8 rounded-full border-2 border-border bg-background flex items-center justify-center z-10"
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div
                      className={`h-2 w-2 rounded-full ${e.current ? "bg-emerald-500" : "bg-foreground"}`}
                      animate={e.current ? { scale: [1, 1.6, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <Card className="border-border/60 hover:border-foreground/30 transition">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-base">{e.role}</h3>
                            {e.current && <Badge variant="secondary" className="text-[10px] py-0 h-5">Current</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{e.org}</p>
                          <p className="text-xs text-muted-foreground mt-1">{e.dept}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1 font-mono">
                            <Calendar className="h-3 w-3" /> {e.period}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {e.location}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Education */}
          <FadeIn className="mt-20">
            <div className="text-xs font-mono text-muted-foreground mb-6">EDUCATION</div>
            <div className="grid md:grid-cols-3 gap-4">
              {education.map((ed) => (
                <motion.div key={ed.degree} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-border/60 h-full">
                    <CardContent className="p-5">
                      <div className="text-xs font-mono text-muted-foreground mb-2">{ed.year}</div>
                      <h3 className="font-semibold text-sm leading-snug">{ed.degree}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{ed.uni}</p>
                      <Separator className="my-3" />
                      <p className="text-xs text-muted-foreground italic leading-relaxed">{ed.project}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Publications + Chart */}
      <section id="publications" className="py-16 sm:py-24 px-5 sm:px-6 border-t bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-xs font-mono text-muted-foreground mb-2">04 — PUBLICATIONS</div>
          </FadeIn>
          <FadeIn delay={0.1} className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Research output</h2>
              <p className="mt-2 text-muted-foreground max-w-xl">
                27+ peer-reviewed papers, 312 citations, h-index 11, i10-index 12 — across cardiovascular
                pharmacology, mitochondrial biology, and environmental cardiotoxicology.
              </p>
            </div>
            <Magnetic>
              <a href="https://scholar.google.com/citations?user=1GZzUakAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "rounded-full group" })}>
                Google Scholar <ExternalLink className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </FadeIn>

          {/* Mini stats strip — Google Scholar source of truth */}
          <FadeIn delay={0.12} className="mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden border border-border/60 bg-border">
              {[
                { v: 27, suffix: "+", l: "Peer-reviewed papers" },
                { v: 312, suffix: "", l: "Total citations" },
                { v: 11, suffix: "", l: "h-index" },
                { v: 12, suffix: "", l: "i10-index" },
              ].map((s) => (
                <div key={s.l} className="bg-background px-4 py-4">
                  <div className="text-2xl font-bold tabular-nums"><CountUp to={s.v} suffix={s.suffix} /></div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <Tabs defaultValue="all">
            <TabsList className="flex-wrap h-auto">
              <TabsTrigger value="all">All ({publications.length})</TabsTrigger>
              {years.map((y) => (
                <TabsTrigger key={y} value={String(y)}>
                  {y} <span className="ml-1 text-muted-foreground/70 text-[10px]">·{publications.filter((p) => p.year === y).length}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all" className="mt-6"><PubList pubs={publications} /></TabsContent>
            {years.map((y) => (
              <TabsContent key={y} value={String(y)} className="mt-6"><PubList pubs={publications.filter((p) => p.year === y)} /></TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Honors & Workshops */}
      <section id="honors" className="py-16 sm:py-24 px-5 sm:px-6 border-t relative overflow-hidden">
        {/* Subtle aurora glow behind awards */}
        <motion.div
          aria-hidden
          className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full aurora-bg opacity-[0.08] blur-3xl pointer-events-none"
          animate={{ x: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative">
          <div>
            <FadeIn>
              <div className="text-xs font-mono text-[var(--heart)] mb-2 flex items-center gap-2">
                <HeartbeatIcon size={12} /> 05 — HONORS
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">Awards</h2>
              <p className="text-sm text-muted-foreground mb-6">A lifetime of recognition for excellence in research and academics.</p>
            </FadeIn>
            <Stagger className="space-y-3">
              {honors.map((h, i) => {
                const isFeatured = i === 0;
                return (
                  <StaggerItem key={h.title}>
                    <motion.div
                      whileHover={{ x: 4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Card className={`relative overflow-hidden transition group ${
                        isFeatured
                          ? "border-[var(--heart)]/40 bg-gradient-to-br from-[var(--heart-soft)] via-background to-background shadow-lg shadow-[var(--heart-soft)]"
                          : "border-border/60 hover:border-[var(--heart)]/30"
                      }`}>
                        {isFeatured && (
                          <motion.div
                            aria-hidden
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background: "linear-gradient(120deg, transparent, var(--heart-soft), transparent)",
                              backgroundSize: "200% 100%",
                            }}
                            animate={{ backgroundPosition: ["200% 0%", "-100% 0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                        <CardContent className="p-4 flex items-start gap-4 relative">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                            isFeatured
                              ? "bg-[var(--heart)] text-white border-[var(--heart)] shadow-md shadow-[var(--heart-soft)]"
                              : "bg-foreground/5 border-border group-hover:bg-[var(--heart)]/10 group-hover:border-[var(--heart)]/30"
                          }`}>
                            <Award className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 flex-wrap">
                              <h3 className={`font-semibold text-sm leading-snug ${isFeatured ? "text-[var(--heart)]" : ""}`}>{h.title}</h3>
                              <Badge
                                variant="outline"
                                className={`font-mono text-[10px] shrink-0 ${isFeatured ? "border-[var(--heart)]/40 text-[var(--heart)]" : ""}`}
                              >
                                {h.year}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{h.org}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          <div>
            <FadeIn>
              <div className="text-xs font-mono text-muted-foreground mb-2">06 — TEACHING</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 inline-flex items-center gap-3">
                Workshops <Users className="h-7 w-7" />
              </h2>
            </FadeIn>
            <Stagger className="space-y-3">
              {workshops.map((w) => (
                <StaggerItem key={w.title}>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                    <Card className="border-border/60 hover:border-foreground/30 transition">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0 border border-border">
                          <Beaker className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{w.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{w.detail}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        {/* Reviewer panel */}
        <div className="max-w-6xl mx-auto mt-16">
          <FadeIn>
            <div className="text-xs font-mono text-muted-foreground mb-2">07 — SERVICE</div>
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-6">Peer reviewer</h3>
            <div className="flex flex-wrap gap-2">
              {reviewerJournals.map((j) => (
                <Badge key={j} variant="outline" className="font-normal py-1.5 px-3">{j}</Badge>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24 px-5 sm:px-6 border-t relative overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full aurora-bg opacity-25 blur-3xl -z-10"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        />
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-xs font-mono text-muted-foreground mb-2">08 — CONTACT</div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Let&apos;s collaborate.</h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-lg">
                Open to research collaborations, speaking invitations, and mentorship in
                cardiovascular pharmacology, mitochondrial biology, and environmental cardiotoxicology.
              </p>
              <div className="mt-6 space-y-2 text-sm">
                <a href="mailto:bhavana95sivakumar@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                  <Mail className="h-4 w-4" /> bhavana95sivakumar@gmail.com
                </a>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" /> +1 (314) 901-3563
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> 75 W 18 St, Indianapolis, IN 46202
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <a href="mailto:bhavana95sivakumar@gmail.com" className={buttonVariants({ size: "lg", className: "rounded-full" })}>
                    <Mail className="mr-2 h-4 w-4" /> Send an email
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="https://www.linkedin.com/in/bhavana-sivakumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full hover:text-[#0A66C2] hover:border-[#0A66C2]/40" })}
                  >
                    <Linkedin className="mr-2 h-4 w-4" /> Connect on LinkedIn
                  </a>
                </Magnetic>
              </div>
            </FadeIn>
            <Stagger className="grid sm:grid-cols-2 gap-3">
              <StaggerItem><ContactLink href="https://scholar.google.com/citations?user=1GZzUakAAAAJ&hl=en" label="Google Scholar" desc="Citations & profile" icon={BookOpen} /></StaggerItem>
              <StaggerItem><ContactLink href="https://www.researchgate.net/profile/Bhavana-Sivakumar" label="ResearchGate" desc="Research network" icon={Microscope} /></StaggerItem>
              <StaggerItem><ContactLink href="https://www.linkedin.com/in/bhavana-sivakumar" label="LinkedIn" desc="Active presence · DM open" icon={Linkedin} /></StaggerItem>
              <StaggerItem><ContactLink href="https://loop.frontiersin.org/people/989495/overview" label="Frontiers Loop" desc="Loop profile" icon={Activity} /></StaggerItem>
              <StaggerItem><ContactLink href="https://medicine.iu.edu/" label="IU School of Medicine" desc="Institution" icon={Atom} /></StaggerItem>
              <StaggerItem><ContactLink href="https://www.jpccr.eu/Author-Bhavana-Sivakumar/174696" label="JPCCR" desc="Author page" icon={LinkIcon} /></StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>

      <footer className="border-t py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div>© 2026 Dr. Bhavana Sivakumar, PhD — All rights reserved</div>
          <div className="font-mono text-xs">Built with Next.js · shadcn/ui · Motion</div>
        </div>
      </footer>
    </div>
  );
}

function PubList({ pubs }: { pubs: Pub[] }) {
  const grouped = React.useMemo(() => {
    const m = new Map<number, Pub[]>();
    pubs.forEach((p) => {
      if (!m.has(p.year)) m.set(p.year, []);
      m.get(p.year)!.push(p);
    });
    return Array.from(m.entries()).sort((a, b) => b[0] - a[0]);
  }, [pubs]);

  return (
    <div className="space-y-10">
      {grouped.map(([year, items]) => (
        <FadeIn key={year} y={12}>
          <div className="flex items-center gap-3 mb-3">
            <div className="font-mono text-xs font-semibold text-[var(--heart)] tracking-wider">{year}</div>
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--heart)]/40 to-transparent" />
            <div className="text-xs text-muted-foreground font-mono">{items.length} paper{items.length > 1 ? "s" : ""}</div>
          </div>
          <Stagger className="grid md:grid-cols-2 gap-2">
            {items.map((p) => (
              <StaggerItem key={p.title}>
                <HoverCard>
                  <HoverCardTrigger render={<div />}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="group relative flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-background/60 hover:bg-background hover:border-[var(--heart)]/40 hover:shadow-md hover:shadow-[var(--heart-soft)] transition-all cursor-default h-full"
                    >
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--heart)]/50 group-hover:bg-[var(--heart)] group-hover:scale-150 transition-transform shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-[var(--heart)] transition-colors">
                          {p.title}
                        </h3>
                        <div className="mt-1 text-xs text-muted-foreground italic truncate">{p.journal}</div>
                      </div>
                      <Badge
                        variant="outline"
                        className="shrink-0 font-mono text-[10px] h-5 px-1.5 border-border/60 tabular-nums"
                      >
                        {p.cites !== null ? p.cites : "—"}
                      </Badge>
                    </motion.div>
                  </HoverCardTrigger>
                  {p.authors && (
                    <HoverCardContent className="w-80" side="top">
                      <div className="space-y-1">
                        <div className="text-xs font-mono text-muted-foreground">AUTHORS</div>
                        <div className="text-sm">{p.authors}</div>
                        <Separator className="my-2" />
                        <div className="text-xs text-muted-foreground">
                          <span className="italic">{p.journal}</span> · {p.year}
                          {p.cites !== null && ` · ${p.cites} citations`}
                        </div>
                      </div>
                    </HoverCardContent>
                  )}
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeIn>
      ))}
    </div>
  );
}

function ContactLink({ href, label, desc, icon: Icon }: { href: string; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group block"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="h-full border-border/60 hover:border-foreground/30 hover:shadow-lg transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
              <Icon className="h-4 w-4" />
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground -rotate-45 group-hover:rotate-0 group-hover:text-foreground transition-all duration-300" />
          </div>
          <div className="mt-4 font-semibold text-sm">{label}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
        </CardContent>
      </Card>
    </motion.a>
  );
}
