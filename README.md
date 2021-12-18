# Photon Sphere

SVG tools for generate geometric shapes path based on circular arcs

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
| widths | Number\|Array\<Number> | Shape width | Yes | - |
| shapes | String\|Array\<String> | Arc shapes that already listed previously | Yes | `uniform` |
| arcDasharray | Array\<Number> | It is like [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) attribute that defining the pattern of Arc shapes and gaps | No | - |
| align | String | When shapes have different width sizes, it will determines where the shape will be placed. There is `face-out`, `center` and `face-in` | No | `face-out` |
| morphingShape | Boolean | Used when you want animate one shape to another shape. Please read the Morphing Limitations section | No | false |
| attributes | Object\<any\|Array\<any>> | Additional options that will be generated along with the path property | No | - |

## Best Practices

Consider to use this library as a tool for generating paths to be used in static code, rather than directly on runtime process. If you insist, try to using it with `Web Worker` as performance advice, especially while doing mass processing.

## Draw Pattern Visualization
- 

## Morphing Limitations

Try not to morph shapes that have different Arc angle sizes, as animating SVG code is such a complex task without using any graphical tools.

## License

[MIT](https://choosealicense.com/licenses/mit/)