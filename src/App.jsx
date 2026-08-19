import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// Pages
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import About from './pages/About';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Tools
import HashtagGenerator from './pages/tools/HashtagGenerator';
import QRCodeGenerator from './pages/tools/QRCodeGenerator';
import ImageCompressor from './pages/tools/ImageCompressor';
import ImageCropper from './pages/tools/ImageCropper';
import BackgroundRemover from './pages/tools/BackgroundRemover';
import PDFCompressor from './pages/tools/PDFCompressor';
import FileConverter from './pages/tools/FileConverter';
import PasswordGenerator from './pages/tools/PasswordGenerator';
import ColorPalette from './pages/tools/ColorPalette';
import LoremIpsum from './pages/tools/LoremIpsum';
import JSONFormatter from './pages/tools/JSONFormatter';
import WordCounter from './pages/tools/WordCounter';
import Base64Tool from './pages/tools/Base64Tool';
import CaseConverter from './pages/tools/CaseConverter';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/politica-de-privacidade" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/termos-de-uso" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        
        {/* Tool Routes */}
        <Route path="/tools/hashtag-generator" element={<HashtagGenerator />} />
        <Route path="/tools/qr-code" element={<QRCodeGenerator />} />
        <Route path="/tools/image-compressor" element={<ImageCompressor />} />
        <Route path="/tools/image-cropper" element={<ImageCropper />} />
        <Route path="/tools/background-remover" element={<BackgroundRemover />} />
        <Route path="/tools/pdf-compressor" element={<PDFCompressor />} />
        <Route path="/tools/file-converter" element={<FileConverter />} />
        <Route path="/tools/password-generator" element={<PasswordGenerator />} />
        <Route path="/tools/color-palette" element={<ColorPalette />} />
        <Route path="/tools/lorem-ipsum" element={<LoremIpsum />} />
        <Route path="/tools/json-formatter" element={<JSONFormatter />} />
        <Route path="/tools/word-counter" element={<WordCounter />} />
        <Route path="/tools/base64" element={<Base64Tool />} />
        <Route path="/tools/case-converter" element={<CaseConverter />} />
      </Routes>
      <Footer />
      <SpeedInsights />
      <Analytics />
    </Router>
  );
}

export default App;
