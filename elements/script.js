const databaseAPI = '../database/data.json'
const getData = async (resource) => {
    const request = await fetch(resource);
    if (!request.ok) {
        throw new Error("Ma`lumotni olib bo'lmadi !!!");
    }
    const data = await request.json();
    return data;
}
const body = document.querySelector("body")
const darkBtn = document.querySelector('.dark')
const lightBtn = document.querySelector('.light')

const dark = () => {
    body.classList.add("darkMode")
    darkBtn.classList.add("hidden")
    lightBtn.classList.remove("hidden")
}

const light = () => {
    body.classList.remove("darkMode")
    lightBtn.classList.add("hidden")
    darkBtn.classList.remove("hidden")
}
const checkMode = () => {

    if (localStorage.getItem("mode") === "darkmode") {
        dark()
    } else if (localStorage.getItem("mode") === "lightmode") {
        light()
    }
}

checkMode()
setInterval(checkMode, 1)

lightBtn.addEventListener('click', () => {
    light()
    localStorage.setItem("mode", "lightmode")
})

darkBtn.addEventListener('click', () => {
    dark()
    localStorage.setItem("mode", "darkmode")
})



const elName = document.querySelector('.elName');
const elNum = document.querySelector('.elNumber');
const elMass = document.querySelector('.elMass');
const elFormula = document.querySelector('.elFormula');
const inGroup = document.querySelector('.intext');
const periodNum = document.querySelector('.periodNumber');
const group = document.querySelector('.group');
const density = document.querySelector('.density');
const melting = document.querySelector('.melting');
const boiling = document.querySelector('.boiling');
const more = document.querySelector('#more');
const history = document.querySelector('#history');
const nature = document.querySelector('#nature');
const block = document.querySelector('.elIcon')
const title = document.querySelector('head').querySelector('title')

function showElementDetails(element) {
    elName.textContent = element.name;
    elNum.textContent = element.atomNum;
    elFormula.textContent = element.formula;
    elMass.textContent = element.atomMass;
    inGroup.textContent = element.ingroup;
    periodNum.textContent = element.periodNum;
    group.textContent = element.group;
    density.textContent = element.density;
    melting.textContent = element.melting;
    boiling.textContent = element.boiling;
    more.textContent = element.more;
    history.textContent = element.history;
    nature.textContent = element.nature;
    block.classList.add(element.block);
    title.textContent = element.formula + " | " + element.name + " elementi"

}

const urlParams = new URLSearchParams(window.location.search);
const elementParam = urlParams.get('element');
const update = (database) => {
    const target = database.find(item => item.id.toLowerCase() === elementParam.toLowerCase());
    showElementDetails(target)
}


getData(databaseAPI)
    .then((data) => {
        update(data);
    })
    .catch((err) => {
        console.log(err.message);
    })

window.addEventListener("keydown", (e) => {
    if (e.altKey && (e.code === "KeyT" || e.key.toLowerCase() === "t")) {
        e.preventDefault()

        if (body.classList.contains("darkMode")) {
            light()
            localStorage.setItem("mode", "lightmode")
        } else {
            dark()
            localStorage.setItem("mode", "darkmode")
        }
    }
})