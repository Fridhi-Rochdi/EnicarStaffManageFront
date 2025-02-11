import { create } from "zustand";

const useFakeData = create(() => ({
  fakeData : [
    {
      id: 1,
      title: "Mathématiques - Algèbre Linéaire",
      description: "Cours",
      actProf: "Prof. Dupont",
      totalNumber: 22 ,
      createdDate: "01-01-2024",
      status: "EN ATTENTE",
    },
    {
      id: 1,
      title: "Mathématiques - Algèbre Linéaire",
      description: "Cours",
      actProf: "Prof. Dupont",
      totalNumber: 22 ,
      createdDate: "01-01-2024",
      status: "EN ATTENTE",
    },
  ]
}));

export default useFakeData;

