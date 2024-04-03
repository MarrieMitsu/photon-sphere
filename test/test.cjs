const PhotonSphere = require('../dist/photon-sphere.cjs');

var test = new PhotonSphere({
    morphingShape: true,
    radius: 300,
    widths: [20],
    shapes: ['uniform'],
    arcDasharray: [90, 0],
    align: 'face-out',
    attributes: {
        fills: ['red', 'blue']
    }
});

var offsetTest = new PhotonSphere({
    morphingShape: true,
    radius: 300,
    widths: [20],
    offset: 180,
    shapes: ['uniform'],
    arcDasharray: [90, 0],
    align: 'face-out',
    attributes: {
        fills: ['red', 'blue']
    }
});

// do simple output test :)
console.log(test);
console.log(offsetTest);
