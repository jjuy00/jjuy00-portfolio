import "./Hero.css";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="top">
      <div className="hero-text">
        <p className="hello">안녕하세요, 저는 <span className="highlight">박주영</span> 입니다.</p>
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

          <div className="stack-grid">
            <span className="stack-badge stack-react">React</span>
            <span className="stack-badge stack-ts">TypeScript</span>
            <span className="stack-badge stack-js">JavaScript</span>
            <span className="stack-badge stack-tailwind">Tailwind CSS</span>
            <span className="stack-badge stack-zustand">Zustand</span>
            <span className="stack-badge stack-git">Git</span>
            <span className="stack-badge stack-figma">Figma</span>
            <span className="stack-badge stack-map">Map API</span>
          </div>
        </div>
      </div>
    </section>
  );
}