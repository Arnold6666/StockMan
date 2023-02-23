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
      let dayOfWeek = new Date().getDay();
      dayOfWeek = dayOfWeek.toString();

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
      switch (dayOfWeek) {
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
      let date = year + month + day;

      date = (parseInt(date) - 1).toString();

      return date;
    }

    let storage = [];

    function getTenDay(date, stockNum) {

      fetch(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${date}&stockNo=${stockNum}`)
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((stocks) => {

          let container = document.getElementById("result");
          container.innerHTML = "";
          let h1 = document.createElement("h1")
          let title = document.createTextNode(stocks.title);
          h1.style.textAlign = "center"
          h1.appendChild(title);
          container.appendChild(h1);

          // 新增紀錄
          let record = document.getElementById("recordList");
          let li = document.createElement("li");
          li.setAttribute("stockNum", `${stockNum}`);

          let liStr = stocks.title.substr(8, 19);
          let liText = document.createTextNode(liStr);
          li.appendChild(liText);
          record.append(li);

          // console.log(stocks)//除錯用

          let table = document.createElement("table");
          table.setAttribute("border", "1");

          container.appendChild(table);

          let tHead = stocks.fields;

          let row = table.insertRow();
          for (let i = 0; i < tHead.length - 1; i++) {
            if (i == 4 || i == 5) { continue }
            let th = document.createElement("th");
            th.innerHTML = tHead[i];
            row.appendChild(th);
          }

          // recordList
          let tContent = stocks.data;
          let h1title = stocks.title;

          // 504
          let stockdata = { "title": h1title, "stockNum": stockNum, "fields": tHead, "data": tContent };
          storage.push(stockdata);
          console.log(storage);
          // console.log(tContent); //除錯用

          let tContentL = tContent.length - 1;
          for (let i = tContentL; i > 0; i--) {
            let tableRow = table.insertRow();

            for (let j = 0; j < tContent[i].length - 1; j++) {
              if (j == 4 || j == 5) { continue }

              let rowTd = tableRow.insertCell();
              if (j == 7) {
                if (parseFloat(tContent[i][6]) - parseFloat(tContent[i][3]) > 0) {
                  rowTd.innerHTML = `<span style='color:red'>+${(parseFloat(tContent[i][6]) - parseFloat(tContent[i][3])).toFixed(2)}</span>`
                } else if (parseFloat(tContent[i][6]) - parseFloat(tContent[i][3]) < 0) {
                  rowTd.innerHTML = `<span style='color:green'>${(parseFloat(tContent[i][6]) - parseFloat(tContent[i][3])).toFixed(2)}</span>`
                } else {
                  rowTd.innerHTML = (parseFloat(tContent[i][6]) - parseFloat(tContent[i][3])).toFixed(2)
                }
              } else {
                rowTd.innerHTML = tContent[i][j];
              }

            }
          }

          // 監聽Record List下的 li 點擊事件
          let lis = document.querySelectorAll("li[stocknum]");
          // console.log(lis);

          for (let li of lis) {
            li.addEventListener("click", whoamI);
          }

        })
        .catch((error) => {
          console.log(`Error: ${error}`);
          let container = document.getElementById("result");
          container.innerHTML = "";
          let h1 = document.createElement("h1")
          let title = document.createTextNode("請輸入正確的股票代碼");
          h1.style.textAlign = "center";
          h1.appendChild(title);
          container.appendChild(h1);
        })
    }

    function top20stocks(idname) {
      let date = getLastTradeDate();
      fetch(`https://www.twse.com.tw/exchangeReport/MI_INDEX20?&date=${date}`)
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((result) => {

          console.log(result);
          let data = result.data;
          let tableTitle = result.fields;

          let container = document.getElementById(`${idname}`);
          let table = document.createElement("table");
          table.classList.add("top20table");
          table.setAttribute("border", "1");

          // 取欄位名稱
          // console.log(tableTitle);

          let row = table.insertRow();
          for (let i = 0; i < tableTitle.length - 2; i++) {
            if (i == 4 || i == 6 || i == 7 || i == 9) { continue }
            let th = document.createElement("th");
            th.innerHTML = tableTitle[i];
            row.appendChild(th);
          }
          container.appendChild(table);

          // 取資料
          for (let i = 0; i < data.length; i++) {
            let tableRow = table.insertRow();

            for (let j = 0; j < data[i].length - 2; j++) {
              if (j == 4 || j == 6 || j == 7 || j == 9) {
                continue
              }

              let rowCell = tableRow.insertCell();
              if (j == 10) {
                if (parseFloat(data[i][8]) - parseFloat(data[i][5]) > 0) {
                  rowCell.innerHTML = `<span style='color:red'>+${(parseFloat(data[i][8]) - parseFloat(data[i][5])).toFixed(2)}</span>`
                } else if (parseFloat(data[i][8]) - parseFloat(data[i][5]) < 0) {
                  rowCell.innerHTML = `<span style='color:green'>${(parseFloat(data[i][8]) - parseFloat(data[i][5])).toFixed(2)}</span>`
                } else {
                  rowCell.innerHTML = (parseFloat(data[i][8]) - parseFloat(data[i][5])).toFixed(2)
                }
              } else {
                rowCell.innerHTML = data[i][j];
              }


            }
          }

        });

    }

    document.getElementById("searchStockBtn").onclick = function () {
      let stockNum = document.getElementById("searchStock").value;

      date = getTodayDate();

      getTenDay(date, stockNum);

    }

    window.onload = function () {
      let date = getLastTradeDate();
      // console.log(date);
      document.getElementsByClassName("top20Title")[0].innerHTML = `${date} 成交股數前20名`

      top20stocks("top20");
    }

    // function whoamI (e){
    //   console.log(e.prevent)
    // }

    whoamI = e => {
      let stock = e.target.attributes.stocknum.value;

      // console.log(teststocks[0].stockNum == stock)
      for (let i = 0; i < storage.length; i++) {
        if (storage[i].stockNum == stock) {
          let container = document.getElementById("result");
          container.innerHTML = "";
          let h1 = document.createElement("h1")
          let title = document.createTextNode(storage[i].title);
          h1.style.textAlign = "center"
          h1.appendChild(title);
          container.appendChild(h1);

          // 新增table & th
          let table = document.createElement("table");
          table.setAttribute("border", "1");

          container.appendChild(table);
          let tHead = storage[i].fields;
          let row = table.insertRow();
          for (let i = 0; i < tHead.length - 1; i++) {
            if (i == 4 || i == 5) { continue }
            let th = document.createElement("th");
            th.innerHTML = tHead[i];
            row.appendChild(th);
          }

          // 新增表格內容
          let tContent = storage[i].data;
          let tContentL = tContent.length - 1;
          for (let i = tContentL; i > 0; i--) {
            let tableRow = table.insertRow();

            for (let j = 0; j < tContent[i].length - 1; j++) {
              if (j == 4 || j == 5) { continue }

              let rowTd = tableRow.insertCell();
              if (j == 7) {
                if (parseFloat(tContent[i][3]) - parseFloat(tContent[i][6]) > 0) {
                  rowTd.innerHTML = `<span style='color:red'>+${(parseFloat(tContent[i][3]) - parseFloat(tContent[i][6])).toFixed(2)}</span>`
                } else if (parseFloat(tContent[i][3]) - parseFloat(tContent[i][6]) < 0) {
                  rowTd.innerHTML = `<span style='color:green'>${(parseFloat(tContent[i][3]) - parseFloat(tContent[i][6])).toFixed(2)}</span>`
                } else {
                  rowTd.innerHTML = (parseFloat(tContent[i][3]) - parseFloat(tContent[i][6])).toFixed(2)
                }
              } else {
                rowTd.innerHTML = tContent[i][j];
              }

            }
          }

        }
      }
      // console.log(e.target.attributes.stocknum.value);
    }

