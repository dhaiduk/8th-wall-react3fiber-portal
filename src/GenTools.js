import { gsap } from "gsap";
import { VideoTexture } from "three";
var THREE = require("three");


export default class GenToolsClass {
  constructor() {
    this.lastGoodCameraPosition = new THREE.Vector3();

    this.getVertexShader = this.getVertexShader.bind(this);
    this.getFragmentShader = this.getFragmentShader.bind(this);
    this.getUniforms = this.getUniforms.bind(this);
    this.getVertexShader = this.getVertexShader.bind(this);
    this.getFragmentShaderChroma = this.getFragmentShaderChroma.bind(this);
    this.addLightMatLighting = this.addLightMatLighting.bind(this);
 
    //begin!
    this.Initialize();
  }

  addLightMatLighting(scene) {
    scene.traverse((child) => {
      if (child.isMesh === true) {
        // a simple fix to stop objects being clipped in/out of view incorrectly  ....
        child.frustumCulled = false;

        if (child.material.emissiveMap != null && child.material.map != null) {
          this.setupLightmapShader(child, child.material);
        } else if (child.material.map != null) {
          // No lightmap (maybe for self illuminated things such as lamp shades!
          this.setupUnlitMaterial(child, child.material);
        }
      }
    });
  }
  
  getVertexShader() {
    // Vertex shader.   This is pretty basic

    return `    
            varying vec2 vUv;
            void main()
            {
                vUv = uv;
                vUv.x = mix(0.0,1.0,uv.x);
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                gl_Position = projectionMatrix * mvPosition;
            }`;
  }
  getFragmentShader() {
    return `
        uniform sampler2D colorTexture;
        uniform sampler2D lightmapTexture;
        uniform vec4 mainColor;
        uniform float glow;
        uniform vec4 glowColour;  
        varying vec2 vUv;
        varying vec2 vUv2;

        void main( void ) {

                vec4 c = texture2D( colorTexture, vUv );
                vec4 l = texture2D( lightmapTexture, vUv2 );
                c.rgb *= mainColor.rgb;
                c.rgb *= l.rgb;
                c.rgb = mix(c.rgb, glowColour.rgb, glow);
                gl_FragColor = c;
                gl_FragColor.a = c.a;
        }
    `;
  }
  getFragmentShaderChroma() {
    // Fragment shader to do dynamic chroma key
    console.log("  get getFragmentShaderChroma");

    let keycol = "vec3(0.0,1.0,0.0)"; // Green
    let keycolind = "g"; // Green (set to "b" for blue
    let sharpness = "3.0";

    return (
      `    
            uniform sampler2D colorTexture;
            varying vec2 vUv;
            uniform float glow;
            uniform vec4 glowColour;                     
            
            void main( void ) {
                const float radius = 0.003;
                vec4 cs1 = texture2D( colorTexture, vUv );
                vec4 cs2 = texture2D( colorTexture, vUv + vec2(-radius, -radius));
                vec4 cs4 = texture2D( colorTexture, vUv + vec2(radius, radius));
                
                vec4 c = (cs1 + cs2 + cs4) / 3.0;
        
                vec3 color = ` +
      keycol +
      `;
                float a = (0.875 - dot(color, c.rgb) / (length(c.rgb) + 0.04)) * 4.0;
                a = pow(a,` +
      sharpness +
      `);
                vec4 c2 = vec4(mix(cs1.rgb, glowColour.rgb, glow), a);
                float deltag = c2.` +
      keycolind +
      ` - ((c2.r + c2.g + c2.b)*0.333);
        
                if (deltag > 0.0)
                    c2.` +
      keycolind +
      ` -= (deltag*1.0);

                gl_FragColor = c2; 
            }`
    );
  }
  ParamsGet(name) { 
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get(name);
  }
  applyMaterial(object, material) {
    object.traverse((child) => {
      if (child.isMesh === true) {
        child.material = material;
      }
    });
  }
  getUniforms(mat) {
   ;
    var uniforms = {
      colorTexture: { value: mat },
      glow: { value: 0.0 },
      glowColour: { value: { x: 0.0, y: 1.0, z: 0.0, w: 1.0 } },
    };
    return uniforms;
  }

  Initialize() {
    console.log("GenTools Initialized");
  }

  setupLightmapShader(node, origMaterial) {
    let baseColour = new THREE.Vector4(
      origMaterial.color.r,
      origMaterial.color.g,
      origMaterial.color.b,
      origMaterial.color.a
    );

    var uniforms = {
      colorTexture: { value: origMaterial.map },
      mainColor: { value: baseColour },
      lightmapTexture: { value: origMaterial.emissiveMap },
      lightmapOffset: { value: origMaterial.emissiveMap.offset },
      lightmapScale: { value: origMaterial.emissiveMap.repeat },
      glow: { value: 0.0 },
      glowColour: { value: { x: 0.0, y: 1.0, z: 0.0, w: 1.0 } },
    };

    var mat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: this.getVertexShader(),
      fragmentShader: this.getFragmentShader(),
      transparent: origMaterial.transparent,
      alphaTest: origMaterial.alphaTest,
    });

    node.material = mat;

    this.setTextureSettingBase(origMaterial.map);
    this.setTextureSettingLightmap(origMaterial.emissiveMap);
  }

  setupUnlitMaterial(node, origMaterial) {
    var mat = new THREE.MeshBasicMaterial({
      map: origMaterial.map,
      color: origMaterial.color,
      transparent: origMaterial.transparent,
      alphaTest: origMaterial.alphaTest,
    });

    node.material = mat;

    this.setTextureSettingBase(origMaterial.map);
  }

  setTextureSettingBase(map) {
    map.anisotropy = 8;
    map.minFilter = THREE.LinearMipmapLinearFilter;
    map.encoding = THREE.LinearEncoding;
  }

  setTextureSettingLightmap(map) {
    map.encoding = THREE.LinearEncoding;
  }
}

const GenTools = new GenToolsClass();

export { GenTools };
