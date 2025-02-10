import { create } from "zustand";

const useFakeData = create(() => ({
  fakeData : [
    {
      id: 1,
      title: "Mathématiques - Algèbre Linéaire",
      description: "Cours",
      actProf: "Prof. Dupont",
      totalNumber: "EN ATTENTE",
      createdDate: "01-01-2024",
      expirationDate: "07-01-2024",
      goalDuration: 180 ,
    },
    {
      id: 2,
      title: "Physique - Mécanique des fluides",
      description: "TP",
      actProf: "Prof. Lambert",
      totalNumber: "ACCEPTED",
      createdDate: "02-15-2024",
      expirationDate: "08-15-2024",
      goalDuration: 120 // in days
    },
    {
      id: 3,
      title: "Informatique - Structures de données",
      description: "TD",
      actProf: "Prof. Martin",
      totalNumber: "REFUSED",
      createdDate: "03-10-2024",
      expirationDate: "09-10-2024",
      goalDuration: 200 // in days
    },
    {
      id: 4,
      title: "Chimie - Thermodynamique",
      description: "CI",
      actProf: "Prof. Bernard",
      totalNumber: "PRINTED",
      createdDate: "04-05-2024",
      expirationDate: "10-05-2024",
      goalDuration: 150 // in days
    },
    {
      id: 5,
      title: "Électronique - Circuits logiques",
      description: "Examen Intelligent",
      actProf: "Prof. Renault",
      totalNumber: "EN ATTENTE",
      createdDate: "05-20-2024",
      expirationDate: "11-20-2024",
      goalDuration: 180 // in days
    },
    {
      id: 6,
      title: "Génie Logiciel - Conception",
      description: "Projet",
      actProf: "Prof. Lefevre",
      totalNumber: "ACCEPTED",
      createdDate: "06-25-2024",
      expirationDate: "12-25-2024",
      goalDuration: 120 // in days
    },
    {
      id: 7,
      title: "Réseaux - Modélisation",
      description: "Cours",
      actProf: "Prof. Lefevre",
      totalNumber: "REFUSED",
      createdDate: "07-30-2024",
      expirationDate: "01-30-2025",
      goalDuration: 200 // in days
    },
    {
      id: 8,
      title: "Systèmes d'exploitation - Linux",
      description: "TP",
      actProf: "Prof. Lefevre",
      totalNumber: "PRINTED",
      createdDate: "08-04-2024",
      expirationDate: "02-04-2025",
      goalDuration: 150 // in days
    },
    {
      id: 9,
      title: "Mathématiques - Probabilités",
      description: "Cours",
      actProf: "Prof. Lefevre",
      totalNumber: "EN ATTENTE",
      createdDate: "09-09-2024",
      expirationDate: "03-09-2025",
      goalDuration: 180 // in days
    },
    {
      id: 10,
      title: "Physique - Mécanique quantique",
      description: "TP",
      actProf: "Prof. Lefevre",
      totalNumber: "ACCEPTED",
      createdDate: "10-14-2024",
      expirationDate: "04-14-2025",
      goalDuration: 120 // in days
    },
    {
      id: 11,
      title: "Informatique - Algorithmique",
      description: "TD",
      actProf: "Prof. Lefevre",
      totalNumber: "REFUSED",
      createdDate: "11-19-2024",
      expirationDate: "05-19-2025",
      goalDuration: 200 // in days
    },
    {
      id: 12,
      title: "Chimie - Cinétique chimique",
      description: "CI",
      actProf: "Prof. Lefevre",
      totalNumber: "PRINTED",
      createdDate: "12-24-2024",
      expirationDate: "06-24-2025",
      goalDuration: 150 // in days
    }
  ]
}));

export default useFakeData;

