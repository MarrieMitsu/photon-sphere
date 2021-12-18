# Photon Sphere

SVG tools for generate geometric shapes path based on Circular Arcs

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

const paths = new PhotonSphere({
    radius: 300,
    widths: 20,
    shapes: 'uniform',
});
```

### Full Usage

```javascript
import PhotonSphere from 'photon-sphere.es.js';

const paths = new PhotonSphere({
    morphingShape: true,
    radius: 300,
    widths: [20],
    shapes: ['uniform'],
    arcDasharray: [90, 0],
    align: 'face-out',
    attributes: {
        fills: ['red', 'blue']
    }
});
```

## Shapes list
- `uniform`
- `rounded`
- `edge`
- `reverse-edge`
- `double-edge`
- `reverse-double-edge`
- `bevelled-edge`
- `uniform-iontail`
- `uniform-antitail`
- `top-bevelled-iontail`
- `top-bevelled-antitail`
- `bottom-bevelled-iontail`
- `bottom-bevelled-antitail`
- `comet`
- `reverse-comet`
- `meteor`
- `reverse-meteor`

## API Options

| Property | Type | Description | Required | Default Value |
|-|-|-|-|-|
| radius | Number | Circle radius | Yes | - |
| widths | Number\|Array\<Number> | Shape width. Act like `arcDasharray` | Yes | - |
| shapes | String\|Array\<String> | Arc shapes that already listed previously. Act like `arcDasharray` | Yes | `uniform` |
| arcDasharray | Array\<Number> | It is like [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) attribute that defining the pattern of Arc shapes and gaps | No | - |
| align | String | When shapes have different width sizes, it will determines where the shape will be placed. There is `face-out`, `center` and `face-in` | No | `face-out` |
| morphingShape | Boolean | Used when you want animate one shape to another shape. Please read the Morphing Limitations section | No | false |
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

## Morphing Limitations

Try not to morph shapes that have different Arc angle sizes, as animating SVG code is such a complex task without using any graphical tools.

## License

[MIT](https://choosealicense.com/licenses/mit/)