import React, { useState } from 'react';
import axios from 'axios';

interface LeadsFormProps { }

const LeadsForm: StorefrontFunctionComponent<LeadsFormProps> = ({ }) => {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState(false);

  function handlePesquisa() {
    axios.get(`https://joirdev--hiringcoders202111.myvtex.com/_v/leads`)
    .then(response => {
      const repositories = response.data;
    //  const repositoriesName = [];
    console.log("TESTE1= ")
    console.log("TESTE= ", repositories)

      // eslint-disable-next-line array-callback-return
   //   repositories.map((repository) => {
   //     repositoriesName.push(repository.name)
  //    });

   //   localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false);

    })
    .catch(err => {
      setErro(true);
    });
  }
  
  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        Nome: <br />
        <input type="text" name="name" /> <br />
        Telefone: <br />
        <input type="text" name="telephone" /> <br />
        Email: <br />
        <input type="email"  name="email" value = {email} onChange = {e => setEmail((e.target as HTMLInputElement).value)}/> <br />
        <br />
        <button onClick={handlePesquisa}>Cadastrar na Newsletter</button>
        {erro ? <span>Dados não encontrados.</span> : ''}
      </form>
    </div>
  )
}

LeadsForm.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default LeadsForm