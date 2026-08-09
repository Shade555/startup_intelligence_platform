import Navbar from "@/app/components/Navbar";
import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <video className="home-video" autoPlay muted loop>
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="home-overlay"></div>
      </div>
      <Navbar />
      <div className="home-content"></div>
    </>
  );
}
