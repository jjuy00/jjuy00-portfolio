import { useEffect, useRef, useState, useCallback } from "react";
import "./ProjectsScene.css";

interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  link?: string;
  rx: number;
  ry: number;
}

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Portfolio v1",
    shortDesc: "개인 포트폴리오 사이트",
    fullDesc: "React + TypeScript + Vite로 제작한 개인 포트폴리오 웹사이트입니다. 컴포넌트 분리, Canvas 애니메이션, Radix UI 등을 활용했습니다.",
    tags: ["React", "TypeScript", "Vite", "Radix UI"],
    link: "https://github.com/jjuy00",
    rx: 0.2,  ry: 0.42,
  },
  {
    id: "p2",
    title: "Coming Soon",
    shortDesc: "준비 중인 프로젝트",
    fullDesc: "곧 추가될 프로젝트입니다. 기대해주세요!",
    tags: [],
    rx: 0.42, ry: 0.55,
  },
  {
    id: "p3",
    title: "Coming Soon",
    shortDesc: "준비 중인 프로젝트",
    fullDesc: "곧 추가될 프로젝트입니다. 기대해주세요!",
    tags: [],
    rx: 0.65, ry: 0.42,
  },
  {
    id: "p4",
    title: "Coming Soon",
    shortDesc: "준비 중인 프로젝트",
    fullDesc: "곧 추가될 프로젝트입니다. 기대해주세요!",
    tags: [],
    rx: 0.84, ry: 0.56,
  },
];

const S = 4;
const CARD_RADIUS = 88;

// ── 픽셀 치즈냥 ──
function drawPixelCat(
  ctx: CanvasRenderingContext2D,
  ox: number, oy: number,
  frame: number, walking: boolean, facingLeft: boolean
) {
  const bob = walking ? Math.floor(Math.sin(frame * 0.22)) * S : 0;
  ctx.save();
  if (facingLeft) { ctx.translate(ox * 2 + 13 * S, 0); ctx.scale(-1, 1); }

  const p = (x: number, y: number, col: string) => {
    ctx.fillStyle = col;
    ctx.fillRect(ox + x * S, oy + y * S + bob, S, S);
  };

  const Y="#F5D07A", D="#D4972A", K="#1e1840", P="#ff99bb", W="#ffffff", G="#bbbbbb";

  p(1,0,D); p(2,0,D); p(8,0,D); p(9,0,D);
  p(1,1,Y); p(2,1,Y); p(8,1,Y); p(9,1,Y);
  for(let x=0;x<=11;x++) { p(x,2,Y); p(x,3,Y); }

  const blink = !walking && Math.floor(frame/70)%5===0 && frame%70<6;
  for(let x=0;x<=11;x++) p(x,4,Y);
  if(blink) { p(2,4,D); p(3,4,D); p(7,4,D); p(8,4,D); }
  else { p(2,4,K); p(3,4,K); p(7,4,K); p(8,4,K); p(3,3,W); p(8,3,W); }

  for(let x=0;x<=11;x++) p(x,5,Y);
  p(5,5,P); p(6,5,P);
  for(let x=0;x<=11;x++) p(x,6,Y);
  p(4,6,D); p(5,6,D); p(6,6,D); p(7,6,D);
  p(0,4,G); p(0,5,G); p(11,4,G); p(11,5,G);

  for(let x=1;x<=10;x++) p(x,7,Y);
  for(let x=0;x<=11;x++) p(x,8,Y);
  p(2,8,D); p(3,8,D); p(7,8,D); p(8,8,D);
  for(let x=0;x<=11;x++) p(x,9,Y);

  const tailSw = Math.floor(Math.sin(frame * 0.07) * 1.5);
  p(11,8,Y); p(12,7,Y); p(13,6+tailSw,D); p(13,5+tailSw,D); p(12,4+tailSw,Y);

  const legL = Math.sin(frame * 0.22) > 0;
  p(2,10,Y); p(3,10,Y); p(8,10,Y); p(9,10,Y);
  if(walking) { p(2,11,legL?D:Y); p(3,11,legL?Y:D); p(8,11,legL?Y:D); p(9,11,legL?D:Y); }
  else { p(2,11,Y); p(3,11,Y); p(8,11,Y); p(9,11,Y); }

  ctx.restore();
}

// ── 초원 배경 ──
function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const base = ctx.createLinearGradient(0, 0, 0, h);
  base.addColorStop(0, "#b8e06a");
  base.addColorStop(1, "#68aa18");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#8cc838";
  ctx.beginPath(); ctx.moveTo(0, h);
  for(let xi=0;xi<=w;xi+=6)
    ctx.lineTo(xi, h*0.52 - Math.sin(xi*0.009+2)*40 - Math.sin(xi*0.025+4)*18);
  ctx.lineTo(w,h); ctx.closePath(); ctx.fill();

  ctx.fillStyle = "#9ed448";
  ctx.beginPath(); ctx.moveTo(0, h);
  for(let xi=0;xi<=w;xi+=6)
    ctx.lineTo(xi, h*0.62 - Math.sin(xi*0.012+1.5)*28 - Math.sin(xi*0.035+2)*12);
  ctx.lineTo(w,h); ctx.closePath(); ctx.fill();

  ctx.fillStyle = "#aedc55";
  ctx.beginPath(); ctx.moveTo(0, h);
  for(let xi=0;xi<=w;xi+=6)
    ctx.lineTo(xi, h*0.72 - Math.sin(xi*0.018)*22 - Math.sin(xi*0.05+1)*9);
  ctx.lineTo(w,h); ctx.closePath(); ctx.fill();

  ctx.fillStyle = "#6aa020";
  for(let gx=0;gx<w;gx+=9) {
    const gh = 6 + Math.sin(gx*0.35+frame*0.03)*3;
    const gy = h*0.72 - Math.sin(gx*0.018)*22 - Math.sin(gx*0.05+1)*9;
    ctx.fillRect(gx, gy-gh, 2, gh);
  }

  const flowers = [
    {rx:0.05,ry:0.5, c:"#ff88aa"}, {rx:0.13,ry:0.7, c:"#ffdd44"},
    {rx:0.22,ry:0.58,c:"#ff88aa"}, {rx:0.31,ry:0.78,c:"#aaddff"},
    {rx:0.4, ry:0.55,c:"#ffdd44"}, {rx:0.48,ry:0.74,c:"#ff88aa"},
    {rx:0.57,ry:0.63,c:"#ffdd44"}, {rx:0.66,ry:0.8, c:"#aaddff"},
    {rx:0.74,ry:0.56,c:"#ff88aa"}, {rx:0.83,ry:0.73,c:"#ffdd44"},
    {rx:0.92,ry:0.52,c:"#aaddff"}, {rx:0.97,ry:0.82,c:"#ff88aa"},
    {rx:0.08,ry:0.85,c:"#ffdd44"}, {rx:0.35,ry:0.88,c:"#ff88aa"},
    {rx:0.6, ry:0.9, c:"#aaddff"}, {rx:0.85,ry:0.87,c:"#ffdd44"},
  ];
  flowers.forEach(({rx,ry,c}) => {
    const fx=rx*w, fy=ry*h, sw=Math.sin(frame*0.04+rx*12)*2;
    ctx.strokeStyle="#3a7a10"; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(fx,fy); ctx.lineTo(fx+sw,fy-10); ctx.stroke();
    ctx.fillStyle=c;
    for(let i=0;i<5;i++) {
      const a=(i/5)*Math.PI*2;
      ctx.beginPath(); ctx.arc(fx+sw+Math.cos(a)*4,fy-10+Math.sin(a)*4,3.5,0,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle="#ffff88";
    ctx.beginPath(); ctx.arc(fx+sw,fy-10,2.5,0,Math.PI*2); ctx.fill();
  });
}

// ── 핀 ──
function drawPin(
  ctx: CanvasRenderingContext2D,
  px: number, py: number,
  active: boolean, pulse: number, title: string
) {
  if(active) {
    ctx.beginPath(); ctx.arc(px,py,CARD_RADIUS,0,Math.PI*2);
    ctx.strokeStyle="rgba(70,130,169,0.28)"; ctx.lineWidth=2;
    ctx.setLineDash([5,7]); ctx.stroke(); ctx.setLineDash([]);
  }
  const pinBob = active ? Math.sin(pulse*0.1)*3 : 0;
  const pinY = py - 38 + pinBob;

  ctx.fillStyle="rgba(0,0,0,0.12)";
  ctx.beginPath(); ctx.ellipse(px,py-1,8,3,0,0,Math.PI*2); ctx.fill();

  ctx.strokeStyle=active?"#4682A9":"#749BC2"; ctx.lineWidth=2.5; ctx.lineCap="round";
  ctx.beginPath(); ctx.moveTo(px,py-2); ctx.lineTo(px,pinY+13); ctx.stroke();

  ctx.beginPath(); ctx.arc(px,pinY,14,0,Math.PI*2);
  ctx.fillStyle=active?"#4682A9":"#91C8E4"; ctx.fill();
  ctx.strokeStyle="white"; ctx.lineWidth=2.5; ctx.stroke();

  ctx.fillStyle=active?"white":"#4a6a8a";
  ctx.font="bold 10px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText("★", px, pinY);

  ctx.fillStyle=active?"#2a4a6a":"#4a6a8a";
  ctx.font="bold 10px sans-serif"; ctx.textBaseline="alphabetic";
  ctx.fillText(title.length>12?title.slice(0,11)+"…":title, px, pinY-20+pinBob);
}

// ── 컴포넌트 ──
export default function ProjectsScene() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef     = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  const [canvasSize,   setCanvasSize]   = useState({ w: 800, h: 420 });
  const [activeId,     setActiveId]     = useState<string | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<{ left: string; top: string } | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const catRef = useRef({
    x:100, y:260, tx:100, ty:260,
    frame:0, walking:false, facingLeft:false,
    pulse:0, clickX:-1, clickY:-1, clickPulse:0,
  });

  // 캔버스 크기 반응형
  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      setCanvasSize({ w, h: Math.min(440, Math.max(320, w * 0.5)) });
    });
    if(containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // 애니메이션 루프
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    if(!ctx) return;
    const { w, h } = canvasSize;

    function loop() {
      if(!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const s = catRef.current;
      const cards = PROJECTS.map(p => ({ ...p, ax: p.rx*w, ay: p.ry*h }));

      drawBackground(ctx, w, h, s.frame);

      for(const card of cards) {
        const dist = Math.hypot(s.x-card.ax, s.y-card.ay);
        drawPin(ctx, card.ax, card.ay, dist < CARD_RADIUS, s.pulse, card.title);
      }

      // 클릭 리플
      if(s.clickPulse > 0) {
        ctx.save(); ctx.globalAlpha = (s.clickPulse/36)*0.5;
        ctx.beginPath(); ctx.arc(s.clickX, s.clickY, 8+(1-s.clickPulse/36)*18, 0, Math.PI*2);
        ctx.strokeStyle="#4682A9"; ctx.lineWidth=2; ctx.stroke();
        ctx.restore(); s.clickPulse--;
      }

      // 고양이 이동
      const dx=s.tx-s.x, dy=s.ty-s.y, dist=Math.hypot(dx,dy);
      if(dist > 3) {
        const speed = Math.min(3.2, dist*0.09);
        s.x += dx/dist*speed; s.y += dy/dist*speed;
        s.walking = true; s.facingLeft = dx < 0;
      } else { s.walking = false; }

      s.x = Math.max(20, Math.min(w-20, s.x));
      s.y = Math.max(40, Math.min(h-16, s.y));

      drawPixelCat(ctx, s.x-7*S, s.y-12*S, s.frame, s.walking, s.facingLeft);

      // 활성 카드 체크
      let found: string | null = null;
      for(const card of cards) {
        if(Math.hypot(s.x-card.ax, s.y-card.ay) < CARD_RADIUS) { found=card.id; break; }
      }
      setActiveId(found);

      // 툴팁 위치 계산 — ref 접근은 여기(effect 안 rAF 콜백)에서만
      if(found) {
        const proj = PROJECTS.find(p => p.id === found);
        const cv   = canvasRef.current;
        const ov   = outerRef.current;
        if(proj && cv && ov) {
          const cr = cv.getBoundingClientRect();
          const or = ov.getBoundingClientRect();
          const scaleX = cr.width  / w;
          const scaleY = cr.height / h;
          setTooltipStyle({
            left: `${cr.left - or.left + proj.rx * w * scaleX}px`,
            top:  `${cr.top  - or.top  + proj.ry * h * scaleY - 8}px`,
          });
        }
      } else {
        setTooltipStyle(null);
      }

      s.frame++; s.pulse++;
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [canvasSize]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = canvasSize.w / rect.width;
    const scaleY = canvasSize.h / rect.height;
    const s = catRef.current;
    s.tx = (e.clientX - rect.left) * scaleX;
    s.ty = (e.clientY - rect.top)  * scaleY;
    s.clickX = s.tx; s.clickY = s.ty; s.clickPulse = 36;
  }, [canvasSize]);

  const activeProject = PROJECTS.find(p => p.id === activeId) ?? null;

  return (
    <section id="projects" className="section projects-section">
      <div className="section-label">Projects</div>
      <h2 className="section-title">작업물</h2>
      <p className="scene-hint">🐱 캔버스를 클릭해 고양이를 이동시키고, 핀 근처에 가면 프로젝트 정보가 나타나요!</p>

      {/* outerRef: 툴팁 absolute 기준 (overflow visible) */}
      <div className="scene-outer" ref={outerRef}>
        <div className="scene-wrap" ref={containerRef}>
          <canvas
            ref={canvasRef}
            width={canvasSize.w}
            height={canvasSize.h}
            className="scene-canvas"
            onClick={handleClick}
          />
        </div>

        {/* 툴팁: scene-outer 기준 절대 위치 → 캔버스 밖으로 넘쳐도 안 잘림 */}
        {activeProject && !modalProject && tooltipStyle && (
          <div
            className="tooltip-card"
            key={activeProject.id}
            style={tooltipStyle}
          >
            <p className="tooltip-title">{activeProject.title}</p>
            <p className="tooltip-desc">{activeProject.shortDesc}</p>
            <button className="tooltip-btn" onClick={() => setModalProject(activeProject)}>
              자세히 보기 →
            </button>
          </div>
        )}
      </div>

      {/* 모달 */}
      {modalProject && (
        <div className="modal-backdrop" onClick={() => setModalProject(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalProject(null)}>✕</button>
            <div className="modal-icon">🐱</div>
            <h3 className="modal-title">{modalProject.title}</h3>
            <p className="modal-desc">{modalProject.fullDesc}</p>
            {modalProject.tags.length > 0 && (
              <div className="modal-tags">
                {modalProject.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            )}
            {modalProject.link && (
              <a className="modal-link" href={modalProject.link} target="_blank" rel="noreferrer">
                GitHub에서 보기 →
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}