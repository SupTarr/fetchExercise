axios.defaults.headers.common["x-api-key"] = "reqres-free-v1";
const itemsContainer = document.getElementById("list-items");
const CACHE_KEY = "cachedColors";

function addItem(item) {
  const card = document.createElement("div");
  card.className = "card col-lg-6 col-md-12 mx-auto";
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

function deleteColors() {
  console.log("Deleting items and clearing cache...");
  itemsContainer.innerHTML = "";
  window.localStorage.removeItem(CACHE_KEY);
}

function displayColors(colors) {
  itemsContainer.innerHTML = "";
  for (let i = 0; i < colors.length; i++) {
    addItem(colors[i]);
  }
}

async function fetchAllColorsFromAPI() {
  console.log("Fetching colors from API...");
  try {
    const initialResponse = await axios.get("https://reqres.in/api/data");
    const { data: initialData } = initialResponse;
    let allColors = initialData.data;
    const totalPages = initialData.total_pages;

    const pagePromises = [];
    for (let page = initialData.page + 1; page <= totalPages; page++) {
      pagePromises.push(
        axios.get("https://reqres.in/api/data", { params: { page } })
      );
    }

    const subsequentResponses = await Promise.all(pagePromises);
    subsequentResponses.forEach((res) => {
      allColors = [...allColors, ...res.data.data];
    });

    return allColors;
  } catch (error) {
    console.error("Error fetching colors from API:", error);
    throw error;
  }
}

async function fetchAndCacheColors() {
  try {
    const allColors = await fetchAllColorsFromAPI();
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(allColors));
    displayColors(allColors);
  } catch (error) {
    itemsContainer.innerHTML =
      "<p>Error loading colors. Please try again later.</p>";
  }
}

async function fetchColorsList() {
  const cachedColors = window.localStorage.getItem(CACHE_KEY);

  if (cachedColors) {
    console.log("Loading colors from localStorage...");
    try {
      const allColors = JSON.parse(cachedColors);
      displayColors(allColors);
    } catch (error) {
      console.error("Error parsing cached colors:", error);
      window.localStorage.removeItem(CACHE_KEY);
      await fetchAndCacheColors();
    }
  } else {
    await fetchAndCacheColors();
  }
}

fetchColorsList();
