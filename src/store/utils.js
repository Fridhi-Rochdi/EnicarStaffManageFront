import { create } from "zustand";
const useTypeOptions = create(() => ({
  typeOptions: [
    { value: "COURS", label: "Cours" },
    { value: "TRAVEAUX_DIRIGES", label: "Traveaux Dérigés" },
    { value: "TRAVEAUX_PRATIQUES", label: "Traveaux Pratiques" },
    { value: "COURS_INTEGRE", label: "Cour Integré" },
    { value: "EXAMEN", label: "Examen" },
    { value: "EXAMEN_INTELLIGENT", label: "Examen Intelligent" },
  ],
}));

export default useTypeOptions;
