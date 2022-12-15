import "./App.css";

import { useState, useEffect } from "react";

// 4 - custom hook
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/usuarios";

type Usuario = {
  id?: number;
  nome: string;
  telefone: string;
  endereço: string;
  email: string;
};

function criarContato(contato: Usuario) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(contato),
  })
}

function deletarContato(id: number) {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    }
  })
}

function atualizarContato(id: number, contato: Usuario) {
  return fetch(`${url}/${id}`, {
    method:"PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(contato)
  })
}

function App() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nome, setNome] = useState("");
  const [endereço, setEndereço] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(true)
  const [atualizar,setAtualizar] = useState(false)
  const [id, setId] = useState(0)

  // 4 - custom
  const { data: items, reload } = useFetch<Usuario[]>(url);
  useEffect(() => {
    setLoading(false)
  },[items]) 
  
  const usuariosOrdenados = items?.sort((a, b) => a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : -1)

  // 2 - adicionar usuário
  
  const handleSubmit = async (e: any) => {
 
    e.preventDefault();
    setLoading(true)

    const usu = {
      nome,
      endereço,
      email,
      telefone,
    };
    
    if(!atualizar){
      await criarContato(usu)
    }else {
      await atualizarContato(id, usu)
    } 
    setAtualizar(false)

    setNome("");
    setEmail("");
    setEndereço("");
    setTelefone("");
    setLoading(false)
    reload()
  };

  const handleDelete = async (id:number) => {
    setLoading(true)
    await deletarContato(id)
    
    setLoading(false)
    reload()
  }

  const handleAtualizar = (usuario: Usuario) => {
    setAtualizar(true)
   if(usuario.id) {
    setId(usuario.id)
   } 
    setNome(usuario.nome);
    setEmail(usuario.email);
    setEndereço(usuario.endereço);
    setTelefone(usuario.telefone);
  }

  return (
    <div className="App">
      <h1>Contatos</h1>
      {/* 6 - loading */}
      {loading && <p>Carregando dados...</p>}
      {!loading && (
        <ul>
        {usuariosOrdenados &&
          usuariosOrdenados.map((usuario: Usuario) => (
            <div key={usuario.id}>
              <h1>
                <button className="button-link"  onClick={() => handleAtualizar(usuario)}>{usuario.nome}</button>
              </h1>
              
              <p>Endereço: {usuario.endereço}</p>
              <p>Telefone: {usuario.telefone}</p>
              <p>Email: {usuario.email}</p>
              <button onClick={() => usuario.id && handleDelete(usuario.id)}>Deletar</button>
            </div>
          ))}
      </ul>
      )}
      
      <div className="add-usuario">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              name="nome"
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label>
            Endereço:
            <input
              type="text"
              value={endereço}
              name="endereço"
              onChange={(e) => setEndereço(e.target.value)}
            />
          </label>
          <label>
            E-mail:
            <input
              type="text"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Telefone:
            <input
              type="text"
              value={telefone}
              name="telefone"
              onChange={(e) => setTelefone(e.target.value)}
            />
          </label>
          
  
          <input type="submit"  disabled={loading} value="Cadastrar" />
        
        </form>
      </div>
    </div>
  );
}

export default App;