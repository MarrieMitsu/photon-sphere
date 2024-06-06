import { ANGLE, ARCSHAPE, ALT_ANGLE } from "./utils/constants";
import { fixedDegree, largestNumberInArray, calcMargin } from "./utils/utils";
import {
    drawUniformPath,
    drawRoundedPath,
    drawEdgePath,
    drawBevelledEdgePath,
    drawCometTailPath,
    drawCometBevelledTailPath,
    drawCometPath,
    drawMeteorPath,
} from "./arc-shapes/index";

export function PhotonSphere({
    radius,
    widths,
    shapes,
    offset = 0,
    arcDasharray = [],
    align = 'face-out',
    morphingShape = false,
    attributes = {}
}) {
    // check if required args are exist
    if (radius === undefined) {
        throw new TypeError('[PhotonSphere]: radius must not null');
    } else if (widths === undefined) {
        throw new TypeError('[PhotonSphere]: widths must not null');
    } else if (shapes === undefined) {
        throw new TypeError('[PhotonSphere]: shapes must not null');
    }

    const arcs = [];
    let threshold = 0;
    let i = 0;
    let j = 0;

    let width;
    let largestWidth;
    if (Array.isArray(widths) && widths.length > 0) {
        width = widths[0];
        largestWidth = largestNumberInArray(widths);
    } else {
        width = widths;
        largestWidth = widths;
    }

    let shape;
    if (Array.isArray(shapes) && shapes.length > 0) {
        shape = shapes[0];
    } else {
        shape = shapes;
    }

    // offset
    threshold += fixedDegree(offset);

    if (Array.isArray(arcDasharray) && arcDasharray.length > 0) {
        // prevent infinite loop causing by zero as initial value
        if (fixedDegree(arcDasharray[0]) === 0) return arcs;

        while (threshold < ANGLE) {
            const isOdd = (i + 1) % 2 !== 0;
            const generatedObj = {};
            const attrs = {};

            let degree = fixedDegree(arcDasharray[i % arcDasharray.length]);
            if (degree > (ANGLE - threshold)) {
                degree = ANGLE - threshold;
            }

            if (Array.isArray(widths) && widths.length > 0) {
                width = widths[j % widths.length];
            }

            if (Array.isArray(shapes) && shapes.length > 0) {
                shape = shapes[j % shapes.length];
            }

            if (isOdd) {
                let path;
                const margin = calcMargin(width, largestWidth, align);

                switch (shape) {
                    case ARCSHAPE.UNIFORM:
                        path = drawUniformPath(radius, width, margin, morphingShape, threshold, threshold + degree);
                        break;
                    case ARCSHAPE.ROUNDED:
                        path = drawRoundedPath(radius, width, margin, morphingShape, threshold, threshold + degree);
                        break;
                    case ARCSHAPE.EDGE:
                    case ARCSHAPE.REVERSE_EDGE:
                    case ARCSHAPE.DOUBLE_EDGE:
                    case ARCSHAPE.REVERSE_DOUBLE_EDGE:
                        path = drawEdgePath(radius, width, margin, morphingShape, shape, threshold, threshold + degree);
                        break;
                    case ARCSHAPE.BEVELLED_EDGE:
                        path = drawBevelledEdgePath(radius, width, margin, morphingShape, threshold, threshold + degree);
                        break;
                    case ARCSHAPE.UNIFORM_IONTAIL:
                    case ARCSHAPE.UNIFORM_ANTITAIL:
                        path = drawCometTailPath(radius, width, margin, morphingShape, shape, threshold, threshold + degree);
                        break;
                    case ARCSHAPE.TOP_BEVELLED_IONTAIL:
                    case ARCSHAPE.TOP_BEVELLED_ANTITAIL:
                    case ARCSHAPE.BOTTOM_BEVELLED_IONTAIL:
                    case ARCSHAPE.BOTTOM_BEVELLED_ANTITAIL:
                        path = drawCometBevelledTailPath(radius, width, margin, morphingShape, shape, threshold, threshold + degree);
                        break;
                    case ARCSHAPE.COMET:
                    case ARCSHAPE.REVERSE_COMET:
                        path = drawCometPath(radius, width, margin, morphingShape, shape, threshold, threshold + degree);
                        break;
                    case ARCSHAPE.METEOR:
                    case ARCSHAPE.REVERSE_METEOR:
                        path = drawMeteorPath(radius, width, margin, morphingShape, shape, threshold, threshold + degree);
                        break;
                    default:
                        path = drawUniformPath(radius, width, margin, morphingShape, threshold, threshold + degree);
                        break;
                }

                if (typeof attributes === 'object') {
                    for (const key in attributes) {
                        const attr = attributes[key];

                        if (Array.isArray(attr) && attr.length > 0) {
                            attrs[key] = attr[j % attr.length];
                        } else {
                            attrs[key] = attr;
                        }
                    }
                }

                generatedObj.path = path;
                generatedObj.attributes = attrs;

                arcs.push(generatedObj);
                j++;
            }

            threshold += degree;
            i++;
        }
    } else {
        let path;
        const generatedObj = {};
        const attrs = {};

        switch (shape) {
            case ARCSHAPE.UNIFORM:
                path = drawUniformPath(radius, width, 0, morphingShape, 0, ALT_ANGLE);
                break;
            case ARCSHAPE.ROUNDED:
                path = drawRoundedPath(radius, width, 0, morphingShape, 0, ALT_ANGLE);
                break;
            case ARCSHAPE.EDGE:
            case ARCSHAPE.REVERSE_EDGE:
            case ARCSHAPE.DOUBLE_EDGE:
            case ARCSHAPE.REVERSE_DOUBLE_EDGE:
                path = drawEdgePath(radius, width, 0, morphingShape, shape, 0, ALT_ANGLE);
                break;
            case ARCSHAPE.BEVELLED_EDGE:
                path = drawBevelledEdgePath(radius, width, 0, morphingShape, 0, ALT_ANGLE);
                break;
            case ARCSHAPE.UNIFORM_IONTAIL:
            case ARCSHAPE.UNIFORM_ANTITAIL:
                path = drawCometTailPath(radius, width, 0, morphingShape, shape, 0, ALT_ANGLE);
                break;
            case ARCSHAPE.TOP_BEVELLED_IONTAIL:
            case ARCSHAPE.TOP_BEVELLED_ANTITAIL:
            case ARCSHAPE.BOTTOM_BEVELLED_IONTAIL:
            case ARCSHAPE.BOTTOM_BEVELLED_ANTITAIL:
                path = drawCometBevelledTailPath(radius, width, 0, morphingShape, shape, 0, ALT_ANGLE);
                break;
            case ARCSHAPE.COMET:
            case ARCSHAPE.REVERSE_COMET:
                path = drawCometPath(radius, width, 0, morphingShape, shape, 0, ALT_ANGLE);
                break;
            case ARCSHAPE.METEOR:
            case ARCSHAPE.REVERSE_METEOR:
                path = drawMeteorPath(radius, width, 0, morphingShape, shape, 0, ALT_ANGLE);
                break;
            default:
                path = drawUniformPath(radius, width, 0, morphingShape, 0, ALT_ANGLE);
                break;
        }

        if (typeof attributes === 'object') {
            for (const key in attributes) {
                const attr = attributes[key];

                if (Array.isArray(attr) && attr.length > 0) {
                    attrs[key] = attr[0];
                } else {
                    attrs[key] = attr;
                }
            }
        }

        generatedObj.path = path;
        generatedObj.attributes = attrs;

        arcs.push(generatedObj);
    }

    return arcs;
}
