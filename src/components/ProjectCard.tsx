import type { Project } from "./ProjectTypes";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  style: { left: string; top: string };
  onDetail: () => void;
}

export default function ProjectCard({ project, style, onDetail }: ProjectCardProps) {
  return (
    <div className="tooltip-card" key={project.id} style={style}>
      <p className="tooltip-title">{project.title}</p>
      <p className="tooltip-desc">{project.shortDesc}</p>
      <button className="tooltip-btn" onClick={onDetail}>
        자세히 보기 →
      </button>
    </div>
  );
}