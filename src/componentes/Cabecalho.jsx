import { Link, useNavigate } from "react-router-dom";
import { useLoja } from "../contextos/LojaContexto.jsx";
import BotaoTema from "./BotaoTema.jsx";
import Icone from "./Icone.jsx";

const menu = [
  { texto: "Novidades", destino: "/busca?ordem=novidades" },
  { texto: "Feminino", destino: "/busca" },
  { texto: "Masculino", destino: "/busca" },
  { texto: "Infantil", destino: "/busca" },
  { texto: "Camisetas", destino: "/busca?categoria=Camisetas" },
  { texto: "Calças", destino: "/busca?categoria=Calças" },
  { texto: "Jaquetas", destino: "/busca?categoria=Jaquetas" },
  { texto: "Acessórios", destino: "/busca?categoria=Acessórios" },
  { texto: "Promoções", destino: "/busca?ordem=menor-preco" },
];

export default function Cabecalho() {
  const { usuario, totalDeItens } = useLoja();
  const navegar = useNavigate();

  function buscar(evento) {
    evento.preventDefault();
    const texto = new FormData(evento.target).get("q").trim();
    navegar(texto === "" ? "/busca" : "/busca?q=" + encodeURIComponent(texto));
  }

  return (
    <header id="topo">
      <div className="topo__barra">
        <Link className="logo" to="/">
          <img className="logo__imagem" src="/img/trama-logotipo.svg" alt="Trama, página inicial" width="166" height="40" />
        </Link>

        <form className="busca" role="search" aria-label="Busca no site" onSubmit={buscar}>
          <label className="visualmente-oculto" htmlFor="busca-topo">
            Buscar produtos
          </label>
          <input className="busca__entrada" id="busca-topo" type="search" name="q" placeholder="Buscar roupas" autoComplete="off" />
          <button className="busca__botao" type="submit" aria-label="Buscar">
            <Icone nome="busca" />
          </button>
        </form>

        <div className="topo__tema">
          <BotaoTema />
        </div>

        <div className="topo__acoes">
          <Link className="botao-icone" to="/conta#favoritos" aria-label="Meus favoritos">
            <Icone nome="coracao" />
          </Link>
          <Link className="botao-icone" to={usuario ? "/conta" : "/entrar"} aria-label={usuario ? "Minha conta: " + usuario.nome : "Entrar na minha conta"}>
            <Icone nome="usuario" />
          </Link>
          <Link className="botao-icone" to="/sacola" aria-label={"Minha sacola, " + totalDeItens + (totalDeItens === 1 ? " item" : " itens")}>
            <Icone nome="carrinho" />
            <span className="sacola__contador" hidden={totalDeItens === 0}>
              {totalDeItens}
            </span>
          </Link>
        </div>
      </div>

      <nav className="menu" aria-label="Categorias">
        <ul className="menu__lista">
          {menu.map((item) => (
            <li key={item.texto}>
              <Link className="menu__link" to={item.destino}>
                {item.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
