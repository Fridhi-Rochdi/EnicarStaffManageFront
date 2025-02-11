import { create } from "zustand";
const useTypeOptions = create(() => ({
  typeOptions: [
    { value: "cour", label: "cour" },
    { value: "Traveaux Dérigés", label: "Traveaux Dérigés" },
    { value: "Traveaux Pratiques", label: "Traveaux Pratiques" },
    { value: "Cour Integré", label: "Cour Integré" },
    { value: "Examen", label: "Examen" },
    { value: "Examen Intelligent", label: "Examen Intelligent" },
  ],
}));

export default useTypeOptions;
