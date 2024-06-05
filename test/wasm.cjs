const { photon_sphere_wasm } = require("../wasm/pkg");

const obj = photon_sphere_wasm({
    radius: 300,
    widths: [20],
    shapes: ['uniform'],
    offset: 10,
    arcDasharray: [90, 0],
    align: 'face-out',
    morphingShape: true,
    attributes: {
        fills: ['red', 'blue'],
    }
});

console.log(obj);
