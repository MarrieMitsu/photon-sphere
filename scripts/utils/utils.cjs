const { JSDOM } = require('jsdom');
const { document } = (new JSDOM(`...`)).window;

// constants
const NAMESPACE_URI = {
    HTML: 'http://www.w3.org/1999/xhtml',
    SVG: 'http://www.w3.org/2000/svg',
}

// utils
function camelToSnakeCase(str) {
    return str.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
}

/**
 * CreateDOM
 *
 * @param {string} element - Node name
 * @param {Object} attributes - Object of attributes, styles
 * @param {Object} options - Object of options
 */
function createDOM(element = null, attributes = {}, options = {}) {
    let DOM;

    if (arguments.length === 0) {
        throw new TypeError('[createDOM] 1 argument required, but 0 present.');
    }
    if (typeof attributes !== 'object') {
        throw new TypeError('[createDOM] type of `attributes` not an Object');
    }
    if (typeof options !== 'object') {
        throw new TypeError('[createDOM] type of `options` not an Object');
    }

    // check `namespaceURI` options
    if (typeof options.namespaceURI !== 'undefined') {
        DOM = document.createElementNS(options.namespaceURI, element);
    } else {
        DOM = document.createElement(element);
    }

    // construct DOM attributes
    if (typeof attributes === 'object') {
        for (const key in attributes) {
            if (Object.hasOwnProperty.call(attributes, key) && typeof attributes[key] === 'object') {
                const obj = attributes[key];
                switch (key) {
                    case 'attributes':
                        for (const key2 in obj) {
                            if (Object.hasOwnProperty.call(obj, key2)) {
                                const dashed = key2;

                                DOM.setAttribute(dashed, obj[key2]);
                            }
                        }
                        break;
                    case 'styles':
                        for (const key2 in obj) {
                            if (Object.hasOwnProperty.call(obj, key2)) {
                                DOM.style[key2] = obj[key2];
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    return DOM;
}

module.exports = {
    NAMESPACE_URI,
    camelToSnakeCase,
    createDOM,
}