import styles from "./NavPages.module.css";

export default function NavPages({
  cambiarPagina, //fn
  recipesPerPage, // 9
  allRecipes, // 100
  paginaActual, //1
}) {
  let paginas = [];

  for (let i = 0; i < Math.ceil(allRecipes.length / recipesPerPage); i++) {
    //                                 100            /   9     => 11.111 =>12
    paginas.push(i + 1);
  }
  return (
    <div className={styles.Contenedor}>
      <button
        className={styles.BotonNav}
        onClick={
          paginaActual === 1
            ? () => cambiarPagina(paginas.length)
            : () => {
                cambiarPagina(paginaActual - 1);
              }
        }
      >
        Prev
      </button>
      {paginas.map((element) => {
        return (
          <button
            className={styles.Numeros}
            onClick={() => cambiarPagina(element)}
            style={
              paginaActual === element
                ? { boxShadow: "1px -1px 50px 0px rgba(184,57,48,0.76) inset" }
                : {}
            }
          >
            {element}
          </button>
        );
      })}
      <button
        className={styles.BotonNav}
        onClick={
          paginaActual === paginas.length
            ? () => cambiarPagina(1)
            : () => {
                cambiarPagina(paginaActual + 1);
              }
        }
      >
        Next
      </button>
    </div>
  );
}
