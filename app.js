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
  sortedData = sortHeros(heroes)

  const select = document.getElementById("itemsPerPage");

  search(heroes)

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

function sortHeros(heros) {

  let SortedHerosafter = {
    Name: [],
    FullName: [],
    intelligence: [],
    strength: [],
    speed: [],
    durability: [],
    power: [],
    combat: [],
    Race: [],
    Gender: [],
    Height: [],
    Weight: [],
    PlaceofBirth: [],
    Alignment: []
  }

  heros.map((hero) => {
    SortedHerosafter.Name.push(hero.name)
    SortedHerosafter.FullName.push(hero.biography.fullName)
    SortedHerosafter.intelligence.push(hero.powerstats['intelligence'])
    SortedHerosafter.strength.push(hero.powerstats['strength'])
    SortedHerosafter.speed.push(hero.powerstats['speed'])
    SortedHerosafter.durability.push(hero.powerstats['durability'])
    SortedHerosafter.power.push(hero.powerstats['power'])
    SortedHerosafter.combat.push(hero.powerstats['combat'])
    SortedHerosafter.Race.push(hero.appearance.race)
    SortedHerosafter.Gender.push(hero.appearance.gender)
    SortedHerosafter.Height.push(hero.appearance.height[1])
    SortedHerosafter.Weight.push(hero.appearance.weight[1])
    SortedHerosafter.PlaceofBirth.push(hero.biography.placeOfBirth)
    SortedHerosafter.Alignment.push(hero.biography.alignment)
  })

  SortedHerosafter.Name = [...SortedHerosafter.Name.sort()]
  SortedHerosafter.FullName = [...SortedHerosafter.FullName.sort()]
  SortedHerosafter.intelligence = [...SortedHerosafter.intelligence.sort()]
  SortedHerosafter.strength = [...SortedHerosafter.strength.sort()]
  SortedHerosafter.speed = [...SortedHerosafter.speed.sort()]
  SortedHerosafter.durability = [...SortedHerosafter.durability.sort()]
  SortedHerosafter.power = [...SortedHerosafter.power.sort()]
  SortedHerosafter.combat = [...SortedHerosafter.combat.sort()]
  SortedHerosafter.Race = [...SortedHerosafter.Race.sort()]
  SortedHerosafter.Gender = [...SortedHerosafter.Gender.sort()]
  SortedHerosafter.Height = [...SortedHerosafter.Height.sort()]
  SortedHerosafter.Weight = [...SortedHerosafter.Weight.sort()]
  SortedHerosafter.PlaceofBirth = [...SortedHerosafter.PlaceofBirth.sort()]
  SortedHerosafter.Alignment = [...SortedHerosafter.Alignment.sort()]

  return SortedHerosafter
}