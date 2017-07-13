document.addEventListener('DOMContentLoaded', function () {
    const navigation = document.getElementById('navigation')
    navigation.addEventListener('click', function (e) {
        if (e.target && e.target.matches('div.tab')) {
            const selectedTab = document.getElementsByClassName('selectedTab')[0]
            selectedTab.classList.remove('selectedTab')
            e.target.classList.add('selectedTab')
            const selectedSection = document.getElementsByClassName('eleDisplayShow')[0]
            selectedSection.classList.remove('eleDisplayShow')
            const tabId = e.target.getAttribute('id')
            const newSelection = document.getElementById('my_' + tabId)
            newSelection.classList.add('eleDisplayShow')
            console.log(newSelection)
            setValues(newSelection)
        }
    })
    const section = document.querySelector('section')
    setValues(section)
})

function ajax(url, func) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", func)
    oReq.open("GET", url);
    oReq.send();
}

function setValues(section) {
    const sectionId = section.dataset.pk
    if (!section.innerText) {
        ajax('http://jsonplaceholder.typicode.com/posts/' + sectionId, function (xhr) {
            const json = JSON.parse(this.response)
            const template = _.template(
                "<h2><%= title %></h2><p><%= body %></p>"
            )
            section.innerHTML = template(json)
        })
    }
}
