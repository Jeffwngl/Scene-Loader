import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Engine } from "../../engine/engine";

interface SidebarProps {
    engine: Engine | null;
}

export default function Sidebar({ engine }: SidebarProps) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggle = (menu: string) => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
    };

    const camera = engine?.getCamera();
    const renderer = engine?.getRenderer();
    const scene = engine?.getScene();

    return (
        <aside
            className="bg-dark text-light border-end border-secondary p-3"
            style={{ width: "280px" }}
        >
            <h5 className="mb-3">Scene</h5>

            <div className="d-grid gap-2">
                <button className="btn btn-outline-light btn-sm text-start">
                    + Add Object
                </button>

                <button className="btn btn-outline-light btn-sm text-start">
                    Background Settings
                </button>

                <div>
                    <button
                        className="btn btn-outline-light btn-sm w-100 text-start"
                        onClick={() => toggle("camera")}
                    >
                        {openMenu === "camera" ? (
                            <ChevronUp size={17} />
                        ) : (
                            <ChevronDown size={17} />
                        )}{" "}
                        Camera Settings
                    </button>
                    {openMenu === "camera" && (
                        <div className="dropdown-menu show position-static bg-dark border-secondary mt-1">
                            <button
                                className="dropdown-item text-light small"
                                onClick={() => camera?.resetTarget()}
                            >
                                Reset Camera
                            </button>
                            <button className="dropdown-item text-light small">
                                Orthographic
                            </button>
                            <button className="dropdown-item text-light small">
                                Perspective
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className="btn btn-outline-light btn-sm w-100 text-start"
                        onClick={() => toggle("lighting")}
                    >
                        {openMenu === "lighting" ? (
                            <ChevronUp size={17} />
                        ) : (
                            <ChevronDown size={17} />
                        )}{" "}
                        Lighting
                    </button>
                    {openMenu === "lighting" && (
                        <div className="dropdown-menu show position-static bg-dark border-secondary mt-1">
                            <button className="dropdown-item text-light small">
                                Add Point Light
                            </button>
                            <button className="dropdown-item text-light small">
                                Add Directional Light
                            </button>
                            <button
                                className="dropdown-item text-light small"
                                onClick={() => {
                                    const s = scene?.getScene();
                                    if (s) renderer?.toggleShadows(s);
                                }}
                            >
                                Toggle Shadows
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className="btn btn-outline-light btn-sm w-100 text-start"
                        onClick={() => toggle("materials")}
                    >
                        {openMenu === "materials" ? (
                            <ChevronUp size={17} />
                        ) : (
                            <ChevronDown size={17} />
                        )}{" "}
                        Materials
                    </button>
                    {openMenu === "materials" && (
                        <div className="dropdown-menu show position-static bg-dark border-secondary mt-1">
                            <button className="dropdown-item text-light small">
                                Material 1
                            </button>
                            <button className="dropdown-item text-light small">
                                Material 2
                            </button>
                            <button className="dropdown-item text-light small">
                                Material 3
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className="btn btn-outline-light btn-sm w-100 text-start"
                        onClick={() => toggle("shaders")}
                    >
                        {openMenu === "shaders" ? (
                            <ChevronUp size={17} />
                        ) : (
                            <ChevronDown size={17} />
                        )}{" "}
                        Shaders
                    </button>
                    {openMenu === "shaders" && (
                        <div className="dropdown-menu show position-static bg-dark border-secondary mt-1">
                            <button className="dropdown-item text-light small">
                                Wireframe
                            </button>
                            <button className="dropdown-item text-light small">
                                Normal Map
                            </button>
                            <button className="dropdown-item text-light small">
                                Depth
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className="btn btn-outline-light btn-sm w-100 text-start"
                        onClick={() => toggle("manageScene")}
                    >
                        {openMenu === "manageScene" ? (
                            <ChevronUp size={17} />
                        ) : (
                            <ChevronDown size={17} />
                        )}{" "}
                        Manage Scene
                    </button>
                    {openMenu === "manageScene" && (
                        <div className="dropdown-menu show position-static bg-dark border-secondary mt-1">
                            <button className="dropdown-item text-light small">
                                Layer 1
                            </button>
                            <button className="dropdown-item text-light small">
                                Layer 2
                            </button>
                        </div>
                    )}
                </div>

                <button className="btn btn-outline-light btn-sm text-start">
                    Import Skybox
                </button>

                <button
                    className="btn btn-outline-light btn-sm text-start"
                    onClick={() => scene?.toggleFloor()}
                >
                    Toggle Floor
                </button>

                <button
                    className="btn btn-danger btn-sm text-start"
                    onClick={() => engine?.clearScene()}
                >
                    Clear Scene
                </button>
            </div>

            <hr className="border-secondary" />

            <small className="text-secondary">
                Drag & drop models into the viewport
            </small>
        </aside>
    );
}
