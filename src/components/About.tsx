import "./About.css";

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-label">About</div>
      <h2 className="section-title">저를 소개합니다</h2>
      <p className="about-body ">
        저는 사용자 입장에서 서비스를 바라보는 것을 중요하게 생각합니다.
        단순히 기능을 구현하는 것에 그치지 않고,
        사용자가 어떤 흐름에서 불편함을 느끼는지 고민합니다.

        또한 데이터를 통해 문제의 원인을 파악하고,
        이를 바탕으로 더 직관적인 화면과 흐름을 만드는 과정에 흥미를 느낍니다.

        앞으로는 사용자 경험과 데이터를 함께 고려하며
        더 설득력 있는 서비스를 만드는 개발자로 성장하고 싶습니다.
      </p>
      <div className="about-tags">
        <span className="about-tag">사용자 경험 중심</span>
        <span className="about-tag">데이터 기반 사고</span>
        <span className="about-tag">직관적인 UI</span>
      </div>
    </section>
  );
}