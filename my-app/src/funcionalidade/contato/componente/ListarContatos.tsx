import { deletarContato, ordernarContatos } from "../services";
import { Contato } from "../types";

type ListarContatosProps = {
  contatos: Contato[] | undefined;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  reload: () => void;
};

function ListarContatos({
  contatos,
  loading,
  setLoading,
  reload,
}: ListarContatosProps) {
  const usuariosOrdenados = contatos && ordernarContatos(contatos);

  const handleDelete = async (id: number) => {
    setLoading(true);
    await deletarContato(id);

    setLoading(false);
    reload();
  };

  return (
    <div>
      <h1>Contatos</h1>
      {/* 6 - loading */}
      {loading && <p>Carregando dados...</p>}
      {!loading && (
        <ul>
          {usuariosOrdenados &&
            usuariosOrdenados.map((usuario: Contato) => (
              <div key={usuario.id}>
                <h1>{usuario.nome}</h1>
                <p>Endereço: {usuario.endereço}</p>
                <p>Telefone: {usuario.telefone}</p>
                <p>Email: {usuario.email}</p>
                <button onClick={() => usuario.id && handleDelete(usuario.id)}>
                  Deletar
                </button>
              </div>
            ))}
        </ul>
      )}
    </div>
  );
}

export default ListarContatos;
