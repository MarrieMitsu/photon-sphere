function demo() {
    const svgEl = document.getElementById('demo-svg');
    const selectEl = document.getElementById('shapes');

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
            pathEl.setAttribute("d", newPath);
        }

    });
}
demo();