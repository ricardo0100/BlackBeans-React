import React from "react"
import { useState, useEffect } from "react";

function AccountsList() {

  const [data, setData] = useState("-");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  async function initProducts() {
    await fetch(`https://black-beans.herokuapp.com/accounts`, { 
      headers: new Headers({
      "Authorization": "Bearer test"
      })
    })
    .then(response => {
      console.log(response);
      return response.json()
    })
    .then(response => {
        setData(response.result);
        console.log(response.result);
    })
    .catch(err => console.error(err));
  }

  useEffect(() => {
    initProducts()
  })

  return <div className="App">Data: { data }</div>;
}

export default AccountsList