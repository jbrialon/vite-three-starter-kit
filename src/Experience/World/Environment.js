import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Environment");
      this.debugFolder.close();
    }

    // Setup
    this.setAmbientLight();
    this.setSunLight();
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambientLight);
  }
  setSunLight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 0.6);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.camera.far = 90;
    this.sunLight.shadow.camera.left = -14;
    this.sunLight.shadow.camera.top = 14;
    this.sunLight.shadow.camera.right = 14;
    this.sunLight.shadow.camera.bottom = -14;
    this.sunLight.position.set(2, 8, 8);
    this.scene.add(this.sunLight);

    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);
    }
  }
}
