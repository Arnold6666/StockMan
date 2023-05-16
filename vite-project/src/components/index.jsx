import React, { Fragment, useState, useEffect } from 'react';
import Navbar from './child/navbar';
import axios from 'axios';
import A1 from "./images/economic1.jpg";
import A2 from "./images/economic2.jpg";
import A3 from "./images/economic3.jpg";

export default function Index() {
  const [edata, setEdata] = useState("");

  const getEcIndex = async () => {
    try {
      const response = await axios.get("https://apiservice.mol.gov.tw/OdService/rest/datastore/A17030000J-000016-1ci");
      // console.log(response.data.result.records[12]);
      const data = response.data.result.records[12];

      console.log(data);
      const key = Object.keys(data);

      const val = Object.values(data);
      console.log(val);

      document.getElementById('month').innerHTML = data.月別;
      valNAN("cpi", key[13]);
      document.getElementById("cpiTitle").innerHTML = key[13];

      valNAN("eG", val[1]);
      document.getElementById("eGTitle").innerHTML = `${key[1]}`;


      valNAN("cpiG", val[14]);
      document.getElementById("cpiGTitle").innerHTML = key[14];

    } catch (error) {

    }
  }

  useEffect(() => {
    getEcIndex()
  }, [])

  function valNAN(element, data) {
    if (isNaN(parseFloat(data.substr(1, data.length)))) {
      document.getElementById(element).innerHTML = "尚未公布";
    } else {
      document.getElementById(element).innerHTML = parseFloat(data.substr(1, data.length));
      let span = document.createElement("span");
      span.innerHTML = " %"
      document.getElementById(element).appendChild(span);
    }
  }

  return (
    <Fragment>
      <section className='container'>
        <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://picsum.photos/id/85/1200/900" class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/id/84/1200/900" class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/id/83/1200/900" class="d-block w-100" alt="..." />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section style={{ backgroundColor: "#D8D8D8" }}>
        <div className='pt-3 container' >
          <div className='px-5 py-3'>
            <h2 class="mb-2 fw-bold">關於 Stockman</h2>
            <p class="card-text px-4 fs-5" style={{ letterSpacing: "4px" }}>希望對於社會新鮮人，可以透過本站理解通膨，建立理財觀念，透過設定長期目標，有效規劃理財。因為現金會隨著通貨膨脹減少實質購買力，同時資產的價格也會隨之上漲，其中部分資產類別的增值幅度，有機會超過通貨膨脹幅度，在情況許可下，在個人財務規劃中，配置部分的資產是對於財產是可以達到分散風險，甚至有機會能擊敗通膨，讓個人財產增幅大於通膨。資產的類別又分為許多種，其中股票取得的難易度相對容易，且金額可大可小。本網站想透過易懂的介紹，讓一般人能更深入的了解股票，並且透過查詢功能，檢視有興趣的股票。</p>
          </div>
        </div>
      </section>

      <section className='pt-3'>
        <div className="container">
          <h2 class="px-5 mb-2 fw-bold"><span id='month'></span> 台灣經濟相關數據</h2>
          <div className='px-5 py-3 justify-content-around d-flex'>
            <div class="card text-bg-dark col-3 border-0">
              <img src={A1} class="card-img" alt="..."  style={{height:"80px"}}/>
              <div class="card-img-overlay" style={{ backgroundColor: "rgba(0, 0, 0,0.5)" }}>
                <h5 class="card-title text-center" id="cpiTitle">消費者物價指數</h5>
                <p class="card-text text-center" id='cpi'></p>
              </div>
            </div>
            <div class="card text-bg-dark col-3 border-0">
              <img src={A2} class="card-img " alt="..." style={{height:"80px"}} />
              <div class="card-img-overlay" style={{ backgroundColor: "rgba(0, 0, 0,0.5)" }}>
                <h5 class="card-title text-center" id="cpiGTitle">Card title</h5>
                <p class="card-text text-center" id='cpiG'></p>
              </div>
            </div>
            <div class="card text-bg-dark col-3 border-0">
              <img src={A3} class="card-img" alt="..."  style={{height:"80px"}}/>
              <div class="card-img-overlay" style={{ backgroundColor: "rgba(0, 0, 0,0.5)" }}>
                <h5 class="card-title text-center" id="eGTitle">Card title</h5>
                <p class="card-text text-center" id="eG"></p>
              </div>
            </div>
          </div>
        </div>

      </section>
    </Fragment>

  )
}