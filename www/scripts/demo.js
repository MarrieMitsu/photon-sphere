const SHAPES = [
    'uniform',
    'rounded',
    'edge',
    'reverse-edge',
    'double-edge',
    'reverse-double-edge',
    'bevelled-edge',
    'uniform-iontail',
    'uniform-antitail',
    'top-bevelled-iontail',
    'top-bevelled-antitail',
    'bottom-bevelled-iontail',
    'bottom-bevelled-antitail',
    'comet',
    'reverse-comet',
    'meteor',
    'reverse-meteor',
];

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomShapeIndex(min, max, prev) {
    let index = randomInteger(min, max);
    while (prev === index) {
        index = randomInteger(min, max);
    }

    return index;
}

function main() {
    const svgEl = document.getElementById('demo-svg');
    const selectEl = document.getElementById('shapes');
    const toggleEl = document.getElementById('autoplay');

    if (window.matchMedia('(max-width: 768px)').matches) {
        svgEl.setAttribute('viewBox', '-150 -150 800 800');
    }

    window.matchMedia('(max-width: 768px)').addEventListener('change', e => {
        if (e.matches) {
            svgEl.setAttribute('viewBox', '-150 -150 800 800');
        } else {
            svgEl.setAttribute('viewBox', '0 0 500 500');
        }
    })

    selectEl.addEventListener('change', (e) => {
        const shape = e.target.value;

        for (let i = 0; i < svgEl.childNodes.length; i++) {
            const pathEl = svgEl.childNodes[i];
            const newPath = pathEl.getAttribute(`data-${shape}`);

            anime({
                targets: pathEl,
                d: newPath,
                easing: 'easeOutQuad',
                duration: 250,
            });
        }

    });

    let intervalId;
    toggleEl.addEventListener('change', (e) => {
        const isChecked = e.target.checked;

        if (isChecked) {
            selectEl.disabled = true;
            intervalId = window.setInterval(() => {
                selectEl.selectedIndex = getRandomShapeIndex(0, SHAPES.length - 1, selectEl.selectedIndex);
                selectEl.dispatchEvent(new Event('change'));
            }, 1000);
        } else {
            selectEl.disabled = false;
            window.clearInterval(intervalId);
        }
    });
}
main();
