function checkType(value) {
    let type = null
    switch (typeof value) {
        case 'string':
            type = 'string'
            break
        default:
            type = 'monster!!'
    }
    return type
}

function addClass(el, cssClass) {
    el.classList.add(cssClass)
}

function clickClearClassHandler(e) {
    e.preventDefault()
    e.target.className = ''
}

function xhr(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
        cb(JSON.parse(this.responseText));
    });
    xhr.open('get', url);
    xhr.send();
}


document.querySelector('a').addEventListener('click', clickClearClassHandler)
