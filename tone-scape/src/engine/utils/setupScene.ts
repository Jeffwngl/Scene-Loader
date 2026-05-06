import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;

export function initThree(container: HTMLElement) {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#111");

  camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // orbit controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 0.5;
  controls.maxDistance = 100;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(2, 2, 2);
  scene.add(dirLight);

  // resize observer to keep canvas sized correctly
  const ro = new ResizeObserver(() => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  });
  ro.observe(container);

  animate();

  return { scene, camera, renderer };
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// drag/drop handler
export function enableDragDrop(onModelLoaded?: () => void) {
  const loader = new GLTFLoader();

  const canvas = renderer.domElement;

  canvas.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  canvas.addEventListener("dragenter", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  canvas.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = (e as DragEvent).dataTransfer?.files?.[0];
    if (!file) return;

    console.log("File dropped:", file.name);
    const url = URL.createObjectURL(file);

    loader.load(
      url,
      (gltf) => {
        console.log("Model loaded successfully");

        // clear previous models
        const toRemove = scene.children.filter((c) => c.userData.isModel);
        toRemove.forEach((c) => scene.remove(c));

        const model = gltf.scene;
        model.userData.isModel = true;

        // fit model to view
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        scene.add(model);
        URL.revokeObjectURL(url);
        onModelLoaded?.();
      },
      (progress) => {
        console.log("Loading:", (progress.loaded / progress.total) * 100 + "%");
      },
      (error) => {
        console.error("GLTF load error:", error);
        URL.revokeObjectURL(url);
      }
    );
  });
}
