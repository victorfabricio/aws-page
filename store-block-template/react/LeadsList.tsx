import React from 'react'

interface LeadsListProps {}
const lista = "LISTA DE LEADS"

const LeadsList: StorefrontFunctionComponent<LeadsListProps> = ({}) => {
  return (
   <div>
       <br/>
       <br/>
     <li>{lista}</li>
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