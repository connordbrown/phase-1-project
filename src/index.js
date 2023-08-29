document.addEventListener('DOMContentLoaded', () => {
    fetchDigimon();
})


function fetchDigimon() {
    fetch("http://localhost:3000/digimon")
      .then(response => response.json())
      .then(data => {
            fillPage(data);
            filterDigimon(data);
      })
}


function fillPage(digiData) {
    const digimonContainer = document.querySelector('#digimon-container');
        digimonContainer.textContent = "";

    const digiList = document.createElement('ul');
        digiList.id = 'digimon-list';

    digiData.forEach(digimon => {
        const {name} = digimon;
        const digiName = document.createElement('li');
            digiName.textContent = `${name} `;
        const digiButton = document.createElement('button');
            digiButton.textContent = 'view';
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

