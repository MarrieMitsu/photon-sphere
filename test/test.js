const PhotonSphere = require('../dist/photon-sphere');

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

// do simple output test :)
console.log(test);