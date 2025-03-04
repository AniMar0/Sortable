fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  })
  .then(main)
  .catch((error) => {
    console.error("Error fetching heroes data:", error);
  });


function main(heroes) {
  let sortedData = sortHeros(heroes)

  const select = document.getElementById("itemsPerPage");

  mainFuncSorte(sortedData);

  search(heroes);

  // Listen for change in selection
  select.addEventListener('change', () => {
    showData(heroes, select.value);
  });

  // Initial rendering
  showData(heroes, select.value);
}

function showData(heroes, count) {
  // Determine how many heroes to display
  const numberOfHeroes = count === 'all' ? heroes.length : parseInt(count);
  const numberOfPages = Math.ceil(heroes.length / numberOfHeroes)

  //matouchiche
  const selectPgae = document.getElementById('pages')
  selectPgae.innerHTML = ""

  const fragmentPages = document.createDocumentFragment()

  //rake hna
  for (let index = 1; index <= numberOfPages; index++) {
    const btn = createElementHelper('button', '' + index, '' + index)
    fragmentPages.append(btn)
  }
  selectPgae.appendChild(fragmentPages)

  const buttona = document.getElementById('pages')

  buttona.addEventListener('click', (e) => {
    if (e.target.id !== "pages") {
      let page = parseInt(e.target.id)
      let start = (page - 1) * numberOfHeroes
      let end = start + numberOfHeroes >= heroes.length ? heroes.length : start + numberOfHeroes
      showHeros(heroes, start, end);
    }
  })
  showHeros(heroes, 0, numberOfHeroes)
}

function showHeros(heroes, start, end) {
  const board = document.getElementById('heroTableBody');
  board.innerHTML = '';

  const selectedHeroes = heroes.slice(start, end);

  selectedHeroes.forEach((hero) => {
    const row = document.createElement('tr');
    // Icon
    const iconCell = document.createElement('td');
    const img = document.createElement('img');
    img.src = hero.images.xs;
    img.alt = hero.name;
    img.style.width = '50px'; // Set a consistent size for the icon
    img.style.height = '50px';
    iconCell.appendChild(img);

    // Name
    const nameCell = newElement('td', hero.name);

    // Full Name
    const fullNameCell = newElement('td', hero.biography.fullName);

    // Powerstats
    const intelligence = newElement('td', hero.powerstats['intelligence'])
    const strength = newElement('td', hero.powerstats['strength'])
    const speed = newElement('td', hero.powerstats['speed'])
    const durability = newElement('td', hero.powerstats['durability'])
    const power = newElement('td', hero.powerstats['power'])
    const combat = newElement('td', hero.powerstats['combat'])

    // Race
    const raceCell = newElement('td', hero.appearance.race);

    // Gender
    const genderCell = newElement('td', hero.appearance.gender);

    // Height
    const heightCell = newElement('td', hero.appearance.height.join(' / '));

    // Weight
    const weightCell = newElement('td', hero.appearance.weight.join(' / '));

    // Place of Birth
    const birthPlaceCell = newElement('td', hero.biography.placeOfBirth);

    // Alignment
    const alignmentCell = newElement('td', hero.biography.alignment);

    row.append(iconCell, nameCell, fullNameCell, intelligence, strength, speed, durability, power, combat, raceCell, genderCell, heightCell, weightCell, birthPlaceCell, alignmentCell)
    // Add the row to the table
    board.appendChild(row);
  });
}

function newElement(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element
}

function createElementHelper(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text;
  element.id = className;
  element.value = text
  return element
}

function search(superheroes) {
  let searchText = []
  const searchBox = document.getElementById('search')
  searchBox.addEventListener('input', (e) => {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredHeroes = superheroes.filter(hero => hero.name.toLowerCase().includes(query)); searchText.push(e.data)

    const select = document.getElementById("itemsPerPage");

    select.addEventListener('change', () => {
      showData(filteredHeroes, select.value);
    });
    showData(filteredHeroes, select.value)
  });
}

function mainFuncSorte(sortedData) {
  const sortebtn = document.getElementById('sorte2')
  const sortebtn1 = document.getElementById('sorte')
  let ascending = false
  sortebtn1.addEventListener('click', (e) => {
    if (e.target.id != "") {
      ascending = !ascending

      const filteredHeroes =  sorteHelper(sortedData[e.target.id], ascending)

      const select = document.getElementById("itemsPerPage");

      select.addEventListener('change', () => {
        showData(filteredHeroes, select.value);
      });

      showData(filteredHeroes, select.value);
    }
  });
  sortebtn.addEventListener('click', (e) => {
    if (e.target.id != "") {
      ascending = !ascending

      const filteredHeroes =  sorteHelper(sortedData[e.target.id], ascending)

      const select = document.getElementById("itemsPerPage");

      select.addEventListener('change', () => {
        showData(filteredHeroes, select.value);
      });

      showData(filteredHeroes, select.value);
    }
  });
}

function isEmpti(params) {
  if (params == '' || params == '-' || params == "0 cm" || params == '0 kg') {
    return false
  }
  return true
}

function sorteHelper(sortedData, ascending) {
  const filteredHeroes = []
  const emptis = []
  if (ascending) {
    for (let index = 0; index < sortedData.length; index++) {
      if (isEmpti(sortedData[index][0])) {
        filteredHeroes.push(sortedData[index][1])
      } else {
        emptis.push(sortedData[index][1])
      }
    }
  } else {
    for (let index = sortedData.length - 1; index > 0; index--) {
      if (isEmpti(sortedData[index][0])) {
        filteredHeroes.push(sortedData[index][1])
      } else {
        emptis.push(sortedData[index][1])
      }
    }
  }

  return filteredHeroes.concat(emptis)
}

function sortHeros(heros) {
  let SortedHerosafter = {
    Name: [],
    FullName: [],
    Intelligence: [],
    Strength: [],
    Speed: [],
    Durability: [],
    Power: [],
    Combat: [],
    Race: [],
    Gender: [],
    Height: [],
    Weight: [],
    PlaceOfBirth: [],
    Alignment: []
  };

  heros.forEach((hero) => {
    SortedHerosafter.Name.push([hero.name, hero]);
    SortedHerosafter.FullName.push([hero.biography.fullName, hero]);
    SortedHerosafter.Intelligence.push([parseInt(hero.powerstats.intelligence) || 0, hero]);
    SortedHerosafter.Strength.push([parseInt(hero.powerstats.strength) || 0, hero]);
    SortedHerosafter.Speed.push([parseInt(hero.powerstats.speed) || 0, hero]);
    SortedHerosafter.Durability.push([parseInt(hero.powerstats.durability) || 0, hero]);
    SortedHerosafter.Power.push([parseInt(hero.powerstats.power) || 0, hero]);
    SortedHerosafter.Combat.push([parseInt(hero.powerstats.combat) || 0, hero]);
    SortedHerosafter.Race.push([hero.appearance.race || "", hero]);
    SortedHerosafter.Gender.push([hero.appearance.gender || "", hero]);
    SortedHerosafter.Height.push([hero.appearance.height[1] || "", hero]);
    SortedHerosafter.Weight.push([hero.appearance.weight[1] || "", hero]);
    SortedHerosafter.PlaceOfBirth.push([hero.biography.placeOfBirth || "", hero]);
    SortedHerosafter.Alignment.push([hero.biography.alignment || "", hero]);
  });


  const sortNumbers = (arr) => arr.sort((a, b) => a[0] - b[0]);


  const sortStrings = (arr) => arr.sort((a, b) => a[0].localeCompare(b[0]));


  SortedHerosafter.Name = sortStrings(SortedHerosafter.Name);
  SortedHerosafter.FullName = sortStrings(SortedHerosafter.FullName);
  SortedHerosafter.Race = sortStrings(SortedHerosafter.Race);
  SortedHerosafter.Gender = sortStrings(SortedHerosafter.Gender);
  SortedHerosafter.Height = sortStrings(SortedHerosafter.Height);
  SortedHerosafter.Weight = sortStrings(SortedHerosafter.Weight);
  SortedHerosafter.PlaceOfBirth = sortStrings(SortedHerosafter.PlaceOfBirth);
  SortedHerosafter.Alignment = sortStrings(SortedHerosafter.Alignment);


  SortedHerosafter.Intelligence = sortNumbers(SortedHerosafter.Intelligence);
  SortedHerosafter.Strength = sortNumbers(SortedHerosafter.Strength);
  SortedHerosafter.Speed = sortNumbers(SortedHerosafter.Speed);
  SortedHerosafter.Durability = sortNumbers(SortedHerosafter.Durability);
  SortedHerosafter.Power = sortNumbers(SortedHerosafter.Power);
  SortedHerosafter.Combat = sortNumbers(SortedHerosafter.Combat);

  return SortedHerosafter;
}
