import React from 'react';

interface LeadsListProps {}

const LeadsList: StorefrontFunctionComponent<LeadsListProps> = ({}) => {
  return (
   <div>
       <br/>
       <br/>
     <h1>      LISTA DE LEADS</h1>
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