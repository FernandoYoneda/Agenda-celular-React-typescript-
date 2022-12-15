import { useState } from "react";
import { criarContato, novoUsuario } from "../services";
import { Contato } from "../types";

type CadastroContatoProps = {
  reload: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

function CadastroContato({
  reload,
  loading,
  setLoading,
}: CadastroContatoProps) {
  const [contato, setContato] = useState<Contato>(novoUsuario());

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await criarContato(contato);

    setContato(novoUsuario());
    setLoading(false);
    reload();
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
      </form>
    </div>
  );
}

export default CadastroContato;
