function onLoadFunction() {
    const ud = new updateDocument()
    const navigation = document.getElementById('navigation')
    const section = document.querySelector('section')
    const blogBtn = document.querySelector('.blog-ajax-btn')
    const blogIterBtn = document.querySelector('.blog-ajax-iter-btn')

    navigation.addEventListener('click', ud.onClickFunction.bind(ud))
    ud.setValues(section)
    blogBtn.addEventListener('click', ud.loadBlogData.bind(ud))
    blogIterBtn.addEventListener('click', ud.loadIterBlogData.bind(ud))
}

class updateDocument {
    constructor () {
        this.tabCount = {}
    }

    onClickFunction (e) {
        if (!(e.target && e.target.matches('div.tab'))) {
            return false
        }
        const selectedTab = document.getElementsByClassName('selectedTab')[0]
        const selectedSection = document.getElementsByClassName('eleDisplayShow')[0]
        const tabId = e.target.getAttribute('id')
        const newSelection = document.getElementById('my_' + tabId)

        selectedTab.classList.remove('selectedTab')
        e.target.classList.add('selectedTab')
        selectedSection.classList.remove('eleDisplayShow')
        newSelection.classList.add('eleDisplayShow')

        this.setValues(newSelection)
        this.setTabClickCount(selectedTab)
    }

    ajax(url, func) {
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", func)
        oReq.open("GET", url);
        oReq.send();
    }

    setValues(section) {
        const sectionId = section.dataset.pk
        if (section.innerText) {
            return false
        }
        this.ajax('//jsonplaceholder.typicode.com/posts/' + sectionId, function () {
            const json = JSON.parse(this.responseText)
            const template = _.template(
                "<h2><%= title %></h2><p><%= body %></p>"
            )
            section.innerHTML = template(json)
        })
    }

    loadBlogData() {
        const timeStamp = Date.now()
        const that = this
        this.ajax('data.json?_=' + timeStamp, function () {
            const json = JSON.parse(this.responseText)
            that.setBlogData(json)
        })
    }

    loadIterBlogData() {
        const that = this
        const timeStamp = Date.now()
        this.ajax('data.json?_=' + timeStamp, function () {
            const json = JSON.parse(this.responseText)
            that.setIterBlogData(json)
        })
    }

    renderTemplate(jsonObject, templateSelector) {
        const template = document.querySelector(templateSelector).innerHTML
        const templateScript = Handlebars.compile(template)
        return templateScript(jsonObject)
    }

    setHtmlBlogData(jsonObject) {
        const html = this.renderTemplate(jsonObject, '#blogListTemplate')
        const blogList = document.querySelector('#my_position')
        const li = document.createElement('li')
        li.innerHTML = (html)
        blogList.appendChild(li)
    }

    setBlogData(jsonArray) {
        _.each(
            jsonArray,
            function (jsonObject) {
                this.setHtmlBlogData(jsonObject)
            }.bind(this)
        )
    }

    setIterBlogData(jsonArray) {
        const html = this.renderTemplate(jsonArray, '#blogIterTemplate')
        const blogList = document.querySelector('#my_friend')
        blogList.innerHTML = html
    }

    setTabClickCount(tab) {
        const span = document.createElement('span')

        if (this.tabCount[tab.getAttribute('id')]) {
            this.tabCount[tab.getAttribute('id')] += 1
        } else {
            this.tabCount[tab.getAttribute('id')] = 1
        }

        span.innerHTML = '('+this.tabCount[tab.getAttribute('id')]+')'
        // tab.removeChild(span)
        tab.appendChild(span)
    }
}

document.addEventListener('DOMContentLoaded', onLoadFunction)
