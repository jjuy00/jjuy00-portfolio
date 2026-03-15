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
          사용자 경험을 중요하게 생각하는 프론트엔드 개발자입니다.{" "}
          React와 TypeScript로 좋은 서비스를 만들고 싶습니다.
        </p>
        <button className="cta" onClick={() => scrollTo("projects")}>
          프로젝트 보러가기
        </button>
      </div>

      <div className="hero-orbit">
        <div className="orbit-center" />
        <div className="orbit-ring orbit-ring-1">
          <div className="orbit-pill orbit-1">TypeScript</div>
        </div>
        <div className="orbit-ring orbit-ring-2">
          <div className="orbit-pill orbit-2">React</div>
        </div>
        <div className="orbit-ring orbit-ring-3">
          <div className="orbit-pill orbit-3">Vite</div>
        </div>
      </div>
    </section>
  );
}