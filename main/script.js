const mainAPI = './database/mainData.json'
const lantaAPI = './database/lantaData.json'
const aktiAPI = './database/aktiData.json'
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

getData(API).then(data => {
    searchDatabase = data;
}).catch(err => console.log(err.message));

form.addEventListener('input', () => {
    const val = inputVal.value.toLowerCase().trim()
    results.innerHTML = ''

    if (val === '') return;

    searchDatabase.forEach((item) => {
        const itemId = item.id.toLowerCase()
        const itemName = item.name.toLowerCase()
        const itemAtomNum = item.atomNum
        if (itemId.includes(val) || itemName.startsWith(val) || itemAtomNum.startsWith(val)) {

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
            }else {
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

getData(mainAPI).then(data => update(data, mainTable)).catch(err => console.log(err.message))
getData(lantaAPI).then(data => update(data, lantaTable)).catch(err => console.log(err.message))
getData(aktiAPI).then(data => update(data, aktiTable)).catch(err => console.log(err.message))