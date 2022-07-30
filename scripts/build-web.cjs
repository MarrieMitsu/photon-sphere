const PhotonSphere = require('../dist/photon-sphere');
const { Z0PlaneBluePrint, SphereBluePrint } = require('./utils/blue-print.cjs');
const { createDOM, NAMESPACE_URI, kebabToCamelCase } = require('./utils/utils.cjs');
const { JSDOM } = require('jsdom');
const path = require('path');
const fs = require('fs');

// generatePhotonSphereAnimation
function generatePhotonSphereAnimation() {
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

            const svgEl = createDOM('svg', {
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

            svgs.push(svgEl);
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

            const svgEl = createDOM('svg', {
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

            svgs.push(svgEl);
        }

        // Generate
        const htmlPath = path.join(__dirname, '../www', 'index.html');
        JSDOM.fromFile(htmlPath)
            .then(dom => {
                const space = dom.window.document.getElementById('space');
                while (space.firstChild) {
                    space.firstChild.remove();
                }

                for (let i = 0; i < svgs.length; i++) {
                    space.appendChild(svgs[i]);
                }

                fs.writeFileSync(htmlPath, dom.serialize());
            });

    } catch (error) {
        console.error(error);
    }
}
// generatePhotonSphereAnimation();

// generateDemoShape
function generateDemoShape() {
    try {
        const data = {};
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

        for (let i = 0; i < shapes.length; i++) {
            const orbit = PhotonSphere({
                // morphingShape: true,
                radius: 250,
                widths: 30,
                offset: 30,
                shapes: shapes[i],
                arcDasharray: [50, 10, 40, 10, 30, 10, 20, 20],
                align: "face-out",
                attributes: {
                    fill: ["tranparent", "tranparent", "tranparent", "tranparent", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)",],
                    stroke: ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "none", "none", "none", "none"],
                    strokeWidth: ["1", "1", "1", "1", "0", "0", "0", "0",],
                    fillOpacity: ["0", "0", "0", "0", "1", "1", "1", "1",],
                }
            });

            data[shapes[i]] = orbit;
        }

        const svgEl = createDOM('svg', {
            attributes: {
                id: 'demo-svg',
                class: 'demo-svg',
                viewBox: '0 0 500 500',
                width: '500',
                height: '500',
                overflow: 'visible',
                xmlns: NAMESPACE_URI.SVG,
            },
        }, {
            namespaceURI: NAMESPACE_URI.SVG,
        });

        for (let i = 0; i < data['uniform'].length; i++) {
            const pathEl = createDOM('path', {
                attributes: {
                    d: data['uniform'][i].path,
                    fill: data['uniform'][i].attributes.fill,
                    stroke: data['uniform'][i].attributes.stroke,
                    'stroke-width': data['uniform'][i].attributes.strokeWidth,
                    'fill-opacity': data['uniform'][i].attributes.fillOpacity,
                    'shape-rendering': "geometricPrecision",
                    'stroke-linejoin': "round",
                    'vector-effect': "non-scaling-stroke",
                }
            }, {
                namespaceURI: NAMESPACE_URI.SVG,
            });

            svgEl.appendChild(pathEl);
        }


        Object.keys(data).forEach(function(key) {
            for (let i = 0; i < data[key].length; i++) {
                svgEl.childNodes[i].dataset[kebabToCamelCase(key)] = data[key][i].path;
            }
        })


        // Generate
        const htmlPath = path.join(__dirname, '../www', 'demo.html');
        JSDOM.fromFile(htmlPath)
            .then(dom => {
                const parent = dom.window.document.getElementById('demo-box');
                while (parent.firstChild) {
                    parent.firstChild.remove();
                }
                parent.appendChild(svgEl);

                fs.writeFileSync(htmlPath, dom.serialize());
            });


    } catch (error) {
        console.error(error);
    }
}
generateDemoShape();