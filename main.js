const itemsContainer = document.getElementById("list-items");

function addItem(item) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.marginBottom = "16px";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerHTML = item.name;

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.innerHTML = item.pantone_value;

  const cardColorText = document.createElement("p");
  cardColorText.className = "card-text";
  cardColorText.innerHTML = item.color;

  const cardColor = document.createElement("div");
  cardColor.style.height = "25px";
  cardColor.style.backgroundColor = item.color;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardColorText);
  cardBody.appendChild(cardColor);
  card.appendChild(cardBody);

  itemsContainer.appendChild(card);
}

async function fetchColorsList() {
  // Page 1
  const response = await axios.get("https://reqres.in/api/data");
  console.log(response);
  const { data } = response;
  console.log(data.data);
  let allColors = data.data;
  // Page 2 and others
  for (let page = data.page; page < data.total_pages; page++) {
    const response = await axios.get("https://reqres.in/api/data", {
      params: { page: page },
    });
    const { data } = response;
    data.data.forEach((index) => {
      allColors.push(index);
    });
  }
  itemsContainer.innerHTML = "";
  for (let i = 0; i < allColors.length; i++) {
    addItem(allColors[i]);
  }
  console.log(allColors);
  for (let i = 0; i < allColors.length; i++) {
    window.localStorage.setItem(allColors[i].name, allColors[i].color);
  }
}
fetchColorsList();
