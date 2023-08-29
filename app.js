const dataList = document.getElementById('list');
const selectionList = document.getElementById('selection');
// console.log(window.location.hash.slice(1))
window.addEventListener('hashchange', () =>{
    getEventFromHash();
    renderSelection()
})

const state = {
    jSON: [],
    selection: null
}


async function getEventFromHash(){
    await getData()
    const id = window.location.hash.slice(1);
    // console.log(id)
    // console.log(state.jSON[1].id)
    const selection = state.jSON.find((item) => {
        return item.id === 1 * id;
    })
    console.log(state.jSON)
    // console.log(selection)
    state.selection = selection
    console.log(state.selection)
}


async function renderSelection(){
    await getData();
    const selectionHTML = `
    <h2>ID: ${state.selection.id}</h2>
    <h4>TITLE: ${state.selection.title}</h4>
    <p>BODY: ${state.selection.body}</p>`;
    // console.log("selection --> ", selectionHTML)
    selectionList.innerHTML = selectionHTML;
}



async function getData(){
    const info = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await info.json()
    state.jSON = data
    // console.log(state.jSON)
}

async function renderDataList(){
    await getData();
    const idHTML = state.jSON.map(element => {
        return `<div><a href='#${element.id}'>${element.id}</a></div>`
    }).join('')
    dataList.innerHTML =  idHTML
}

renderDataList()