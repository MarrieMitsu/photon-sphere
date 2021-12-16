/**
 * SVG path command that define a path to be
 * drawn.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#path_commands}
 */
export const PathCommand = {
    moveTo: {
        M: function (x, y) {
            return `M ${x},${y}`;
        },
        m: function (dx, dy) {
            return `m ${dx},${dy}`;
        }
    },
    lineTo: {
        L: function (x, y) {
            return `L ${x},${y}`;
        },
        l: function (dx, dy) {
            return `l ${dx},${dy}`;
        },
        H: function (x) {
            return `H ${x}`;
        },
        h: function (dx) {
            return `h ${dx}`;
        },
        V: function (y) {
            return `V ${y}`;
        },
        v: function (dy) {
            return `v ${dy}`;
        }
    },
    cubicBezierCurve: {
        C: function (x1, y1, x2, y2, x, y) {
            return `C ${x1},${y1} ${x2},${y2} ${x},${y}`;
        },
        c: function (dx1, dy1, dx2, dy2, dx, dy) {
            return `c ${dx1},${dy1} ${dx2},${dy2} ${dx},${dy}`;
        },
        S: function (x2, y2, x, y) {
            return `S ${x2},${y2} ${x},${y}`;
        },
        s: function (dx2, dy2, dx, dy) {
            return `s ${dx2},${dy2}, ${dx},${dy}`;
        }
    },
    ellipticalArcCurve: {
        A: function (rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
            return `A ${rx},${ry} ${angle} ${largeArcFlag} ${sweepFlag} ${x},${y}`;
        },
        a: function (rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
            return `a ${rx},${ry} ${angle} ${largeArcFlag} ${sweepFlag} ${x},${y}`;
        }
    },
    closePath: 'Z',
}