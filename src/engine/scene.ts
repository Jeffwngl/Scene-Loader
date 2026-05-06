import * as THREE from "three";

class Scene {
    private scene!: THREE.Scene;
    private floorVisible!: boolean;
    private floor!: THREE.Mesh;

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
        dirLight.shadow.bias = -0.0001;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);
    }

    private createFloor() {
        const size = 5;

        const data = new Uint8Array([
            180, 180, 180, 255, 80, 80, 80, 255, 80, 80, 80, 255, 180, 180, 180,
            255,
        ]);

        const texture = new THREE.DataTexture(data, 2, 2);
        texture.format = THREE.RGBAFormat;
        texture.magFilter = THREE.NearestFilter;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20);
        texture.needsUpdate = true;

        const geometry = new THREE.PlaneGeometry(size, size);
        const material = new THREE.MeshStandardMaterial({ map: texture });

        this.floor = new THREE.Mesh(geometry, material);
        this.floor.rotation.x = -Math.PI / 2; // lay flat
        this.floor.position.y = -0.4;
        this.floor.receiveShadow = true;
        this.floor.userData.isFloor = true;
    }

    toggleFloor() {
        if (!this.floor) this.createFloor();

        this.floorVisible = !this.floorVisible;

        if (this.floorVisible) {
            this.scene.add(this.floor);
        } else {
            this.scene.remove(this.floor);
        }

        return this.floorVisible;
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
