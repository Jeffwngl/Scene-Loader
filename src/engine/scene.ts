import * as THREE from "three";

class Scene {
    private scene!: THREE.Scene;

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("#111");

        this.setupLighting();
    }

    private setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(2, 2, 2);
        dirLight.castShadow = true;
        this.scene.add(dirLight);
    }

    addModel(model: THREE.Group) {
        this.scene.children
            .filter((c) => c.userData.isModel)
            .forEach((c) => this.scene.remove(c));

        model.userData.isModel = true;

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        this.scene.add(model);
    }

    clearModels() {
        this.scene.children
            .filter((c) => c.userData.isModel)
            .forEach((c) => this.scene.remove(c));
    }

    setBackground(color: string) {
        this.scene.background = new THREE.Color(color);
    }

    getScene() {
        return this.scene;
    }
}

export { Scene };
