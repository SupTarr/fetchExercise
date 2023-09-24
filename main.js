const itemsContainer = document.getElementById("list-items");

function addItem(item) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.marginBottom = "16px";

  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">${item.pantone_value}</p>
      <p class="card-text">${item.color}</p>
      <div style="height: 25px; background-color: ${item.color}"></div>
    </div>
  `;

  itemsContainer.appendChild(card);
}

async function fetchColorsList() {
  const response = await axios.get("https://reqres.in/api/data");
  const { data } = response;
  let allColors = data.data;

  for (let page = data.page + 1; page <= data.total_pages; page++) {
    const response = await axios.get("https://reqres.in/api/data", {
      params: { page: page },
    });
    const { data } = response;
    allColors = [...allColors, ...data.data];
  }

  itemsContainer.innerHTML = "";
  for (let i = 0; i < allColors.length; i++) {
    addItem(allColors[i]);
    window.localStorage.setItem(allColors[i].name, allColors[i].color);
  }
}

fetchColorsList();
