import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, MemoryRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LineStatus from "./pages/Line/LineStatus";

import "./index.css";
import AronStatus from "./pages/Aron/AronStatus";
import EditPhoneInfo from "./components/EditPhoneInfo/EditPhoneInfo";
import CreateOwner from "./pages/Create/CreateOwner";
import CreateAron from "./pages/Create/CreateAron";
import CreatePhoneLine from "./pages/Create/CreatePhoneLine";
import Admin from "./pages/Admin/Admin";
import OwnerStatus from "./pages/Owner/Owner"
import NotFound from "./pages/404/404";
import Phonecard from "./components/PhoneCard/Phonecard";

ReactDOM.createRoot(document.getElementById("bruv")!).render(
  <React.StrictMode>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="line/:line" element={<LineStatus />} />
          <Route path="aron/:aron" element={<AronStatus />} />
          <Route path="owner/:owner" element={<OwnerStatus />} />

          <Route path="createOwner" element={<CreateOwner />} />
          <Route path="createAron" element={<CreateAron />} />
          <Route path="createPhone" element={<CreatePhoneLine />} />
          <Route path="admin" element={<Admin />} />
          <Route path="404" element={<NotFound />} />
        </Route>
      </Routes>
    </MemoryRouter>
  </React.StrictMode>
);
