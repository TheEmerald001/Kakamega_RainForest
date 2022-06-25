//If I want to capture the radio button input by the tourist;
const trailOn = function(){
    const start = document.getElementsByName('startTrail'); //an arraylike of all radios(This is known as a NodeList)
    console.log(start);
    for (i = 0; i < start.length; i++){
        if(start[i].checked){ 
            console.log(start[i].value);
            return  start[i].value;
        }
    }
}
//console.log(`${trailOn()}`);
function renderTrail(trailOn){
    let show = document.createElement('div');
    show.className = "oneSpecies"; //we will style this with css
    show.innerHTML = `
    <img src="${trailOn.image}" alt="">
    <h5 class="speciesName"> ${trailOn.name}</h5>
    <p class="specieDescription">${trailOn.desc}</p>
    <div class="withBtn">
        <button class="submitBtn"> Donate </button>
    </div>
</div>
    `;
     //this is how I  add all items now
    document.querySelector('#allSpecies').appendChild(show);
}
//Function for sub-action on form inputs. It listens for and acts on inputs
// I will use this as the Callack function after DOMLoaded is heard
const pageAction = () => 
    {
        const inputForm = document.querySelector('form');
        inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        //I want to capture text input by tourist and use the value
        const touristName = document.querySelector('.nameText').value;
        let trail = trailOn();
        //some control flows to obtains an alias for the chosen trail
        function welcomeTourist(){
             if (trail === 'birds'){
            var presetTrail = 'Ndege'
            }else if (trail === 'monkeys'){
                var presetTrail = 'Nyani';
            }else if (trail === 'Butterflies'){
                var presetTrail = 'Ridadi';
            }else if (trail === 'trees'){
                var presetTrail = 'Mutitu'}
        let welcome = document.createElement('div');
        welcome.innerHTML = `
        <h3>Hello ${touristName}!	<h3/>
        <p>Welcome to the ${trail} trail. <br/>
        Here are the ${trail} in ${presetTrail} trail. <p/>        
        `;
        document.querySelector('#trailhead').appendChild(welcome);
        }
        welcomeTourist();
        inputForm.reset();
        //fetch trail data
        fetch(`https://young-refuge-16802.herokuapp.com/${trail}`)
        .then(response => response.json())
        .then(trailData => trailData.forEach(trailOn => renderTrail(trailOn)));
    });
  };
  //let us now see the page in action, once all is oaded and events are fired
   document.addEventListener('DOMContentLoaded', pageAction);