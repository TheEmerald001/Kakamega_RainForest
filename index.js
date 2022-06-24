//If I want to capture the radio button input by the tourist;
const trailOn = function(){
    const start = document.getElementsByName('startTrail'); //an array of all radios named trails
    console.log(start);
    for (i = 0; i < start.length; i++){
        if(start[i].checked){ 
            console.log(start[i].value);
            return  start[i].value; //
        }
    }
  }
//console.log(`${trailOn()}`);
function renderTrail(trailOn){
    let show = document.createElement('div');  // Append comes here//
    show.className = "oneSpecies"; //we will style this with css
    show.innerHTML = `
    <img src="${trailOn.image}" alt="">
    <h5 class="speciesName"> ${trailOn.name}</h5>
    <p class="specieDescription">${trailOn.desc}</p>
    <div class="withBtn">
        <button class="submitBtn"> Donate </button>
    </div>
</div>
    `; //this is how I  add a single animal
    document.querySelector('#allSpecies').appendChild(show);
}
const pageAction = () => 
    {
        const inputForm = document.querySelector('form');
        inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let trail = trailOn();
        //fetch trail datagit
        fetch(`http://localhost:3000/${trail}`)
        .then(response => response.json())
        .then(trailData => trailData.forEach(trailOn => renderTrail(trailOn)));
    });
  };
   document.addEventListener('DOMContentLoaded', pageAction);