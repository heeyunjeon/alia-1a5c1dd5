
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import BrandDetails from "@/pages/BrandDetails";
import CollabPage from "@/pages/CollabPage";
import NotFound from "@/pages/NotFound";
import AuthPage from "@/pages/AuthPage";

import "@/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/brand/:brandName" element={<BrandDetails />} />
        <Route path="/brand/:brandName/collab" element={<CollabPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
