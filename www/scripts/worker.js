// self.importScripts('./photon-sphere.min.js');

// let PhotonSphereWasm;

// async function init() {
//     PhotonSphereWasm = await PhotonSphere.PhotonSphereWasm();
// }

// onmessage = async function(e) {
//     const msg = e.data;

//     if (!PhotonSphereWasm) {
//         await init();
//     }

//     console.log(PhotonSphereWasm({
//         radius: 300,
//         widths: 20,
//         shapes: 'uniform',
//     }));

//     console.log(msg);
// }
