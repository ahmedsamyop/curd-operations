// Class
class Data {
  static id = 1;

  constructor(title, price, category, discount, total){
    this.id = Data.id;
    this.title = title;
    this.price = price;
    this.category = category;
    this.discount = discount;
    this.total = total;
    this.update = "Update";
    this.delete = "Delete";
    Data.id++;
  }

};
//Variable
let inputContainer = document.querySelector('.crud .container');
let title = document.getElementById('title');
let price = document.getElementById('price');
let count = document.getElementById('count');
let category = document.getElementById('category');
let discount = document.getElementById('discount');
let total = document.querySelector('#total span');
let btnCreate = document.getElementById('create');
let resultArea = document.getElementById('result');
let table = document.querySelector('table');
let allData = [];


// get Data Form LocalStorge
if (window.localStorage.getItem('DataBass')) {
  let localData = Array.from(JSON.parse(localStorage.getItem('DataBass')));
  localData.forEach(ele => {
    let newData = new Data(ele.title, ele.price, ele.category, ele.discount, ele.total);
    createData(newData);
    allData.push(newData);
  });
};

// Total Price
discount.addEventListener('input', () => {
  let priceValue = +price.value;
  let disValue = +discount.value;
  total.innerHTML = priceValue - disValue;
});

// Button To Create
btnCreate.addEventListener('click', () => {
  // number's of element to Create
  let countValue = +count.value;
  if (countValue > 0) {
  
    for(let i = 0; i < countValue; i++) {
      let newData = new Data(title.value, price.value, category.value, discount.value, total.innerHTML);
      createData(newData);
      allData.push(newData);
      sendDataLocalStorge(allData);
    }
    resetInput();
  }
});




//------------------Function----------------------
// Create Data
function createData(obj) {
  // Array Form Object Values
  let arrValues = Object.values(obj);
  // Create tr element
  let elementTr = document.createElement('tr');
  // looping in Array Values
  for(let i = 0; i < arrValues.length; i++) {

    let elementTd = document.createElement('td');
    elementTd.innerHTML = arrValues[i];

    if (arrValues[i] === "Update") {
      // create Icon
      let elementI = document.createElement('i');
      elementI.className = "fa-solid fa-wrench";
      elementTd.appendChild(elementI);
      // add Class & ID
      elementTd.className = "btn update";
      elementTd.id = "update";
    }

    if (arrValues[i] === "Delete") {
      // create Icon
      let elementI = document.createElement('i');
      elementI.className = "fa-solid fa-trash";
      elementTd.appendChild(elementI);
      // add Class & ID
      elementTd.className = "btn delete";
      elementTd.id = "delete";
    }
    // append {Td} to {Tr}
    elementTr.appendChild(elementTd);
  }
  // append Tr to Table
  resultArea.appendChild(elementTr);
  upDate();
  deleteData();
};
// Push data 
function sendDataLocalStorge(data) {
  let stringAllData = JSON.stringify(data)
  window.localStorage.setItem('DataBass', stringAllData);
};
// Reset inputs
function resetInput(ti = '',pr = '',co = '',cate = '',dis ='',tot = '') {
  title.value = ti;
  price.value = pr;
  count.value = co;
  category.value = cate;
  discount.value = dis;
  total.innerHTML = tot;
}
// Delete Data
function deleteData() {

  let btnDelete = document.querySelectorAll('#delete');
  // Loop 
  btnDelete.forEach(ele => {
    // Click Event
    ele.addEventListener('click', () => {
      // Loop in allData
      allData.forEach((data, index) => {
        // Target By ID
        if (parseInt(ele.parentElement.firstChild.innerHTML) === data.id) {
          // Delete Element in Array
          allData.splice(index,1,);
          // Send Data in LocalStorge
          sendDataLocalStorge(allData);

        }

      })
      // Remove element form innerHtml
      ele.parentElement.remove();
    })

  });

};
// Update
function upDate() {
  let btnUpdate = document.querySelectorAll('.update');

  btnUpdate.forEach(btn => {

    btn.addEventListener('click', function(e) {

      let id = e.currentTarget.parentElement.firstChild.innerHTML;
      let targetInfs = e.currentTarget.parentElement.children;
      let inf = Array.from(targetInfs).slice(1,length - 2);
      resetInput(inf[0].innerHTML, inf[1].innerHTML,'',inf[2].innerHTML,inf[3].innerHTML,inf[4].innerHTML);

      btnCreate.innerHTML = 'Update';
      btnCreate.id = 'edite';
      count.parentElement.style.display = 'none';
      table.style.pointerEvents = 'none';


      document.getElementById('edite').addEventListener('click', () => {
    
        targetInfs[1].innerHTML = title.value;
        targetInfs[2].innerHTML = price.value;
        targetInfs[3].innerHTML = category.value;
        targetInfs[4].innerHTML = discount.value;
        targetInfs[5].innerHTML = total.innerHTML;
    
        allData.forEach((data) => {
          if (data.id === +id) {
            data.title = targetInfs[1].innerHTML;
            data.price = targetInfs[2].innerHTML;
            data.category = targetInfs[3].innerHTML;
            data.discount = targetInfs[4].innerHTML;
            data.total = targetInfs[5].innerHTML;
          }
        });
    
        btnCreate.innerHTML = 'Create';
        btnCreate.id = 'create';
        count.parentElement.style.display = 'flex';
        // resetInput();
        sendDataLocalStorge(allData);
        window.location.reload();

      });

    });

  });

};