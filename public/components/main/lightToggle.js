//   LIGHT  TOGGLE

const root = document.querySelector(':root')
const toggle = document.querySelector(".light-toggle")

let theme ="dark"
toggle.addEventListener('click', ()=>{
    theme = (theme === "dark" ? "light" : "dark");
    decideTheme()
})

function decideTheme(){
    if (theme === "light"){
    root.style.setProperty('--dark-bg', `#ffefd5`)
    root.style.setProperty('--dark-navbar', '#fff')
    root.style.setProperty('--f-color', '#000')
    root.style.setProperty('--toggle-bg', '#000')
    root.style.setProperty('--toggle', 'translateX(0)')
} else {
    root.style.setProperty('--dark-bg', `#151515`)
    root.style.setProperty('--dark-navbar', '#000')
    root.style.setProperty('--f-color', '#fff')
    root.style.setProperty('--toggle-bg', '#f0ebe1')
    root.style.setProperty('--toggle', 'translateX(-18px)')
    }
}
