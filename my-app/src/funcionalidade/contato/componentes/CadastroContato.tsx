import { useState } from "react";
import { criarContato, novoUsuario, atualizarContato } from "../services";
import { Contato } from "../types";

type CadastroContatoProps = {
  reload: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  contato: Contato;
  setContato: (contato: Contato | ((contato: Contato) => Contato)) => void;
};

function CadastroContato({
  reload,
  loading,
  setLoading,
  contato,
  setContato,
}: CadastroContatoProps) {
  const [atualizar, setAtualizar] = useState(false);
  const [id, setId] = useState(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!atualizar) {
      await criarContato(contato);
    } else {
      await atualizarContato(id, contato);
    }

    setAtualizar(false);
    setContato(novoUsuario());
    setLoading(false);
    reload();
  };

  const handleAtualizar = (usuario: Contato) => {
    setAtualizar(true);

    if (usuario.id) {
      setId(usuario.id);
    }

    setContato(usuario);
  };

  return (
    <div className="add-usuario">
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={contato.nome}
            name="nome"
            onChange={(e) =>
              setContato((c) => ({
                ...c,
                nome: e.target.value,
              }))
            }
          />
        </label>
        <label>
          Endereço:
          <input
            type="text"
            value={contato.endereço}
            name="endereço"
            onChange={(e) =>
              setContato((c) => ({ ...c, endereço: e.target.value }))
            }
          />
        </label>
        <label>
          E-mail:
          <input
            type="text"
            value={contato.email}
            name="email"
            onChange={(e) =>
              setContato((c) => ({ ...c, email: e.target.value }))
            }
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            value={contato.telefone}
            name="telefone"
            onChange={(e) =>
              setContato((c) => ({ ...c, telefone: e.target.value }))
            }
          />
        </label>
        <input type="submit" disabled={loading} value="Cadastrar" />
        <button onClick={() => handleAtualizar(contato)}>Atualizar</button>
      </form>
    </div>
  );
}

export default CadastroContato;

