import { config , selectedConfig } from './starter.js';


const form = document.querySelector("form");
const modele_marque= document.getElementById("modele_marque");
const categorie_prix = document.getElementById("categorie_prix");
const nbrJour = document.querySelectorAll(".nbrJour");
const prixJour = document.getElementById('prixJour');
const prixJours = document.getElementById('prixJours');
const dateDebut = document.getElementById('dateDebut');
const dateFin = document.getElementById("dateFin");
const formDurée = document.getElementById("formDurée");
const afficheAnnée = document.getElementById("afficheAnnée");
const afficheMois = document.getElementById("afficheMois");
const afficheJourFin = document.getElementById("afficheJourFin");
const afficheJourDebut = document.getElementById("afficheJourDebut");
const b_recuperation = document.getElementsByClassName("recuperation");
const prixTotal = document.getElementById("prixTotal");
const suivant = document.getElementById("Suivant");
const recommencer = document.getElementById("Recommencer");
const lieu_recuperation = document.getElementById('lieu_recuperation');

const steps = ["step1" , "step2" , "step3"];
let stepIndex = 0 ;
const tableauJours = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
 

let voiture_choisis ;
let check = false;

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
            check = true;
            voiture_choisis = element;
            modele_marque.textContent = `${element.marque} ${element.modele}`;
            categorie_prix.textContent = `${element.categorie} · ${element.prixJour} MAD / jour`;
            prixJour.textContent = element.prixJour;
            selectedConfig.prixJours = selectedConfig.nbrJour*voiture_choisis.prixJour ;
            selectedConfig.prixTotal = selectedConfig.prixJours + selectedConfig.prixRecuperation ;
            prixJours.textContent = `${selectedConfig.prixJours} MAD`;
            prixTotal.textContent = selectedConfig.prixTotal;
        })


    });    

    //verification et calcule de dates;
    const now = new Date(); 
    let addzero = "0";

    const year = now.getFullYear();
    const month = now.getMonth() < 10 ? addzero + now.getMonth() + 1 : now.getMonth() + 1;
    const day = now.getDate() < 10 ? addzero + now.getDate()  : now.getDate() ;
    const nowString = `${year}-${month}-${day}`;
    
    dateDebut.setAttribute("min" , nowString);

    dateDebut.addEventListener("change",()=>{
        dateFin.setAttribute("min" , dateDebut.value);
        selectedConfig.dateDebut = dateDebut.value;



        afficheJourDebut.textContent = new Date(dateDebut.value).getDate();       
        

        if(dateFin.value){
            calculerJours();
            
        }

    })

    dateFin.addEventListener("change",()=>{
        dateDebut.setAttribute("max" , dateFin.value);
        selectedConfig.dateFin = dateFin.value;
        
        afficheJourFin.textContent = new Date(dateFin.value).getDate();
        afficheMois.textContent = tableauJours[new Date(dateFin.value).getMonth()] ;
        afficheAnnée.textContent = new Date(dateFin.value).getFullYear();

        if(dateDebut.value){
            calculerJours();
            
        }
    })

    suivant.addEventListener("click",()=>{
        if(check && dateDebut.value && dateFin.value){
            stepIndex++;
            afficheSteps();
        }else{
            alert("remplire tous les champs!");
        }
    })

    recommencer.addEventListener("click",()=>{
        form.reset();
        afficheJourDebut.textContent = "jj"
        afficheJourFin.textContent = "jj";
        afficheMois.textContent = "mois" ;
        afficheAnnée.textContent = "année";

        modele_marque.textContent = `Marque modele`;
        categorie_prix.textContent = `Categorie · 0 MAD / jour`;
        prixJour.textContent = '0';
        prixJours.textContent = `0 MAD`;
        prixTotal.textContent = 850;
        nbrJour.textContent = 'sdfghjk';
        
    })
 
    
}

function afficheSteps(){
    switch (stepIndex){
        case 0 :
            document.querySelector(".step1").classList.remove("hidden");
            step1();
            break;
        case 1 :
            document.querySelector(".step1").classList.add("hidden");
            document.querySelector(".step2").classList.remove("hidden");
            step2();
            break;
        case 2 : 
            document.querySelector(".step2").classList.add("hidden");
            document.querySelector(".step3").classList.remove("hidden");
            step3();
            break;
    }
}

afficheSteps();

function calculerJours(){
    let jours = (new Date(selectedConfig.dateFin) - new Date(selectedConfig.dateDebut))/(1000 * 60 * 60 * 24) + 1;
    selectedConfig.nbrJour = jours;

    formDurée.textContent = `Durée : ${jours} jours. Les dates de début et de fin sont incluses.`;
    // affiche_durée.textContent = ``
    nbrJour.forEach(e=>{
        e.textContent = `${jours}`;
    })
    selectedConfig.prixJours = selectedConfig.nbrJour*voiture_choisis.prixJour ;
    selectedConfig.prixTotal = selectedConfig.prixJours + selectedConfig.prixRecuperation ;
    prixJours.textContent = `${selectedConfig.prixJours} MAD`;
    prixTotal.textContent = selectedConfig.prixTotal;
    
    

}

function step2(){
    let temp;
    config.modesRecuperation.forEach((element)=>{
        const label = document.createElement("label");
        lieu_recuperation.append(label);
        label.classList.add("border-1","border-[#D8E1EF]","p-4","rounded-2xl","has-checked:bg-[#F8FAFF]","has-checked:border-[#2855d7]");
        label.setAttribute("for", element.id);

        const input = document.createElement("input");
        label.append(input);
        input.setAttribute("type","radio");
        input.setAttribute("name","modesRecuperation");
        input.setAttribute("id","modesRecuperation");

        const hquatre = document.createElement("h4");
        label.append(hquatre);
        hquatre.textContent = element.nom;
        hquatre.setAttribute("id","nameModeRecuperation");
        hquatre.classList.add("font-bold","text-base","my-2");

        const p = document.createElement("p");
        label.append(p);
        p.textContent = element.nom;
        p.setAttribute("id","nameModeRecuperation");
        p.classList.add("font-bold","text-[#2852E3]");
        
        input.addEventListener("click",()=>{
            if(temp == undefined){
                temp = element.id;
                document.getElementById(element.id).classList.remove("hidden");
            }
            
            else{
                document.getElementById(temp).classList.add("hidden");
                document.getElementById(element.id).classList.remove("hidden");
                temp = element.id;
                

            }
            
        })
    })
}

function step3(){}
