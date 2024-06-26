const { PhotonSphere } = require('../dist/photon-sphere');
const path = require('path');
const fs = require('fs');
const { NAMESPACE_URI, createDOM } = require('./utils/utils.cjs');

// generateSampleShapes
function generateSampleShapes() {
    try {
        const shapes = [
            'uniform',
            'rounded',
            'edge',
            'reverse-edge',
            'double-edge',
            'reverse-double-edge',
            'bevelled-edge',
            'uniform-iontail',
            'uniform-antitail',
            'top-bevelled-iontail',
            'top-bevelled-antitail',
            'bottom-bevelled-iontail',
            'bottom-bevelled-antitail',
            'comet',
            'reverse-comet',
            'meteor',
            'reverse-meteor',
        ];

        const location = path.join(__dirname, '../docs/assets', 'shapes');

        fs.mkdirSync(location);

        for (let i = 0; i < shapes.length; i++) {
            const orbit = PhotonSphere({
                radius: 200,
                widths: 20,
                offset: 30,
                shapes: shapes[i],
                arcDasharray: [50, 10, 40, 10, 30, 10, 20, 20],
                align: "face-out",
                attributes: {
                    fill: ["tranparent", "tranparent", "tranparent", "tranparent", "rgba(214, 28, 78, 1)", "rgba(214, 28, 78, 1)", "rgba(214, 28, 78, 1)", "rgba(214, 28, 78, 1)",],
                    stroke: ["rgba(214, 28, 78, 1)", "rgba(214, 28, 78, 1)", "rgba(214, 28, 78, 1)", "rgba(214, 28, 78, 1)", "none", "none", "none", "none"],
                    strokeWidth: ["1", "1", "1", "1", "0", "0", "0", "0",],
                    fillOpacity: ["0", "0", "0", "0", "1", "1", "1", "1",],
                }
            });

            const svgEl = createDOM('svg', {
                attributes: {
                    class: 'sample',
                    viewBox: '-20 -20 440 440',
                    width: '400',
                    height: '400',
                    overflow: 'visible',
                    xmlns: NAMESPACE_URI.SVG,
                },
                styles: {
                    'background-color': 'white',
                }
            }, {
                namespaceURI: NAMESPACE_URI.SVG,
            });

            for (let j = 0; j < orbit.length; j++) {
                const pathEl = createDOM('path', {
                    attributes: {
                        d: orbit[j].path,
                        fill: orbit[j].attributes.fill,
                        stroke: orbit[j].attributes.stroke,
                        'stroke-width': orbit[j].attributes.strokeWidth,
                        'fill-opacity': orbit[j].attributes.fillOpacity,
                        'shape-rendering': "geometricPrecision",
                        'stroke-linejoin': "round",
                        'vector-effect': "non-scaling-stroke",
                    }
                }, {
                    namespaceURI: NAMESPACE_URI.SVG,
                });

                svgEl.appendChild(pathEl);
            }
            fs.writeFileSync(path.join(location, `${shapes[i]}.svg`), svgEl.outerHTML);
        }
    } catch (err) {
        console.log('[generateSampleShapes] : ', err);
    }
}
generateSampleShapes();
