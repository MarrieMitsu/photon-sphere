import init, { photon_sphere_wasm } from '../wasm/pkg/photon_sphere_wasm.js';
import photon_sphere_bg from '../wasm/pkg/photon_sphere_wasm_bg.wasm';

export { PhotonSphere } from "./photon-sphere";

export async function PhotonSphereWasm() {
    await init(await photon_sphere_bg());

    return photon_sphere_wasm;
}
