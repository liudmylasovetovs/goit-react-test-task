// src\App.jsx
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const Camper = lazy(() => import("./pages/Camper/Camper"));

const App = () => {
  return (
    <Routes>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path="/" element={Home} />
        <Route exact path="/catalog" element={Catalog} />
        <Route path="/catalog/:id" element={Camper} />
      </Suspense>
    </Routes>
  );
};

export default App;
