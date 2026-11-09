import { voituresInitiales } from './data.js';





export const config = {
  voitures: JSON.parse(localStorage.getItem("voitures")) || voituresInitiales,

  modesRecuperation: [
    { id: "agence", nom: "À l’agence", fraisFixes: 0 },
    { id: "aeroport", nom: "À l’aéroport", fraisFixes: 150 },
    { id: "adresse", nom: "À une adresse", fraisFixes: 100 },
  ],

  agences: ["Casablanca à Centre-ville", "Rabat à Agdal", "Marrakech à Guéliz"],

  aeroports: ["Casablanca à Mohammed V", "Rabat à Salé", "Marrakech à Ménara"],

  options: [
    { id: "siegeBebe", nom: "Siège bebe", prixParJour: 30 },
    {
      id: "conducteurSupplementaire",
      nom: "Conducteur supplementaire",
      prixParJour: 200,
    },
  ],
};

// 2. SÃ‰LECTION : les choix de l'utilisateur, Ã  actualiser avec les formulaires.
// Les identifiants correspondent aux id dÃ©finis dans config.
// Les dates seront des chaÃ®nes au format AAAA-MM-JJ (valeur d'un input date).
export const selectedConfig = {
  etape: 1,
  voitureId: null,
  dateDebut: "",
  dateFin: "",
  nbrJour : 0,
  prixTotal : 0,
  prixJours: 0,
  prixRecuperation : 0,
  modeRecuperation: "agence",

  recuperation: {
    // Mode agence uniquement.
    heureRecuperation: "",

    // Mode aeroport uniquement.
    aeroport: "",
    numeroVol: "",
    heureArrivee: "",

    // Mode adresse uniquement.
    ville: "",
    adresse: "",
    heureLivraison: "",
  },

  options: {
    siegeBebe: false,
    conducteurSupplementaire: false,
  },
};



/*
 * 3. Ã€ VOUS DE JOUER
 *
 * 1) SÃ©lectionner vos Ã©lÃ©ments HTML et afficher les voitures depuis config.
 * 2) Ã‰couter les Ã©vÃ©nements et mettre Ã  jour selectedConfig.
 *    Attention : la valeur d'un select est une chaÃ®ne ; voitureId est un nombre.
 *    Pour une case Ã  cocher, utiliser checked pour rÃ©cupÃ©rer true ou false.
 * 3) GÃ©rer les boutons PrÃ©cÃ©dent / Suivant et afficher une seule Ã©tape.
 * 4) Afficher les champs du mode de rÃ©cupÃ©ration sÃ©lectionnÃ©.
 *    Masquer et dÃ©sactiver les autres ; adapter required.
 * 5) Valider l'Ã©tape courante avant de passer Ã  la suivante.
 * 6) Calculer et actualiser le prix quand les choix changent.
 * 7) Afficher le rÃ©capitulatif des seuls champs concernÃ©s, puis confirmer.
 * 8) Permettre de recommencer avec les valeurs initiales.
 *
 * RÃˆGLES DU PRIX
 * - Les deux dates sont incluses : du 10 au 12 = 3 jours.
 * - Une location sur une mÃªme date = 1 jour.
 * - Le dÃ©but ne peut pas Ãªtre passÃ© ; la fin ne peut pas prÃ©cÃ©der le dÃ©but.
 * - Total = jours Ã— (prixParJour de la voiture + options par jour)
 *           + fraisFixes du mode de rÃ©cupÃ©ration.
 * - Les frais de rÃ©cupÃ©ration sont ajoutÃ©s une seule fois.
 * - Aucun renseignement supplÃ©mentaire pour le conducteur.
 * - Ne pas afficher un total numÃ©rique tant que la voiture ou les dates
 *   sont manquantes ou invalides.
 *
 * Exemple de contrÃ´le : Sandero, du 10 au 12, siÃ¨ge bÃ©bÃ©, aÃ©roport
 * â†’ 3 Ã— (250 + 30) + 150 = 990 MAD.
 */