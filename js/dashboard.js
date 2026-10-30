import { voituresInitiales } from "./data.js";

if(!localStorage.getItem("voitures")){
    localStorage.setItem("voitures",JSON.stringify(voituresInitiales));
}

const voitures =  JSON.parse(localStorage.getItem("voitures")) || [];


 const total = document.querySelector(`.total_vehicules`);
 total.textContent = voitures.length

const dispo = document.querySelector(`.vehicules_dispo`);
const nbr_dispo = voitures.filter(e=>e.statut == "Disponible");
dispo.textContent = (nbr_dispo.length > 0 ) ? nbr_dispo.length : 0 ;

const louée = document.querySelector(`.vehicules_louée`);
const nbr_louée = voitures.filter(e=>e.statut == "Louée");
louée.textContent = (nbr_louée.length > 0 ) ? nbr_louée.length : 0 ;

const maintenance = document.querySelector(`.vehicules_maintenance`);
const nbr_maintenace = voitures.filter(e=>e.statut == "En maintenance");
maintenance.textContent = (nbr_maintenace.length > 0 ) ? nbr_maintenace.length : 0 ;

const tbody = document.querySelector("tbody");

function afficher(){
    tbody.textContent = "";

    const voitures_trié =  tri(voitures);
    for(let i = 0 ; i <= 2 ; i++){
        const tr = document.createElement("tr");
        tbody.append(tr);

        tr.classList.add("h-12");
       

        const td = document.createElement("td");
        tr.append(td);
        td.classList.add("text-center");

        const strong = document.createElement("strong");
        td.append(strong);
        strong.textContent = voitures_trié[i].marque ;

        const td2 = document.createElement("td");
        tr.append(td2);
        td2.textContent = voitures_trié[i].modele ;
        td2.classList.add("text-center");




        const td3 = document.createElement("td");
        tr.append(td3);
        td3.classList.add("text-center");

        const span = document.createElement("span");
        td3.append(span);
        span.classList.add("registration");
        span.textContent = voitures_trié[i].immatriculation



        const td4 = document.createElement("td");
        tr.append(td4);
        td4.textContent = voitures_trié[i].categorie ;
        td4.classList.add("text-center");



        const td5 = document.createElement("td");
        tr.append(td5);
        td5.classList.add("price" , "text-center");
        td5.textContent = voitures_trié[i].prixJour;

        const span2 = document.createElement("span");
        td5.append(span2);
        span2.textContent = "DH / jour";



        const td6 = document.createElement("td");
        tr.append(td6);
        td6.classList.add("text-center");

        const span3 = document.createElement("span");
        td6.append(span3);
        span3.classList.add("badge")
        span3.textContent = voitures_trié[i].statut;
        switch(voitures_trié[i].statut){
            case "Disponible":
                span3.classList.add("badge-disponible");
                break;
            case "Louée":
                span3.classList.add("badge-louee");
                break;
            case "En maintenance":
                span3.classList.add("badge-maintenance")
                break;
        }


       
    }
}
afficher();

function tri (tab){
    for(let i = 0 ; i < tab.length ; i++){
        let temp;
        for(let j = 0 ; j < tab.length-1 ; j++){
            if(tab[i].id < tab[j].id){
                temp = tab[i];
                tab[i] = tab[j];
                tab[j] = temp;
            }
        }
    }
    return tab
}
