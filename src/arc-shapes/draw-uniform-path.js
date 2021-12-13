import { getLargeArcFlag, drawArcs } from "../utils/utils";
import { getCircularArcLocus } from "../utils/formulas";
import { PathCommand } from "../utils/path-command";

/**
 * drawUniformPath.
 *
 */
export default function drawUniformPath(radius, width, margin, morphingShape, startingDegree, endDegree) {
    const largeArcFlag = getLargeArcFlag(endDegree - startingDegree, morphingShape);

    const arc1 = getCircularArcLocus(1, radius, width, margin, morphingShape, startingDegree, endDegree);
    const arc1Start = arc1[0];
    const arc1End = arc1[arc1.length - 1];

    const arc2 = getCircularArcLocus(3, radius, width, margin, morphingShape, endDegree, startingDegree);
    const arc2Start = arc2[0];
    const arc2End = arc2[arc2.length - 1];

    /*
        Draw path pattern:
        without morph   : M -> A1 -> L  ->       A1 -> Z
        with morph      : M -> A1 -> C1 -> C2 -> A1 -> C3 -> C4
    */
    let M, A1, LC1, C2, A2, ZC3, C4;

    M = PathCommand.moveTo.M(arc1Start.point.x, arc1Start.point.y);
    A1 = drawArcs(morphingShape, largeArcFlag, 0, arc1.slice(1));
    A2 = drawArcs(morphingShape, largeArcFlag, 1, arc2.slice(1));

    if (morphingShape) {
        const arc3 = getCircularArcLocus(2, radius, width, margin, morphingShape, endDegree, startingDegree);
        const arc3Start = arc3[0];
        const arc3End = arc3[arc3.length - 1];

        LC1 = PathCommand.cubicBezierCurve.C(arc1End.point.x, arc1End.point.y, arc3Start.point.x, arc3Start.point.y, arc3Start.point.x, arc3Start.point.y);

        C2 = PathCommand.cubicBezierCurve.C(arc3Start.point.x, arc3Start.point.y, arc2Start.point.x, arc2Start.point.y, arc2Start.point.x, arc2Start.point.y);

        ZC3 = PathCommand.cubicBezierCurve.C(arc2End.point.x, arc2End.point.y, arc3End.point.x, arc3End.point.y, arc3End.point.x, arc3End.point.y);

        C4 = PathCommand.cubicBezierCurve.C(arc3End.point.x, arc3End.point.y, arc1Start.point.x, arc1Start.point.y, arc1Start.point.x, arc1Start.point.y);

        return `${M} ${A1} ${LC1} ${C2} ${A2} ${ZC3} ${C4}`;
    } else {
        LC1 = PathCommand.lineTo.L(arc2Start.point.x, arc2Start.point.y);
        ZC3 = PathCommand.closePath;

        return `${M} ${A1} ${LC1} ${A2} ${ZC3}`;
    }

}