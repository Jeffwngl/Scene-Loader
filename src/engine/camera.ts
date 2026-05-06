import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class Camera {
    private camera!: THREE.PerspectiveCamera;
    private controls!: OrbitControls;

    init(container: HTMLElement, domElement: HTMLCanvasElement) {
        this.camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 3;

        this.controls = new OrbitControls(this.camera, domElement);
        this.controls.minDistance = 0.5;
        this.controls.maxDistance = 100;
    }

    updateAspect(width: number, height: number) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }

    resetTarget() {
        this.controls.target.set(0, 0, 0);
        this.controls.reset();
    }

    public getCamera() {
        return this.camera;
    }
}

export { Camera };
