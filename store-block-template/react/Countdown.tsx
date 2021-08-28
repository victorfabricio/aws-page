import React from 'react'
//import { Form } from 'react-bootstrap';

interface CountdownProps {}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({}) => {
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
     <button>Cadastrar naaa Newsletter</button>
     </form>
     </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default Countdown