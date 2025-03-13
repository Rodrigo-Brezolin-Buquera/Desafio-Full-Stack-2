import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const UserPage = lazy(() => import("../pages/UserPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage"));

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
