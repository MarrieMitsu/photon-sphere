import { ANGLE, ALT_ANGLE, ANGLE_DIVISION } from "./constants";
import { PathCommand } from "./path-command";

export function degreeToRadians(degree) {
    return degree * (Math.PI / 180);
}

export function radiansToDegree(radians) {
    return radians / (Math.PI / 180);
}

export function fixedDegree(degree) {
    if ((degree / ANGLE) > 0 && (degree % ANGLE) === 0) {
        return ALT_ANGLE;
    }

    return degree % ANGLE;
}

export function fixedDecimal(number, length = 4) {
    return Math.round((number + Number.EPSILON) * Math.pow(10, length)) / Math.pow(10, length);
}

export function calcMargin(width, largestWidth, align) {
    const margin = (largestWidth / 2) - (width / 2);

    if (align === 'center') {
        return margin;
    } else if (align === 'face-in') {
        return margin * 2;
    } else {
        return 0;
    }
}

export function largestNumberInArray(array) {
    let temp = array[0];
    for (let i = 0; i < array.length; i++) {
        if (temp < array[i]) {
            temp = array[i];
        }
    }
    return temp;
}

export function getLargeArcFlag(degree, morphingShape = false) {
    if (morphingShape) return 0;

    return degree > 180 ? 1 : 0;
}

export function drawArcs(morphingShape, largeArcFlag, sweepFlag, locus = []) {
    let A = '';
    let i = 0;

    if (morphingShape) {
        while (i < (ANGLE / ANGLE_DIVISION)) {
            let radius, point;

            if (locus.length >= (i + 1)) {
                radius = locus[i].radius;
                point = locus[i].point;
            } else {
                radius = locus[locus.length - 1].radius;
                point = locus[locus.length - 1].point;
            }

            const path = PathCommand.ellipticalArcCurve.A(radius, radius, 0, largeArcFlag, sweepFlag, point.x, point.y);
            A += `${path} `;

            i++;
        }
    } else {
        while (i < locus.length) {
            const radius = locus[i].radius;
            const point = locus[i].point;

            const path = PathCommand.ellipticalArcCurve.A(radius, radius, 0, largeArcFlag, sweepFlag, point.x, point.y);
            A += `${path} `;

            i++;
        }
    }

    return A;
}