/* Configuração básica da cena */


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


/* Criação de um torus (anel) para representar o acelerador de  partículas */


const acceleratorRadius = 25;
const acceleratorTubeRadius = 1.4;
const acceleratorGeometry = new THREE.TorusGeometry(acceleratorRadius, acceleratorTubeRadius, 4, 200);
const acceleratorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.5 }); // Adicionando transparência
const accelerator = new THREE.Mesh(acceleratorGeometry, acceleratorMaterial);
scene.add(accelerator);


/* Função para criar bobinas de acrílico com linhas de campo magnético */


function createCoil(x, y, z) {
    const coilRadius = 1.9; 
    const coilSegments = 8;
    const coilGeometry = new THREE.SphereGeometry(coilRadius, coilSegments, coilSegments);
    const coilMaterial = new THREE.MeshBasicMaterial({ color: 0xff3333 }); // Vermelho escuro
    const coil = new THREE.Mesh(coilGeometry, coilMaterial);
    coil.position.set(x, y, z);
    scene.add(coil);

    const arrowDirection = new THREE.Vector3(0, 0, -1); 
    const arrowOrigin = new THREE.Vector3(x, y, z + coilRadius); 
    const arrowLength = 4;
    const arrowHelper = new THREE.ArrowHelper(arrowDirection, arrowOrigin, arrowLength, 0xff0000); 
    scene.add(arrowHelper);

    return coil;
}


/* Lista de bobinas */


const coils = [];


/* Criar bobinas de acrílico em posições aleatórias ao redor do acelerador */


for (let i = 0; i < 10; i++) {
    const angle = (Math.PI * 2 / 10) * i; 
    const x = Math.sin(angle) * acceleratorRadius;
    const y = Math.cos(angle) * acceleratorRadius;
    const coil = createCoil(x, y, 0); 
    coils.push(coil);
}

/* Criação da esfera */

const sphereRadius = 1;
const sphereSegments = 32;
const sphereGeometry = new THREE.SphereGeometry(sphereRadius, sphereSegments, sphereSegments);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Cor verde
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);


/* Movimentação da câmera */
camera.position.z = 40;


/* Velocidade e aceleração inicial da esfera */


let sphereVelocity = new THREE.Vector3(0, 0, 0.01);
let sphereAcceleration = new THREE.Vector3(0, 0, 0.001);


/* animação */


function animate() {
    requestAnimationFrame(animate);

    
    sphereVelocity.add(new THREE.Vector3(10, 10, 10)); 

    // Ajusta o ângulo para girar em torno de 360° (em radianos)
    let angle = (Date.now() * 0.006) % (Math.PI * 2);

    // Calcula a posição da esfera no plano
    const x = Math.sin(angle) * acceleratorRadius;
    const y = Math.cos(angle) * acceleratorRadius;

    // Ajusta a posição da esfera no plano
    sphere.position.set(x, y, 0);

    // Verifica se a esfera passou pelas bobinas para aumentar a velocidade
    coils.forEach(coil => {
        if (Math.abs(sphere.position.x - coil.position.x) < coil.geometry.parameters.radius + sphereRadius &&
            Math.abs(sphere.position.y - coil.position.y) < coil.geometry.parameters.radius + sphereRadius) {
            sphereVelocity.multiplyScalar(2); // Aumenta a velocidade da esfera
        }
    });

    renderer.render(scene, camera);
}

animate();
