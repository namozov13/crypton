const API = './database/data.json'

const nonNegative = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og']
const lowerNonNegative = nonNegative.map(item => item.toLowerCase())

const mainTable = document.querySelector('.periodic-table')
const lantaTable = document.querySelector('.lanta')
const aktiTable = document.querySelector('.akti')
const x = document.querySelector('#clear')
const results = document.querySelector('.results')
const overlay = document.querySelector('#overlay')
const searchBox = document.querySelector('#searchBox')
const showBtn = document.querySelector('#showBtn')
const hideBtn = document.querySelector('#x')
const form = document.querySelector('form')
const inputVal = form.querySelector('#value')

const body = document.querySelector('body')
const darkBtn = document.querySelector('.dark')
const lightBtn = document.querySelector('.light')
const images = document.querySelectorAll("#star")
const icon = document.querySelector(".iconSvg")
const search = document.querySelector(".searchIcon")
const dark = () => {
    body.classList.add("darkMode")
    darkBtn.classList.add("hidden")
    lightBtn.classList.remove("hidden")
    images.forEach((star) => {
        star.src = "./main/assets/star_white.svg"
    })
    search.src = "./main/assets/search.svg"
}

const light = () => {
    body.classList.remove("darkMode")
    lightBtn.classList.add("hidden")
    darkBtn.classList.remove("hidden")
    images.forEach((star) => {
        star.src = "./main/assets/star_black.svg"
    })
    search.src = "./main/assets/search-dark.svg"
}

if (localStorage.getItem("mode") === "darkmode") {
    dark()
} else if(localStorage.getItem("mode") === "lightmode"){
    light()
}

lightBtn.addEventListener('click', () => {
    light()
    localStorage.setItem("mode", "lightmode")
})

darkBtn.addEventListener('click', () => {
    dark()
    localStorage.setItem("mode", "darkmode")
})
window.addEventListener("keydown", (e) => {
    if (e.altKey && (e.code === "KeyT" || e.key.toLowerCase() === "t")) {
        e.preventDefault()

        if (body.classList.contains("darkMode")) {
            light()
            localStorage.removeItem("mode")
        } else {
            dark()
            localStorage.setItem("mode", "darkmode")
        }
    }
})
const show = () => {
    overlay.classList.remove('hidden')
    searchBox.classList.remove('hidden')
    showBtn.classList.add('hidden')
}

const hide = () => {
    overlay.classList.add('hidden')
    searchBox.classList.add('hidden')
    showBtn.classList.remove('hidden')
}

showBtn.addEventListener('click', show)
hideBtn.addEventListener('click', hide)
overlay.addEventListener('click', hide)

window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') hide()
})

x.addEventListener('click', () => {
    inputVal.value = ''
    results.innerHTML = ''
})

const getData = async (resource) => {
    const request = await fetch(resource);
    if (!request.ok) {
        throw new Error("Ma`lumotni olib bo'lmadi !!!");
    }
    return await request.json();
}
let searchDatabase = [];
form.addEventListener('submit', (e) => {
    e.preventDefault()
})

form.addEventListener('input', (e) => {
    e.preventDefault()
    const val = inputVal.value.toLowerCase().trim()
    results.innerHTML = ''

    if (val === '') return;

    let found = false

    searchDatabase.forEach((item) => {
        const itemId = item.id.toLowerCase()
        const itemName = item.name.toLowerCase()
        const itemAtomNum = item.atomNum
        if (itemId.includes(val) || itemName.startsWith(val) || itemAtomNum.startsWith(val)) {
            found = true

            if (itemId === 'la') {
                results.innerHTML += `
                    <a href="./elements/element.html?element=${item.id}" class="element ${item.block}-part">
                       <div class="elInfo">
                            <div class="symbol">
                                <h3 class="elFormula">${item.id}</h3>
                                <img src="main/assets/star_black.svg">
                            </div>
                            <p class="atomic-mass">${item.atomMass}</p>
                            <p class="elName">${item.name}</p>
                       </div>
                       <p class="elNegative">${item.negative}</p>
                       <p class="elNum">${item.atomNum}</p>
                    </a>`
            } else if (itemId === 'ac') {
                results.innerHTML += `
                    <a href="./elements/element.html?element=${item.id}" class="element ${item.block}-part">
                       <div class="elInfo">
                            <div class="symbol">
                                <h3 class="elFormula">${item.id}</h3>
                                <div class='stars'>
                                    <img src="main/assets/star_black.svg">
                                    <img src="main/assets/star_black.svg">
                                </div>
                            </div>
                            <p class="atomic-mass">${item.atomMass}</p>
                            <p class="elName">${item.name}</p>
                       </div>
                       <p class="elNegative">${item.negative}</p>
                       <p class="elNum">${item.atomNum}</p>
                    </a>`
            } else if (lowerNonNegative.includes(itemId)) {
                results.innerHTML += `
                    <a href="./elements/element.html?element=${item.id}" class="element ${item.block}-part">
                       <div class="elInfo">
                            <h3 class="elFormula">${item.id}</h3>
                            <p class="atomic-mass">${item.atomMass}</p>
                            <p class="elName">${item.name}</p>
                       </div>
                       <p class="elNum">${item.atomNum}</p>
                    </a>`
            } else {
                results.innerHTML += `
                    <a href="./elements/element.html?element=${item.id}" class="element ${item.block}-part">
                       <div class="elInfo">
                            <h3 class="elFormula">${item.id}</h3>
                            <p class="atomic-mass">${item.atomMass}</p>
                            <p class="elName">${item.name}</p>
                       </div>
                       <p class="elNegative">${item.negative}</p>
                       <p class="elNum">${item.atomNum}</p>
                    </a>`
            }
        }
    })

    if (!found) {
        results.style.display = 'flex'
        results.innerHTML = "<p style='color: var(--not);'>Hech narsa topilmadi</p>"
    }
})

const update = (database, loc) => {
    loc.innerHTML = ''
    database.forEach((item) => {
        const { id, name, atomNum, atomMass, layout, block, negative } = item

        if (id === "La") {
            loc.innerHTML += `
                <a href="./elements/element.html?element=${id}" class="element ${block}-part" style="${layout}">
                   <div class="elInfo">
                        <div class="symbol">
                            <h3 class="elFormula">${id}</h3>
                            <img src="main/assets/star_black.svg">
                        </div>
                        <p class="atomic-mass">${atomMass}</p>
                        <p class="elName">${name}</p>
                   </div>
                   <p class="elNegative">${negative}</p>
                   <p class="elNum">${atomNum}</p>
                </a>`
        } else if (id === "Ac") {
            loc.innerHTML += `
                <a href="./elements/element.html?element=${id}" class="element ${block}-part" style="${layout}">
                   <div class="elInfo">
                        <div class="symbol">
                            <h3 class="elFormula">${id}</h3>
                            <div class="stars">            
                                <img src="main/assets/star_black.svg">
                                <img src="main/assets/star_black.svg">
                            </div>
                        </div>
                        <p class="atomic-mass">${atomMass}</p>
                        <p class="elName">${name}</p>
                   </div>
                   <p class="elNegative">${negative}</p>
                   <p class="elNum">${atomNum}</p>
                </a>`
        } else if (!nonNegative.includes(id)) {
            loc.innerHTML += `
                <a href="./elements/element.html?element=${id}" class="element ${block}-part" style="${layout}">
                    <div class="elInfo">
                        <h3 class="elFormula">${id}</h3>
                        <p class="atomic-mass">${atomMass}</p>
                        <p class="elName">${name}</p>
                    </div>
                    <p class="elNegative">${negative}</p>
                    <p class="elNum">${atomNum}</p>
                </a>`
        } else {
            loc.innerHTML += `
                <a href="./elements/element.html?element=${id}" class="element ${block}-part" style="${layout}">
                    <div class="elInfo">
                        <h3 class="elFormula">${id}</h3>
                        <p class="atomic-mass">${atomMass}</p>
                        <p class="elName">${name}</p>
                    </div>
                    <p class="elNum">${atomNum}</p>
                </a>`
        }
    });
}

getData(API).then(data => {
    searchDatabase = data;
    const lantanoidlar = data.filter(item => item.ingroup === 'Lantanoidlar');
    update(lantanoidlar, lantaTable);
    const aktinoidlar = data.filter(item => item.ingroup === 'Aktinoidlar');
    update(aktinoidlar, aktiTable);
    const others = data.filter(item => item.ingroup !== 'Lantanoidlar' && item.ingroup !== 'Aktinoidlar');
    update(others, mainTable);
}).catch(err => err.message);