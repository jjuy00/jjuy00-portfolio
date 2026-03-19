import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsScene from "./components/ProjectsScene";
import Contact from "./components/Contact";
import Experience from "./components/Experience";

function App() {
  return (
    <div className="app">
      <div className="bg-orbit" />
      <Navbar />
      <main className="container">
        <Hero />
        <About />
        <ProjectsScene />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

export default App;