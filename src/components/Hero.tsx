import { useState } from "react";
import "./Hero.css";

interface Stack {
  label: string;
  level: "하" | "중" | "상";
  levelNum: 1 | 2 | 3;
  cls: string;
}

const STACKS: Stack[] = [
  { label: "React",        level: "하", levelNum: 1, cls: "stack-react"    },
  { label: "TypeScript",   level: "중", levelNum: 2, cls: "stack-ts"       },
  { label: "JavaScript",   level: "중", levelNum: 2, cls: "stack-js"       },
  { label: "Tailwind CSS", level: "하", levelNum: 1, cls: "stack-tailwind" },
  { label: "Zustand",      level: "하", levelNum: 1, cls: "stack-zustand"  },
  { label: "Git",          level: "중", levelNum: 2, cls: "stack-git"      },
  { label: "Figma",        level: "중", levelNum: 2, cls: "stack-figma"    },
  { label: "데이터 분석",  level: "중", levelNum: 2, cls: "stack-data"     },
];

const LEVEL_LABEL = { 1: "하", 2: "중", 3: "상" } as const;

export default function Hero() {
  const [expanded, setExpanded] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="top">
      <div className="hero-text">
        <p className="hello">
          안녕하세요, 저는 <span className="highlight">박주영</span> 입니다.
        </p>
        <p className="role">Frontend Developer</p>
        <p className="desc">
          수학을 전공하며 데이터 기반 문제 해결에 관심을 가지게 되었고,
          AI 및 데이터 분석 프로젝트를 경험하며 개발에 흥미를 느껴 프론트엔드 개발을 시작했습니다.
          React와 TypeScript를 기반으로 사용자 경험과 데이터를 함께 고려하는 서비스를 만들고자 합니다.
        </p>
        <button className="cta" onClick={() => scrollTo("projects")}>
          프로젝트 보러가기
        </button>
      </div>

      <div className="hero-stack-board">
        <div className="stack-board">
          <div className="stack-board-header">
            <span className="dot pink" />
            <span className="dot yellow" />
            <span className="dot blue" />
            <p>Tech Stacks</p>
          </div>

          {/* 뱃지 목록 */}
          <div className="stack-grid">
            {STACKS.map((s) => (
              <div className={`stack-badge ${s.cls}`} key={s.label}>
                <span className="stack-name">{s.label}</span>
                <div className="stack-tooltip">
                  <span className="tooltip-label">숙련도</span>
                  <div className="tooltip-bars">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className={`tooltip-bar ${n <= s.levelNum ? "filled" : ""}`}
                      />
                    ))}
                  </div>
                  <span className="tooltip-level">{LEVEL_LABEL[s.levelNum]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 펼쳐보기 버튼 */}
          <button
            className="expand-btn"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            <span>{expanded ? "접기" : "한눈에 보기"}</span>
            <svg
              className={`expand-icon ${expanded ? "rotated" : ""}`}
              width="14" height="14" viewBox="0 0 14 14" fill="none"
            >
              <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* 펼쳐지는 숙련도 패널 */}
          <div className={`skill-panel ${expanded ? "open" : ""}`}>
            <div className="skill-panel-inner">
              {STACKS.map((s) => (
                <div className="skill-row" key={s.label}>
                  <span className={`skill-name ${s.cls}-text`}>{s.label}</span>
                  <div className="skill-bar-track">
                    <div
                      className={`skill-bar-fill ${s.cls}-fill`}
                      style={{ width: `${(s.levelNum / 3) * 100}%` }}
                    />
                  </div>
                  <span className="skill-level-tag">{s.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}