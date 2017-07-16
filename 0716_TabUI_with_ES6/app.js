class updateDocument {
    constructor(url, newSection, oldSection) {
        this.url = url
        this.newSection = newSection
        this.oldSection = oldSection
    }

    ajax() {
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", this.setValues)
        oReq.open("GET", this.url);
        oReq.send();
    }

    setValues() {
        const sectionId = this.newSection.dataset.pk
        this.oldSection.classList.remove('eleDisplayShow')
        this.newSection.classList.add('eleDisplayShow')
        if (!this.newSection.innerText) {
            this.ajax(this.url + sectionId, function () {
                const json = JSON.parse(this.responseText)
                const template = _.template(
                    "<h2><%= title %></h2><p><%= body %></p>"
                )
                this.newSection.innerHTML = template(json)
            })
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const navigation = document.querySelector('#navigation')
    navigation.addEventListener('click', function (e) {
        if (e.target && e.target.matches('div.tab')) {
            const selectedTab = document.querySelector('.selectedTab')
            selectedTab.classList.remove('selectedTab')
            e.target.classList.add('selectedTab')
            const oldSection = document.querySelector('.eleDisplayShow')
            const tabId = e.target.getAttribute('id')
            const newSection = document.querySelector('#my_' + tabId)
            const ud = new updateDocument({
                url: 'http://jsonplaceholder.typicode.com/posts/',
                newSection: newSection,
                oldSection: oldSection
            })
            ud.setValues()
        }
    })
})
