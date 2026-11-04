import { config , selectedConfig } from './starter.js';


const form = document.querySelector("form");
const modele_marque= document.getElementById("modele_marque");
const categorie_prix = document.getElementById("categorie_prix");
const nbrJour = document.getElementById("nbrJour");
const prixJour = document.getElementById('prixJour');
const prixJours = document.getElementById('prixJours');
const dateDebut = document.getElementById('dateDebut');
const dateFin = document.getElementById("dateFin");

let voiture_choisis ;

function step1 (){

    const radioVoitures = document.getElementById("radio_voitures");
    
    config.voitures.forEach(element => {
        const label = document.createElement('label');
        radioVoitures.append(label);
        label.classList.add("radio_voiture","border-1","border-[#D8E1EF]","p-4","rounded-2xl","has-checked:bg-[#F8FAFF]","has-checked:border-3","has-checked:border-[#2855d7]");

        const div_label = document.createElement('div');
        label.append(div_label);
        div_label.classList.add('flex','justify-between');

        const p_categorie = document.createElement('p');
        div_label.append(p_categorie);
        p_categorie.classList.add("text-[#2852E3]","bg-[#EEF2FF]","p-2","rounded-md","font-bold");
        p_categorie.textContent = element.categorie;

        const input_radio = document.createElement('input');
        div_label.append(input_radio);
        input_radio.setAttribute("type","radio");
        input_radio.setAttribute("value",element);
        input_radio.setAttribute("name","voiture");
        input_radio.classList.add("border-[#2852E3]","cursor-pointer");

        const h_marque_modele = document.createElement("h4");
        label.append(h_marque_modele);
        h_marque_modele.classList.add("font-bold","text-base","my-4");
        h_marque_modele.textContent = `${element.marque} ${element.modele}`;

        const p_disponible = document.createElement("p");
        label.append(p_disponible);
        p_disponible.classList.add("text-xs","text-[#16835C]","mb-4");
        p_disponible.textContent = element.statut;

        const h_prix = document.createElement("h4");
        label.append(h_prix);
        h_prix.classList.add("font-bold","text-base","text-[#2852E3]","mb-4");
        h_prix.textContent = `${element.prixJour} MAD / jour`;

        input_radio.addEventListener("click", ()=>{
            voiture_choisis = element;
            modele_marque.textContent = `${element.marque} ${element.modele}`;
            categorie_prix.textContent = `${element.categorie}`;
            prixJour.textContent = element.prixJour;
        })


    });    
    let date_active;
    dateDebut.addEventListener("input",()=>{date_active = true})
    dateFin.addEventListener("input",()=>{date_active = true})
    if(date_active){
        let jours = (dateFin.value - dateDebut.value)/(1000 * 60 * 60 * 24);
        console.log(jours);
    }
    
}
step1();


    
//     const headingSection = document.createElement('div');
//     form.append(headingSection);
//     headingSection.classList.add("mb-3");

//     const divHeading = document.createElement('div');
//     headingSection.append(divHeading);

//     const pHeading = document.createElement('p');
//     divHeading.append(pHeading);
//     pHeading.classList.add('text-[#2855d7]','text-[10px]','font-black','tracking-[1.6px]','mb-[8px]');
//     pHeading.textContent = "01 / VÉHICULE";

//     const hdeux_Heading = document.createElement('h2');
//     divHeading.append(hdeux_Heading);
//     hdeux_Heading.classList.add('mt-3','mb-3','text-xl','font-bold');
//     hdeux_Heading.textContent = "Choisissez votre véhicule";

//     const spanHeading = document.createElement('span');
//     headingSection.append(spanHeading);
//     spanHeading.classList.add('text-[#627184]','text-sm');
//     spanHeading.textContent = "Sélectionnez une voiture disponible et votre période de location.";

//     // le corps du formulaire


//     const hr = document.createElement("hr");
//     form.append(hr);
//     hr.classList.add("text-[#D8E1EF]");

//     const h_titre = document.createElement("h3");
//     form.append(h_titre);
//     h_titre.classList.add("font-bold","text-base","my-4");
//     h_titre.textContent = "Votre période de location";

//     const div_inputs = document.createElement("div");
//     form.append(div_inputs);
//     div_inputs.classList.add("grid","grid-cols-1","lg:grid-cols-2","gap-4","mb-3");

//     const div_dateDebut = document.createElement("div");
//     div_inputs.append(div_dateDebut);

//     const label_dateDebut = document.createElement("label");
//     label_dateDebut.textContent = "Date de fin *";
//     label_dateDebut.setAttribute("for","dateFin");
//     div_dateDebut.append(label_dateDebut);