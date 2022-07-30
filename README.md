# Photon Sphere

![banner.png](/docs/assets/banner.png)

SVG tool for generate geometric shapes path based on Circular Arcs

## Installation

Via npm

```bash
npm install photon-sphere
```

or manual download, you can found the zip file in the [releases](https://github.com/MarrieMitsu/photon-sphere/releases)

## Usage

### Quick Start

```javascript
import PhotonSphere from 'photon-sphere.es.js';

const paths = PhotonSphere({
    radius: 300,
    widths: 20,
    shapes: 'uniform',
});
```

Output : 

```javascript
[
  {
    path: 'M 600,300 A 300,300 0 1 0 600,300.0001  L 580,300.0001 A 280,280 0 1 1 580,300  Z',
    attributes: {}
  }
]
```

### Full Usage

```javascript
import PhotonSphere from 'photon-sphere.es.js';

const paths = PhotonSphere({
    morphingShape: true,
    radius: 300,
    widths: [20],
    offset: 10,
    shapes: ['uniform'],
    arcDasharray: [90, 0],
    align: 'face-out',
    attributes: {
        fills: ['red', 'blue']
    }
});
```

Output : 

```javascript
[
  {
    path: 'M 595.4423,247.9055 A 300,300 0 0 0 247.9055,4.5577 A 300,300 0 0 0 247.9055,4.5577 A 300,300 0 0 0 247.9055,4.5577 A 300,300 0 0 0 247.9055,4.5577  C 247.9055,4.5577 249.642,14.4058 249.642,14.4058 C 249.642,14.4058 251.3785,24.2538 251.3785,24.2538 A 280,280 0 0 1 575.7462,251.3785 A 280,280 0 0 1 575.7462,251.3785 A 280,280 0 0 1 575.7462,251.3785 A 280,280 0 0 1 575.7462,251.3785  C 575.7462,251.3785 585.5942,249.642 585.5942,249.642 C 585.5942,249.642 595.4423,247.9055 595.4423,247.9055',
    attributes: { fills: 'red' }
  },
  {
    path: 'M 247.9055,4.5577 A 300,300 0 0 0 4.5577,352.0945 A 300,300 0 0 0 4.5577,352.0945 A 300,300 0 0 0 4.5577,352.0945 A 300,300 0 0 0 4.5577,352.0945  C 4.5577,352.0945 14.4058,350.358 14.4058,350.358 C 14.4058,350.358 24.2538,348.6215 24.2538,348.6215 A 280,280 0 0 1 251.3785,24.2538 A 280,280 0 0 1 251.3785,24.2538 A 280,280 0 0 1 251.3785,24.2538 A 280,280 0 0 1 251.3785,24.2538  C 251.3785,24.2538 249.642,14.4058 249.642,14.4058 C 249.642,14.4058 247.9055,4.5577 247.9055,4.5577',
    attributes: { fills: 'blue' }
  },
  {
    path: 'M 4.5577,352.0945 A 300,300 0 0 0 352.0945,595.4423 A 300,300 0 0 0 352.0945,595.4423 A 300,300 0 0 0 352.0945,595.4423 A 300,300 0 0 0 352.0945,595.4423  C 352.0945,595.4423 350.358,585.5942 350.358,585.5942 C 350.358,585.5942 348.6215,575.7462 348.6215,575.7462 A 280,280 0 0 1 24.2538,348.6215 A 280,280 0 0 1 24.2538,348.6215 A 280,280 0 0 1 24.2538,348.6215 A 280,280 0 0 1 24.2538,348.6215  C 24.2538,348.6215 14.4058,350.358 14.4058,350.358 C 14.4058,350.358 4.5577,352.0945 4.5577,352.0945',
    attributes: { fills: 'red' }
  },
  {
    path: 'M 352.0945,595.4423 A 300,300 0 0 0 600,300 A 300,300 0 0 0 600,300 A 300,300 0 0 0 600,300 A 300,300 0 0 0 600,300  C 600,300 590,300 590,300 C 590,300 580,300 580,300 A 280,280 0 0 1 348.6215,575.7462 A 280,280 0 0 1 348.6215,575.7462 A 280,280 0 0 1 348.6215,575.7462 A 280,280 0 0 1 348.6215,575.7462  C 348.6215,575.7462 350.358,585.5942 350.358,585.5942 C 350.358,585.5942 352.0945,595.4423 352.0945,595.4423',
    attributes: { fills: 'blue' }
  }
]
```

## Shapes list
- `uniform`

    ![uniform.svg](/docs/assets/shapes/uniform.svg)

- `rounded`

    ![rounded.svg](/docs/assets/shapes/rounded.svg)

- `edge`

    ![edge.svg](/docs/assets/shapes/edge.svg)

- `reverse-edge`

    ![reverse-edge.svg](/docs/assets/shapes/reverse-edge.svg)

- `double-edge`

    ![double-edge.svg](/docs/assets/shapes/double-edge.svg)

- `reverse-double-edge`

    ![reverse-double-edge.svg](/docs/assets/shapes/reverse-double-edge.svg)

- `bevelled-edge`

    ![bevelled-edge.svg](/docs/assets/shapes/bevelled-edge.svg)

- `uniform-iontail`

    ![uniform-iontail.svg](/docs/assets/shapes/uniform-iontail.svg)

- `uniform-antitail`

    ![uniform-antitail.svg](/docs/assets/shapes/uniform-antitail.svg)

- `top-bevelled-iontail`

    ![top-bevelled-iontail.svg](/docs/assets/shapes/top-bevelled-iontail.svg)

- `top-bevelled-antitail`

    ![top-bevelled-antitail.svg](/docs/assets/shapes/top-bevelled-antitail.svg)

- `bottom-bevelled-iontail`

    ![bottom-bevelled-iontail.svg](/docs/assets/shapes/bottom-bevelled-iontail.svg)

- `bottom-bevelled-antitail`

    ![bottom-bevelled-antitail.svg](/docs/assets/shapes/bottom-bevelled-antitail.svg)

- `comet`

    ![comet.svg](/docs/assets/shapes/comet.svg)

- `reverse-comet`

    ![reverse-comet.svg](/docs/assets/shapes/reverse-comet.svg)

- `meteor`

    ![meteor.svg](/docs/assets/shapes/meteor.svg)

- `reverse-meteor`

    ![reverse-meteor.svg](/docs/assets/shapes/reverse-meteor.svg)


## API Options

| Property | Type | Description | Required | Default Value |
|-|-|-|-|-|
| radius | Number | Circle radius | Yes | - |
| widths | Number\|Array\<Number> | Shape width (pixel). Act like `arcDasharray` | Yes | - |
| shapes | String\|Array\<String> | Arc shapes that already listed previously. Act like `arcDasharray` | Yes | - |
| offset | Number | An Offset before the initial Arc | No | 0 |
| arcDasharray | Array\<Number> | It is like [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) attribute that defining the pattern of Arc shapes and gaps using degree unit | No | - |
| align | String | When shapes have different width sizes, it will determines where the shape will be placed. There is `face-out`, `center` and `face-in` | No | `face-out` |
| morphingShape | Boolean | Used when you want animate one shape to another shape. Please read the Limitations section | No | false |
| attributes | Object\<any\|Array\<any>> | Additional options that will be generated along with the path property. Act like `arcDasharray` | No | - |

## Best Practices

Consider to use this library as a tool for generating paths to be used in static code, rather than directly on the browser runtime process. If you insist, try to using it with `Web Worker` as performance advice, especially while doing mass processing.

## Draw Pattern Visualization

![draw-pattern.png](/docs/assets/draw-pattern.png)

### Layers

`L1`, `L2`, `L3` are layers of the Circular Arc, it was the Circle. The distance between `L1` and `L3` is the `widths` in the options API. `L2` used to be a `median`. These three layers are used as a reference to draw an Arc from two points or more using an [Elliptical Arc Curve](https://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands) command. There are two kinds of Arc terms in this library, **Circular Arc** and  **Spiral Arc**.

**Circular Arc** is an arc that created from sequence of points that only rely on one layer, e.g., `A to B` rely on `L1` layer which `uniform` shape uses.

**Spiral Arc** is an arc that created from sequence of points that rely on two layers. In this case `L1 and L2` or `L3 and L2`. `Spiral Arc` has two behavior **GROW** and **SHRINK** which are used for how the arc is drawn, .e.g, `A to F` or `D to F` are using **SHRINK** behavior and `E to B` or `E to C` are using **GROW** behavior. The behavior is determined from where the starting point is. The `Comet` shape is a shape that uses `Spiral Arc` term.

### Points

`A`, `B`, `C`, `D`, `E`, `F`, `a`, `b`, `c`, `d` are points for drawing paths. The starting point when drawing a path is on `A` or `E` and moves to the left until it ends at the same point. E.g, `A -> B -> C -> D -> A` which is used for drawing `uniform` shape.

### Gaps

`A to a` or `b to B` like the name, it was used to give a gap to the edges. It is mainly used for drawing `bevelled` or `rounded` shapes.

## Limitations

- Try not to morph shapes that have different Arc angle sizes, as animating SVG code is such a complex task without using any graphical tools.
- You can't create full circle shape without connecting outer stroke-line into inner stroke-line.
- If the length of your `arcDasharray` in pixel less than the widths, the result will fall apart

## License

[MIT](https://choosealicense.com/licenses/mit/)