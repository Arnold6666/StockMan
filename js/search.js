// 漢堡選單RWD js
let menuClose = document.getElementsByClassName("menuClose")[0];
let mobileMenu = document.getElementsByClassName("mobileMenu")[0];
let navMenu = document.getElementsByClassName("navMenu")[0];

menuClose.addEventListener('click', function () {
  mobileMenu.classList.add("d-none");
})

navMenu.addEventListener('click', function () {
  mobileMenu.classList.remove("d-none")
})

function getTodayDate() {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();
  month = month.toString();
  year = year.toString();
  day = day.toString();

  if (month.length == 1) {
    month = "0" + month;
  }

  if (day.length == 1) {
    day = "0" + day;
  }
  return year + month + day;
}

function getLastTradeDate() {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();
  let dayOfWeek = new Date().getDay();
  dayOfWeek = dayOfWeek.toString();
  switch(dayOfWeek){
    case "6":
      day = day - 1;
      break
    case "0":
      day = day - 2;
      break
    case "1":
      day = day - 3;
      break
  }
  month = month.toString();
  year = year.toString();
  day = day.toString();

  if (month.length == 1) {
    month = "0" + month;
  }

  if (day.length == 1) {
    day = "0" + day;
  }
  
  return year + month + day;
}

// document.getElementById("searchStockBtn").onclick = function () {
//   let stockNum = document.getElementById("searchStock").value;

//   date = getTodayDate();

//   fetch(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${date}&stockNo=${stockNum}`)
//     .then((res) => {
//       const data = res.json();
//       return data;
//     })
//     .then((stocks) => {

//       let container = document.getElementById("result");
//       container.innerHTML = "";
//       let h1 = document.createElement("h1")
//       let title = document.createTextNode(stocks.title);
//       h1.style.textAlign = "center"
//       h1.appendChild(title);
//       container.appendChild(h1);

//       // console.log(stocks)//除錯用

//       let table = document.createElement("table");
//       table.style.margin = "0 auto";
//       table.setAttribute("border", "1");
//       table.style.borderCollapse = "collapse";
//       table.style.textAlign = "center";
//       table.style.width = "800px";

//       container.appendChild(table);

//       let tHead = stocks.fields;
//       let row = table.insertRow();
//       for (let i = 0; i < tHead.length; i++) {
//         let td = row.insertCell();
//         td.innerHTML = tHead[i];
//       }

//       let tContent = stocks.data;

//       // console.log(tContent); //除錯用

//       let tContentL = tContent.length - 1;
//       for (let i = tContentL; i > 0; i--) {
//         let tableRow = table.insertRow();
//         for (let j = 0; j < tContent[i].length - 1; j++) {
//           let rowTd = tableRow.insertCell();
//           rowTd.innerHTML = tContent[i][j];
//         }
//       }

//     });
//   // https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20230113&stockNo=2330
// }

window.onload = function () {
  let date = getLastTradeDate();

  function top20stocks(idname) {
    fetch(`https://www.twse.com.tw/exchangeReport/MI_INDEX20?&date=${date}`)
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((result) => {

        if(result.stat ==="很抱歉，沒有符合條件的資料!"){

        }
        console.log(result)
        let data = result.data;
        let tableTitle = result.fields;

        let container = document.getElementById(`${idname}`);
        let table = document.createElement("table");
        table.classList.add("top20table");
        table.setAttribute("border", "1");

        // 取欄位名稱
        // console.log(tableTitle);

        let row = table.insertRow();
        for (let i = 0; i < tableTitle.length; i++) {
          let td = row.insertCell();
          td.innerHTML = tableTitle[i];
        }
        container.appendChild(table);

        // 取資料
        for (let i = 0; i < data.length; i++) {
          let tableRow = table.insertRow();
          for (let j = 0; j < data[i].length; j++) {
            let rowCell = tableRow.insertCell();
            rowCell.innerHTML = data[i][j];
          }
        }

      });

  }

  top20stocks("top20");
}