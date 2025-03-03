async function data() {
  try {
    const response = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json");
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching heroes data:", error);
    return [];
  }
}

async function main() {
  let heroes = await data();
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
    const nameCell = document.createElement('td');
    nameCell.textContent = hero.name;

    // Full Name
    const fullNameCell = document.createElement('td');
    fullNameCell.textContent = hero.biography.fullName;

    // Powerstats
    const powerstatsCell = document.createElement('td');
    const powerstatsText = Object.entries(hero.powerstats)
      .map(([stat, value]) => `${stat}: ${value}`)
      .join(' | ');
    powerstatsCell.textContent = powerstatsText;

    // Race
    const raceCell = document.createElement('td');
    raceCell.textContent = hero.appearance.race;

    // Gender
    const genderCell = document.createElement('td');
    genderCell.textContent = hero.appearance.gender;

    // Height
    const heightCell = document.createElement('td');
    heightCell.textContent = hero.appearance.height.join(' / ');

    // Weight
    const weightCell = document.createElement('td');
    weightCell.textContent = hero.appearance.weight.join(' / ');

    // Place of Birth
    const birthPlaceCell = document.createElement('td');
    birthPlaceCell.textContent = hero.biography.placeOfBirth;

    // Alignment
    const alignmentCell = document.createElement('td');
    alignmentCell.textContent = hero.biography.alignment;

    row.append(iconCell, nameCell, fullNameCell, powerstatsCell, raceCell, genderCell, heightCell, weightCell, birthPlaceCell, alignmentCell)
    // Add the row to the table
    board.appendChild(row);
  });
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
    showData(filteredHeroes, filteredHeroes.length)
  });
}


// Function to filter results and display them


// Add event listener for real-time filtering

main();
