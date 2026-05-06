import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Scene } from "./scene";

class Loader {
    private loader = new GLTFLoader();
    private scene!: Scene;
    private onModelLoad?: () => void;

    init(scene: Scene, onModelLoad?: () => void) {
        this.scene = scene;
        this.onModelLoad = onModelLoad;
    }

    setupDragDrop(canvas: HTMLCanvasElement) {
        canvas.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        canvas.addEventListener("dragenter", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        canvas.addEventListener("drop", (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const file = e.dataTransfer?.files?.[0];
            if (!file) return;

            this.loadFile(file);
        });
    }

    loadFile(file: File) {
        const url = URL.createObjectURL(file);
        console.log("Loading file:", file.name);

        this.loader.load(
            url,
            (gltf) => {
                console.log("Model loaded successfully");
                this.scene.addModel(gltf.scene);
                URL.revokeObjectURL(url);
                this.onModelLoad?.();
            },
            (progress) => {
                console.log(
                    "Loading:",
                    (progress.loaded / progress.total) * 100 + "%"
                );
            },
            (error) => {
                console.error("GLTF load error:", error);
                URL.revokeObjectURL(url);
            }
        );
    }
}

export { Loader };
