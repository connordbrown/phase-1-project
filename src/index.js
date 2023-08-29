document.addEventListener('DOMContentLoaded', () => {
    fetchDigimon();
})


function fetchDigimon() {
    fetch("http://localhost:3000/digimon")
      .then(response => response.json())
      .then(data => {
            const [firstDigimon] = data;
            viewDigimon(firstDigimon.name, firstDigimon.img, firstDigimon.level);
            fillPage(data);
            filterDigimon(data);
            submitNewDigimon(data);
      })
}


function fillPage(digiData) {
    const digimonContainer = document.querySelector('#digimon-container');
        digimonContainer.textContent = "";

    const digiList = document.createElement('ul');
        digiList.id = 'digimon-list';

    digiData.forEach(digimon => {
        const {name, img, level} = digimon;
        const digiName = document.createElement('li');
            digiName.textContent = `${name} `;
        const digiButton = document.createElement('button');
            digiButton.textContent = 'view';
            digiButton.addEventListener('click', () => viewDigimon(name, img, level));
        digiName.appendChild(digiButton);

        digiList.appendChild(digiName);
    })

    digimonContainer.appendChild(digiList);
}


function filterDigimon(digiData) {
    const selectLevel = document.querySelector('#level-dropdown');
    selectLevel.addEventListener('change', () => {
        if (selectLevel.value === "") {
            fillPage(digiData);
        } else {
            const digiFiltered = digiData.filter((digimon) => {
                return digimon.level === selectLevel.value;
            })
            fillPage(digiFiltered);  
        }
    }) 
}


function viewDigimon(digiName, digiImg, digiLevel) {
    const digimonCard = document.querySelector('#digimon-card');
        digimonCard.textContent = "";

    const name = document.createElement('h3');
        name.textContent = digiName;
    const image = document.createElement('img');
        image.src = `${digiImg}`;
    const level = document.createElement('h4');
        level.textContent = digiLevel

    digimonCard.appendChild(name);
    digimonCard.appendChild(image);
    digimonCard.appendChild(level);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function submitNewDigimon(digiData) {
    const form = document.querySelector('#add-digimon-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = event.target[0].value;
        const image = event.target[1].value;
        const level = event.target[2].value;

        postNewDigimon(name, image, level, digiData);

        form.reset();
    })
}


function postNewDigimon(digiName, digiImage, digiLevel, digiData) {

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