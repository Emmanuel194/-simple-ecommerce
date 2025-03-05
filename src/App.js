import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductManagement from "./pages/ProductManagement";
import PurchasePage from "./pages/PurchasePage";
import PaymentsPage from "./pages/PaymentsPage";
import SalesStatistics from "./pages/SalesStatistics";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductManagement />} />
      <Route path="/comprar/:id" element={<PurchasePage />} />
      <Route path="/pagamentos" element={<PaymentsPage />} />
      <Route path="/statistics" element={<SalesStatistics />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;
