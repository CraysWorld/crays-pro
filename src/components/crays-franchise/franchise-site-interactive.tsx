"use client";

import {
  ArrowRight,
  BarChart3,
  BellRing,
  BrainCircuit,
  Building2,
  Check,
  CircleDollarSign,
  Cpu,
  DoorOpen,
  FileCheck2,
  KeyRound,
  MapPin,
  Menu,
  Megaphone,
  PencilRuler,
  RadioTower,
  Rocket,
  Shapes,
  Sparkles,
  TrendingUp,
  UserRoundCog,
  UsersRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import styles from "./franchise-site.module.css";

const previewRoot = "/crays-franchise";

type StakeholderSlide = {
  readonly title: string;
  readonly headline: string;
  readonly copy: string;
  readonly href: string;
  readonly cta: string;
  readonly secondaryHref: string | null;
  readonly secondary: string | null;
  readonly image: string;
  readonly alt: string;
  readonly objectPosition: string;
};

function Action({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className={styles.action} href={href}>
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}

export function LegacyHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ["CONCEPTS", "concepts"],
    ["PROPERTY OWNERS", "/real-estate"],
    ["FRANCHISE PARTNERS", "/franchise/deals"],
    ["FUNDING PARTNERS", "/funding-partners"],
    ["INVESTORS", "/investors"],
    ["VENDORS", "/vendor"],
  ];

  return (
    <header className={styles.header}>
      <Link
        href={previewRoot}
        className={styles.brand}
        aria-label="CRAYS Franchise home"
      >
        <Image
          src="/assets/crays-logo-white.svg"
          width={142}
          height={36}
          alt="CRAYS"
          priority
        />
      </Link>
      <div className={styles.headerActions}>
        <Link className={styles.headerLogin} href="/coming-soon">
          LOG IN
          <Image src="/assets/icon-login.svg" width={18} height={18} alt="" />
        </Link>
        <Link
          className={styles.headerPrimary}
          href="/coming-soon"
        >
          SUBMIT PROPERTY
          <Image src="/assets/icon-member.svg" width={21} height={9} alt="" />
        </Link>
        <span className={styles.b2bLabel}>B2B</span>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Open navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className={styles.mobileMenu}>
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href.startsWith("/") ? href : `${previewRoot}/${href}`}
              onClick={() => setOpen(false)}
            >
              {label}
              <ArrowRight />
            </Link>
          ))}
          <Link href="/coming-soon">
            SHARED LOGIN &amp; PORTAL
            <ArrowRight />
          </Link>
        </div>
      ) : null}
    </header>
  );
}

export function StakeholderSlider({
  slides,
}: {
  slides: readonly StakeholderSlide[];
}) {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const previousSlide = slides[(active - 1 + slides.length) % slides.length];
  const nextSlide = slides[(active + 1) % slides.length];
  const activeMatchRole =
    active === 0
      ? "franchise"
      : active === 1
        ? "property"
        : active === 2
          ? "delivery"
          : "finance";
  const select = (index: number) =>
    setActive((index + slides.length) % slides.length);

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(index);
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + slides.length) % slides.length;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % slides.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = slides.length - 1;
    event.preventDefault();
    if (nextIndex !== index) select(nextIndex);
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>(`[data-slider-index="${nextIndex}"]`)
      ?.focus();
  };

  const moveStakeholderLabel = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    event.currentTarget.style.setProperty("--magnetic-x", `${x}px`);
    event.currentTarget.style.setProperty("--magnetic-y", `${y}px`);
  };

  const resetStakeholderLabel = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    event.currentTarget.style.removeProperty("--magnetic-x");
    event.currentTarget.style.removeProperty("--magnetic-y");
  };

  return (
    <section
      id="stakeholders"
      className={`${styles.stakeholderSlider} ${styles.stakeholderStageV2}`}
      aria-labelledby="stakeholder-slider-title"
      aria-roledescription="carousel"
    >
      <div className={styles.stakeholderMatchIntro}>
        <header className={styles.stakeholderMatchHeading}>

          <h2 id="stakeholder-slider-title">
            <span>The right people</span>
            <span>make the place<b className={styles.stakeholderMatchPeriod}>.</b></span>
          </h2>
        </header>
        <div
          className={styles.stakeholderMatchMap}
          data-active-role={activeMatchRole}
          aria-label="Four stakeholder groups connected through the CRAYS matching ecosystem"
        >
          <span className={`${styles.stakeholderMatchConnector} ${styles.stakeholderMatchConnectorProperty}`} aria-hidden="true"><i /></span>
          <span className={`${styles.stakeholderMatchConnector} ${styles.stakeholderMatchConnectorFranchise}`} aria-hidden="true"><i /></span>
          <span className={`${styles.stakeholderMatchConnector} ${styles.stakeholderMatchConnectorFinance}`} aria-hidden="true"><i /></span>
          <span className={`${styles.stakeholderMatchConnector} ${styles.stakeholderMatchConnectorDelivery}`} aria-hidden="true"><i /></span>
          <span className={styles.stakeholderMatchExchange} aria-hidden="true" />
          <span className={`${styles.stakeholderMatchExchange} ${styles.stakeholderMatchExchangeEcho}`} aria-hidden="true" />
          <button
            type="button"
            onClick={() => select(1)}
            onPointerMove={moveStakeholderLabel}
            onPointerLeave={resetStakeholderLabel}
            aria-current={active === 1 ? "true" : undefined}
            aria-controls="stakeholder-slide"
            className={`${styles.stakeholderMatchNode} ${styles.stakeholderMatchNodeProperty}`}
          >
            <small>BRING THE PLACE.</small>
            <strong>PROPERTY OWNERS</strong>
          </button>
          <button
            type="button"
            onClick={() => select(0)}
            onPointerMove={moveStakeholderLabel}
            onPointerLeave={resetStakeholderLabel}
            aria-current={active === 0 ? "true" : undefined}
            aria-controls="stakeholder-slide"
            className={`${styles.stakeholderMatchNode} ${styles.stakeholderMatchNodeFranchise}`}
          >
            <small>RUN THE BUSINESS.</small>
            <strong>FRANCHISE PARTNERS</strong>
          </button>
          <div className={styles.stakeholderMatchCore}>
            <Image src="/assets/crays-mark.svg" width={74} height={86} alt="" />
            <span>MATCHING ECOSYSTEM</span>
          </div>
          <button
            type="button"
            onClick={() => select(3)}
            onPointerMove={moveStakeholderLabel}
            onPointerLeave={resetStakeholderLabel}
            aria-current={active === 3 ? "true" : undefined}
            aria-controls="stakeholder-slide"
            className={`${styles.stakeholderMatchNode} ${styles.stakeholderMatchNodeFinance}`}
          >
            <small>FUND THE GROWTH.</small>
            <strong>FINANCING PARTNERS</strong>
          </button>
          <button
            type="button"
            onClick={() => select(2)}
            onPointerMove={moveStakeholderLabel}
            onPointerLeave={resetStakeholderLabel}
            aria-current={active === 2 ? "true" : undefined}
            aria-controls="stakeholder-slide"
            className={`${styles.stakeholderMatchNode} ${styles.stakeholderMatchNodeDelivery}`}
          >
            <small>DELIVER THE OPENING.</small>
            <strong>OPENING PARTNERS</strong>
          </button>
        </div>
        <div className={styles.stakeholderMatchSupport}>
          <p className={styles.stakeholderMatchStatement}>
            We combine Targomo location intelligence with available commercial
            properties to automatically create a complete franchise business
            case. Every opportunity includes a financial model, business plan
            and concept visualization, and is instantly connected with the
            right construction partners, suppliers, fit-out specialists and
            funding partners.
          </p>
        </div>
      </div>
      <div
        id="stakeholder-slide"
        className={styles.sliderStage}
        role="group"
        aria-roledescription="slide"
        aria-label={`${active + 1} of ${slides.length}: ${slide.title}`}
      >
        <div key={`media-${slide.image}`} className={styles.sliderMedia}>
          <Image
            key={slide.image}
            src={slide.image}
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
            alt={slide.alt}
            style={{ objectPosition: slide.objectPosition }}
          />
          <span aria-hidden="true">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
        <article key={`copy-${slide.headline}`} className={styles.sliderCopy}>
          <p className={styles.sliderRole}>{slide.title}</p>
          <h3>{slide.headline}</h3>
          <p className={styles.sliderDescription}>{slide.copy}</p>
          <div className={styles.sliderActions}>
            <Action href={slide.href}>{slide.cta}</Action>
            {slide.secondaryHref && slide.secondary ? (
              <Link
                className={styles.approvedTextLink}
                href={slide.secondaryHref}
              >
                {slide.secondary}
                <ArrowRight />
              </Link>
            ) : null}
          </div>
          <div
            className={styles.sliderControls}
            aria-label="Stakeholder slider controls"
          >
            <div
              className={styles.sliderDots}
              role="group"
              aria-label="Choose stakeholder"
            >
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={`${styles.sliderDot} ${
                    index === active ? styles.sliderDotActive : ""
                  }`}
                  onClick={() => select(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  aria-label={`${item.title}, slide ${index + 1} of ${slides.length}`}
                  aria-current={index === active ? "true" : undefined}
                  aria-controls="stakeholder-slide"
                  tabIndex={index === active ? 0 : -1}
                  data-slider-index={index}
                />
              ))}
            </div>
            <div className={styles.sliderNavRow}>
              <button
                className={styles.sliderNav}
                type="button"
                onClick={() => select(active - 1)}
                aria-label={`Previous stakeholder: ${previousSlide.title}`}
                aria-controls="stakeholder-slide"
              >
                <ArrowRight
                  className={styles.sliderPreviousIcon}
                  aria-hidden="true"
                />
              </button>
              <button
                className={styles.sliderNav}
                type="button"
                onClick={() => select(active + 1)}
                aria-label={`Next stakeholder: ${nextSlide.title}`}
                aria-controls="stakeholder-slide"
              >
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>
      </div>
      <p
        className={styles.sliderStatus}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Showing {slide.title}, slide {active + 1} of {slides.length}
      </p>
    </section>
  );
}

export type FranchiseFeatureSlide = {
  readonly eyebrow: string;
  readonly title: string;
  readonly copy: string;
  readonly detail?: string;
  readonly href: string;
  readonly cta: string;
  readonly image: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

type FranchiseFeatureNavigation = {
  readonly eyebrow: string;
  readonly title: string;
  readonly copy: string;
  readonly href: string;
  readonly cta: string;
  readonly items: readonly string[];
};

export function FranchiseFeatureSlider({
  id,
  label,
  slides,
  light = false,
  navigation,
}: {
  id: string;
  label: string;
  slides: readonly FranchiseFeatureSlide[];
  light?: boolean;
  navigation?: FranchiseFeatureNavigation;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const dragRef = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 });
  const programmaticTargetRef = useRef<number | null>(null);
  const programmaticTimerRef = useRef<number | null>(null);

  const goTo = (index: number) => {
    const next = (index + slides.length) % slides.length;
    programmaticTargetRef.current = next;
    if (programmaticTimerRef.current) window.clearTimeout(programmaticTimerRef.current);
    setActive(next);
    const rail = railRef.current;
    const card = rail?.children[next] as HTMLElement | undefined;
    if (!rail || !card) return;
    const usesWideComposition = rail.clientWidth >= 900;
    const previousSlidePeek = usesWideComposition
      ? Math.min(320, Math.max(260, rail.clientWidth * 0.28))
      : (rail.clientWidth - card.clientWidth) / 2;
    rail.scrollTo({
      left: next === 0 ? 0 : card.offsetLeft - previousSlidePeek,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const syncActiveSlide = () => {
    const rail = railRef.current;
    if (!rail) return;
    const railBounds = rail.getBoundingClientRect();
    const railAnchor = railBounds.left + rail.clientWidth * (rail.clientWidth >= 900 ? 0.69 : 0.5);
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(rail.children).forEach((card, index) => {
      const bounds = card.getBoundingClientRect();
      const cardAnchor = bounds.left + bounds.width / 2;
      const distance = Math.abs(cardAnchor - railAnchor);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    setActive(nearest);
  };

  const handleSliderScroll = () => {
    const pendingTarget = programmaticTargetRef.current;
    if (pendingTarget === null) {
      syncActiveSlide();
      return;
    }

    if (programmaticTimerRef.current) window.clearTimeout(programmaticTimerRef.current);
    programmaticTimerRef.current = window.setTimeout(() => {
      setActive(pendingTarget);
      programmaticTargetRef.current = null;
      programmaticTimerRef.current = null;
    }, 180);
  };

  const slider = (
    <div className={styles.featureSliderBody}>
      <div
        ref={railRef}
        id={id}
        className={styles.featureSliderRail}
        onScroll={handleSliderScroll}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          const target = event.target as Element;
          if (target.closest("a, button")) return;
          programmaticTargetRef.current = null;
          if (programmaticTimerRef.current) {
            window.clearTimeout(programmaticTimerRef.current);
            programmaticTimerRef.current = null;
          }
          dragRef.current = {
            active: true,
            moved: false,
            startX: event.clientX,
            scrollLeft: event.currentTarget.scrollLeft,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragRef.current.active) return;
          const delta = event.clientX - dragRef.current.startX;
          if (Math.abs(delta) > 5) dragRef.current.moved = true;
          event.currentTarget.scrollLeft = dragRef.current.scrollLeft - delta;
        }}
        onPointerUp={(event) => {
          if (!dragRef.current.active) return;
          dragRef.current.active = false;
          event.currentTarget.releasePointerCapture(event.pointerId);
          syncActiveSlide();
        }}
        onPointerCancel={() => {
          dragRef.current.active = false;
        }}
        onClickCapture={(event) => {
          if (!dragRef.current.moved) return;
          event.preventDefault();
          event.stopPropagation();
          dragRef.current.moved = false;
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            goTo(active + (event.key === "ArrowRight" ? 1 : -1));
          }
          if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            goTo(event.key === "Home" ? 0 : slides.length - 1);
          }
        }}
        tabIndex={0}
      >
        {slides.map((slide, index) => (
          <article
            key={slide.title}
            className={`${styles.featureSlide} ${index === active ? styles.featureSlideActive : ""}`}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => {
              if (!dragRef.current.moved && index !== active) goTo(index);
            }}
          >
            <div className={styles.featureSlideMedia}>
              <Image
                src={slide.image}
                fill
                sizes="(max-width: 700px) 86vw, (max-width: 1100px) 62vw, 46vw"
                alt={slide.alt}
                style={{ objectPosition: slide.objectPosition ?? "50% 50%" }}
              />
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className={styles.featureSlideCopy}>
              <p>{slide.eyebrow}</p>
              <h3>{slide.title}</h3>
              <p>{slide.copy}</p>
              {slide.detail ? <small>{slide.detail}</small> : null}
              <Link href={slide.href}>
                {slide.cta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.featureSliderControls}>
        <div className={styles.featureSliderNav}>
          <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous slide" aria-controls={id}>
            <ArrowRight aria-hidden="true" />
          </button>
          <button type="button" onClick={() => goTo(active + 1)} aria-label="Next slide" aria-controls={id}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
        <div className={styles.featureSliderDots} aria-label="Choose slide">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${slide.title}`}
              aria-current={index === active ? "true" : undefined}
              className={index === active ? styles.featureSliderDotActive : ""}
            />
          ))}
        </div>
        <p aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</p>
      </div>
    </div>
  );

  return (
    <div
      className={`${styles.featureSlider} ${light ? styles.featureSliderLight : ""} ${navigation ? styles.featureSliderWithNavigation : ""}`}
      aria-roledescription="carousel"
      aria-label={label}
    >
      {navigation ? (
        <aside className={styles.featureSliderSide} aria-labelledby={`${id}-title`}>
          <p>{navigation.eyebrow}</p>
          <h2 id={`${id}-title`}>{navigation.title}</h2>
          <p>{navigation.copy}</p>
          <nav aria-label={`${label} sections`}>
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goTo(index)}
                onKeyDown={(event) => {
                  if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
                  event.preventDefault();
                  let next = index;
                  if (event.key === "ArrowUp") next = (index - 1 + slides.length) % slides.length;
                  if (event.key === "ArrowDown") next = (index + 1) % slides.length;
                  if (event.key === "Home") next = 0;
                  if (event.key === "End") next = slides.length - 1;
                  goTo(next);
                  event.currentTarget.parentElement
                    ?.querySelector<HTMLButtonElement>(`[data-feature-navigation="${next}"]`)
                    ?.focus();
                }}
                aria-controls={id}
                aria-current={index === active ? "true" : undefined}
                data-feature-navigation={index}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{navigation.items[index] ?? slide.title}</strong>
              </button>
            ))}
          </nav>
          <Link className={styles.featureSliderSideAction} href={navigation.href}>
            {navigation.cta}
            <ArrowRight aria-hidden="true" />
          </Link>
        </aside>
      ) : null}
      {slider}
    </div>
  );
}

const operatingJourneyPhases = [
  {
    eyebrow: "BEFORE OPENING",
    title: "PLAN WITH CONFIDENCE.",
    summary: "See the right location, market and opportunity before you commit.",
    cta: "EXPLORE THE OPPORTUNITY",
    href: "/coming-soon",
    image: "/assets/images/crays-pro-20261012/operating-0.webp",
    alt: "An operator reviewing the plans and numbers behind a new CRAYS location",
    objectPosition: "48% 50%",
  },
  {
    eyebrow: "OPENING",
    title: "OPEN WITH ONE SHARED PLAN.",
    summary: "Move from approved site to opening day through one connected plan.",
    cta: "SEE HOW OPENING WORKS",
    href: "/coming-soon",
    image: "/assets/images/crays-pro-20261012/operating-1.webp",
    alt: "A team coordinating a CRAYS opening in one shared hospitality workspace",
    objectPosition: "48% 50%",
  },
  {
    eyebrow: "AFTER OPENING",
    title: "RUN & GROW. EVERY DAY.",
    summary: "Keep sales, marketing, service and operations moving as one.",
    cta: "EXPLORE DAILY OPERATIONS",
    href: "/coming-soon",
    image: "/assets/images/crays-pro-20261012/operating-2.webp",
    alt: "A diverse local community growing around a CRAYS business",
    objectPosition: "50% 50%",
  },
] as const;

export function OperatingJourneyStage() {
  const [activePhase,setActivePhase]=useState(1);
  return (
    <section className={styles.operatingJourney} aria-labelledby="operating-journey-title">
      <header className={styles.operatingJourneyHeader}>
        <h2 id="operating-journey-title">
          <span>ONE BUSINESS.</span>
          <strong>
            EVERYTHING YOU NEED TO RUN IT<span>.</span>
          </strong>
        </h2>
      </header>

      <div className={styles.operatingJourneyTimeline} aria-label="Your CRAYS business journey">
        <ol>
          {operatingJourneyPhases.map((phase) => (
            <li key={phase.eyebrow}>
              <span>{phase.eyebrow}</span>
              <i aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.operatingJourneyPanels} onPointerMove={event=>{if(event.pointerType!=="mouse"||!window.matchMedia("(hover:hover) and (pointer:fine)").matches)return;const bounds=event.currentTarget.getBoundingClientRect();setActivePhase(Math.min(2,Math.max(0,Math.floor((event.clientX-bounds.left)/bounds.width*3))));}} onPointerLeave={()=>setActivePhase(1)}>
        {operatingJourneyPhases.map((phase,index) => (
          <article
            key={phase.eyebrow}
            className={styles.operatingJourneyPanel}
            data-active={activePhase===index}
            tabIndex={0} role="button" aria-label={"Show "+phase.eyebrow.toLowerCase()} aria-pressed={activePhase===index}
            onFocus={()=>setActivePhase(index)} onClick={()=>setActivePhase(index)}
            onKeyDown={event=>{if(event.target!==event.currentTarget)return;if(["Enter"," ","ArrowRight","ArrowLeft"].includes(event.key)){event.preventDefault();setActivePhase(event.key==="ArrowRight"?(index+1)%3:event.key==="ArrowLeft"?(index+2)%3:index);}}}
          >
            <Image
              src={phase.image}
              fill
              sizes="(max-width: 900px) 88vw, 50vw"
              quality={95}
              alt={phase.alt}
              style={{ objectPosition: phase.objectPosition }}
            />
            <div className={styles.operatingJourneyShade} aria-hidden="true" />
            <div className={styles.operatingJourneyCopy}>
              <p>{phase.eyebrow}</p>
              <h3>{phase.title}</h3>
              <div className={styles.operatingJourneyDetail}>
                <span>{phase.summary}</span>
                <Link href={phase.href} className={styles.operatingJourneyCta}>
                  {phase.cta}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.operatingJourneyRail}>
        <span>THE PROCESS CONTINUES</span>
        <nav aria-label="Continue through the CRAYS business journey">
          {["SALES", "MARKETING", "TECH", "OPERATIONS"].map((label) => (
            <span key={label}>
              <i aria-hidden="true" />
              <strong>{label}</strong>
            </span>
          ))}
          <ArrowRight aria-hidden="true" />
        </nav>
      </div>
    </section>
  );
}

const connectedWorkdaySteps = [
  { label: "ATTRACT", copy: "Bring the right guests closer with one connected view of every conversation, campaign and opportunity.", icon: UsersRound },
  { label: "SELL & SERVE", copy: "Turn interest into revenue and deliver a guest experience that feels effortless from first contact onward.", icon: BellRing },
  { label: "RUN THE TEAM", copy: "Give your people clear priorities, connected tools and the confidence to keep every day moving.", icon: UserRoundCog },
  { label: "KNOW THE NUMBERS", copy: "See what is working, spot what needs attention and make your next decision with clarity.", icon: BarChart3 },
  { label: "GROW AGAIN", copy: "Turn proven performance into smarter campaigns, stronger loyalty and your next growth move.", icon: TrendingUp },
] as const;

const connectedWorkdayModules = [
  { label: "CRM & MARKETING", copy: "Attract, engage and convert guests.", step: 0 },
  { label: "OPERATIONS", copy: "Run the business day to day.", step: 1 },
  { label: "HR & ERP", copy: "Manage people and back-office processes.", step: 2 },
  { label: "INSIGHTS & LENDING", copy: "See performance clearly and access capital.", step: 3 },
  { label: "SYNC", copy: "Keep systems and data in sync across locations.", step: 4 },
  { label: "PROJECTS & PPM", copy: "Plan openings and initiatives. Track progress and budgets.", step: 2 },
  { label: "DRIVE & COLLABORATION", copy: "Share files, coordinate tasks and keep projects moving.", step: 2 },
] as const;

type GalleryItem = { src: string; alt: string };
const photo = (name: string) => '/assets/images/crays-pro-20261012/' + name + '.webp';

function EditorialGallery({items, active: controlled, onChange, label}: {items: readonly GalleryItem[]; active?: number; onChange?: (index: number)=>void; label: string}) {
  const [internal,setInternal]=useState(0);
  const active=controlled ?? internal;
  const go=(index:number)=>{const next=(index+items.length)%items.length;setInternal(next);onChange?.(next);};
  const start=useRef<number|null>(null);
  return <div className={styles.editorialGallery} aria-roledescription="carousel" aria-label={label}>
    <figure className={styles.editorialGalleryMain} onTouchStart={event=>{start.current=event.touches[0].clientX;}} onTouchEnd={event=>{if(start.current!==null){const delta=event.changedTouches[0].clientX-start.current;if(Math.abs(delta)>45)go(active+(delta<0?1:-1));start.current=null;}}}>
      <Image key={items[active].src} src={items[active].src} fill sizes="(max-width: 760px) 100vw, 60vw" alt={items[active].alt}/>
      <button type="button" className={styles.galleryPrevious} onClick={()=>go(active-1)} aria-label={'Previous image: '+label}><ArrowRight aria-hidden="true"/></button>
      <button type="button" className={styles.galleryNext} onClick={()=>go(active+1)} aria-label={'Next image: '+label}><ArrowRight aria-hidden="true"/></button>
    </figure>
    <div className={styles.editorialGalleryThumbnails}>
      {items.map((item,index)=><button key={item.src} type="button" onClick={()=>go(index)} aria-label={'Show '+item.alt} aria-pressed={active===index}><Image src={item.src} fill sizes="150px" alt=""/></button>)}
      <span aria-live="polite">{String(active+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span>
    </div>
  </div>;
}

const foundationGroups=[
 {label:'ATTRACT & GROW',copy:'CRM · Marketing · Insights',icon:Megaphone,image:'foundation-0',alt:'CRAYS team connecting customers and ideas in a shared workspace'},
 {label:'OPEN & DELIVER',copy:'Projects & PPM · Drive & Collaboration',icon:Cpu,image:'foundation-1',alt:'A team sharing a demonstration at CRAYS'},
 {label:'RUN EVERY DAY',copy:'ERP · HR · Operations',icon:UsersRound,image:'foundation-2',alt:'A CRAYS host welcoming guests with connected tools'},
 {label:'CONTROL & SCALE',copy:'Lending · Sync',icon:BarChart3,image:'foundation-3',alt:'Partners reviewing information together at a CRAYS gathering'},
] as const;
export function DataFoundationGallery(){
 const [active,setActive]=useState(0);
 return <section id="how-it-works" className={styles.proFoundation} aria-labelledby="homepage-how-title"><div className={styles.proFoundationInner}>
   <div className={styles.proFoundationCopy}>
    <p className={styles.proKicker}>HOW CRAYS SUPPORTS THE OPPORTUNITY</p>
    <h2 id="homepage-how-title">100%<br/>DATA-DRIVEN.</h2>
    <h3>BETTER INPUTS.<br/>BETTER BUSINESS DECISIONS.</h3>
    <p>Crays operates its own Kimi K3 AI model on dedicated server-cluster infrastructure at Nebius. This allows us to provide our internal teams, partners and customers with direct access to a powerful professional AI model, fully integrated with our AI Agent infrastructure.</p>
    <p className={styles.foundationPowered}><span>POWERED BY</span> DATA + CRAYS AI</p>
    <div className={styles.foundationChoices} aria-label="Explore the connected CRAYS system">{foundationGroups.map((group,index)=>{const Icon=group.icon;return <button key={group.label} type="button" aria-pressed={active===index} onClick={()=>setActive(index)}><Icon aria-hidden="true"/><span><small>{String(index+1).padStart(2,'0')}</small><strong>{group.label}</strong><em>{group.copy}</em></span><ArrowRight aria-hidden="true"/></button>;})}</div>
   </div>
   <EditorialGallery label="Connected CRAYS system" items={foundationGroups.map(group=>({src:photo(group.image),alt:group.alt}))} active={active} onChange={setActive}/>
 </div></section>;
}

export function ConnectedWorkdayJourney() {
 const [active,setActive]=useState(0);
 const [activeModule,setActiveModule]=useState<string|null>(null);
 const [gallery,setGallery]=useState(0);
 const focusStep=(event:React.KeyboardEvent<HTMLButtonElement>,index:number)=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?4:(index+(event.key==='ArrowRight'?1:-1)+5)%5;setActive(next);setGallery(next);event.currentTarget.parentElement?.querySelector<HTMLButtonElement>('[data-workday-step="'+next+'"]')?.focus();};
 return <section className={styles.proWorkday} aria-labelledby="connected-workday-title">
  <header><p className={styles.proKicker}>THE CRAYS CONNECTED WORKDAY</p><h2 id="connected-workday-title">ONE WORKDAY.<br/>EVERYTHING CONNECTED.</h2></header>
  <div className={styles.proWorkdaySteps} role="tablist" aria-label="Explore the connected workday">{connectedWorkdaySteps.map((step,index)=>{const Icon=step.icon;return <button key={step.label} type="button" role="tab" id={'workday-tab-'+index} aria-controls="workday-panel" tabIndex={active===index?0:-1} aria-selected={active===index} data-workday-step={index} onClick={()=>{setActive(index);setGallery(index);setActiveModule(null);}} onKeyDown={event=>focusStep(event,index)}><Icon aria-hidden="true"/><span><small>{String(index+1).padStart(2,'0')}</small><strong>{step.label}</strong></span></button>;})}</div>
  <div className={styles.proWorkdayBody}>
   <EditorialGallery label="The connected workday" active={gallery} onChange={index=>{setGallery(index);setActive(index);}} items={connectedWorkdaySteps.map((step,index)=>({src:photo('workday-'+index),alt:step.label+' at CRAYS'}))}/>
   <div id="workday-panel" role="tabpanel" aria-labelledby={'workday-tab-'+active}>
    <p className={styles.proWorkdaySummary}>{connectedWorkdaySteps[active].copy}</p>
    <div className={styles.proModuleList}>{connectedWorkdayModules.map(module=><button type="button" key={module.label} aria-pressed={activeModule===module.label} onClick={()=>{setActive(module.step);setGallery(module.step);setActiveModule(module.label);}}><span><strong>{module.label}</strong><small>{module.copy}</small></span><ArrowRight aria-hidden="true"/></button>)}</div>
   </div>
  </div>
  <div className={styles.proAiPair}>
   <Link href="/coming-soon"><Sparkles aria-hidden="true"/><div><h3>ONE CRAYS AI PARTNER.<br/>ACROSS WORK, LIVE &amp; PLAY.</h3><p>Faster answers. Smarter next steps. Personal support wherever your day takes you.</p><strong>POWERED BY <em>OPENCLAW.</em></strong></div><ArrowRight aria-hidden="true"/></Link>
   <Link href="/coming-soon"><BrainCircuit aria-hidden="true"/><div><h3>HERMES LEARNING LAB.<br/>SMARTER WITH EVERY PROVEN EXPERIENCE.</h3><p>Your CRAYS AI Partner becomes more useful every day — while you stay in control.</p><strong>POWERED BY <em>HERMES.</em></strong></div><ArrowRight aria-hidden="true"/></Link>
  </div>
  <Link className={styles.connectedWorkdaySocial} href="/coming-soon"><RadioTower aria-hidden="true"/><span><strong>CRAYS SOCIAL CIRCLE</strong><small>YOUR IDENTITY. YOUR PEOPLE. YOUR PLACE IN THE COMMUNITY. POWERED BY NOSTR.</small></span><b>EXPLORE <ArrowRight aria-hidden="true"/></b></Link>
 </section>;
}


type PropertyOpportunityKey = "property" | "prepared";

const propertyOpportunityViews = {
  property: {
    icon: Building2,
    navLabel: "PROPERTY FIT",
    navCopy: "Find the CRAYS use that earns the next decision.",
    kicker: "MULTI-FORMAT PROPERTY REVIEW",
    title: "DON'T CHOOSE THE FORMAT BEFORE YOU KNOW THE FIT.",
    copy: "CRAYS sits where lifestyle, technology and business are heading next. We build around the way people train, work, connect, eat and spend their time\u2014combining physical spaces, digital experiences, community and smart operations into one future-ready business platform.",
    cta: "INTRODUCE YOUR PROPERTY",
    href: "/coming-soon",
    evidence: [
      { label: "PROPERTY", icon: Building2, copy: "See the space, ownership context and core site facts in one view." },
      { label: "MARKET", icon: MapPin, copy: "Understand who lives, works and spends time around the opportunity." },
      { label: "ACCESS", icon: KeyRound, copy: "See arrival, visibility, catchment and the everyday ease of reaching the place." },
      { label: "TECHNICAL", icon: Cpu, copy: "Review the base conditions that shape cost, design and opening readiness." },
      { label: "FORMAT FIT", icon: Shapes, copy: "Compare Coffee, Retail, Gym and Clubs before committing to one route." },
      { label: "DELIVERY", icon: Rocket, copy: "Connect the approved route with the people and milestones that take it to opening." },
    ],
  },
  prepared: {
    icon: FileCheck2,
    navLabel: "PREPARED DEAL",
    navCopy: "Review one opportunity with the decision material connected.",
    kicker: "PREPARED OPPORTUNITY",
    title: "A BETTER START FOR THE RIGHT OPERATOR.",
    copy: "A released Prepared Deal connects one property, one CRAYS Format and the decision material around it\u2014so a serious candidate can evaluate a real opportunity instead of starting from a blank page.",
    cta: "REVIEW RELEASED OPPORTUNITIES",
    href: "/coming-soon",
    evidence: [
      { label: "PROPERTY", icon: Building2, copy: "Start with a defined property\u2014not an abstract business idea." },
      { label: "MARKET", icon: MapPin, copy: "See the local demand and context behind the selected CRAYS Format." },
      { label: "COMMERCIAL", icon: BarChart3, copy: "Understand the revenue logic, operating model and core assumptions." },
      { label: "FINANCIAL", icon: CircleDollarSign, copy: "Review capital need, economics and the questions still to prove." },
      { label: "DESIGN", icon: PencilRuler, copy: "See how the selected CRAYS Format is intended to take shape in the space." },
      { label: "OPENING", icon: DoorOpen, copy: "Follow the path, responsibilities and milestones from decision to launch." },
    ],
  },
} as const;

export function PropertyOpportunitySwitchboard(){
 const [active,setActive]=useState<PropertyOpportunityKey>('property');
 const [evidence,setEvidence]=useState(0);
 const selected=propertyOpportunityViews[active];
 const keys=Object.keys(propertyOpportunityViews) as PropertyOpportunityKey[];
 const stakeholderBenefits=[
  {label:'PROPERTY OWNERS',title:'TURN SPACE INTO A CLEARER OCCUPANCY PATH.',image:'owner',copy:['Compare the best-fit CRAYS use before committing your asset to one concept.','Surface operator, opening and technical requirements before they become expensive surprises.'],cta:'EXPLORE THE PROPERTY PATH'},
  {label:'INVESTORS',title:'OWN THE UPSIDE. NOT THE DAY-TO-DAY.',image:'investor',copy:['Review the equity opportunity, commercial case, capital need and operator route together.','Follow milestones and open risks while a qualified Operating Partner runs the business.'],cta:'EXPLORE THE INVESTOR PATH'},
  {label:'FINANCING PARTNERS',title:'SEE THE DEBT CASE BEFORE THE CREDIT DECISION.',image:'funding',copy:['Review borrower, use of funds, repayment sources, security context and delivery dependencies.','Keep every lending and credit decision independent, evidenced and fully yours.'],cta:'EXPLORE THE FINANCING PATH'},
 ];
 return <>
  <section className={styles.proOpportunity} aria-labelledby="property-opportunity-title">
   <div role="tablist" className={styles.proOpportunityTabs} aria-label="Choose the opportunity view">{keys.map(key=>{const Icon=propertyOpportunityViews[key].icon;return <button key={key} type="button" role="tab" id={'opportunity-tab-'+key} aria-controls="opportunity-panel" aria-selected={active===key} tabIndex={active===key?0:-1} onClick={()=>{setActive(key);setEvidence(0);}} onKeyDown={event=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){event.preventDefault();const next=key==='property'?'prepared':'property';setActive(next);setEvidence(0);event.currentTarget.parentElement?.querySelector<HTMLButtonElement>('#opportunity-tab-'+next)?.focus();}}}><Icon aria-hidden="true"/><strong>{propertyOpportunityViews[key].navLabel}</strong></button>;})}</div>
   <div id="opportunity-panel" role="tabpanel" aria-labelledby={'opportunity-tab-'+active}>
    <div className={styles.proOpportunityBody}><div>
     <p className={styles.proKicker}>{selected.kicker}</p><h2 id="property-opportunity-title">{selected.title}</h2><p>{selected.copy}</p><Link className={styles.proPrimary} href="/coming-soon">{selected.cta}<ArrowRight aria-hidden="true"/></Link>
    </div><EditorialGallery key={active} label={selected.navLabel+" gallery"} items={active==="prepared"?[{src:photo("property-0"),alt:"A light-filled CRAYS hospitality destination"},{src:photo("property-1"),alt:"The entrance to a CRAYS destination"},{src:photo("property-2"),alt:"Landscaped spaces at CRAYS Forest City"},{src:photo("prepared-3"),alt:"The CRAYS fitness concept in operation"},{src:photo("prepared-4"),alt:"Shared spaces supporting a CRAYS community"},{src:photo("prepared-5"),alt:"A destination bringing people and hospitality together"}]:[{src:photo("fit-0"),alt:"Waterfront buildings and green spaces in Forest City"},{src:photo("fit-1"),alt:"Forest City buildings overlooking the waterfront"},{src:photo("fit-2"),alt:"A coastal development with distinct property formats"},{src:photo("fit-3"),alt:"A CRAYS commercial space with adaptable public areas"},{src:photo("fit-4"),alt:"A CRAYS location ready for sport and community"}]}/></div>
    <div className={styles.proEvidenceChoices} aria-label={selected.navLabel+' evidence families'}>{selected.evidence.map((item,index)=>{const Icon=item.icon;return <button type="button" key={item.label} aria-pressed={evidence===index} onClick={()=>setEvidence(index)}><Icon aria-hidden="true"/><span><small>{String(index+1).padStart(2,'0')}</small><strong>{item.label}</strong></span></button>;})}</div>
    <div className={styles.proEvidenceDescription} role="status"><strong>{selected.evidence[evidence].label}</strong><p>{selected.evidence[evidence].copy}</p></div>
   </div>
  </section>
  <section className={styles.proAudience} aria-label="Prepared opportunity benefits by stakeholder"><div className={styles.proAudienceInner}>{stakeholderBenefits.map(item=><article key={item.label}>
   <div className={styles.proAudienceImage}><Image src={photo(item.image)} fill sizes="(max-width:760px) 100vw, 33vw" alt={item.label==='PROPERTY OWNERS'?'A CRAYS property with adaptable hospitality spaces':item.label==='INVESTORS'?'Partners exchanging ideas at CRAYS':'Business partners meeting in the CRAYS community'}/></div>
   <p className={styles.proKicker}>{item.label}</p><h3>{item.title}</h3><ul>{item.copy.map(copy=><li key={copy}>{copy}</li>)}</ul><Link href="/coming-soon">{item.cta}<ArrowRight aria-hidden="true"/></Link>
  </article>)}</div></section>
 </>;
}


export function PropertyForm() {
  const [done, setDone] = useState(false);

  return (
    <section className={styles.formSection}>
      <div>
        <p className={styles.eyebrow}>PROPERTY INTRODUCTION</p>
        <h1>INTRODUCE THE SPACE.</h1>
        <p>
          Share the first facts needed for a fit conversation. In this local
          preview, nothing is transmitted or stored.
        </p>
      </div>
      {done ? (
        <div className={styles.confirmation}>
          <Check />
          <h2>YOUR PREVIEW IS COMPLETE.</h2>
          <p>
            No information has been sent. Continue to secure CRAYS onboarding
            when you are ready to create a real property relationship.
          </p>
          <Action href="/coming-soon">
            CONTINUE SECURELY
          </Action>
        </div>
      ) : (
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            setDone(true);
          }}
        >
          <label>
            PROPERTY LOCATION
            <input
              required
              name="location"
              placeholder="City, address or asset reference"
            />
          </label>
          <div className={styles.formRow}>
            <label>
              APPROX. SIZE
              <input required name="size" placeholder="m²" inputMode="numeric" />
            </label>
            <label>
              CURRENT USE
              <select required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>Retail</option>
                <option>Office</option>
                <option>Hospitality</option>
                <option>Leisure</option>
                <option>Vacant</option>
                <option>Other</option>
              </select>
            </label>
          </div>
          <label>
            WHAT SHOULD CRAYS KNOW?
            <textarea
              name="note"
              placeholder="Access, frontage, ceiling height, timing or other context"
            />
          </label>
          <button type="submit">
            REVIEW MY INTRODUCTION
            <ArrowRight />
          </button>
          <small>
            Prototype only — no upload, transmission or automated property
            score.
          </small>
        </form>
      )}
    </section>
  );
}
