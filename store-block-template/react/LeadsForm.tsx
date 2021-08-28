import React from 'react'

interface LeadsFormProps {}

const LeadsForm: StorefrontFunctionComponent<LeadsFormProps> = ({}) => {
  return (
   <div>
     <form>
      Nome: <br/>
     <input type="text" name="name" /> <br/>
     Telefone: <br/>
     <input type="text" name="telephone"/> <br/>
     Email: <br/>
     <input type="text" name="email"/> <br/>
     <br/>
     <button>Cadastrar na Newsletter</button>
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