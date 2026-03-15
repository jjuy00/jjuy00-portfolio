import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsScene from "./components/ProjectsScene";
import ContactNumber from "./components/ContactNumber";

function App() {
  return (
    <div className="app">
      <div className="bg-orbit" />
      <Navbar />
      <main className="container">
        <Hero />
        <About />
        <ProjectsScene />
        <ContactNumber />
      </main>
    </div>
  );
}

export default App;