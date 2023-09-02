// carry out application after page content has loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchDigimon();
})


// request data from server (GET)
function fetchDigimon() {
    fetch("http://localhost:3000/digimon")
      .then(response => response.json())
      .then(data => {
            // use destructuring assignment to get firstDigimon object
            const [firstDigimon] = data;
            // display firstDigimon upon page load
            viewDigimon(firstDigimon);
            fillPage(data);
            filterDigimon(data);
            submitNewDigimon(data);
      })
}


// display list of Digimon based on digiData
// param: digidata (Object array)
function fillPage(digiData) {
    // clear out digimon list before each use
    const digimonContainer = document.querySelector('#digimon-container');
        digimonContainer.textContent = "";
    // create list element
    const digiList = document.createElement('ul');
        digiList.id = 'digimon-list';

    // create li elements containing name and view button
    digiData.forEach(digimon => {
        // use destructuring assignment to get name variable from digimon
        const {name} = digimon;
        const digiName = document.createElement('li');
            digiName.textContent = `${name} `;
        const digiButton = document.createElement('button');
            digiButton.textContent = 'view';
            digiButton.addEventListener('click', () => viewDigimon(digimon));
        digiName.appendChild(digiButton);

        digiList.appendChild(digiName);
    })

    digimonContainer.appendChild(digiList);
}


// filter Digimon based on selected level
// param: digiData (Object array)
function filterDigimon(digiData) {
    // grab dropdown
    const selectLevel = document.querySelector('#level-dropdown');
    selectLevel.addEventListener('change', () => {
        if (selectLevel.value === "") {
            fillPage(digiData); // default
        } else {
            const digiFiltered = digiData.filter((digimon) => {
                return digimon.level === selectLevel.value;
            })
            fillPage(digiFiltered);  // filtered
        }
    }) 
}


// view a specific Digimon
// param: digimon (object)
function viewDigimon(digimon) {
    // clear out Digimon card before each use
    const digimonCard = document.querySelector('#digimon-card');
        digimonCard.textContent = "";

    // create elements for each Digimon attribute    
    const name = document.createElement('h3');
        name.textContent = digimon.name;
    const image = document.createElement('img');
        image.src = digimon.img;
        image.id = 'digimon-image';
    const level = document.createElement('h4');
        level.textContent = `Level: ${digimon.level}`;
    const likeBtn = document.createElement('button');
        // check if likes attribute exists
        if (digimon.likes === undefined) {
            digimon.likes = 0;
        }
        likeBtn.textContent = `Likes: ${digimon.likes}`;
        likeBtn.addEventListener('click', () => likeDigimon(digimon))
    // append elements to digimonCard
    digimonCard.appendChild(name);
    digimonCard.appendChild(image);
    digimonCard.appendChild(level);
    digimonCard.appendChild(likeBtn);

    // scroll to top of page after clicking view button
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// like a specific digimon
// param: digimon (object)
function likeDigimon(digimon) {
    // create update object
    const updateObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        // update number of likes
        body: JSON.stringify({"likes": digimon.likes+=1})
    }
    // persist new like data to server
    fetch(`http://localhost:3000/digimon/${digimon.id}`, updateObj)
      .then(response => response.json())
      // update DOM
      .then(viewDigimon(digimon))
      .catch(error => alert(error.message))
}


// submit a new Digimon with a form
// param: digiData (Object array)
function submitNewDigimon(digiData) {
    // grab form
    const form = document.querySelector('#add-digimon-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        // assign values in form fields to variables
        const name = event.target[0].value;
        const image = event.target[1].value;
        const level = event.target[2].value;
        // create new Digimon
        postNewDigimon(name, image, level, digiData);
        // reset form after submission
        form.reset();
    })
}


// persist a new Digimon to server after submitting form
// params: digiName (string), digiImage (string), digiLevel(string), digiData(Object array)
function postNewDigimon(digiName, digiImage, digiLevel, digiData) {
    // create post object
    const postObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "name": digiName,
            "img": digiImage,
            "level": digiLevel
        })
    }

    // send post request to main endpoint
    fetch("http://localhost:3000/digimon", postObj)
      .then(response => response.json())
      .then(newDigimon => {
        // add new Digimon to GET data
        digiData.push(newDigimon);
        // display updated data
        fillPage(digiData);
      })
      .catch(error => alert(error.message))
}