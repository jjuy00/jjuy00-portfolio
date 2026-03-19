import type { Project } from "./ProjectTypes";
import "./ProjectModal.css";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="닫기">
          ✕
        </button>
        <div className="modal-icon">🐱</div>
        <h3 className="modal-title">{project.title}</h3>
        <p className="modal-desc">{project.fullDesc}</p>

        {project.tags.length > 0 && (
          <div className="modal-tags">
            {project.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        )}

        {project.link && (
          <a
            className="modal-link"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            GitHub에서 보기 →
          </a>
        )}
      </div>
    </div>
  );
}