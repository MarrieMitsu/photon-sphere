// constants
const SPACE_PALLETE = {
    NAVY: "rgba(17, 29, 94, 1)",
    MAROON: "rgba(178, 31, 102, 1)",
    RED: "rgba(254, 52, 110, 1)",
    BEIGE: "rgba(255, 189, 105, 1)",
}

const SphereBluePrint = [
    {
        svgAttributes: {
            class: 'plane z1-plane',
            animation: 'z1-plane 7s reverse linear infinite'
        },
        radius: 170,
        widths: [18, 15, 12, 9, 6, 9, 12, 15, 18],
        shapes: ["uniform"],
        arcDasharray: [3, 1, 3, 1, 3],
        align: "center",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            class: 'plane z2-plane',
            animation: 'z2-plane 6s reverse linear infinite'
        },
        radius: 160,
        widths: [17, 14, 11, 8, 5, 8, 11, 14, 17],
        shapes: ["uniform"],
        arcDasharray: [3, 1, 3, 1, 3],
        align: "center",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            class: 'plane z3-plane',
            animation: 'z3-plane 5s reverse linear infinite'
        },
        radius: 145,
        widths: [16, 13, 10, 7, 4, 7, 10, 13, 16],
        shapes: ["uniform"],
        arcDasharray: [3, 1, 3, 1, 3],
        align: "center",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            class: 'plane z4-plane',
            animation: 'z4-plane 3s reverse linear infinite'
        },
        radius: 125,
        widths: [15, 12, 9, 6, 3, 6, 9, 12, 15],
        shapes: ["uniform"],
        arcDasharray: [3, 1, 3, 1, 3],
        align: "center",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            class: 'plane z5-plane',
            animation: 'z5-plane 2s reverse linear infinite'
        },
        radius: 100,
        widths: [14, 11, 8, 5, 2, 5, 8, 11, 14],
        shapes: ["uniform"],
        arcDasharray: [3, 1, 3, 1, 3],
        align: "center",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            class: 'plane z6-plane',
            animation: 'z6-plane 1s reverse linear infinite'
        },
        radius: 70,
        widths: [13, 10, 7, 4, 1, 4, 7, 10, 13],
        shapes: ["uniform"],
        arcDasharray: [3, 1, 3, 1, 3],
        align: "center",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
];

const Z0PlaneBluePrint = [
    {   
        svgAttributes: {
            animation: 'z0-plane 1s forwards linear infinite'
        },
        radius: 50,
        widths: [5],
        shapes: ["uniform"],
        arcDasharray: [60, 12],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 10s forwards linear infinite'
        },
        radius: 60,
        widths: [5],
        shapes: ["rounded"],
        arcDasharray: [40, 32],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 5s reverse linear infinite'
        },
        radius: 80,
        widths: [3],
        shapes: ["edge"],
        arcDasharray: [30, 60],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 8s forwards linear infinite'
        },
        radius: 100,
        widths: [10],
        shapes: ["double-edge"],
        arcDasharray: [70, 20],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 8s reverse linear infinite'
        },
        radius: 180,
        widths: [18, 15, 12, 9, 6, 9, 12, 15, 18],
        shapes: ["uniform"],
        arcDasharray: [3, 1, 3, 1, 3],
        align: "center",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 12s forwards linear infinite'
        },
        radius: 200,
        widths: [18, 15, 12, 9, 6, 9, 12, 15, 18],
        shapes: ["uniform"],
        arcDasharray: [3, 1, 3, 1, 3],
        align: "center",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 6s forwards linear infinite'
        },
        radius: 250,
        widths: [20, 15, 10],
        shapes: ["reverse-double-edge"],
        arcDasharray: [60, 15, 40, 15, 20],
        align: "face-in",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 18s reverse linear infinite'
        },
        radius: 300,
        widths: [5],
        shapes: ["uniform-iontail"],
        arcDasharray: [80, 10],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 13s reverse linear infinite'
        },
        radius: 320,
        widths: [9],
        shapes: ["meteor"],
        arcDasharray: [80, 10],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 4s reverse linear infinite'
        },
        radius: 330,
        widths: [1],
        shapes: ["uniform"],
        arcDasharray: [90, 10, 120, 20, 5, 20, 3, 1, 100],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 2s forwards linear infinite'
        },
        radius: 340,
        widths: [1],
        shapes: ["uniform"],
        arcDasharray: [30],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 8s reverse linear infinite'
        },
        radius: 380,
        widths: [2],
        shapes: ["uniform"],
        arcDasharray: [70, 20],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 20s forwards linear infinite'
        },
        radius: 420,
        widths: [20],
        shapes: ["reverse-comet"],
        arcDasharray: [70, 20, 20, 10, 30],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 24s forwards linear infinite'
        },
        radius: 440,
        widths: [5],
        shapes: ["edge"],
        arcDasharray: [35, 40],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 30s forwards linear infinite'
        },
        radius: 480,
        widths: [30],
        shapes: ["double-edge"],
        arcDasharray: [70, 20],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 2s forwards linear infinite'
        },
        radius: 500,
        widths: [3],
        shapes: ["meteor"],
        arcDasharray: [2],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 30s reverse linear infinite'
        },
        radius: 540,
        widths: [30],
        shapes: ["reverse-double-edge"],
        arcDasharray: [70, 20],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 60s reverse linear infinite'
        },
        radius: 550,
        widths: [5],
        shapes: ["rounded"],
        arcDasharray: [40, 5],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 15s forwards linear infinite'
        },
        radius: 600,
        widths: [20],
        shapes: ["uniform-iontail"],
        arcDasharray: [5, 45],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
    {
        svgAttributes: {
            animation: 'z0-plane 70s forwards linear infinite'
        },
        radius: 650,
        widths: [3],
        shapes: ["bevelled-edge"],
        arcDasharray: [5, 3],
        align: "face-out",
        attributes: {
            fill: SPACE_PALLETE.MAROON,
            stroke: 'none',
            strokeWidth: '0',
            fillOpacity: '1',
        }
    },
];

module.exports = {
    SPACE_PALLETE,
    SphereBluePrint,
    Z0PlaneBluePrint,
}