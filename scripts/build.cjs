const fs = require('node:fs');
const p = require('node:path');
const pkg = require('../package.json');
const { rollup } = require("rollup");
const { default: terser } = require('@rollup/plugin-terser');

const now = new Date();

const banner = `/**
 * PhotonSphere v${pkg.version}
 *
 * Copyright (c) ${now.getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} license
 */
`;

const plugins = [
    terser(),
];

function append_banner(path) {
    let content = fs.readFileSync(path, 'utf-8');

    const has_shebang = content.trim().startsWith('#!');
    if (has_shebang) {
        const newline_index = content.indexOf('\n') + 1;
        content = content.slice(0, newline_index) +
            banner +
            content.slice(newline_index);
    } else {
        content = banner + '\n' + content;
    }

    fs.writeFileSync(path, content);
}

async function build_lib() {
    let bundle;
    let build_failed = false;

    try {
        console.info("[build_lib]: build...");

        bundle = await rollup({
            input: p.resolve('./src/index.js'),
            plugins: plugins,
        });

        // cjs
        await bundle.write({
            format: 'cjs',
            file: pkg.exports['require'],
            exports: 'auto',
        }).then(_ => {
            append_banner(pkg.exports['require']);
        });

        // es
        await bundle.write({
            format: 'es',
            file: pkg.exports['import'],
        }).then(_ => {
            append_banner(pkg.exports['import']);
        });

        // umd
        await bundle.write({
            format: 'umd',
            name: pkg.umd.name,
            file: pkg.umd.file,
        }).then(_ => {
            append_banner(pkg.umd.file);
        });

        fs.copyFileSync('./types/photon-sphere.d.ts', pkg.types, fs.constants.COPYFILE_FICLONE);

        console.info("[build_lib]: done!");
    } catch (err) {
        build_failed = true;
        console.error(err);
    }

    if (bundle) {
        await bundle.close();
    }

    if (build_failed) {
        process.exit(1);
    }
}

async function main () {
    await build_lib();
};

main();
