import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import { SupabaseAuthProvider } from "./integrations/supabase/auth.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <SupabaseAuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </SupabaseAuthProvider>
  );
}

export default App;
