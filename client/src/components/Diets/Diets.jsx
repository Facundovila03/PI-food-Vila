import styles from "./Diets.module.css";
import { connect } from "react-redux";

function Diets(props) {
  //   const { allDiets } = props;

  console.log(props);
  return <div className={styles.Contenedor}>dasda</div>;
}

const mapStateToProps = (state) => {
  return {
    allDiets: state["allDiets"],
  };
};

export default connect(mapStateToProps, null)(Diets);
