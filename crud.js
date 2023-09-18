// get total
// create product
// save localStorage
// clear inputs
// read
// count
// delete
// update
// search
// clean data

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let sumbit = document.getElementById("sumbit");

let mood = "create";
let tmp;

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

// create product
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

// let dataProduct = [];  // can you update in array

sumbit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  //clean data
  if (title.value != "" && price.value != "" && category.value != "") {
    //update
    if (mood === "create") {
      //count
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct;
      mood = "create";
      sumbit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  //sava in localStorage
  localStorage.setItem("product", JSON.stringify(dataProduct));
  // clearData();
  showData();
};

// clear inputs
function clearData() {
  title.value = " ";
  price.value = " ";
  taxes.value = " ";
  ads.value = " ";
  discount.value = " ";
  total.innerHTML = " ";
  count.value = "";
  category.value = "";
}

// read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
                  <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                     
                        <td><button onclick="updateData(${i})" id="update">update</button></td>  
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`;
  } else {
    btnDelete.innerHTML = " ";
  }
}
showData(); // refreah data

//delete
function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData(); // refreah data
}
// delete all
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0); // delete from 0 to end
  showData();
}

//update
function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal(); // start work total
  count.style.display = "none";
  category.value = dataProduct[i].category;
  sumbit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  showData();
}
//search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = " title";
    search.placeholder = "Search by title";
  } else {
    searchMood = "category";
    search.placeholder = "Search by category";
  }
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>  
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
              <td>${i}</td>
              <td>${dataProduct[i].title}</td>
              <td>${dataProduct[i].price}</td>
              <td>${dataProduct[i].taxes}</td>
              <td>${dataProduct[i].ads}</td>
              <td>${dataProduct[i].total}</td>
              <td>${dataProduct[i].discount}</td>
              <td>${dataProduct[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>  
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//clean data
