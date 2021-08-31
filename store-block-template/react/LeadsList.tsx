import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useCssHandles } from 'vtex.css-handles'
import * as S from './styled'

interface LeadsListProps { }
const CSS_HANDLES = ['tabela']

const LeadsList: StorefrontFunctionComponent<LeadsListProps> = ({ }) => {

  const [repositories, setRepositories] = useState([]);

  let rand = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);

  useEffect(() => {
    axios.get(`/_v/leads`,{
      headers:{
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
      .then(response => {
        setRepositories(response.data.Items)
        console.log('TESTE==', response.data.ScannedCount)
      });
  }, []);
  const handles = useCssHandles(CSS_HANDLES)
  console.log("TESTE3= ", repositories)
  return (
    <S.Lista>
      <ol>
        <S.TabelaTitulo>USUÁRIOS</S.TabelaTitulo>
        <S.Tabela>
          <S.TabelaCabecalho>
            <S.TabelaLinha>
              <S.TabelaCelulasCabecalho>NOME</S.TabelaCelulasCabecalho>
              <S.TabelaCelulasCabecalho>TELEFONE</S.TabelaCelulasCabecalho>
              <S.TabelaCelulasCabecalho>EMAIL</S.TabelaCelulasCabecalho>
              <S.TabelaCelulasCabecalho>CATEGORIA</S.TabelaCelulasCabecalho>
            </S.TabelaLinha>
          </S.TabelaCabecalho>
        {repositories.map(repository =>{
        return(
          <S.TabelaCorpo>
            <S.TabelaLinha>
              <S.TabelaCelulasCorpo>{repository.name}</S.TabelaCelulasCorpo>
              <S.TabelaCelulasCorpo>{repository.phone}</S.TabelaCelulasCorpo>
              <S.TabelaCelulasCorpo>{repository.email}</S.TabelaCelulasCorpo>
              <S.TabelaCelulasCorpo>{repository.category}</S.TabelaCelulasCorpo>
            </S.TabelaLinha>
          </S.TabelaCorpo>
        )
        </S.Tabela>
      </ol>
    </S.Lista>
  )
}

LeadsList.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default LeadsList