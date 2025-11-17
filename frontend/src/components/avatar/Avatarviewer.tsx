// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// type AvatarViewerProps = {
//   modelUrl: string;
// };

// export function AvatarViewer({ modelUrl }: AvatarViewerProps) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     // ====== Scene ======
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x111111);

//     // ====== Camera ======
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       canvas.clientWidth / canvas.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 1.5, 2.8);

//     // ====== Renderer ======
//     const renderer = new THREE.WebGLRenderer({
//       canvas,
//       antialias: true,
//       alpha: false,
//     });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(canvas.clientWidth, canvas.clientHeight);

//     // ====== Lights ======
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(2, 2, 2);
//     scene.add(directionalLight);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);

//     // ====== Load 3D Model ======
//     const loader = new GLTFLoader();
//     let model: THREE.Object3D | null = null;

//     loader.load(
//       modelUrl,
//       (gltf) => {
//         model = gltf.scene;
//         model.scale.set(1, 1, 1);
//         scene.add(model);
//       },
//       undefined,
//       (error) => {
//         console.error("Failed to load model:", error);
//       }
//     );

//     // ====== Animate ======
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     // ====== Resize ======
//     const handleResize = () => {
//       if (!canvas) return;
//       camera.aspect = canvas.clientWidth / canvas.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//     };

//     window.addEventListener("resize", handleResize);

//     // ====== Cleanup ======
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       renderer.dispose();
//       scene.clear();
//     };
//   }, [modelUrl]);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ width: "100%", height: "100%", display: "block" }}
//     />
//   );
// }
