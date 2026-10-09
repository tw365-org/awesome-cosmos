/**
 * Cosmos 3D Engine (Three.js)
 * 渲染 3D 宇宙星系、星雲粒子、星體網格、引力軌道與曲率躍遷流光
 */

class CosmosEngine {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    this.starMeshes = [];
    this.starObjects = new Map(); // id -> THREE.Mesh
    this.nebulaSystems = [];
    this.backgroundDust = null;
    this.constellationLines = null;
    this.warpStreaks = null;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredStar = null;

    this.isWarping = false;
    this.warpProgress = 0;
    this.warpStartCamPos = new THREE.Vector3();
    this.warpTargetCamPos = new THREE.Vector3();
    this.warpStartTarget = new THREE.Vector3();
    this.warpEndTarget = new THREE.Vector3();

    this.onStarSelect = null;
    this.onStarHover = null;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050711, 0.0008);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 4000);
    this.camera.position.set(0, 220, 650);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    // 4. Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 1600;
    this.controls.minDistance = 20;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.4;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xa5b4fc, 2, 2000);
    pointLight.position.set(0, 100, 0);
    this.scene.add(pointLight);

    // 6. Build Scene Components
    this.createBackgroundStarfield();
    this.createSectorsAndNebulae();
    this.populateStars();
    this.createWarpEffect();
    this.initConstellationLines();

    // 7. Event Listeners
    window.addEventListener('resize', () => this.onResize());
    this.renderer.domElement.addEventListener('pointermove', (e) => this.onPointerMove(e));
    this.renderer.domElement.addEventListener('pointerdown', (e) => this.onPointerDown(e));

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  // 背景浩瀚深空微光粒子 (2,500 顆背景恆星)
  createBackgroundStarfield() {
    const starCount = 2800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 1200 + Math.random() * 1800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const colorVal = 0.7 + Math.random() * 0.3;
      colors[i * 3] = colorVal * 0.85;
      colors[i * 3 + 1] = colorVal * 0.92;
      colors[i * 3 + 2] = colorVal;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.backgroundDust = new THREE.Points(geometry, material);
    this.scene.add(this.backgroundDust);
  }

  // 7 大星域星雲粒子團 (Nebulae)
  createSectorsAndNebulae() {
    Object.keys(window.SECTORS).forEach(key => {
      const sector = window.SECTORS[key];
      const count = 380;
      const geom = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const color = new THREE.Color(sector.color);

      for (let i = 0; i < count; i++) {
        const spread = 120;
        pos[i * 3] = sector.coord.x + (Math.random() - 0.5) * spread * 2;
        pos[i * 3 + 1] = sector.coord.y + (Math.random() - 0.5) * spread * 1.5;
        pos[i * 3 + 2] = sector.coord.z + (Math.random() - 0.5) * spread * 2;
      }

      geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      const mat = new THREE.PointsMaterial({
        size: 5.5,
        color: color,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });

      const nebula = new THREE.Points(geom, mat);
      this.scene.add(nebula);
      this.nebulaSystems.push(nebula);
    });
  }

  // 生成開源專案星體
  populateStars() {
    const sphereGeom = new THREE.SphereGeometry(1, 24, 24);

    window.COSMOS_DATA.forEach((item, index) => {
      const sector = window.SECTORS[item.category] || { coord: { x: 0, y: 0, z: 0 }, color: '#38bdf8' };
      
      // 星體尺寸根據地位決定
      let radius = 3.5;
      let emissiveIntensity = 0.5;
      if (item.type === 'supergiant') {
        radius = 7.5;
        emissiveIntensity = 1.0;
      } else if (item.type === 'planet') {
        radius = 4.8;
        emissiveIntensity = 0.65;
      } else if (item.type === 'pulsar') {
        radius = 3.8;
        emissiveIntensity = 1.2;
      }

      const starColor = new THREE.Color(sector.color);
      const material = new THREE.MeshStandardMaterial({
        color: starColor,
        emissive: starColor,
        emissiveIntensity: emissiveIntensity,
        roughness: 0.3,
        metalness: 0.2
      });

      const mesh = new THREE.Mesh(sphereGeom, material);
      mesh.scale.set(radius, radius, radius);

      // 圍繞星區中心隨機分佈螺旋軌道
      const angle = (index * 1.618) * Math.PI * 2; // 黃金分割角度分散
      const dist = 30 + Math.random() * 95;
      const heightOffset = (Math.random() - 0.5) * 60;

      mesh.position.set(
        sector.coord.x + Math.cos(angle) * dist,
        sector.coord.y + heightOffset,
        sector.coord.z + Math.sin(angle) * dist
      );

      mesh.userData = {
        data: item,
        baseScale: radius,
        pulseOffset: Math.random() * Math.PI * 2
      };

      // 外層發光光環 (Outer Corona Glow Ring)
      const ringGeom = new THREE.RingGeometry(1.3, 1.8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(sector.lightColor || sector.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2;
      mesh.add(ring);

      this.scene.add(mesh);
      this.starMeshes.push(mesh);
      this.starObjects.set(item.id, mesh);
    });
  }

  // 曲率躍遷時空流光粒子 (Warp Streaks)
  createWarpEffect() {
    const count = 350;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 6); // 兩端頂點構成線段

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 600;
      const y = (Math.random() - 0.5) * 600;
      const z = (Math.random() - 0.5) * 600;
      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;

      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y;
      positions[i * 6 + 5] = z + 15;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });

    this.warpStreaks = new THREE.LineSegments(geom, mat);
    this.scene.add(this.warpStreaks);
  }

  // 星座連線系統 (Constellation Lines)
  initConstellationLines() {
    const geom = new THREE.BufferGeometry();
    const mat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    this.constellationLines = new THREE.LineSegments(geom, mat);
    this.scene.add(this.constellationLines);
  }

  updateConstellations(bookmarkedIds) {
    if (!bookmarkedIds || bookmarkedIds.length < 2) {
      this.constellationLines.geometry.dispose();
      this.constellationLines.geometry = new THREE.BufferGeometry();
      return;
    }

    const points = [];
    for (let i = 0; i < bookmarkedIds.length - 1; i++) {
      const meshA = this.starObjects.get(bookmarkedIds[i]);
      const meshB = this.starObjects.get(bookmarkedIds[i + 1]);
      if (meshA && meshB) {
        points.push(meshA.position.x, meshA.position.y, meshA.position.z);
        points.push(meshB.position.x, meshB.position.y, meshB.position.z);
      }
    }

    const pos = new Float32Array(points);
    this.constellationLines.geometry.dispose();
    this.constellationLines.geometry = new THREE.BufferGeometry();
    this.constellationLines.geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  }

  // 視角平滑躍遷至指定星體 (Warp Speed Transition)
  warpToStar(starId) {
    const mesh = this.starObjects.get(starId);
    if (!mesh) return;

    this.controls.autoRotate = false;
    this.isWarping = true;
    this.warpProgress = 0;

    this.warpStartCamPos.copy(this.camera.position);
    this.warpStartTarget.copy(this.controls.target);

    // 計算目標相機位置 (星體正前方適中距離)
    const targetOffset = new THREE.Vector3(0, 15, 38);
    this.warpTargetCamPos.copy(mesh.position).add(targetOffset);
    this.warpEndTarget.copy(mesh.position);

    if (window.cosmosAudio) {
      window.cosmosAudio.playWarp();
    }
  }

  onPointerMove(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.starMeshes, false);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (this.hoveredStar !== hit) {
        if (this.hoveredStar) {
          this.hoveredStar.scale.setScalar(this.hoveredStar.userData.baseScale);
        }
        this.hoveredStar = hit;
        this.hoveredStar.scale.setScalar(this.hoveredStar.userData.baseScale * 1.35);
        this.renderer.domElement.style.cursor = 'pointer';

        if (this.onStarHover) {
          this.onStarHover(hit.userData.data, event.clientX, event.clientY);
        }
      }
    } else {
      if (this.hoveredStar) {
        this.hoveredStar.scale.setScalar(this.hoveredStar.userData.baseScale);
        this.hoveredStar = null;
        this.renderer.domElement.style.cursor = 'grab';

        if (this.onStarHover) {
          this.onStarHover(null);
        }
      }
    }
  }

  onPointerDown(event) {
    if (this.hoveredStar) {
      const item = this.hoveredStar.userData.data;
      if (window.cosmosAudio) {
        window.cosmosAudio.playStarPing();
      }
      if (this.onStarSelect) {
        this.onStarSelect(item);
      }
    }
  }

  onResize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(this.animate);
    const time = performance.now() * 0.001;

    // 星體自轉與脈衝呼吸
    this.starMeshes.forEach(mesh => {
      mesh.rotation.y += 0.006;
      if (mesh.userData.data.type === 'pulsar') {
        const pulse = 1 + 0.12 * Math.sin(time * 4 + mesh.userData.pulseOffset);
        mesh.scale.setScalar(mesh.userData.baseScale * pulse);
      }
    });

    // 背景星塵緩慢公轉
    if (this.backgroundDust) {
      this.backgroundDust.rotation.y += 0.0002;
    }

    // 處理曲率躍遷動畫插值
    if (this.isWarping) {
      this.warpProgress += 0.025;
      const t = Math.min(this.warpProgress, 1);
      // Smooth step easing
      const ease = t * t * (3 - 2 * t);

      this.camera.position.lerpVectors(this.warpStartCamPos, this.warpTargetCamPos, ease);
      this.controls.target.lerpVectors(this.warpStartTarget, this.warpEndTarget, ease);

      if (this.warpStreaks) {
        this.warpStreaks.material.opacity = Math.sin(t * Math.PI) * 0.85;
      }

      if (t >= 1) {
        this.isWarping = false;
        if (this.warpStreaks) {
          this.warpStreaks.material.opacity = 0;
        }
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

window.CosmosEngine = CosmosEngine;
