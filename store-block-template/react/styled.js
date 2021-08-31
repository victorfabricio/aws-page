import styled from "styled-components";

export const Formulario = styled.div `
	height: 400px;
	display: flex;
	flex-direction:column;
	justify-content: space-between;
`

export const FormularioForm = styled.form `
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`

export const FormLabel = styled.label `
	display: block;
	font-size: 1.1em;
	color: #FFFFFF;
`

export const FormInput = styled.input `
	margin: 10px 0;
	padding: 5px 10px;
	width: 500px;
	border-radius: 5px;
`

export const FormButton = styled.button `
	padding: 10px;
	width: 200px;
	margin: 0 auto;
	background-color: #f17214;
	color: #FFFFFF;
	border-radius: 10px;
`
