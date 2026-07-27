const databaseAPI = '../database/data.json'
const getData = async (resource) => {
    const request = await fetch(resource);
    if (!request.ok) {
        throw new Error("Ma`lumotni olib bo'lmadi !!!");
    }
    const data = await request.json();
    return data;
}


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
    console.log(target);
    showElementDetails(target)
}


getData(databaseAPI)
    .then((data) => {
        update(data);
    })
    .catch((err) => {
        console.log(err.message);
    })