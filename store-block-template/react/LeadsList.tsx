import React, { useEffect, useState } from "react";
import axios from 'axios';

interface LeadsListProps { }

const LeadsList: StorefrontFunctionComponent<LeadsListProps> = ({ }) => {

  const [repositories, setRepositories] = useState([]);

  let rand = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);

  useEffect(() => {
    axios.get(`https://victorpereira--hiringcoders202111.myvtex.com/_v/leads`,{
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
      <ol>
      <h1>USUÁRIOS</h1>
          <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th></th>
              <th>TELEFONE</th>
              <th></th>
              <th>EMAIL</th>
              <th></th>
              <th>CATEGORIA</th>
            </tr>
          </thead>
          {repositories.map(repository =>{
         return(
          <tbody>
            
            <tr>
            <li>
              <td>{repository.name}</td>
              </li>
              <td></td>
              
              <td>{repository.email}</td>
              
              <td></td>
              
              <td>{repository.phone}</td>
              <td></td>
              <td>{repository.category}</td>
            </tr>

          </tbody>
           )
          })
          }
        </table>
      </ol>
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