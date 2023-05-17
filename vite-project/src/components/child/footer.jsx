import React, { Fragment, useState, useEffect } from 'react';
import logo from "../images/logo-top.png";

export default function Footer() {
  const [eData, setEData] = useState("");

  return (
    <section className='bg-dark'>
      <section className='container'>
        <p className='text-center text-white mb-0 py-3'>StockMan © 2023 </p>
      </section>
    </section>

  )
}
