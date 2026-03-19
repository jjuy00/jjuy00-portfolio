import { useEffect, useRef, useState, useCallback } from "react";
import { PROJECTS } from "./ProjectTypes";
import ProjectModal from "./ProjectModal";
import ProjectCard from "./ProjectCard";
import "./ProjectsScene.css";

const S = 4;          // 픽셀 크기 (고양이 한 칸)
const CAT_PX = 19;    // 고양이 가로 칸 수
const CAT_PY = 18;    // 고양이 세로 칸 수
const CARD_RADIUS = 88;

// 산 능선 높이 계산
function getMountainY(x: number, _w: number, h: number) {
  return (
    h * 0.52 -
    Math.sin(x * 0.009 + 2) * 40 -
    Math.sin(x * 0.025 + 4) * 18
  );
}

// ── 정면 치즈냥 (레퍼런스 사진 스타일) ──
// ox, oy = 고양이 좌상단 기준점
// facingLeft: 왼쪽 이동 시 좌우 반전
function drawPixelCat(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  frame: number,
  _walking: boolean,
  facingLeft: boolean
) {
  // 걸을 때 위아래 bob
  const bob = _walking ? Math.round(Math.sin(frame * 0.22) * 0.8) * S : 0;
  const O = oy + bob;

  ctx.save();
  if (!facingLeft) {
    const catW = CAT_PX * S;
    ctx.translate(ox * 2 + catW, 0);
    ctx.scale(-1, 1);
  }

  // 치즈냥 팔레트
  const Y1 = "#fcc93f"; // 밝은 노랑 (몸)
  const Y2 = "#da9525"; // 중간 음영
  const Y3 = "#a26a16"; // 어두운 줄무늬/발
  const WH = "#FFF8DC"; // 흰 턱/배
  const BK = "#1A1208"; // 검정 눈/코/입
  const PK = "#FFB3CC"; // 귀 안쪽

  const r = (x: number, y: number, w: number, h: number, c: string) => {
    ctx.fillStyle = c;
    ctx.fillRect(ox + x * S, O + y * S, w * S, h * S);
  };

  // ── 꼬리: 오른쪽 옆에서 살랑살랑 ──
  const ts = Math.round(Math.sin(frame * 0.07) * 2.0);
  r(14, 8 + ts,  2, 1, Y2);   // 꼬리 뿌리
  r(15, 6 + ts,  2, 2, Y1);   // 꼬리 중단
  r(16, 4 + ts,  2, 2, Y1);   // 꼬리 상단
  r(15, 3 + ts,  2, 1, WH);   // 꼬리 끝

  // ── 몸통 ──
  r(3, 10, 11, 6, Y1);         // 몸 전체
  r(4, 14, 9,  2, Y2);         // 아래 음영
  r(4.5, 11, 8,  3, WH);         // 배 흰색


  // ── 다리/발 4개 ──
  r(3,  15, 2, 2, Y1); r(3,  16, 2, 1, Y3);  // 왼앞
  r(6,  15, 2, 2, Y1); r(6,  16, 2, 1, Y3);  // 가운데왼
  r(9,  15, 2, 2, Y1); r(9,  16, 2, 1, Y3);  // 가운데오
  r(12, 15, 2, 2, Y1); r(12, 16, 2, 1, Y3);  // 오른앞


  // ── 머리 ──
  r(3,  2, 11, 8, Y1);   // 머리 덩어리
  r(4,  1,  9, 1, Y1);   // 위 라운드
  r(2,  3, 13, 7, Y1);   // 옆 풍성
  // 흰 턱
  r(5,  7,  7, 3, WH);

  // 귀 (뾰족)
  r(3,  0, 2, 3, Y1); r(4,  0, 1, 2, Y2); r(3,  1, 1, 1, PK); // 왼쪽 귀
  r(12, 0, 2, 3, Y1); r(12, 0, 1, 2, Y2); r(13, 1, 1, 1, PK); // 오른쪽 귀

  // 이마 줄무늬 3개
  r(6,  1, 1, 3, Y3);
  r(8,  1, 1, 3, Y3);
  r(10, 1, 1, 3, Y3);

  // ── 눈: 세로 일자 2개 ──
  r(5,  6, 2, 3, BK);   // 왼눈
  r(10, 6, 2, 3, BK);   // 오른눈
  // 하이라이트
  r(5,  6, 1, 1, WH);
  r(10, 6, 1, 1, WH);

  // ── 코 ──
  r(8, 9, 1, 1, Y3);


  // ── 수염: 코 양옆으로 ──
  ctx.fillStyle = Y2;
  // 왼쪽 수염 2줄
  ctx.fillRect(ox + 2 * S, O + 8 * S + 2, 3 * S, 2);
  ctx.fillRect(ox + 2 * S, O + 8 * S + 7, 3 * S, 2);
  // 오른쪽 수염 2줄
  ctx.fillRect(ox + 11.5 * S + 2, O + 8 * S + 2, 3 * S, 2);
  ctx.fillRect(ox + 11.5 * S + 2, O + 8 * S + 7, 3 * S, 2);

  ctx.restore();
}

// ── 초원 + 하늘 + 산 배경 ──
function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  frame: number
) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#bfe8ff");
  sky.addColorStop(0.55, "#e7f7ff");
  sky.addColorStop(1, "#b8e06a");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // 해
  ctx.beginPath();
  ctx.arc(w * 0.82, h * 0.16, 34, 0, Math.PI * 2);
  ctx.fillStyle = "#ffe58f";
  ctx.fill();

  // 구름
  const clouds = [
    { x: w * 0.16 + Math.sin(frame * 0.01) * 6, y: h * 0.14, s: 1.1 },
    { x: w * 0.48 + Math.sin(frame * 0.008 + 2) * 8, y: h * 0.2, s: 0.9 },
    { x: w * 0.72 + Math.sin(frame * 0.009 + 1) * 5, y: h * 0.12, s: 1.2 },
  ];
  clouds.forEach(({ x, y, s }) => {
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.beginPath();
    ctx.arc(x, y, 18 * s, 0, Math.PI * 2);
    ctx.arc(x + 20 * s, y - 4 * s, 22 * s, 0, Math.PI * 2);
    ctx.arc(x + 42 * s, y, 18 * s, 0, Math.PI * 2);
    ctx.arc(x + 20 * s, y + 8 * s, 20 * s, 0, Math.PI * 2);
    ctx.fill();
  });

  // 뒤 산
  ctx.fillStyle = "#99c97a";
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let xi = 0; xi <= w; xi += 6) {
    ctx.lineTo(xi, h * 0.42 - Math.sin(xi * 0.006 + 1.2) * 28 - Math.sin(xi * 0.018 + 0.5) * 16);
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // 메인 산맥
  ctx.fillStyle = "#7fb55d";
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let xi = 0; xi <= w; xi += 6) {
    ctx.lineTo(xi, getMountainY(xi, w, h));
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // 앞 언덕
  ctx.fillStyle = "#9ed448";
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let xi = 0; xi <= w; xi += 6) {
    ctx.lineTo(xi, h * 0.72 - Math.sin(xi * 0.018) * 22 - Math.sin(xi * 0.05 + 1) * 9);
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // 꽃
  const flowers = [
    { rx: 0.05, ry: 0.82, c: "#ff88aa" },
    { rx: 0.13, ry: 0.78, c: "#ffdd44" },
    { rx: 0.22, ry: 0.84, c: "#ff88aa" },
    { rx: 0.31, ry: 0.8,  c: "#aaddff" },
    { rx: 0.48, ry: 0.88, c: "#ff88aa" },
    { rx: 0.57, ry: 0.8,  c: "#ffdd44" },
    { rx: 0.74, ry: 0.86, c: "#ff88aa" },
    { rx: 0.9,  ry: 0.83, c: "#aaddff" },
  ];
  flowers.forEach(({ rx, ry, c }) => {
    const fx = rx * w;
    const fy = ry * h;
    const sw = Math.sin(frame * 0.04 + rx * 12) * 2;
    ctx.strokeStyle = "#3a7a10";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx + sw, fy - 10);
    ctx.stroke();
    ctx.fillStyle = c;
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(fx + sw + Math.cos(a) * 4, fy - 10 + Math.sin(a) * 4, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#ffff88";
    ctx.beginPath();
    ctx.arc(fx + sw, fy - 10, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

// ── 핀 ──
function drawPin(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  active: boolean,
  pulse: number,
  title: string
) {
  if (active) {
    ctx.beginPath();
    ctx.arc(px, py, CARD_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(70,130,169,0.28)";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 7]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  const pinBob = active ? Math.sin(pulse * 0.1) * 3 : 0;
  const pinY = py - 38 + pinBob;

  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.beginPath();
  ctx.ellipse(px, py - 1, 8, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = active ? "#4682A9" : "#749BC2";
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(px, py - 2);
  ctx.lineTo(px, pinY + 13);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(px, pinY, 14, 0, Math.PI * 2);
  ctx.fillStyle = active ? "#4682A9" : "#91C8E4";
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = active ? "white" : "#4a6a8a";
  ctx.font = "bold 10px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("★", px, pinY);

  ctx.fillStyle = active ? "#2a4a6a" : "#4a6a8a";
  ctx.font = "bold 10px sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(title.length > 12 ? title.slice(0, 11) + "…" : title, px, pinY - 20 + pinBob);
}

// ── 컴포넌트 ──
export default function ProjectsScene() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef     = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  const [canvasSize, setCanvasSize]     = useState({ w: 800, h: 420 });
  const [activeId, setActiveId]         = useState<string | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<{ left: string; top: string } | null>(null);
  const [modalProject, setModalProject] = useState<(typeof PROJECTS)[0] | null>(null);

  const catRef = useRef({
    x: 100, y: 260,
    tx: 100, ty: 260,
    frame: 0,
    walking: false,
    facingLeft: false,
    pulse: 0,
    clickX: -1, clickY: -1, clickPulse: 0,
  });

  // 캔버스 크기 반응형
  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setCanvasSize({ w, h: Math.min(440, Math.max(320, w * 0.5)) });
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // 애니메이션 루프
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = canvasSize;

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const s = catRef.current;

      const cards = PROJECTS.map((p) => {
        const ax = p.rx * w;
        const ay = getMountainY(ax, w, h) - 6;
        return { ...p, ax, ay };
      });

      drawBackground(ctx, w, h, s.frame);

      for (const card of cards) {
        const dist = Math.hypot(s.x - card.ax, s.y - card.ay);
        drawPin(ctx, card.ax, card.ay, dist < CARD_RADIUS, s.pulse, card.title);
      }

      // 클릭 리플
      if (s.clickPulse > 0) {
        ctx.save();
        ctx.globalAlpha = (s.clickPulse / 36) * 0.5;
        ctx.beginPath();
        ctx.arc(s.clickX, s.clickY, 8 + (1 - s.clickPulse / 36) * 18, 0, Math.PI * 2);
        ctx.strokeStyle = "#4682A9";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        s.clickPulse--;
      }

      // 고양이 이동
      const dx = s.tx - s.x;
      const dy = s.ty - s.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        const speed = Math.min(3.2, dist * 0.09);
        s.x += (dx / dist) * speed;
        s.y += (dy / dist) * speed;
        s.walking = true;
        s.facingLeft = dx < 0;
      } else {
        s.walking = false;
      }

      s.x = Math.max(20, Math.min(w - 20, s.x));
      const mountainLimit = getMountainY(s.x, w, h) + 38;
      s.y = Math.max(mountainLimit, Math.min(h - 16, s.y));

      // 고양이 크기: CAT_PX * S 너비, CAT_PY * S 높이
      const catW = CAT_PX * S;
      const catH = CAT_PY * S;
      drawPixelCat(ctx, s.x - catW / 2, s.y - catH, s.frame, s.walking, s.facingLeft);

      // 활성 카드 체크
      let found: string | null = null;
      for (const card of cards) {
        if (Math.hypot(s.x - card.ax, s.y - card.ay) < CARD_RADIUS) {
          found = card.id;
          break;
        }
      }
      setActiveId(found);

      // 툴팁 위치 계산
      if (found) {
        const proj = PROJECTS.find((p) => p.id === found);
        const cv = canvasRef.current;
        const ov = outerRef.current;
        if (proj && cv && ov) {
          const cr = cv.getBoundingClientRect();
          const or = ov.getBoundingClientRect();
          const scaleX = cr.width / w;
          const scaleY = cr.height / h;
          setTooltipStyle({
            left: `${cr.left - or.left + proj.rx * w * scaleX}px`,
            top:  `${cr.top  - or.top  + getMountainY(proj.rx * w, w, h) * scaleY - 8}px`,
          });
        }
      } else {
        setTooltipStyle(null);
      }

      s.frame++;
      s.pulse++;
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [canvasSize]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const scaleX = canvasSize.w / rect.width;
      const scaleY = canvasSize.h / rect.height;
      const s = catRef.current;

      const nextX = (e.clientX - rect.left) * scaleX;
      const nextY = (e.clientY - rect.top) * scaleY;
      const minY = getMountainY(nextX, canvasSize.w, canvasSize.h) + 38;

      s.tx = nextX;
      s.ty = Math.max(minY, nextY);
      s.clickX = s.tx;
      s.clickY = s.ty;
      s.clickPulse = 36;
    },
    [canvasSize]
  );

  const activeProject = PROJECTS.find((p) => p.id === activeId) ?? null;

  return (
    <section id="projects" className="section projects-section">
      <div className="section-label">Projects</div>
      <h2 className="section-title">작업물</h2>
      <p className="scene-hint">
        🐱 캔버스를 클릭해 고양이를 이동시키고, 산 봉우리 위 프로젝트 핀 근처에 가면 정보가 나타나요!
      </p>

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

        {activeProject && !modalProject && tooltipStyle && (
          <ProjectCard
            project={activeProject}
            style={tooltipStyle}
            onDetail={() => setModalProject(activeProject)}
          />
        )}
      </div>

      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </section>
  );
}