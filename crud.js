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
// let totalAll = document.getElementById("total-all")
let count = document.getElementById("count");
let category = document.getElementById("category");
let sumbit = document.getElementById("sumbit");

// console.log(price)
let totalAll;
let mood = "create";
let tmp;

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML =  result;
    // total.style.background = "succes";
  } else {
    total.innerHTML = "";
    // total.style.background = "red";
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
totalAll = parseInt(total.innerHTML) * parseInt(count.value);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";

let randomID = "";

for (let i = 0; i < 2; i++) {
  const randomLetters = Math.floor(Math.random() * letters.length);
  randomID += letters[randomLetters];
}
for (let i = 0; i < 3; i++) {
  const randomNumbers = Math.floor(Math.random() * numbers.length);
  randomID += numbers.charAt(randomNumbers);

}

sumbit.onclick = function () {
  let newProduct = {
    id: randomID,
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML + " EG",
    totalAll: parseInt(total.innerHTML) * parseInt(count.value) + " EG",
    count: count.value,
    category: category.value.toLowerCase(),
  };
  console.log(totalAll);
  //clear data
  if (title.value != "" && price.value != "" && category.value != "") {
    //update
    if (mood === "create") {
      //count
      if (newProduct.count) {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct;
      mood = "create";
      sumbit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Click Inter Data',
      confirmButtonText: 'OK'
  });
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
  totalAll.innerHTML = " ";
  count.value = "";
  category.value = "  ";
}

// read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
                  <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].count}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].totalAll}</td>
                        <td>${dataProduct[i].category}</td>
                     
                        <td><button onclick="updateData(${i})" id="update" class="btn btn-success">update</button></td>  
                        <td><button onclick="deleteData(${i})" id="delete" class="btn btn-danger">delete</button></td>
                    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  // let btnDelete = document.getElementById("deleteAll");
  // if (dataProduct.length > 0) {
  //   btnDelete.innerHTML = `
  //       <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`;
  // } else {
  //   btnDelete.innerHTML = " ";
  // }
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
  count.value = dataProduct[i].count;
  discount.value = dataProduct[i].discount;
  getTotal(); // start work total
  // count.style.display = "none";
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
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].count}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].totalAll}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update" class="btn btn-success">update</button></td>  
                <td><button onclick="deleteData(${i})" id="delete" class="btn btn-danger">delete</button></td>
            </tr>`;
      }
    }
  } 
  else {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
              <td>${i + 1}</td>
              <td>${dataProduct[i].title}</td>
              <td>${dataProduct[i].price}</td>
              <td>${dataProduct[i].taxes}</td>
              <td>${dataProduct[i].ads}</td>
              <td>${dataProduct[i].count}</td>
              <td>${dataProduct[i].discount}</td>
              <td>${dataProduct[i].total}</td>
              <td>${dataProduct[i].totalAll}</td>
              <td>${dataProduct[i].category}</td>
              <td><button onclick="updateData(${i})" id="update"class="btn btn-success">update</button></td>  
              <td><button onclick="deleteData(${i})" id="delete" class="btn btn-danger">delete</button></td>
          </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//clean data

// استرجاع البيانات من localStorage
function getDataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("product")) || [];
  return data;
}
// تحويل البيانات إلى ورقة عمل
function createSheet(data) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  return workbook;
}
// تحميل ملف Excel
function downloadExcel(workbook) {
  XLSX.writeFile(workbook, "dataCrud.xlsx");
}
// عند الضغط على الزر، استرجاع البيانات وتنزيلها كملف Excel
document.getElementById("downloadBtn").addEventListener("click", function () {
  const data = getDataFromLocalStorage();
  const workbook = createSheet(data);
  downloadExcel(workbook);
});
