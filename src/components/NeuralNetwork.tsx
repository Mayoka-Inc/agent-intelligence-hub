import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NeuralNetwork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 15;

    // --- AGENT NODES ---
    const nodeCount = 15;
    const nodes: THREE.Vector3[] = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      const pos = new THREE.Vector3(x, y, z).multiplyScalar(5);
      nodes.push(pos);

      // Node Mesh
      const geometry = new THREE.SphereGeometry(0.15, 16, 16);
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x00D1FF, 
        transparent: true, 
        opacity: 0.8 
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(pos);
      nodeGroup.add(mesh);
    }

    // --- SYNAPSES ---
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00D1FF, 
      transparent: true, 
      opacity: 0.2 
    });
    
    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      // Connect to 3 nearest
      const nodeA = nodes[i];
      const distances = nodes
        .map((nodeB, idx) => ({ idx, dist: nodeA.distanceTo(nodeB) }))
        .filter(item => item.idx !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3);

      distances.forEach(target => {
        const nodeB = nodes[target.idx];
        linePositions.push(nodeA.x, nodeA.y, nodeA.z, nodeB.x, nodeB.y, nodeB.z);
      });
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    nodeGroup.add(lines);

    // --- ANIMATION ---
    const animate = (time: number) => {
      nodeGroup.rotation.y = time * 0.0002;
      nodeGroup.rotation.z = time * 0.0001;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default NeuralNetwork;
