document.addEventListener('DOMContentLoaded', () => {
    fetchDigimon();
})


function fetchDigimon() {
    fetch("http://localhost:3000/digimon")
      .then(response => response.json())
      .then(data => fillPage(data))
}


function fillPage(digiData) {
    const digiList = document.createElement('ul');
    digiData.forEach(digimon => {
        const {name} = digimon;
        const digiName = document.createElement('li');
            digiName.textContent = name;
        const digiButton = document.createElement('button');
            digiButton.textContent = 'view';
        digiName.appendChild(digiButton);
        digiList.appendChild(digiName);
    })
    const digimonContainer = document.querySelector('#digimon-container');
    digimonContainer.appendChild(digiList);
}