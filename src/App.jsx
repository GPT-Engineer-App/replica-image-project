import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Pinned from "./pages/Pinned.jsx";
import About from "./pages/About.jsx";
import Pricing from "./pages/Pricing.jsx";
import Contact from "./pages/Contact.jsx";
import EmptyPage from "./pages/EmptyPage.jsx";
import { SupabaseAuthProvider } from "./integrations/supabase/auth.jsx";


function App() {
  return (
    <SupabaseAuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pinned" element={<Pinned />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/empty" element={<EmptyPage />} />
        </Routes>
      </Router>
    </SupabaseAuthProvider>
  );
}

export default App;