import "./Experience.css";

interface ExperienceItem {
  year: string;
  title: string;
  desc: string;
  tags?: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    year: "2024",
    title: "SSAFY 수료",
    desc: "삼성청년SW아카데미 수료. 프론트엔드 개발 실무 프로젝트 수행.",
    tags: ["React", "TypeScript", "Vite"],
  },
  {
    year: "2023",
    title: "대구 빅데이터 금융 전문가 과정 수료",
    desc: "금융·보험 데이터 분석 및 금융권 커리어 탐색.",
    tags: ["데이터 분석", "금융"],
  },
  {
    year: "2021",
    title: "공공데이터 청년인턴십",
    desc: "공공데이터 수집 및 처리 실무 경험.",
    tags: ["공공데이터"],
  },
  {
    year: "2017 — 2023",
    title: "영남대학교 수학과 졸업",
    desc: "수학과 주전공, 금융보험 연계전공 이수.",
    tags: ["수학", "금융보험"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="section-label">Experience</div>
      <h2 className="section-title">활동 이력</h2>

      <div className="timeline">
        {EXPERIENCES.map((item, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-left">
              <span className="timeline-year">{item.year}</span>
            </div>

            <div className="timeline-center">
              <div className="timeline-dot" />
              {i < EXPERIENCES.length - 1 && <div className="timeline-line" />}
            </div>

            <div className="timeline-right">
              <div className="timeline-card">
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.desc}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="timeline-tags">
                    {item.tags.map((t) => (
                      <span className="timeline-tag" key={t}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}