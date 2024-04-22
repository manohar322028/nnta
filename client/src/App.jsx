import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Notices from "./pages/Notices";
import News from "./pages/News";
import Downloads from "./pages/Downloads";
import Header from "./components/Header";
import Login from "./pages/Login";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/notices" element={<Notices />} />
            <Route path="/news" element={<News />} />
            <Route path="/downloads" element={<Downloads />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
