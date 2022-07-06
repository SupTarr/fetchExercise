const itemsContainer = document.getElementById("list-items");

function addItem(item) {
  const itemHTML = '<div class="card" style="width: 18rem;">\n' +
    '    <div class="card-body">\n' +
    '        <h5 class="card-title">' + item.name + '</h5>\n' +
    '        <p class="card-text">' + item.pantone_value + '</p>\n' +
    '        <div style="background:' + item.color + ';">' + item.color + '</div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<br/>';
  itemsContainer.innerHTML += itemHTML;
}

async function fetchColorsList() {
  // Page 1
  const response = await axios.get('https://reqres.in/api/data');
  console.log(response);
  const { data } = response;
  console.log(data.data);
  let allColors = data.data;
  // Page 2 and others
  for (let page = data.page; page < data.total_pages; page++) {
    const response = await axios.get('https://reqres.in/api/data', { params: { page: page } });
    const { data } = response
    data.data.forEach(index => {
      allColors.push(index);
    });
  }
  itemsContainer.innerHTML = '';
  for (let i = 0; i < allColors.length; i++) {
    addItem(allColors[i]);
  }
  console.log(allColors);
  for (let i = 0; i < allColors.length; i++) {
    window.localStorage.setItem(allColors[i].name, allColors[i].color);
  }
}
fetchColorsList();
