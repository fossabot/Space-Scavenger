var Map = function () {
    var map = this;
    var walls = [];
    var obstacles = [];
    this.asteroids = [];
    this.particleSystem;

    /* ... */
};

Map.prototype.space = function () {
    var map = this;
    'use strict';
    console.log('map initializing')
    
    window.scene.setGravity(new THREE.Vector3(0, 0, 0));
    //maintenant on va ajouter un objet créé avec blender
    var loader = new THREE.JSONLoader();

    //background image
    loader.load("/javascripts/Maps/bgd2.js", function (geometry, materials) {
        var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.name = "bgdCube";
        mesh.material.depthWrite = false;
        mesh.receiveShadow = false;
        mesh.scale.set(-2000, -2000, -2000);
        scene.add(mesh);
    });


    loader.load("/javascripts/Maps/asteroid.js", function (geometry, materials) {
        var asteroidCount = 1000;
        var veryBigAste = 1;
        var bigAste = 200;
        var weight;
        while (asteroidCount--) {
            if (veryBigAste-- > 0) {
                weight = Math.abs(Math.random() * 500 - 250);
            } else if (bigAste-- > 0) {
                weight = Math.abs(Math.random() * 100 - 50);
            } else {
                weight = Math.abs(Math.random() * 50 - 1);
            }
            var mesh = new Physijs.BoxMesh(geometry, new THREE.MeshFaceMaterial(materials), 10000 * weight);
            mesh.position.x = Math.random() * 12000 - 6000;
            mesh.position.y = Math.random() * 1000 - 500;
            mesh.position.z = Math.random() * 12000 - 6000;
            mesh.rotation.x = Math.random();
            mesh.rotation.y = Math.random();
            mesh.rotation.z = Math.random();

            mesh.receiveShadow = true;
            mesh.castShadow = true;
            mesh.scale.x = mesh.scale.y = mesh.scale.z = weight;

            mesh.name = "asteroid";
            mesh.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
                // console.log('asteroid ' + this.id + ' in collision with ' + other_object.id + ' ' + other_object.name);
            });
            scene.add(mesh);
        }
    });


    loader.load('/javascripts/Maps/ship.js', function (geometry, materials) {
        var mesh = new Physijs.BoxMesh(geometry, new THREE.MeshFaceMaterial(materials), 1e10);
        mesh.rotation.z += 2;
        mesh.rotation.y += 2;
        mesh.rotation.x = 0;
        mesh.material.shading = THREE.FlatShading;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 20;
        mesh.scale.x = 30;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        mesh.position.set(0, 0, -3000);
        scene.add(mesh);
    })
    // on ajoute un point de lumière

    var hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x000000, .4);
    hemiLight.castShadow = false;
    scene.add(hemiLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(-2000, 0, -200);
    directionalLight.castShadow = true;
    directionalLight.shadowMapWidth = directionalLight.shadowMapHeight = 1024 * 2;

    var d = 300;

    directionalLight.shadowCameraLeft = -d;
    directionalLight.shadowCameraRight = d;
    directionalLight.shadowCameraTop = d;
    directionalLight.shadowCameraBottom = -d;

    directionalLight.shadowCameraFar = 3500;
    directionalLight.shadowBias = -0.0001;
    directionalLight.shadowDarkness = 0.35;

    scene.add(directionalLight);
    // create the particle variables
    var particleCount = 20000,
        particles = new THREE.Geometry()
        // create the particle variables
        var pMaterial = new THREE.ParticleBasicMaterial({
            color: 0xFFFFFF,
            size: 1.5,
            map: THREE.ImageUtils.loadTexture("/javascripts/Maps/particle.png"),
            blending: THREE.AdditiveBlending,
            transparent: true
        });


    var pcount = particleCount;
    // now create the individual particles
    while (pcount--) {

        // create a particle with random
        // position values, -250 -> 250
        var pX = Math.random() * 100000 - 50000,
            pY = Math.random() * 100000 - 50000,
            pZ = Math.random() * 100000 - 50000,
            particle = new THREE.Vector3(pX, pY, pZ);


        // add it to the geometry
        particles.vertices.push(particle);
    }

    // create the particle system
    map.particleSystem = new THREE.ParticleSystem(
        particles,
        pMaterial);

    // add it to the scene
    scene.add(map.particleSystem);

}



Map.prototype.ship = function () {


    var map = this;
    'use strict';
    window.scene.setGravity(new THREE.Vector3(0, -10, 0));

    
    this.name = "ship";


    var spaceship = new Physijs.BoxMesh(
                new THREE.CubeGeometry(0, 0, 0)
                    );
   

   var loader = new THREE.JSONLoader();

    //background image
    loader.load("/javascripts/Maps/bgd2.js", function (geometry, materials) {
        var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.name = "bgdCube";
        mesh.material.depthWrite = false;
        mesh.receiveShadow = false;
        mesh.scale.set(-2000, -2000, -2000);
        scene.add(mesh);
    });


    loader.load("/javascripts/Maps/asteroid.js", function (geometry, materials) {
        var asteroidCount = 1000;
        var veryBigAste = 1;
        var bigAste = 200;
        var weight;
        while (asteroidCount--) {
            if (veryBigAste-- > 0) {
                weight = Math.abs(Math.random() * 500 - 250);
            } else if (bigAste-- > 0) {
                weight = Math.abs(Math.random() * 100 - 50);
            } else {
                weight = Math.abs(Math.random() * 50 - 1);
            }
            var mesh = new Physijs.BoxMesh(geometry, new THREE.MeshFaceMaterial(materials), 10000 * weight);
            mesh.position.x = Math.random() * 12000 - 6000;
            mesh.position.y = Math.random() * 1000000000000 - 500;
            mesh.position.z = Math.random() * 12000 - 6000;
            mesh.rotation.x = Math.random();
            mesh.rotation.y = Math.random();
            mesh.rotation.z = Math.random();

            mesh.receiveShadow = true;
            mesh.castShadow = true;
            mesh.scale.x = mesh.scale.y = mesh.scale.z = weight;

            mesh.name = "asteroid";
            mesh.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
                // console.log('asteroid ' + this.id + ' in collision with ' + other_object.id + ' ' + other_object.name);
            });
            scene.add(mesh);
        }
    });

    var hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x000000, .5);
    hemiLight.castShadow = false;
    scene.add(hemiLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, .5);
    directionalLight.position.set(0, -2000, 0);
    directionalLight.castShadow = true;
    directionalLight.shadowMapWidth = directionalLight.shadowMapHeight = 1024 * 2;

    var d = 300;

    directionalLight.shadowCameraLeft = -d;
    directionalLight.shadowCameraRight = d;
    directionalLight.shadowCameraTop = d;
    directionalLight.shadowCameraBottom = -d;

    directionalLight.shadowCameraFar = 3500;
    directionalLight.shadowBias = -0.0001;
    directionalLight.shadowDarkness = 0.35;

    scene.add(directionalLight);


    // Creation map en 2d
    var map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
        [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 9, 0, 0, 0, 1, ],
        [1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
        [1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 2, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, ],
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 0, 0, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, ],
        [1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0, 0, 9, 0, 0, 0, 9, 1, 9, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, ],
        [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 9, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, ],
        [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, ],
        [1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, ],
        [1, 0, 0, 0, 1, 1, 1, 0, 1, 2, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, ],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 9, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, ],
        [1, 1, 1, 9, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, ],
        [1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, ],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, ],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, ],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, ],
        [1, 9, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, ],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, ],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
    ],
        mapW = map.length,
        mapH = map[0].length;


    var units = mapW;
    var UNITSIZE = 100;
    var WALLHEIGHT = 100;
    var FLOORHEIGHT = 2;

    var materials = [
        // new THREE.MeshLambertMaterial({color: 0xEDCBA0}),
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('/javascripts/Maps/metal_floor_texture-200513-SM.jpg')
        }),
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('/javascripts/Maps/shiphull.jpg')
        }),
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('/javascripts/Maps/shiphull-raye.png')
        }),
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('/javascripts/Maps/shiphull.jpg')
        }),
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('/javascripts/Maps/shiphull.jpg')
        }),
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('/javascripts/Maps/shiphull.jpg')
        }),
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('/javascripts/Maps/shiphull.jpg')
        }),
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('/javascripts/Maps/shiphull.jpg')
        }),
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('/javascripts/Maps/shiphull.jpg')
        }),
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('/javascripts/Maps/metal_floor_texture-200513-SM.jpg')
        }),
    ];
    // Geometry: walls
    var cube = new THREE.CubeGeometry(UNITSIZE, WALLHEIGHT, UNITSIZE);
    var cube_floor = new THREE.CubeGeometry(UNITSIZE, FLOORHEIGHT, UNITSIZE);
    var cube_roof = new THREE.CubeGeometry(UNITSIZE, FLOORHEIGHT, UNITSIZE);

    //var correction = 212.5;

    //spaceship.position.set(0,0,0);
    var robot = new EnemyManage();
    for (var i = mapW - 1; i >= 0; i--) {
        for (var j = map[i].length - 1; j >= 0; j--) {
            //generation des murs
            if (map[i][j] !== 0) {

                if (map[i][j] === 9) {

                    loader.load("/javascripts/Objects/robot.js", function (geometry, materials) {
                        var mechant = new Physijs.BoxMesh(geometry, new THREE.MeshLambertMaterial(materials), 0);
                        mechant.position.x = ((i - units / 2) * UNITSIZE);
                        mechant.position.y = (FLOORHEIGHT / 2);
                        mechant.position.z = ((j - units / 2) * UNITSIZE);

                        mechant.scale.x = mechant.scale.y = mechant.scale.z = 50;

                        console.log(mechant.position);
                        mechant.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
                //                     console.log('robot ' + this. id + ' in collision with ' + other_object.id + ' ' + other_object.name);
                            if (other_object.name === "bullet") {
                                var munition = new Bullet();

                                munition.createLife(this.position);

                                spaceship.remove(this);

                            }

                        });

                        spaceship.add(mechant);
                    });
        
                } else {
                    var wall = new Physijs.BoxMesh(cube, materials[map[i][j]], 0);
                    wall.position.x = ((i - units / 2) * UNITSIZE);
                    wall.position.y = (WALLHEIGHT / 2) ;
                    wall.position.z = ((j - units / 2) * UNITSIZE);
                    wall.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
                        // console.log('asteroid ' + this.id + ' in collision with ' + other_object.id + ' ' + other_object.name);
                        console.log("mur touche");
                    });
                    spaceship.add(wall);
                }

            }

            if (map[i][j] === 0 || map[i][j] === 9) {
                //génération du sol
                var floor = new Physijs.BoxMesh(cube_floor, materials[map[i][j]], 0);
                floor.position.x = ((i - units / 2) * UNITSIZE);
                floor.position.y = (FLOORHEIGHT / 2);
                floor.position.z = ((j - units / 2) * UNITSIZE);

                spaceship.add(floor);

                //génération du plafond
                var roof = new Physijs.BoxMesh(cube_roof, materials[map[i][j]], 0);
                roof.position.x = ((i - units / 2) * UNITSIZE);
                roof.position.y = (FLOORHEIGHT / 2 + WALLHEIGHT);
                roof.position.z = ((j - units / 2) * UNITSIZE);
                spaceship.add(roof);

                if ( map[i][j] === 9) {

                   
                    robot.createEnemy(
                    (i - units / 2) * UNITSIZE,
                    0,
                    (j - units / 2) * UNITSIZE

                        )

                 

                }

            }

        }

    }
    scene.add(spaceship);
}

Map.prototype.addLensFlare = function (x, y, z, size, overrideImage) {

}

//  this function will operate over each lensflare artifact, moving them around the screen
Map.prototype.lensFlareUpdateCallback = function (object) { }
//Map updating function
Map.prototype.update = function () {
    var map = this;
    if (typeof map.particleSystem !== 'undefined')
        map.particleSystem.rotation.y += 0.0002;

    // console.log('Map updating...');
}

Map.prototype.getObstacles = function () {
    'use strict';
    return map.obstacles.concat(map.walls);
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Map;
else
    window.Map = Map;
