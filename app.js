const dataButton = document.getElementById("dataButton")
const dataDiv = document.getElementById("dataDiv")
dataButton.addEventListener("click",async () => {
    const info = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await info.json()
    console.log(data)
    dataDiv.innerHTML = `
        <div> 
            <h1>${data.id}</h1>
            <h2>${data.title} </h2>
            <p> ${data.body}</p>
        </div>
    `
})

 
window.addEventListener("hashchange", () => {
    selectEntries();

})


const state = {
    entries: [],
    singleEntry: null
}

//whenever the hashchange event fires, this function is called
function selectEntries(){
    
    getEventFromHash();
    renderEntryDetails();
}


function getEventFromHash(){
   
    const name = window.location.hash.slice(1)

  
    const singleEntry = state.entries.find((entry) => {
        return entry.name === name;
    })

    
    state.singleEntry = singleEntry;
    console.log(state)
}

function renderEntryDetails(){
    if(state.singleEntry){
        getSingleEntry();
    }
}

const entryDiv = document.getElementById("entryDiv")


const allEntriesDiv = document.getElementById("dataDiv")

function renderEntryList() {
    const allEntries = state.entries.map((entry) => {
        return `<div> <a href=#${entry.name}> ${entry.name} </a> </div>`
    })
    allEntriesDiv.innerHTML = allEntries.join('');
}


async function getEntriesList(){
    const info = await fetch("https://jsonplaceholder.typicode.com/posts")
    const entryData = await info.json()
    console.log(entryData.results)
    state.entry = entryData.results
}


async function render(){
    await getEntriesList();
    renderEntryList();
    selectEntries();
}

render();