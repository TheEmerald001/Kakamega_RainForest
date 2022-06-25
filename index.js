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
  //This shall show a selected trail items
function renderTrail(trailOn){
    let show = document.createElement('div');
    show.className = "oneSpecies"; //we will style this with css
    show.innerHTML = `
    <img src="${trailOn.image}" alt="">
    <h5 class="speciesName"> ${trailOn.name}</h5>
    <p class="specieDescription">${trailOn.desc}</p>
    <div class="buttonDiv">
        <div id="seenBtnCarrier" class="withBtn"><button class="buttons" id="seenBtn"> Seen On Trail!🥳 </button></div>  
        <div id="donateBtnCarrier" class="withBtn"><button class="buttons" id="donateBtn"> Donate $10 </button></div>
    <div/>
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
  //let us now see the page in action, once all is loaded and get events are fired
  const domDataAvailabe = document.addEventListener('DOMContentLoaded', pageAction);
   function run(){
    return domDataAvailabe;
   };
   run();
  
       //lets add some more js, to allow donations, hiding viewed items and...
    //    function showOnlyUnseen(){
    //     let seenItem = document.querySelector('#seenBtn');
    //     const divSeen = document.querySelector('#seenBtnCarrier');
    //     let viewedItems = 0;
    //     seenItem.addEventListener('onclick', ()=> {
    //         if(divSeen.style.display === 'block'){
    //             divSeen.style.display = "none"
    //         }
    //         viewedItems ++;
    //         //test in scope
    //         console.log(`${viewedItems}`)
    //         return viewedItems;
    //     })
    //    }
       
    //    function donatedMullah(){
    //     let donated = document.querySelector('#donateBtn');
    //     let donatedSum = 0;
    //     donated.addEventListener('onclick', () => {
    //         alert('Thank You For Your generous Donation!')
    //         donatedSum += 10;
    //         //test in scope
    //         console.log(`${donatedSum}`)
    //         return donatedSum;
    //     })
    //    }
    //    showOnlyUnseen();
    //    donatedMullah();
