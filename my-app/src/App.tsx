import './App.css';

import {useState, useEffect} from 'react'

// 4 - custom hook
import { useFetch } from "./hooks/useFetch"

const url = "http://localhost:3000/usuarios"

type Usuario = {
  id: number
  nome: string
  telefone: string
  endereço: string
  email: string
}


function App() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [nome, setNome] = useState("")
  const [endereço, setEndereço] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  
  // 4 - custom 
  const {data: items} = useFetch(url)

  // 1 -  resgatando os dados
/* useEffect( () => {
    async function fetchData() {

      const res = await fetch(url)

    const data = await res.json()

    setUsuarios(data)
    }
    fetchData()
  }, [url]) */

  // 2 - adicionar usuário
  const handleSubmit = async (e:any) =>{
    e.preventDefault()

    const usu ={
      nome,
      endereço,
      email,
      telefone
    }
    
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type" : "application/json",
      },
      body: JSON.stringify(usu)
    })

    // 3 - Carregamento dinâmico
    const addedUsuario = await res.json()

    setUsuarios((prevUsusarios) => [...prevUsusarios, addedUsuario])

    setNome("")
    setEmail("")
    setEndereço("")
    setTelefone("")
  }

  return (
    <div className="App">
      <h1>Contatos</h1>
      <ul>
        {usuarios.map((usuario) => (
          <div key={usuario.id}>
            <h1>{usuario.nome}</h1>  
            <p>Endereço: {usuario.endereço}</p>
            <p>Telefone: {usuario.telefone}</p>
            <p>Email: {usuario.email}</p>
          </div>
        ))}
      </ul>
      <div className="add-usuario">
        <form onSubmit={handleSubmit}>
          <label>Nome:
            <input type="text" value={nome} name="nome" onChange={(e) => setNome(e.target.value)}/>
          </label>
          <label>Endereço:
            <input type="text" value={endereço} name="endereço" onChange={(e) => setEndereço(e.target.value)}/>
          </label>
          <label>E-mail:
            <input type="text" value={email} name="email" onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label>Telefone:
            <input type="text" value={telefone} name="telefone" onChange={(e) => setTelefone(e.target.value)}/>
          </label>
          <input type="submit" value="Cadastrar" />
        </form>
      </div>

    
    </div>
  );
}

export default App;
