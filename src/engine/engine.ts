import { Camera } from "./camera";
import { Loader } from "./loader";
import { Renderer } from "./renderer";
import { Scene } from "./scene";

class Engine {
    private renderer = new Renderer();
    private scene = new Scene();
    private camera = new Camera();
    private loader = new Loader();
    private container!: HTMLElement;
    public setModelLoad?: () => void;
    public setModelUnload?: () => void;

    constructor(
        canvasPage: HTMLElement,
        modelLoad?: () => void,
        modelUnload?: () => void
    ) {
        this.container = canvasPage;
        this.setModelLoad = modelLoad;
        this.setModelUnload = modelUnload;
    }

    init() {
        this.scene.init();
        this.renderer.init(this.container, this.camera);
        this.camera.init(this.container, this.renderer.getDomElement());
        this.loader.init(this.scene, this.setModelLoad);
        this.loader.setupDragDrop(this.renderer.getDomElement());

        this.animate();
    }

    private animate = () => {
        requestAnimationFrame(this.animate);
        this.camera.update();
        this.renderer.render(this.scene.getScene(), this.camera);
    };

    clearScene() {
        this.scene.clearModels();
        this.setModelUnload?.();
    }

    getScene() {
        return this.scene;
    }

    getCamera() {
        return this.camera;
    }

    getRenderer() {
        return this.renderer;
    }
}

export { Engine };
