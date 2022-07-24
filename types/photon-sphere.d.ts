// Type definitions for photon-sphere 2.0.0
// Project: photon-sphere
// Definitions by: MarrieMitsu

export as namespace PhotonSphere;

declare function PhotonSphere(args: PhotonSphereProps): PhotonSphereResult[];

export default PhotonSphere;

export declare type ArcShape = 
    | "uniform"
    | "rounded"
    | "edge"
    | "reverse-edge"
    | "double-edge"
    | "reverse-double-edge"
    | "bevelled-edge"
    | "uniform-iontail"
    | "uniform-antitail"
    | "top-bevelled-iontail"
    | "top-bevelled-antitail"
    | "bottom-bevelled-iontail"
    | "bottom-bevelled-antitail"
    | "comet"
    | "reverse-comet"
    | "meteor"
    | "reverse-meteor";

export declare type SpiralArcBehavior = "grow" | "shrink";

export declare type ArcPosition = "face-out" | "center" | "face-in";

export declare type Attrs = Record<string | number | symbol, unknown | unknown[]>

export declare interface PhotonSphereProps {
    radius: number;
    widths: number | number[];
    shapes: ArcShape | ArcShape[];
    offset?: number;
    arcDasharray?: number[];
    align?: ArcPosition;
    morphingShape?: boolean;
    attributes?: Attrs;
}

export declare interface PhotonSphereResult {
    path: string;
    attributes: Record<string | number | symbol, unknown>
}