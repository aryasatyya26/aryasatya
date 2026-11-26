import React from "react";
import { createRoot } from "react-dom/client";
import KnowledgeOdyssey from "./KnowledgeOdyssey.jsx";
import "../index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Knowledge Odyssey root element was not found.");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <KnowledgeOdyssey />
  </React.StrictMode>,
);
