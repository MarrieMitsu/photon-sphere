const PhotonSphere = require('../dist/photon-sphere');
const { Z0PlaneBluePrint, SphereBluePrint } = require('./blue-print');
const { createDOM, NAMESPACE_URI } = require('../scripts/utils/utils.cjs');
const { JSDOM } = require('jsdom');
// const { document } = (new JSDOM(`...`)).window;
const path = require('path');
const fs = require('fs');

// function randNumber(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function getAnimationDirection() {
//     if (randNumber(0, 1) === 0) {
//         return 'forwards'
//     } else {
//         return 'reverse'
//     }
// }

// generate
function generate() {
    try {
        const svgs = [];

        // Z0Plane
        for (let i = 0; i < Z0PlaneBluePrint.length; i++) {
            const orbit = PhotonSphere({
                radius: Z0PlaneBluePrint[i].radius,
                widths: Z0PlaneBluePrint[i].widths,
                offset: 0,
                shapes: Z0PlaneBluePrint[i].shapes,
                arcDasharray: Z0PlaneBluePrint[i].arcDasharray,
                align: Z0PlaneBluePrint[i].align,
                attributes: Z0PlaneBluePrint[i].attributes,
            });

            // console.log(orbit);

            const svg = createDOM('svg', {
                attributes: {
                    class: 'plane z0-plane',
                    width: Z0PlaneBluePrint[i].radius * 2,
                    height: Z0PlaneBluePrint[i].radius * 2,
                    overflow: 'visible',
                    xmlns: NAMESPACE_URI.SVG,
                },
                styles: {
                    animation: Z0PlaneBluePrint[i].svgAttributes.animation
                }
            }, {
                namespaceURI: NAMESPACE_URI.SVG,
            });

            for (let i = 0; i < orbit.length; i++) {
                const el = createDOM('path', {
                    attributes: {
                        d: orbit[i].path,
                        fill: orbit[i].attributes.fill,
                        stroke: orbit[i].attributes.stroke,
                        'stroke-width': orbit[i].attributes.strokeWidth,
                        'fill-opacity': orbit[i].attributes.fillOpacity,
                        'shape-rendering': "geometricPrecision",
                        'stroke-linejoin': "round",
                        'vector-effect': "non-scaling-stroke",
                    }
                }, {
                    namespaceURI: NAMESPACE_URI.SVG,
                });

                svg.appendChild(el);
            }

            svgs.push(svg);
        }

        // Sphere
        for (let i = 0; i < SphereBluePrint.length; i++) {
            const orbit = PhotonSphere({
                radius: SphereBluePrint[i].radius,
                widths: SphereBluePrint[i].widths,
                offset: 0,
                shapes: SphereBluePrint[i].shapes,
                arcDasharray: SphereBluePrint[i].arcDasharray,
                align: SphereBluePrint[i].align,
                attributes: SphereBluePrint[i].attributes,
            });

            // console.log(orbit);

            const svg = createDOM('svg', {
                attributes: {
                    class: SphereBluePrint[i].svgAttributes.class,
                    width: SphereBluePrint[i].radius * 2,
                    height: SphereBluePrint[i].radius * 2,
                    overflow: 'visible',
                    xmlns: NAMESPACE_URI.SVG,
                },
                styles: {
                    animation: SphereBluePrint[i].svgAttributes.animation
                }
            }, {
                namespaceURI: NAMESPACE_URI.SVG,
            });

            for (let i = 0; i < orbit.length; i++) {
                const el = createDOM('path', {
                    attributes: {
                        d: orbit[i].path,
                        fill: orbit[i].attributes.fill,
                        stroke: orbit[i].attributes.stroke,
                        'stroke-width': orbit[i].attributes.strokeWidth,
                        'fill-opacity': orbit[i].attributes.fillOpacity,
                        'shape-rendering': "geometricPrecision",
                        'stroke-linejoin': "round",
                        'vector-effect': "non-scaling-stroke",
                    }
                }, {
                    namespaceURI: NAMESPACE_URI.SVG,
                });

                svg.appendChild(el);
            }

            svgs.push(svg);
        }

        // Generate
        const htmlPath = path.join(__dirname, 'index.html');
        JSDOM.fromFile(htmlPath)
        .then(dom => {
                const space = dom.window.document.getElementById('space');
                while (space.firstChild) {
                    space.firstChild.remove();
                }

                for (let i = 0; i < svgs.length; i++) {
                    // fs.writeFileSync(path.join(__dirname, 'space.svg'), svg.outerHTML);
                    space.appendChild(svgs[i]);
                }

                // console.log(dom.serialize());
                fs.writeFileSync(htmlPath, dom.serialize());
            });

    } catch (error) {
        console.log(error);
    }
}
generate();