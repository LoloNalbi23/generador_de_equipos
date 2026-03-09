let btna = document.getElementById("add")
let btng = document.getElementById("generar")
let btnb = document.getElementById("borrar")
let inputs = document.getElementById("name")
let btnl = document.getElementById("lista")
let btne = document.getElementById("borrar_l")
let names = []
let listas = JSON.parse(localStorage.getItem('listas')) || {}
let equipo1 = []
let equipo2 = []
let total1 = 0
let total2 = 0

if(listas){
    console.log(listas)
}

btne.addEventListener("click", () =>{
    const nombre = prompt('Nombre de la lista:')
    if(!nombre) return
    if(listas[nombre]) {
        delete listas[nombre];
        localStorage.setItem('listas', JSON.stringify(listas));
        console.log('Lista eliminada:', nombre);
    } else {
        console.log('No existe una lista con ese nombre');
    }
})

btnl.addEventListener("click", () =>{
    const nombreLista = prompt('Nombre de la lista:')
    
    if(!nombreLista) return

    listas[nombreLista] = [...names]
    localStorage.setItem('listas', JSON.stringify(listas))
    console.log('Lista guardada:', listas)
})

inputs.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btna.click()
    }
})
btna.addEventListener("click", () => {
    let input = document.getElementById("name")
    let lista = document.getElementById("names")
    let valor = document.getElementById("valor")
    names.push({n:`${input.value}`,v:parseFloat(valor.value)})
    console.log(names)
    let li = document.createElement("li")
    li.textContent = `${input.value}: ${parseFloat(valor.value)}`
    lista.appendChild(li)
    input.value = ""
    valor.value = ""
})


btng.addEventListener("click", () => {
    equipo1 = []
    equipo2 = []
    total1 = 0
    total2 = 0
    let teams = document.getElementById("teams")
    const acomodados = [...names].sort((a, b) => b.v - a.v)
    for(let i=0;i<acomodados.length;i++){
        if(total1<=total2){
            equipo1.push(acomodados[i])
            total1+= acomodados[i].v
        } else {
            equipo2.push(acomodados[i])
            total2+= acomodados[i].v
        }
    }
    teams.innerHTML = ""

// Dentro de tu función que muestra equipos
    teams.innerHTML = `
        <div class="team-card">
            <h3>Equipo 1</h3>
            <ul>
            ${equipo1.map(p => `<li><span>${p.n}</span><span>${p.v}</span></li>`).join('')}
            </ul>
            <div class="team-total">Total: <strong>${total1}</strong></div>
        </div>
        <div class="team-card">
            <h3>Equipo 2</h3>
            <ul>
            ${equipo2.map(p => `<li><span>${p.n}</span><span>${p.v}</span></li>`).join('')}
            </ul>
            <div class="team-total">Total: <strong>${total2}</strong></div>
        </div>
    `
})