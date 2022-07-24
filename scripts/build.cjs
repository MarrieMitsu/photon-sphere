const fs = require('fs');
const { rollup } = require('rollup');
const buble = require('@rollup/plugin-buble');
const { terser } = require('rollup-plugin-terser');
const pkg = require('../package.json');

const date = new Date();

const banner = `/**
 * PhotonSphere v${ pkg.version }
 *
 * Copyright (c) ${ date.getFullYear() } MarrieMitsu <isnainromadoni@gmail.com>
 * Released under the MIT license
 */
`;

console.info('[Compile...]');

async function build() {
    try {
        const bundle = await rollup({
            input: './src/index.js',
            plugins: [
                buble({
                    tranforms: {
                        modules: false,
                    },
                    exclude: ['node_modules/**'],
                }),
            ]
        });

        // cjs
        await bundle.write({
            banner,
            format: 'cjs',
            file: pkg.main,
            exports: 'auto'
        });

        // es
        await bundle.write({
            banner,
            format: 'es',
            file: pkg.module
        });

        // umd
        await bundle.write({
            format: 'umd',
            name: pkg.api,
            file: pkg.browser,
            plugins: [
                terser(),
            ],
        }).then(_ => {
            const buffer = fs.readFileSync(pkg.browser, 'utf-8');
            fs.writeFileSync(pkg.browser, `${banner}\n${buffer}`);
        });

        // Copy declaration file
        await fs.promises.copyFile('./types/photon-sphere.d.ts', './dist/photon-sphere.d.ts');

        console.info('[Compiling finish...]');

        await bundle.close();
        
    } catch (error) {
        console.error(error);
    }
}

build();