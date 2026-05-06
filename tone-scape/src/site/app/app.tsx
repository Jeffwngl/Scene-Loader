import { useEffect, useState } from "react";

import Navbar from "../components/navBar";
import Sidebar from "../components/sideBar";
import { initThree, enableDragDrop } from "../../engine/utils/setupScene";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./app.css";

let initialized = false;

export default function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // container drag effect
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    const container = document.getElementById("three-container");
    if (!container) return;

    initThree(container);
    enableDragDrop(() => setModelLoaded(true));

    // Wire up drag state for the overlay highlight
    const canvas = container.querySelector("canvas")!;
    let counter = 0;
    canvas.addEventListener("dragenter", () => {
      counter++;
      setIsDragging(true);
    });
    canvas.addEventListener("dragleave", () => {
      if (--counter <= 0) {
        setIsDragging(false);
        counter = 0;
      }
    });
    canvas.addEventListener("drop", () => {
      setIsDragging(false);
      counter = 0;
    });
  }, []);

  return (
    <div className="d-flex flex-column vh-100">
      {/* Top Navbar */}
      <Navbar />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Canvas */}
        <main className="flex-grow-1 bg-dark position-relative">
          {!modelLoaded && (
            <div
              className="
              position-absolute top-50 start-50 translate-middle
              text-center text-white
              p-3
              bg-dark bg-opacity-50
              rounded
              pointer-events-none
            "
              style={{ zIndex: 10 }}
            >
              <h5 className="mb-1">Drag & Drop Your Model Here</h5>
              <small className="text-secondary">
                .glb / .gltf files supported
              </small>
            </div>
          )}
          <div
            id="three-container"
            className={isDragging ? "drag-active" : ""}
            style={{ width: "100%", height: "100%" }}
          />
        </main>
      </div>
    </div>
  );
}
