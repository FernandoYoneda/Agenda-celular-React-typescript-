import { config } from "../../config"
import { Contato } from  "./types"

const url = `${config.API.BASE_URL}/usuarios`;

export function criarContato(contato: Contato) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(contato),
  });
}

export function deletarContato(id: number) {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
}

export function atualizarContato(id: number, contato: Contato) {
  return fetch(`${url}/${id}`, {
    method:"PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(contato)
  })
}

export function novoUsuario(): Contato {
  return {
    email: "",
    endereço: "",
    nome: "",
    telefone: "",
  };
}

export function ordernarContatos(contatos: Contato[]) {
  return contatos.sort((a, b) =>
    a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : -1
  );
}