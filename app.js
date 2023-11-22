// Tables array which stores details about the every table
const tables = [
  { _id: 1, amount: 0.0, itemList: [] },
  { _id: 2, amount: 0.0, itemList: [] },
  { _id: 3, amount: 0.0, itemList: [] },
  { _id: 4, amount: 0.0, itemList: [] },
  { _id: 5, amount: 0.0, itemList: [] },
  { _id: 6, amount: 0.0, itemList: [] },
  { _id: 7, amount: 0.0, itemList: [] },
];
// Items array which stores details about every menu item
const items = [
  {
    menu_item: "Crusty Garlic Focaccia with Melted Cheese",
    cost: 105.0,
    type: "Starter",
  },
  { menu_item: "French Fries", cost: 105.0, type: "Starter" },
  {
    menu_item: "French Fries with cheese & Jalapenos",
    cost: 135.0,
    type: "Starter",
  },
  {
    menu_item: "Home Country Fries With Herbs and Chilli Flakes",
    cost: 105.0,
    type: "Starter",
  },
  { menu_item: "Shahi Paneer", cost: 269.0, type: "Main Course" },
  { menu_item: "Paneer Butter Masala", cost: 299.0, type: "Main Course" },
  { menu_item: "Mojito", cost: 40.0, type: "Beverages" },
  { menu_item: "Soft drink", cost: 140.0, type: "Beverages" },
];

// onloading of web page table and items will be loaded
window.onload = () => {
  // function for load Tables
  loadTables();
  // function for load Items
  loadItems();
};

// laodTable function
const loadTables = () => {
  for (let i = 0; i < tables.length; i++) {
    // creating new div element
    let newTableItem = document.createElement("div");
    // adding class name to create new div element
    newTableItem.className = "newTableItem";
    // giving id to that div element
    newTableItem.id = `table-${i + 1}`;

    // it will allow drop functionality
    newTableItem.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    // getting table name and id and item id
    newTableItem.addEventListener("drop", (event) => {
      drop(event);
    });
    // onclick on the item get bill of particular table
    newTableItem.addEventListener("click", (event) => {
      displayBill(event);
    });

    // creating table heading element
    let tableHead = document.createElement("h2");
    // adding class to table heading element
    tableHead.className = "tableNo";
    // giving inner HTML value to table heading element
    tableHead.innerHTML = `Table-${tables[i]._id}`;
    // appending to table heading element
    newTableItem.appendChild(tableHead);
    // creating paragraph element
    let pr = document.createElement("p");
    // creating span element which stores amount of that tabel
    let cost = document.createElement("span");
    // adding class name to the span element
    cost.className = "bill";
    // putting innerHTML of the span element  which stores amount of that table
    cost.innerHTML = `Rs. ${tables[i].amount} | `;
    // adding id to the spane element
    cost.id = `table${i + 1}amount`;
    // creating span element which stores toatal number of items of that table
    let items = document.createElement("span");
    // adding classs name to the spane element
    items.className = "totalItems";
    // adding id to the spane element
    items.id = `table${i + 1}items`;
    // items storing the total items
    items.innerHTML = `Total Items: ${tables[i].itemList.length}`;
    // appending total items and total amount of that table
    pr.appendChild(cost);
    pr.appendChild(items);
    // now appending the paragraph element to the table item
    newTableItem.appendChild(pr);
    // now adding that table to the newTabl div container
    document.getElementById("newTable").appendChild(newTableItem);
  }
};

// load Menu Items funtion
const loadItems = () => {
  for (i = 0; i < items.length; i++) {
    // creating div elements
    let newItemElement = document.createElement("div");
    // adding id to div elements
    newItemElement.id = `item-${i}`;
    // on dragstart event calling drag function
    // event
    newItemElement.addEventListener("dragstart", (event) => {
      // calling drag function on element
      drag(event);
    });
    // we are setting property of newItemElement draggable
    // newItemElement can be dragged
    newItemElement.draggable = "true";
    // creating h2 element
    let food = document.createElement("h2");
    // giving font size to h2 element
    food.style.fontSize = "24px";
    // giving class name to h2 element
    food.className = "itemName";
    // giving inner HTML value (items available in menu) to h2 element
    food.innerHTML = items[i].menu_item;
    // appending to h2 element
    newItemElement.appendChild(food);
    // creating h3 element
    let cost = document.createElement("h3");
    // giving class name to the h3 element cost
    cost.className = "cost";
    // adding innerHTML to the cost element (cost of each menu item)
    cost.innerHTML = `${items[i].cost} Rs.`;
    // appending cost to newItemElement div
    newItemElement.appendChild(cost);
    // creating type element span (it will handle the type of items like starter , maincourse, etc)
    let type = document.createElement("span");
    // giving class name to the type element
    type.className = "type";
    // adding innerHTML by giving type of food
    type.innerHTML = items[i].type;
    // appending type to newItemElement div
    newItemElement.appendChild(type);
    // adding class name to newItemElement
    newItemElement.className = `${items[i].menu_item} ${items[i].type}`;
    // adding class name to newItemElement as newItemElement
    newItemElement.classList.add("newItemElement");
    // appending newItemElement div to the newItem div
    document.getElementById("newItem").appendChild(newItemElement);
  }
};

// search table function
// searchTable by table number
const searchTable = () => {
  // getting the value of input box of table search
  let tabsearch = document.getElementById("tableSearch").value;
  // getting table details
  let getTable = document.getElementsByClassName("newTableItem");
  // if tabsearch is not empty then
  if (tabsearch) {
    // is table find or not
    // in beginning it will be false
    let isTableFind = false;
    for (let i = 0; i < getTable.length; i++) {
      // getting id of table
      const _id = getTable[i].id;

      const new_id = _id.slice(6);
      // if tabsearch and id of that table matched then
      if (new_id.indexOf(tabsearch) != -1 || tabsearch.indexOf(new_id) != -1) {
        // only that table id will be returned
        getTable[i].style.display = "block";
        // now table found
        isTableFind = true;
      } else {
        getTable[i].style.display = "none";
      }
    }
    // if table not found
    // then not found will be displayed
    if (!isTableFind) {
      document.querySelector(".notfound").style.display = "block";
    } else {
      document.querySelector(".notfound").style.display = "none";
    }
  } else {
    // if tabsearch is empty
    document.querySelector(".notfound").style.display = "none";
    for (let i = 0; i < getTable.length; i++) {
      getTable[i].style.display = "block";
    }
  }
};

// search item function
const searchItem = () => {
  // getting the value of input box of item search
  let itemsearch = document.getElementById("itemSearch").value;
  // getting item details
  let foods = document.getElementsByClassName("newItemElement");

  // if item is found or not found
  let isItemFind = false;
  // if itemsearch is not empty then
  if (itemsearch) {
    for (let k = 0; k < foods.length; k++) {
      // console.log(foods[k]);
      // comparing each food item with item search value by converting them into lowercase letter
      if (
        foods[k].className.toLowerCase().indexOf(itemsearch.toLowerCase()) != -1
      ) {
        foods[k].style.display = "block";
        isItemFind = true;
      } else {
        foods[k].style.display = "none";
      }
    }
    // if table not found
    // then not found will be displayed
    if (!isItemFind) {
      document.querySelector(".notfound1").style.display = "block";
    } else {
      document.querySelector(".notfound1").style.display = "none";
    }
  } else {
    document.querySelector(".notfound1").style.display = "none";
    for (let k = 0; k < foods.length; k++) {
      foods[k].style.display = "block";
    }
  }
};

// drag function called
// when we dragged item to the table
// dragstart event triggered
const drag = (e) => {
  // setting the table id
  // setData(format , data)
  // we are adding the id of items into the table
  e.dataTransfer.setData("text", e.target.id);
};

// called when we drop dragged item to table
const drop = (e) => {
  e.preventDefault();
  // we will get the index of item with item name
  var data = e.dataTransfer.getData("text");

  // extracting id of the item
  let arr = data.split("-");

  // item id
  let item_id = arr[1];

  // getting table name
  let tableid = e.target.id;

  // calling upateItemList funtion
  updateItemList(
    tableid.slice(6),
    items[item_id].menu_item,
    items[item_id].cost
  );

  // calling updateTable function
  updateTable(tableid.slice(6));
};

// this function is used to update the item list
const updateItemList = (_id, name, cost) => {
  // handling duplicates
  // if item is already present then just increase the count
  let isItemExists = false;
  for (let i = 0; i < tables[_id - 1].itemList.length; i++) {
    if (tables[_id - 1].itemList[i].name == name) {
      isItemExists = true;
    }
  }
  if (isItemExists) {
    for (let i = 0; i < tables[_id - 1].itemList.length; i++) {
      if (tables[_id - 1].itemList[i].name == name) {
        // increasing the count of items on the table
        tables[_id - 1].itemList[i].count++;
        break;
      }
    }
  } else {
    // create new object and push into tables
    var tempObj = {
      name: name,
      cost: cost,
      count: 1,
    };
    tables[_id - 1].itemList.push(tempObj);
  }
};

// updating each table
// updating amount of table and number of items at each table
const updateTable = (_id) => {
  let amt = 0; //store amount
  let cnt = 0; //store count of items
  for (let i = 0; i < tables[_id - 1].itemList.length; i++) {
    // getting cost*count (no. of times each item is present)
    amt += tables[_id - 1].itemList[i].cost * tables[_id - 1].itemList[i].count;
    // getting count of items
    cnt += tables[_id - 1].itemList[i].count;
  }
  // upating amount
  document.getElementById(`table${_id}amount`).innerHTML = `Rs. ${amt} | `;
  // upating count of items
  document.getElementById(`table${_id}items`).innerHTML = `Total Items: ${cnt}`;
};

// on click any table pop will come up
// which stores total bill of that table

var isModalvisible = false; //is total bill container visible or not
var currentId;
const displayBill = (e) => {
  if (isModalvisible) {
    // if bill container visible then change to none
    document.getElementById("modal").style.display = "none";
    isModalvisible = false;
  } else {
    // if bill container not visible then change to block

    isModalvisible = true;
    document.getElementById("modal").style.display = "block";
    // changing heading of bill container by table name (where we clicked )
    document.getElementById("modalHeading").innerHTML = e.target.id;

    //getting table id
    let tempid = e.target.id;

    // getting index of table where we clicked
    currentId = tempid.slice(6);
    // update bill function called
    updateBill(tempid.slice(6));
  }
};
// this function is used to update the bill
const updateBill = (_id) => {
  // accessing table element and adding innerHTML
  document.getElementById("tab-bill").innerHTML = ` 
        <tr >
            <th>S No.</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delete</th>
        </tr>
    `;
  let mycount = 0; //it will handle serial number
  for (let i = 0; i < tables[_id - 1].itemList.length; i++) {
    if (tables[_id - 1].itemList[i].count != 0) {
      document.getElementById("tab-bill").innerHTML += `
            <tr>
                <td> ${++mycount} </td>
                <td>${tables[_id - 1].itemList[i].name}</td>
                <td>${tables[_id - 1].itemList[i].cost} Rs.</td>
                <td><input type='number' min='1' max='5' value = '${
                  tables[_id - 1].itemList[i].count
                }' onchange='updateValue(${_id},${i},this)' ></td>
                <td>
                    <button class="cutTable" onclick="deleteItem(${_id},${i})" > 
                        <i class="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
            `;
    }
  }
  let total = 0; //handle total amount of that table
  for (let i = 0; i < tables[_id - 1].itemList.length; i++) {
    total +=
      tables[_id - 1].itemList[i].count * tables[_id - 1].itemList[i].cost;
  }
  document.getElementById("displaytotal").innerHTML = total;
  // calling update table after update bill
  updateTable(_id);
};

// this function is used to generate bill
const generateBill = (e) => {
  // getting total amount
  const toatlVal = e.target.parentNode.querySelector("#displaytotal").innerText;

  // asking for feedback
  let feedback = alert(
    `
    Your total cost is ${toatlVal} Rs.
    `
  );

  // setting the itemList of that table with free array
  tables[_id - 1].itemList = [];
  document.getElementById(`table${_id}amount`).innerHTML = `Rs. 0 | `;
  document.getElementById(`table${_id}items`).innerHTML = `items: 0`;
  // calling updateBill function
  updateBill(_id);
};

// this will call when we update number of items using input type number
const updateValue = (_id, index, event) => {
  tables[_id - 1].itemList[index].count = parseInt(event.value);
  updateBill(_id);
};

// used when we have to delete that item
const deleteItem = (_id, index) => {
  tables[_id - 1].itemList[index] = {
    name: "",
    cost: 0,
    count: 0,
  };
  updateBill(_id);
};

// on typing anything in table search input
document.querySelector("#tableSearch").addEventListener("keyup", () => {
  searchTable();
});

// on typing anything in item search input
document.querySelector("#itemSearch").addEventListener("keyup", () => {
  searchItem();
});

// onclick on cut (x) button displayBill should be closed
document.querySelector(".cut").addEventListener("click", (e) => {
  displayBill(e);
});

// on click on generate bill , bill should be generated
document.querySelector(".generateBill").addEventListener("click", (e) => {
  generateBill(e);
});
