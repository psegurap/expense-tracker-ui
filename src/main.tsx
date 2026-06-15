import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Navigate } from "react-router";
import "./index.css";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/protected/ProtectedLayout";
import PageWrapper from "./components/PageWrapper";
import Darhboard from "./pages/Dashboard";
import Categories from "./pages/Categories";

export function pageWrap(title: string, element: React.ReactNode) {
  return <PageWrapper title={title}>{element}</PageWrapper>
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={pageWrap("Login", <Login />)}/>
                <Route path="/register" element={pageWrap("Sign Up",<Register />)} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={pageWrap("Dashboard",<Darhboard />)} />
                    <Route path="/categories" element={pageWrap("Categories",<Categories />)} />
                </Route>
                <Route path="*" element={pageWrap("Not Found",<NotFound />)} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
