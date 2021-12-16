import { ANGLE_DIVISION, BEHAVIOR } from "./constants";
import { fixedDecimal, degreeToRadians } from "./utils";

/**
 * Get polar coordinates of given radius and degree.
 * 
 * @param {number} radius - circle radius.
 * @param {number} degree - angular coordinate.
 * @returns {Object} x and y coordinate.
 */
export function getPolarCoordinate(radius, degree) {
    const x = radius * Math.cos(degreeToRadians(degree));
    const y = radius * Math.sin(degreeToRadians(degree));

    return { x, y };
}

/**
 * Get circular arc locus between two angular
 * coordinate.
 * 
 * @param {number} layer - determine 1 of 3 layers to be 
 * generated.
 * @param {number} radius - circle radius.
 * @param {number} width - distance between layer 1 and 3.
 * @param {number} margin - position of each arc shape.
 * @param {boolean} morphingShape - morphable shapes.
 * @param {number} startingDegree - start point of angular circular.
 * @param {number} endDegree - end point of angular circular.
 * @returns {Object[]} array of locus that includes radius 
 * and coordinates.
 */
export function getCircularArcLocus(layer, radius, width, margin, morphingShape, startingDegree, endDegree) {
    const fixedRadius = radius - margin;
    const locus = [];
    let arcRadius;

    if (layer === 1) {
        arcRadius = fixedRadius;
    } else if (layer === 2) {
        arcRadius = fixedRadius - (width / 2);
    } else if (layer === 3) {
        arcRadius = fixedRadius - width;
    } else {
        throw new RangeError('[getCircularArcLocus]: the layer value must be between 1 and 3.');
    }

    if (morphingShape) {
        let fixedStartingDegree;
        let fixedEndDegree;
        let degreeRange;

        if (endDegree > startingDegree) {
            fixedStartingDegree = startingDegree;
            fixedEndDegree = endDegree;
        } else {
            fixedStartingDegree = endDegree;
            fixedEndDegree = startingDegree;
        }

        degreeRange = fixedEndDegree - fixedStartingDegree;

        const division = Math.ceil(degreeRange / ANGLE_DIVISION);

        let i = 0;
        while (i <= division) {
            let degree = fixedStartingDegree + (ANGLE_DIVISION * i);
            if (degree >= fixedEndDegree) {
                degree = fixedEndDegree;
            }

            const point = getPolarCoordinate(arcRadius, degree);

            point.x = fixedDecimal(radius + point.x);
            point.y = fixedDecimal(radius - point.y);

            locus.push({ radius: arcRadius, point: point });
            i++;
        }

        if (endDegree < startingDegree) locus.reverse();

    } else {
        const startingPoint = getPolarCoordinate(arcRadius, startingDegree);
        const endPoint = getPolarCoordinate(arcRadius, endDegree);

        startingPoint.x = fixedDecimal(radius + startingPoint.x);
        startingPoint.y = fixedDecimal(radius - startingPoint.y);
        endPoint.x = fixedDecimal(radius + endPoint.x);
        endPoint.y = fixedDecimal(radius - endPoint.y);

        locus.push.apply(locus, [
            { radius: arcRadius, point: startingPoint },
            { radius: arcRadius, point: endPoint }
        ]);
    }

    return locus;
}

/**
 * Get spiral arc locus between two angular
 * coordinate.
 * 
 * @param {number} layer - determine 1 of 3 layers to be 
 * generated.
 * @param {number} radius - circle radius.
 * @param {number} width - distance between layer 1 and 3.
 * @param {number} margin - position of each arc shape.
 * @param {boolean} behavior - grow or shrink.
 * @param {number} startingDegree - start point of angular circular.
 * @param {number} endDegree - end point of angular circular.
 * @returns {Object[]} array of locus that includes radius 
 * and coordinates.
 */
export function getSpiralArcLocus(layer, radius, width, margin, behavior, startingDegree, endDegree) {
    const fixedRadius = radius - margin;
    let fixedStartingDegree;
    let fixedEndDegree;
    let degreeRange;

    if (endDegree > startingDegree) {
        fixedStartingDegree = startingDegree;
        fixedEndDegree = endDegree;
    } else {
        fixedStartingDegree = endDegree;
        fixedEndDegree = startingDegree;
    }

    degreeRange = fixedEndDegree - fixedStartingDegree;

    const division = Math.ceil(degreeRange / ANGLE_DIVISION);
    const subLayerDistance = width / 2 / division;
    const median = fixedRadius - (width / 2);
    const locus = [];

    let i = 0;
    while (i <= division) {
        let degree, arcRadius, point;

        degree = fixedStartingDegree + (ANGLE_DIVISION * i);
        if (degree >= fixedEndDegree) {
            degree = fixedEndDegree;
        }

        if (layer === 1) {
            if (behavior === BEHAVIOR.GROW) {
                arcRadius = median + (subLayerDistance * i);
            } else if (behavior === BEHAVIOR.SHRINK) {
                arcRadius = fixedRadius - (subLayerDistance * i);
            }

            point = getPolarCoordinate(arcRadius, degree);
        } else if (layer === 3) {
            if (behavior === BEHAVIOR.GROW) {
                arcRadius = median - (subLayerDistance * i);
            } else if (behavior === BEHAVIOR.SHRINK) {
                arcRadius = (fixedRadius - width) + (subLayerDistance * i);
            }

            point = getPolarCoordinate(arcRadius, degree);
        } else {
            throw new RangeError('[getSpiralArcLocus]: the layer value must be 1 or 3.');
        }

        point.x = fixedDecimal(radius + point.x);
        point.y = fixedDecimal(radius - point.y);

        locus.push({ radius: arcRadius, point: point });
        i++;
    }

    if (endDegree < startingDegree) locus.reverse();

    return locus;
}