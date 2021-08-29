import React, { useEffect, useState } from "react";
import axios from 'axios';

interface LeadsListProps { }

const LeadsList: StorefrontFunctionComponent<LeadsListProps> = ({ }) => {

  const [repositories, setRepositories] = useState([]);

  let rand = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);

  useEffect(() => {
    axios.get(`https://joirdev--hiringcoders202111.myvtex.com/_v/leads`,{
      headers:{
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
      .then(response => {
        setRepositories(response.data.Items)
        console.log('TESTE==', response.data.ScannedCount)
      });
  }, []);

  console.log("TESTE3= ", repositories)
  return (

    <div>
      <br />
      <br />
      <h1>LEADS</h1>
      <>
      <ul>
       {repositories.map(repository =>{
         return(
           <li>Nome: {repository.name}  - Email: {repository.email} - Phone: {repository.phone}</li>
         )
       })

       } 
      </ul>
      </>



    </div>
  )
}

LeadsList.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default LeadsList