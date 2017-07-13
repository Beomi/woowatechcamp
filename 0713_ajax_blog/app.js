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

    const blogBtn = document.querySelector('.blog-ajax-btn')
    blogBtn.addEventListener('click', loadBlogData)

    const blogIterBtn = document.querySelector('.blog-ajax-iter-btn')
    blogIterBtn.addEventListener('click', loadIterBlogData)
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

// click event listener:
// set Inner values through ajax call
function loadBlogData() {
    ajax('/data.json', function () {
        const json = JSON.parse(this.responseText)
        setBlogData(json)
    })
}

// return HTML rendered template
function renderTemplate(jsonObject, templateSelector) {
    const template = document.querySelector(templateSelector).innerHTML
    const templateScript = Handlebars.compile(template)
    return templateScript(jsonObject)
}

// callBack from setBlogData()
function setHtmlBlogData(jsonObject) {
    const html = renderTemplate(jsonObject, '#blogListTemplate')
    const blogList = document.querySelector('#my_position')
    const li = document.createElement('li')
    li.innerHTML = (html)
    blogList.appendChild(li)
}

// callback from loadBlogData(), loops with underscore
function setBlogData(jsonArray) {
    _.each(
        jsonArray,
        function (jsonObject) {
            setHtmlBlogData(jsonObject)
        }
    )
}

// click event Listener:
// prevent cache from browser with timestamp
function loadIterBlogData() {
    const timeStamp = Date.now()
    ajax('/data.json?_='+timeStamp, function () {
        const json = JSON.parse(this.responseText)
        setIterBlogData(json)
    })
}

// loop in template engine
function setIterBlogData(jsonArray) {
    const html = renderTemplate(jsonArray, '#blogIterTemplate')
    const blogList = document.querySelector('#my_friend')
    blogList.innerHTML = html
}
