// version 2.0

// get the input form
const inputForm = document.querySelector('form');

// initialise trail to empty string
let selectedTrail = ""; 

// initialise tourist name to empty string
let touristName = "Tourist";


/**
 * This is the entry point for the application(where the magic happens)
 * 1.sets the tourist name to the value of the input field
 * 2.sets the selected trail to the value of the select radio button
 * 3.calls the fetchTrailDataFromServer function to fetch the data from the server
 * 4.calls the selectedTrailTitle function to render the title to the page
 * 5.calls the renderTrail function to render the data to the page
 * 
 */
function trailOn() {

    // set tourist name to the value of the input field
    touristName = document.querySelector('.nameText').value;

    // set selected trail value to the value of the selected radio button
    selectedTrail = document.querySelector('input[name="startTrail"]:checked').value;
    inputForm.addEventListener('submit', async (e) => {

        // prevent default action, we want to do this manually
        e.preventDefault();

        // fetch the data from the api
        const trailData = await fetchTrailDataFromServer();

        // clear the trailhead div to avoid stacking of elements from previous trail fetch
        document.querySelector('#trailhead').innerHTML = "";

        // title of the trail(note called outside of the loop)
        selectedTrailTitle();

        // clear the #allSpecies div to avoid stacking of elements from previous trail fetch
        document.querySelector('#allSpecies').innerHTML = "";

        // loop through the data and render each trail item
        trailData.forEach((trail) => { 
            renderTrail(trail);
        });
    
        // clears the form fields
        inputForm.reset();
    });

}

/**
 * Using async/await to fetch the data from the API
 * This is cleaner and helps avoid the callback hell
*/
async function fetchTrailDataFromServer() {
    // set the server url endpoint to fetch the data from
    let url = `https://young-refuge-16802.herokuapp.com/${selectedTrail}`;

    // fetch the data from the server
    const response = await fetch(url);

    // parse the data as json
    const data = await response.json();

    // check if an error occurred during the fetch 
    if (!response.ok) {
        throw new Error(`Error fetching data ${response.statusText}`);
    }

    // else the fetch was a success return the data(json object)
    return data;
}

function selectedTrailTitle() {
         if (selectedTrail === 'birds'){
            var presetTrail = 'Ndege'
            }else if (selectedTrail === 'monkeys'){
                var presetTrail = 'Nyani';
            }else if (selectedTrail === 'Butterflies'){
                var presetTrail = 'Ridadi';
            }else if (selectedTrail === 'trees'){
                var presetTrail = 'Mutitu'}
    let welcome = document.createElement('div');
    console.log(touristName);
    welcome.innerHTML = `
<h3>Hello ${touristName}!	<h3/>
<p>Welcome to the ${selectedTrail} trail. <br/>
Here are the ${selectedTrail} in ${presetTrail} trail.`;
    document.querySelector('#trailhead').appendChild(welcome);
}

function renderTrail(trailData) {
    let show = document.createElement('div');
    show.className = "oneSpecies"; //we will style this with css
    show.innerHTML = `
<img src="${trailData.image}" alt="">
<h5 class="speciesName"> ${trailData.name}</h5>
<p class="specieDescription">${trailData.desc}</p>
 <div class="withBtn">
    <div id="seenBtnCarrier" class="withBtn"><button class="buttons" id="seenBtn"> Seen On Trail!🥳 </button></div>  
    <div id="donateBtnCarrier" class="withBtn"><button class="buttons" id="donateBtn"> Donate $10 </button></div>
</div>
`;
    //this is how I add all items now
    document.querySelector('#allSpecies').appendChild(show);
}
  
    //    //lets add some more js, to allow donations, hiding viewed items and...
    //    function showOnlyUnseen(){
    //     let seenItem = document.querySelector('#seenBtn');
    //     const divSeen = document.querySelector('#seenBtnCarrier');
    //     let viewedItems = 0;
    //     seenItem.addEventListener('click', ()=> {
    //         if(divSeen.style.display === 'block'){
    //             divSeen.style.display = "none"
    //         }
    //         console.log('i ran');
    //         viewedItems ++;
    //         test in scope
    //         console.log(`${viewedItems}`)
    //         return viewedItems;
    //     })
    //    }
       
    //    function donatedMullah(){
    //     let donated = document.querySelector('#donateBtn');
    //     let donatedSum = 0;
    //     donated.addEventListener('click', () => {
    //         alert('Thank You For Your generous Donation!')
    //         donatedSum += 10;
    //         //test in scope
    //         console.log(`${donatedSum}`)
    //         return donatedSum;
    //     })
    //    }

