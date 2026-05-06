import * as THREE from "three";
import { Camera } from "./camera";

class Renderer {
    private renderer!: THREE.WebGLRenderer;
    private shadowsEnabled!: boolean;

    init(container: HTMLElement, camera: Camera) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.shadowsEnabled = false;
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

    toggleShadows(scene: THREE.Scene) {
        this.shadowsEnabled = !this.shadowsEnabled;

        scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
                obj.castShadow = this.shadowsEnabled;
                obj.receiveShadow = this.shadowsEnabled;
            }
            if (
                obj instanceof THREE.DirectionalLight ||
                obj instanceof THREE.SpotLight
            ) {
                obj.castShadow = this.shadowsEnabled;
            }
        });

        return this.shadowsEnabled;
    }

    public getDomElement() {
        return this.renderer.domElement;
    }

    public getRenderer() {
        return this.renderer;
    }
}

export { Renderer };
