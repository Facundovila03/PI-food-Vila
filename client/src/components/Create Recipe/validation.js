export const validate = (recipeData, errors, setErrors, property) => {
  const validImageUrl = /\.(jpeg|jpg|png|gif|bmp)$/i;
  const validSummary = /^.{10,}$/;
  const validInstructions = /^.{20,}$/;
  switch (property) {
    case "name":
      if (!recipeData.name) {
        setErrors({ ...errors, name: "Por favor completar este campo" });
      } else {
        setErrors({ ...errors, name: "" });
      }
      break;
    case "image":
      if (!recipeData.image) {
        setErrors({ ...errors, image: "Por favor completar este campo " });
      } else if (!validImageUrl.test(recipeData.image)) {
        setErrors({ ...errors, image: "Link invalido" });
      } else {
        setErrors({ ...errors, image: "" });
      }
      break;
    case "summary":
      if (!recipeData.summary) {
        setErrors({ ...errors, summary: "Por favor completar este campo" });
      } else if (!validSummary.test(recipeData.summary)) {
        setErrors({
          ...errors,
          summary: "La descripcion debe contener al menos 10 caracteres",
        });
      } else {
        setErrors({ ...errors, summary: "" });
      }
      break;
    case "health_score":
      if (!recipeData.health_score) {
        setErrors({
          ...errors,
          health_score: "Por favor completar este campo",
        });
      }
      break;
    case "instructions":
      if (!recipeData.instructions) {
        setErrors({
          ...errors,
          instructions: "Por favor completar este campo",
        });
      } else if (!validInstructions.test(recipeData.instructions)) {
        setErrors({
          ...errors,
          instructions: "Debe contener al menos 20 caracteres",
        });
      } else {
        setErrors({ ...errors, instructions: "" });
      }
      break;
    default:
      setErrors({ ...errors });
      break;
  }
};
