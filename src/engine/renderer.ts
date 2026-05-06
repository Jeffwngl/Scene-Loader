import * as THREE from "three";
import { Camera } from "./camera";

class Renderer {
    private renderer!: THREE.WebGLRenderer;

    init(container: HTMLElement, camera: Camera) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        container.appendChild(this.renderer.domElement);

        const ro = new ResizeObserver(() => {
            this.renderer.setSize(
                container.clientWidth,
                container.clientHeight
            );
            camera.updateAspect(container.clientWidth, container.clientHeight);
        });
        ro.observe(container);
    }

    render(scene: THREE.Scene, camera: Camera) {
        this.renderer.render(scene, camera.getCamera());
    }

    public getDomElement() {
        return this.renderer.domElement;
    }

    public getRenderer() {
        return this.renderer;
    }
}

export { Renderer };
