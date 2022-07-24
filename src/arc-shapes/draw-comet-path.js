import { ARCSHAPE, BEHAVIOR } from "../utils/constants";
import { getCircularArcLocus, getSpiralArcLocus } from "../utils/formulas";
import { PathCommand } from "../utils/path-command";
import { drawArcs, radiansToDegree } from "../utils/utils";

/**
 * Draw comet and reverse-comet shape.
 * 
 * @param {number} radius 
 * @param {number} width 
 * @param {number} margin 
 * @param {boolean} morphingShape 
 * @param {string} shape 
 * @param {number} startingDegree 
 * @param {number} endDegree 
 * @returns {string} SVG path
 */
export default function drawCometPath(radius, width, margin, morphingShape, shape, startingDegree, endDegree) {
    const gap = radiansToDegree(width / radius);

    let arc1, arc2;
    if (shape === ARCSHAPE.COMET) {
        arc1 = getSpiralArcLocus(1, radius, width, margin, BEHAVIOR.GROW, startingDegree, endDegree - gap);
        arc2 = getSpiralArcLocus(3, radius, width, margin, BEHAVIOR.GROW, endDegree - gap, startingDegree);
    } else if (shape === ARCSHAPE.REVERSE_COMET) {
        arc1 = getSpiralArcLocus(1, radius, width, margin, BEHAVIOR.SHRINK, startingDegree + gap, endDegree);
        arc2 = getSpiralArcLocus(3, radius, width, margin, BEHAVIOR.SHRINK, endDegree, startingDegree + gap);
    }

    const arc1Start = arc1[0];
    const arc1End = arc1[arc1.length - 1];

    const arc2Start = arc2[0];
    const arc2End = arc2[arc2.length - 1];

    const arc3 = getCircularArcLocus(1, radius, width, margin, morphingShape, startingDegree, endDegree);
    const arc3Start = arc3[0];
    const arc3End = arc3[arc3.length - 1];

    const arc4 = getCircularArcLocus(3, radius, width, margin, morphingShape, endDegree, startingDegree);
    const arc4Start = arc4[0];
    const arc4End = arc4[arc4.length - 1];

    const arc5 = getCircularArcLocus(2, radius, width, margin, morphingShape, startingDegree, endDegree);
    const arc5Start = arc5[0];
    const arc5End = arc5[arc5.length - 1];

    /*
        Draw path pattern:
        without morph           : M -> A1 -> C1 -> C2 -> A2
        without morph (reverse) : M -> A1 ->             A2 -> C3 -> C4
        with morph              : M -> A1 -> C1 -> C2 -> A2 -> C3 -> C4
    */
    let M, A1, C1, C2, A2, C3, C4;

    M = PathCommand.moveTo.M(arc1Start.point.x, arc1Start.point.y);
    A1 = drawArcs(morphingShape, 0, 0, arc1.slice(1));
    A2 = drawArcs(morphingShape, 0, 1, arc2.slice(1));

    if (morphingShape) {
        if (shape === ARCSHAPE.COMET) {
            C1 = PathCommand.cubicBezierCurve.C(arc3End.point.x, arc3End.point.y, arc5End.point.x, arc5End.point.y, arc5End.point.x, arc5End.point.y);

            C2 = PathCommand.cubicBezierCurve.C(arc5End.point.x, arc5End.point.y, arc4Start.point.x, arc4Start.point.y, arc2Start.point.x, arc2Start.point.y);

            C3 = PathCommand.cubicBezierCurve.C(arc2End.point.x, arc2End.point.y, arc2End.point.x, arc2End.point.y, arc2End.point.x, arc2End.point.y);

            C4 = PathCommand.cubicBezierCurve.C(arc2End.point.x, arc2End.point.y, arc1Start.point.x, arc1Start.point.y, arc1Start.point.x, arc1Start.point.y);
        } else if (shape === ARCSHAPE.REVERSE_COMET) {
            C1 = PathCommand.cubicBezierCurve.C(arc1End.point.x, arc1End.point.y, arc1End.point.x, arc1End.point.y, arc1End.point.x, arc1End.point.y);

            C2 = PathCommand.cubicBezierCurve.C(arc1End.point.x, arc1End.point.y, arc2Start.point.x, arc2Start.point.y, arc2Start.point.x, arc2Start.point.y);

            C3 = PathCommand.cubicBezierCurve.C(arc4End.point.x, arc4End.point.y, arc5Start.point.x, arc5Start.point.y, arc5Start.point.x, arc5Start.point.y);

            C4 = PathCommand.cubicBezierCurve.C(arc5Start.point.x, arc5Start.point.y, arc3Start.point.x, arc3Start.point.y, arc1Start.point.x, arc1Start.point.y);
        }

        return `${M} ${A1} ${C1} ${C2} ${A2} ${C3} ${C4}`;
    } else {
        if (shape === ARCSHAPE.COMET) {
            C1 = PathCommand.cubicBezierCurve.C(arc3End.point.x, arc3End.point.y, arc5End.point.x, arc5End.point.y, arc5End.point.x, arc5End.point.y);

            C2 = PathCommand.cubicBezierCurve.C(arc5End.point.x, arc5End.point.y, arc4Start.point.x, arc4Start.point.y, arc2Start.point.x, arc2Start.point.y);

            return `${M} ${A1} ${C1} ${C2} ${A2}`;
        } else if (shape === ARCSHAPE.REVERSE_COMET) {
            C3 = PathCommand.cubicBezierCurve.C(arc4End.point.x, arc4End.point.y, arc5Start.point.x, arc5Start.point.y, arc5Start.point.x, arc5Start.point.y);

            C4 = PathCommand.cubicBezierCurve.C(arc5Start.point.x, arc5Start.point.y, arc3Start.point.x, arc3Start.point.y, arc1Start.point.x, arc1Start.point.y);

            return `${M} ${A1} ${A2} ${C3} ${C4}`;
        }
    }

}