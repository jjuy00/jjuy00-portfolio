import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="bg-orbit" />

      <main className="container">
        <header className="header">
          <div className="logo">로고뭐하지</div>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section className="hero" id="top">
          <div className="hero-text">
            <p className="hello">안녕하세요, 저는 박주영 입니다.</p>
            <p className="role">Frontend</p>
            <p className="desc">
              소개적기
            </p>
            <button
              className="cta"
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              프로젝트 보러가기
            </button>
          </div>

          <div className="hero-orbit">
            <div className="orbit-center" />
            <div className="orbit-pill orbit-1">TypeScript</div>
            <div className="orbit-pill orbit-2">React</div>
            {/* <div className="orbit-pill orbit-3">Data</div> */}
          </div>
        </section>

        <section id="about" className="section">
          <h2>About</h2>
          <p>
            제작중...
          </p>
        </section>

        <section id="projects" className="section">
          <h2>Projects</h2>
          <div className="projects-grid">
            <article className="project-card">
              <h3>Portfolio v1</h3>
              <p>프로젝트 한거 넣을예정...</p>
            </article>
            <article className="project-card">
              <h3>Coming Soon</h3>
              <p>추가 프로젝트를 앞으로 채워 넣을 예정입니다.</p>
            </article>
          </div>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>
            GitHub:{" "}
            <a href="https://github.com/jjuy00" target="_blank" rel="noreferrer">
              jjuy00
            </a>
          </p>
          <p>Email: pjy7244@gmail.com</p>
        </section>
      </main>
    </div>
  );
}

export default App;
