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