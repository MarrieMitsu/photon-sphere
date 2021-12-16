import { radiansToDegree, drawArcs } from "../utils/utils";
import { getSpiralArcLocus } from "../utils/formulas";
import { PathCommand } from "../utils/path-command";

/**
 * Draw top-bevelled-iontail, top-bevelled-antitail,
 * bottom-bevelled-iontail and bottom-bevelled-antitail
 * shape.
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
export default function drawCometBevelledTailPath(radius, width, margin, morphingShape, shape, startingDegree, endDegree) {
    const gap = radiansToDegree(width / radius);

    let arc1, arc2;
    if (shape === ARCSHAPE.TOP_BEVELLED_IONTAIL) {
        arc1 = getSpiralArcLocus(1, radius, width, margin, BEHAVIOR.GROW, startingDegree, endDegree - gap);
        arc2 = getSpiralArcLocus(3, radius, width, margin, BEHAVIOR.GROW, endDegree, startingDegree);
    } else if (shape === ARCSHAPE.TOP_BEVELLED_ANTITAIL) {
        arc1 = getSpiralArcLocus(1, radius, width, margin, BEHAVIOR.SHRINK, startingDegree + gap, endDegree);
        arc2 = getSpiralArcLocus(3, radius, width, margin, BEHAVIOR.SHRINK, endDegree, startingDegree);
    } else if (shape === ARCSHAPE.BOTTOM_BEVELLED_IONTAIL) {
        arc1 = getSpiralArcLocus(1, radius, width, margin, BEHAVIOR.GROW, startingDegree, endDegree);
        arc2 = getSpiralArcLocus(3, radius, width, margin, BEHAVIOR.GROW, endDegree - gap, startingDegree);
    } else if (shape === ARCSHAPE.BOTTOM_BEVELLED_ANTITAIL) {
        arc1 = getSpiralArcLocus(1, radius, width, margin, BEHAVIOR.SHRINK, startingDegree, endDegree);
        arc2 = getSpiralArcLocus(3, radius, width, margin, BEHAVIOR.SHRINK, endDegree, startingDegree + gap);
    }

    const arc1Start = arc1[0];
    const arc1End = arc1[arc1.length - 1];

    const arc2Start = arc2[0];
    const arc2End = arc2[arc2.length - 1];

    /*
        Draw path pattern:
        without morph           : M -> A1 -> L  ->       A2
        without morph (reverse) : M -> A1 ->             A2 -> Z
        with morph              : M -> A1 -> C1 -> C2 -> A2 -> C3 -> C4
    */
    let M, A1, LC1, C2, A2, ZC3, C4;

    M = PathCommand.moveTo.M(arc1Start.point.x, arc1Start.point.y);
    A1 = drawArcs(morphingShape, 0, 0, arc1.slice(1));
    A2 = drawArcs(morphingShape, 0, 1, arc2.slice(1));

    if (morphingShape) {
        LC1 = PathCommand.cubicBezierCurve.C(arc1End.point.x, arc1End.point.y, arc1End.point.x, arc1End.point.y, arc1End.point.x, arc1End.point.y);

        ZC3 = PathCommand.cubicBezierCurve.C(arc2End.point.x, arc2End.point.y, arc2End.point.x, arc2End.point.y, arc2End.point.x, arc2End.point.y);

        C4 = PathCommand.cubicBezierCurve.C(arc2End.point.x, arc2End.point.y, arc1Start.point.x, arc1Start.point.y, arc1Start.point.x, arc1Start.point.y);

        if (shape === ARCSHAPE.TOP_BEVELLED_IONTAIL || shape === ARCSHAPE.BOTTOM_BEVELLED_IONTAIL) {
            C2 = PathCommand.cubicBezierCurve.C(arc1End.point.x, arc1End.point.y, arc2Start.point.x, arc2Start.point.y, arc2Start.point.x, arc2Start.point.y);
        } else if (shape === ARCSHAPE.TOP_BEVELLED_ANTITAIL || shape === ARCSHAPE.BOTTOM_BEVELLED_ANTITAIL) {
            C2 = PathCommand.cubicBezierCurve.C(arc1End.point.x, arc1End.point.y, arc1End.point.x, arc1End.point.y, arc1End.point.x, arc1End.point.y);
        }

        return `${M} ${A1} ${LC1} ${C2} ${A2} ${ZC3} ${C4}`;
    } else {
        if (shape === ARCSHAPE.TOP_BEVELLED_IONTAIL || shape === ARCSHAPE.BOTTOM_BEVELLED_IONTAIL) {
            LC1 = PathCommand.lineTo.L(arc2Start.point.x, arc2Start.point.y);

            return `${M} ${A1} ${LC1} ${A2}`;
        } else if (shape === ARCSHAPE.TOP_BEVELLED_ANTITAIL || shape === ARCSHAPE.BOTTOM_BEVELLED_ANTITAIL) {
            ZC3 = PathCommand.closePath;

            return `${M} ${A1} ${A2} ${ZC3}`;
        }

    }

}