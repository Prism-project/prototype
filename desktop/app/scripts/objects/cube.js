import THREE from 'three';
import '../utils/OBJLoader.js';
import '../utils/ColladaLoader.js';
const glslify = require('glslify');
let start = Date.now();
let coord = null;
let accel = null;
let clickedData = null;
let loadedObject;
let material;
import dat from 'dat-gui';

export default class Cube extends THREE.Object3D {
  constructor(cubemap) {
    super();

    // this.manager = new THREE.LoadingManager();
    // this.manager.onProgress = function ( item, loaded, total ) {
    //   console.log( item, loaded, total );
    // };
    //
    // this.manager.onProgress = function ( xhr ) {
    //   if ( xhr.lengthComputable ) {
    //     var percentComplete = xhr.loaded / xhr.total * 100;
    //     console.log( Math.round(percentComplete, 2) + '% downloaded' );
    //   }
    // };
    //
    // this.manager.onError = function ( xhr ) {
    //   console.log('error');
    // };

    // material = new THREE.MeshPhongMaterial({
    //   color: 0xABABAB,
    //   emissive: 0x000000,
    //   specular: 0x000000,
    //   shininess: 50,
    //   envMap: cubemap,
    //   reflectivity: 1,
    //   emissiveIntensity: 1,
    //   side: THREE.DoubleSide,
    //   shading: THREE.SmoothShading
    // });

    material = new THREE.ShaderMaterial( {
        // uniforms: {
        //     tSnow: {
        //         type: "t",
        //         value: THREE.ImageUtils.loadTexture( './assets/images/test1.jpg' )
        //     },
        //     time: {
        //         type: "f",
        //         value: 0.0
        //     },
        //     move: {
        //       type: "f",
        //       value: 100.0
        //     },
        //     ice: {
        //       type: "f",
        //       value: 100.0
        //     },
        //     space: {
        //       type: "f",
        //       value: 10.0
        //     }
        // },
        vertexShader: glslify('../shaders/vertex.glsl'),
        fragmentShader: glslify('../shaders/fragment.glsl')
    });

    // let gui = new dat.GUI();
    // gui.add(material.uniforms.time, 'value').min(0).max(10);

    var self = this;

    this.loader = new THREE.ColladaLoader();
    this.loader.load(
    	'./assets/3d/algue.dae',
    	function ( collada ) {
        collada.scene.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material = material;
            child.geometry.computeVertexNormals();
          }
        })
        //self.add( collada.scene );
    	}
    );

    // this.loader = new THREE.OBJLoader( this.manager );
    // this.loader.load( './assets/3d/algue.obj', function ( object ) {
    //   loadedObject = object;
    //
    //   object.traverse( function ( child ) {
    //     if ( child instanceof THREE.Mesh ) {
    //       child.material = material;
    //       // child.material.uniforms.needsUpdate = true;
    //       child.geometry = new THREE.Geometry().fromBufferGeometry( child.geometry );
    //       console.log(child.geometry);
    //       child.geometry.computeVertexNormals();
    //       // child.geometry.verticesNeedUpdate = true;
    //     }
    //   });
    //   self.add(loadedObject);
    // }, this.manager.onProgress, this.manager.onError );



    var geometry = new THREE.CylinderGeometry( 1, 5, 34, 32 );
    var cylinder = new THREE.Mesh( geometry, material );
    this.add( cylinder );
  }

  getClick(data) {
    clickedData ^= true;

    if (clickedData) {
      TweenMax.to(material.uniforms.ice, 1, {value: 5.0, ease: Power2.easeOut});
      TweenMax.to(material.uniforms.space, 1, {value: 500.0, ease: Power2.easeOut});
    } else {
      TweenMax.to(material.uniforms.ice, 1, {value: 0.0, ease: Power2.easeOut});
      TweenMax.to(material.uniforms.space, 1, {value: 0.0, ease: Power2.easeOut});
    }
  }

  getCoord(data) {
    //console.log(data.x);
    coord = data;
  }

  getAccel(data) {
    //console.log(data.x);
    accel = data;
  }

  update() {
    //this.wave();
    // material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
    // this.rotation.y += 0.01;
    // this.rotation.x += 0.0001;

    //console.log(coord.x)
    if(coord) {
        console.log(coord.gamma)
      // this.position.x = coord.x * 10;
      // this.position.y = -coord.y * 10;

    //   TweenMax.to(this.position, 1, {x: (-coord.x * 10), ease: Power2.easeOut});
    //   TweenMax.to(this.position, 1, {y: (coord.y * 10), ease: Power2.easeOut});
    //   TweenMax.to(this.position, 1, {z: (-coord.z * 10), ease: Power2.easeOut});

    // TweenMax.to(this.position, 1, {x: (coord.gamma * 0.5), ease: Power2.easeOut});
    // TweenMax.to(this.position, 1, {y: (coord.alpha * 0.05), ease: Power2.easeOut});
    TweenMax.to(this.position, 1, {z: (coord.beta), ease: Power2.easeOut});


      // if (coord.z > 4 ) {
      //   console.log('BOOOOM');
      //   this.getClick();
      // }

      //console.log('x', coord.x ,'y', coord.y, 'z', coord.z);

      // this.rotation.x = coord.y / 10;
      // this.rotation.y = -coord.x / 10;

    }
    if (loadedObject) {
      loadedObject.rotation.x += 0.001;
      loadedObject.rotation.y += 0.001;
    }
  }
}
