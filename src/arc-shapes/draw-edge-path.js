import { ARCSHAPE } from "../utils/constants";
import { getCircularArcLocus } from "../utils/formulas";
import { PathCommand } from "../utils/path-command";
import { drawArcs, getLargeArcFlag, radiansToDegree } from "../utils/utils";

/**
 * Draw edge, reverse-edge, double-edge and
 * reverse-double-edge shape.
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
export default function drawEdgePath(radius, width, margin, morphingShape, shape, startingDegree, endDegree) {
    const largeArcFlag = getLargeArcFlag(endDegree - startingDegree, morphingShape);
    const gap = radiansToDegree(width / 2 / radius);

    let arc1, arc2;
    if (shape === ARCSHAPE.EDGE) {
        arc1 = getCircularArcLocus(1, radius, width, margin, morphingShape, startingDegree, endDegree - gap);
        arc2 = getCircularArcLocus(3, radius, width, margin, morphingShape, endDegree, startingDegree + gap);
    } else if (shape === ARCSHAPE.REVERSE_EDGE) {
        arc1 = getCircularArcLocus(1, radius, width, margin, morphingShape, startingDegree + gap, endDegree);
        arc2 = getCircularArcLocus(3, radius, width, margin, morphingShape, endDegree - gap, startingDegree);
    } else if (shape === ARCSHAPE.DOUBLE_EDGE) {
        arc1 = getCircularArcLocus(1, radius, width, margin, morphingShape, startingDegree + gap, endDegree - gap);
        arc2 = getCircularArcLocus(3, radius, width, margin, morphingShape, endDegree, startingDegree);
    } else if (shape === ARCSHAPE.REVERSE_DOUBLE_EDGE) {
        arc1 = getCircularArcLocus(1, radius, width, margin, morphingShape, startingDegree, endDegree);
        arc2 = getCircularArcLocus(3, radius, width, margin, morphingShape, endDegree - gap, startingDegree + gap);
    }

    const arc1Start = arc1[0];
    const arc1End = arc1[arc1.length - 1];

    const arc2Start = arc2[0];
    const arc2End = arc2[arc2.length - 1];

    /*
        Draw path pattern:
        without morph   : M -> A1 -> L  ->       A2 -> Z
        with morph      : M -> A1 -> C1 -> C2 -> A2 -> C3 -> C4
    */
    let M, A1, LC1, C2, A2, ZC3, C4;

    M = PathCommand.moveTo.M(arc1Start.point.x, arc1Start.point.y);
    A1 = drawArcs(morphingShape, largeArcFlag, 0, arc1.slice(1));
    A2 = drawArcs(morphingShape, largeArcFlag, 1, arc2.slice(1));

    if (morphingShape) {
        LC1 = PathCommand.cubicBezierCurve.C(arc1End.point.x, arc1End.point.y, arc1End.point.x, arc1End.point.y, arc1End.point.x, arc1End.point.y);

        C2 = PathCommand.cubicBezierCurve.C(arc1End.point.x, arc1End.point.y, arc2Start.point.x, arc2Start.point.y, arc2Start.point.x, arc2Start.point.y);

        ZC3 = PathCommand.cubicBezierCurve.C(arc2End.point.x, arc2End.point.y, arc2End.point.x, arc2End.point.y, arc2End.point.x, arc2End.point.y);

        C4 = PathCommand.cubicBezierCurve.C(arc2End.point.x, arc2End.point.y, arc1Start.point.x, arc1Start.point.y, arc1Start.point.x, arc1Start.point.y);

        return `${M} ${A1} ${LC1} ${C2} ${A2} ${ZC3} ${C4}`;
    } else {
        LC1 = PathCommand.lineTo.L(arc2Start.point.x, arc2Start.point.y);
        ZC3 = PathCommand.closePath;

        return `${M} ${A1} ${LC1} ${A2} ${ZC3}`;
    }

}