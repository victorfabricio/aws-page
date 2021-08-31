import React, { useState } from 'react';
import axios from 'axios';
import { object } from 'prop-types';
import { useCssHandles } from 'vtex.css-handles'
import * as S from './styled'


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
    <S.Formulario>
      <S.FormularioForm onSubmit={e => e.preventDefault()}>
        <S.FormLabel>Nome Completo</S.FormLabel>
        <S.FormInput type="text" name="name" value={name} placeholder="Nome Completo" onChange={e => setName((e.target as HTMLInputElement).value)} /> <br />
        <S.FormLabel>Telefone</S.FormLabel>
        <S.FormInput type="text" name="telephone" value={phone} placeholder="99999999999" onChange={e => setPhone((e.target as HTMLInputElement).value)} /> <br />
        <S.FormLabel>Email</S.FormLabel>
        <S.FormInput type="email" name="email" value={email} placeholder="seuemail@dominio.com.br" onChange={e => setEmail((e.target as HTMLInputElement).value)} /> <br />
        <S.FormButton onClick={handlePesquisa}>Cadastrar na Newsletter</S.FormButton>
        {erro ? <span>Dados não encontrados.</span> : ''}
      </S.FormularioForm>
    </S.Formulario>
  )
}

LeadsForm.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default LeadsForm