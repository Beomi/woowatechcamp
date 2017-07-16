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
    const ud = new updateDocument()

    const section = document.querySelector('section')
    setValues(section)

    const blogBtn = document.querySelector('.blog-ajax-btn')
    blogBtn.addEventListener('click', ud.loadBlogData)

    const blogIterBtn = document.querySelector('.blog-ajax-iter-btn')
    blogIterBtn.addEventListener('click', ud.loadIterBlogData)
})

// Ajax Call with url, callback function
function ajax(url, func) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", func)
    oReq.open("GET", url);
    oReq.send();
}

// set Inner value of tab
function setValues(section) {
    const sectionId = section.dataset.pk
    if (!section.innerText) {
        ajax('http://jsonplaceholder.typicode.com/posts/' + sectionId, function (xhr) {
            const json = JSON.parse(this.responseText)
            const template = _.template(
                "<h2><%= title %></h2><p><%= body %></p>"
            )
            section.innerHTML = template(json)
        })
    }
}


class updateDocument {
    loadBlogData() {
        ajax('/data.json', function () {
            const json = JSON.parse(this.responseText)
            updateDocument.setBlogData(json)
        })
    }

    static renderTemplate(jsonObject, templateSelector) {
        const template = document.querySelector(templateSelector).innerHTML
        const templateScript = Handlebars.compile(template)
        return templateScript(jsonObject)
    }

    static setHtmlBlogData(jsonObject) {
        const html = updateDocument.renderTemplate(jsonObject, '#blogListTemplate')
        const blogList = document.querySelector('#my_position')
        const li = document.createElement('li')
        li.innerHTML = (html)
        blogList.appendChild(li)
    }

    static setBlogData(jsonArray) {
        _.each(
            jsonArray,
            function (jsonObject) {
                updateDocument.setHtmlBlogData(jsonObject)
            }
        )
    }

    loadIterBlogData() {
        const timeStamp = Date.now()
        ajax('/data.json?_=' + timeStamp, function () {
            const json = JSON.parse(this.responseText)
            updateDocument.setIterBlogData(json)
        })
    }

    static setIterBlogData(jsonArray) {
        const html = updateDocument.renderTemplate(jsonArray, '#blogIterTemplate')
        const blogList = document.querySelector('#my_friend')
        blogList.innerHTML = html
    }

}