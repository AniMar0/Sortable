async function data() {
  try {
      const responce = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json");
      if (!responce.ok) throw new Error("Failed to fetch data");
      return await responce.json();
  } catch (error) {
      console.error("Error fetching heroes data:", error);
      return [];
  }
}

async function main() {
  let heros = await data();
  showeData(heros);
}

function showeData(heros) {
  const board = document.getElementById('heroTableBody')
  board.innerHTML = ''

  const fragment = document.createDocumentFragment();

  heros.forEach(hero => {
      const article = document.createElement('div')
      article.className = "articles__article";

      const linke = document.createElement('a');
      linke.className = "articles__link"
      linke.href = `/hero/${hero.id}`

      const content = document.createElement('div');
      content.className = "articles__content";

      const img = document.createElement('img');
      img.className = "articles__img";
      img.src = hero.images.xs;
      img.alt = hero.name;

      const name = createElementHelper('div', hero.name, 'title');
      const fullName = createElementHelper('div', hero.biography.fullName, 'title');
      const powerstats = createElementHelper('div', Object.values(hero.powerstats).join(", "), 'title');
      const race = createElementHelper('div', hero.appearance.race, 'title');
      const gender = createElementHelper('div', hero.appearance.gender, 'title');
      const height = createElementHelper('div', hero.appearance.height.join(' / '), 'title');
      const weight = createElementHelper('div', hero.appearance.weight, 'title');
      const birthPlace = createElementHelper('div', hero.biography.placeOfBirth, 'title');
      const alignment = createElementHelper('div', hero.biography.alignment, 'title');

      content.append(img, name, fullName, powerstats, race, gender, height, weight, birthPlace, alignment);
      linke.appendChild(content);
      article.appendChild(linke);
      fragment.appendChild(article);
  });

  board.appendChild(fragment);
}

function createElementHelper(tag, text, className){
  const element = document.createElement(tag);
  element.textContent = text;
  element.className = className;
  return element
}


main();