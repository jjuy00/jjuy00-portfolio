import "./Projects.css";

const projects = [
  {
    title: "Portfolio v1",
    desc: "프로젝트 한거 넣을예정...",
    tags: ["React", "TypeScript", "Vite"],
  },
  {
    title: "Coming Soon",
    desc: "추가 프로젝트를 앞으로 채워 넣을 예정입니다.",
    tags: [],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="section-label">Projects</div>
      <h2 className="section-title">작업물</h2>
      <div className="projects-grid">
        {projects.map((p) => (
          <article key={p.title} className="project-card">
            <h3 className="card-title">{p.title}</h3>
            <p className="card-desc">{p.desc}</p>
            {p.tags.length > 0 && (
              <div className="card-tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}