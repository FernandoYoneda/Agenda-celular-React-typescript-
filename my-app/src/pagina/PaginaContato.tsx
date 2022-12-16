import { useState, useEffect } from "react";
import { config } from "../config";
import CadastroContato from "../funcionalidade/contato/componentes/CadastroContato";
import ListarContatos from "../funcionalidade/contato/componentes/ListarContato";
import { novoUsuario } from "../funcionalidade/contato/services";
import { Contato } from "../funcionalidade/contato/types";
import { useFetch } from "../hooks/useFetch";

const url = `${config.API.BASE_URL}/usuarios`;

function PaginaContato() {
  const [loading, setLoading] = useState(true);
  const { data, reload } = useFetch<Contato[]>(url);
  const [contato, setContato] = useState<Contato>(novoUsuario());

  useEffect(() => {
    setLoading(false);
  }, [data]);

  return (
    <div className="App">
      <ListarContatos
        loading={loading}
        setLoading={setLoading}
        contatos={data}
        reload={reload}
        onContatoSelecionado={(contato) => setContato(contato)}
      ></ListarContatos>

      <CadastroContato
        loading={loading}
        reload={reload}
        setLoading={setLoading}
        contato={contato}
        setContato={setContato}
      ></CadastroContato>
    </div>
  );
}

export default PaginaContato;

