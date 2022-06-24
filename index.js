function renderTrail(animal){
    let show = document.createElement('div')  // Append comes here//
    show.className = "oneSpecies" //we would style this with css
    show.innerHTML = `
    <img src="${animal.image}" alt="">
    <h5 class="speciesName"> ${animal.name}</h5>
    <p class="specieDescription">${animal.desc}</p>
    <div class="withBtn">
        <submit class="submitBtn">Donate</submit>
    </div>
</div>
    ` //this is how I would add a single animal
    document.querySelector('#allSpecies').appendChild(show)
}
//fetch trail data
function getTrailData(){
    fetch('http://localhost:3000/animals')
    .then(response => response.json())
    .then(trailData => trailData.forEach(animal => renderTrail(animal)));
}
function showAnimal(){
    getTrailData()
}
showAnimal();