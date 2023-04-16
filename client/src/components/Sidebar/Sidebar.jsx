import styles from "./Sidebar.module.css";
import { connect, useDispatch } from "react-redux";

export default function Sidebar(props) {
  console.log(props);

  return (
    <div className={styles.Contenedor}>
      <div style={{ display: "flex", width: "100%" }}>
        <input
          type="text"
          placeholder="Bucar receta..."
          className={styles.InputBusqueda}
        />
        <button className={styles.BotonBusqueda}>&#x1F50E;&#xFE0E;</button>
      </div>
      {/* <hr className={styles.Divisor} /> */}
      <br />
      <h2>Filtrar por origen</h2>
      {/* {allDiets.map((element) => {
        return <span>{element}</span>;
      })} */}
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     allDiets: state.allDiets,
//   };
// };

// export default connect(mapStateToProps, null)(Sidebar);

// const mapDispatchToProps = (dispatch) => {
//   return {
//     pedirDietas: () => {
//       console.log("estas pidiendo las dietas desde la side bar");
//       dispatch(pedirDietas());
//     },
//   };
// };
