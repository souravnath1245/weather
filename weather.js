function weather() {
  const inputId = document.querySelector("#weatherInput");
  const inputValue = inputId.value;
  inputId.value = "";
  let key = "dc274877f22eb228cdd41ab9c79fc397";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => weatherSearch(data));
}
const weatherSearch = (data) => {
  let key = "dc274877f22eb228cdd41ab9c79fc397";
  console.log(key.length);
  const icons = [
    '<i class="fas fa-cloud-sun"></i>',
    '<i class="fas fa-cloud-showers-heavy"></i>',
    '<i class="fas fa-cloud-meatball"></i>',
    '<i class="fas fa-cloud"></i>',
  ];
  const { name, main, id, cod } = data;
  const tem = main.temp / 10;
  const temp = tem.toFixed(2);

  const searchDiv = document.querySelector("#weatherResult");
  searchDiv.textContent = "";
  const div = document.createElement("div");

  div.innerHTML = `
  <div class='weatherResult' onclick='tableResult("${id}${cod}${key}${name}")'>
  <h4 class="">${name}</h4>
            <p class="fs-1">${temp}°C
            </p>
            <span class='icon'>${icons[0]}</span>
    </div>
            
  `;
  searchDiv.appendChild(div);
};
const tableResult = (data) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${data.slice(
    42,
    47
  )},${data.slice(7, 10)},${data.slice(0, 7)}&appid=${data.slice(10, 45)}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => weatherTable(data));
};
const weatherTable = (data) => {
  const { id, name, wind, clouds, timezone, sys, main } = data;
  let tem = main.temp / 10;
  let temp = tem.toFixed(2);
  const table = document.querySelector("#table");
  const div = document.createElement("div");
  div.innerHTML = `
<table id='table' class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Country</th>
            <th scope="col">Temperature</th>
            <th scope="col">Wind</th>
            <th scope="col">Clouds</th>
            <th scope="col">Timezone</th>
            <th scope="col">Sunrise</th>
            <th scope="col">Sunset</th>

          </tr>
        </thead>
        <tbody>
          <tr>
          
          <td scope="col">${name}</td>
          <td scope="col">${temp}</td>
          <td scope="col">${id}</td>
          <td scope="col">${wind.speed}</td>
          <td scope="col">${clouds.all}</td>
          <td scope="col">${timezone}</td>
          <td scope="col">${sys.sunrise}</td>
          <td scope="col">${sys.sunset}</td>
          </tr>
        </tbody>
      </table>
`;

  table.appendChild(div);
};
