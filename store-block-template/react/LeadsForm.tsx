import React, { useState } from 'react';
import axios from 'axios';
import { object } from 'prop-types';
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['leadsForm','botao']

interface LeadsFormProps { }

const LeadsForm: StorefrontFunctionComponent<LeadsFormProps> = ({ }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [erro, setErro] = useState(false);

  function handlePesquisa() {

    axios.get(`/_v/leads/${email}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
      .then(response => {

        if (typeof (response.data.Item) === 'undefined') {
          axios.post(`/_v/leads/new`, {
            "id": email,
            "email": email,
            "name": name,
            "phone": phone,
            "category": "lead",
          })
            .then(response => {
              console.log(response);
              setErro(false);
              alert("OBRIGADO. EMAIL CADASTRADO COM SUCESSO")


            })
            .catch(err => {
              setErro(true);
            });
        }
        else{
          alert("DESCULPE. ESTE EMAIL JÁ ESTÁ CADASTRADO!")
        }

      });


    setEmail('');
    setName('');
    setPhone('');

  }
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div>
      <form className={`${handles.leadsForm} c-muted-5 db tc`} onSubmit={e => e.preventDefault()}>
        Nome: <br />
        <input type="text" name="name" value={name} onChange={e => setName((e.target as HTMLInputElement).value)} /> <br />
        Telefone: <br />
        <input type="text" name="telephone" value={phone} onChange={e => setPhone((e.target as HTMLInputElement).value)} /> <br />
        Email: <br />
        <input type="email" name="email" value={email} onChange={e => setEmail((e.target as HTMLInputElement).value)} /> <br />
        <br />
        <button className={`${handles.botao} br2 h2`} style={{color:'white', background:'#e15500'}} onClick={handlePesquisa}>Cadastrar na Newsletter</button>
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