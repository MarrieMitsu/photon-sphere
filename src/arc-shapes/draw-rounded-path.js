import { radiansToDegree, getLargeArcFlag, drawArcs } from "../utils/utils";
import { getCircularArcLocus } from "../utils/formulas";
import { PathCommand } from "../utils/path-command";

/**
 * drawRoundedPath.
 *
 */
export default function drawRoundedPath(radius, width, margin, morphingShape, startingDegree, endDegree) {
    const largeArcFlag = getLargeArcFlag(endDegree - startingDegree, morphingShape);
    const gap = radiansToDegree(width / 2 / radius);

    const arc1 = getCircularArcLocus(1, radius, width, margin, morphingShape, startingDegree + gap, endDegree - gap);
    const arc1Start = arc1[0];

    const arc2 = getCircularArcLocus(3, radius, width, margin, morphingShape, endDegree - gap, startingDegree + gap);
    const arc2Start = arc2[0];

    const arc3 = getCircularArcLocus(1, radius, width, margin, morphingShape, startingDegree, endDegree);
    const arc3Start = arc3[0];
    const arc3End = arc3[arc3.length - 1];

    const arc4 = getCircularArcLocus(3, radius, width, margin, morphingShape, endDegree, startingDegree);
    const arc4Start = arc4[0];
    const arc4End = arc4[arc4.length - 1];

    const arc5 = getCircularArcLocus(2, radius, width, margin, morphingShape, endDegree, startingDegree);
    const arc5Start = arc5[0];
    const arc5End = arc5[arc5.length - 1];

    /*
        Draw path pattern:
        M -> A1 -> C1 -> C2 -> A2 -> C3 -> C4
    */
    const M = PathCommand.moveTo.M(arc1Start.point.x, arc1Start.point.y);

    const A1 = drawArcs(morphingShape, largeArcFlag, 0, arc1.slice(1));

    const C1 = PathCommand.cubicBezierCurve.C(arc3End.point.x, arc3End.point.y, arc5Start.point.x, arc5Start.point.y, arc5Start.point.x, arc5Start.point.y);

    const C2 = PathCommand.cubicBezierCurve.C(arc5Start.point.x, arc5Start.point.y, arc4Start.point.x, arc4Start.point.y, arc2Start.point.x, arc2Start.point.y);

    const A2 = drawArcs(morphingShape, largeArcFlag, 1, arc2.slice(1));

    const C3 = PathCommand.cubicBezierCurve.C(arc4End.point.x, arc4End.point.y, arc5End.point.x, arc5End.point.y, arc5End.point.x, arc5End.point.y);

    const C4 = PathCommand.cubicBezierCurve.C(arc5End.point.x, arc5End.point.y, arc3Start.point.x, arc3Start.point.y, arc1Start.point.x, arc1Start.point.y);

    return `${M} ${A1} ${C1} ${C2} ${A2} ${C3} ${C4}`;
}