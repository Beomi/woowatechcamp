/*
let count = 0
let raf;

const interval = () => {
    if (count > 1000) return false
    count ++
    console.log('hello')
    raf = requestAnimationFrame(interval)
}

requestAnimationFrame(interval)

document.addEventListener('click', () => {
    cancelAnimationFrame(raf)
})
*/

const animationDIV = document.querySelector('#animation')
const animationRunButton = document.querySelector('#animation-run-btn')
let nowPosition = 0

const animate = () => {
    if (nowPosition > 400) return false
    animationDIV.style.transform = `translate(${nowPosition}px)`
    animationDIV.style.backgroundColor = `#${nowPosition}${nowPosition}`
    nowPosition += 2
    requestAnimationFrame(animate);
}

animationRunButton.addEventListener('click', () => {
    requestAnimationFrame(animate);
})
