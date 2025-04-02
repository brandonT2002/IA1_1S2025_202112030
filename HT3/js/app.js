import * as THREE from 'three';
import { MindARThree } from 'mindar-face-three';

let mindarThree = null;
let faceMesh = null;

const setup = async () => {
    mindarThree = new MindARThree({
        container: document.querySelector("#container"),
    });
    const { renderer, scene, camera } = mindarThree;
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // Cargar imagen de filtro para la cara
    const texture = new THREE.TextureLoader().load('./assets/jaguar.png');
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        transparent: true 
    });
    faceMesh = new THREE.Mesh(geometry, material);
    faceMesh.scale.set(2, 2, 1);
    const anchor = mindarThree.addAnchor(1);
    anchor.group.add(faceMesh);

    // Añadir vegetación que ocupe todo el ancho de la pantalla
    const leafTexture = new THREE.TextureLoader().load('./assets/vegetacion.png');
    const leafGeometry = new THREE.PlaneGeometry(3, 1);
    const leafMaterial = new THREE.MeshBasicMaterial({ 
        map: leafTexture, 
        transparent: true 
    });
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.set(0, -1.5, -5);
    scene.add(leaf);
};

const start = async () => {
    if (!mindarThree) {
        await setup();
    }
    await mindarThree.start();
    const { renderer, scene, camera } = mindarThree;
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
};

start();
