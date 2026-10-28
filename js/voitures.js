import { voituresInitiales } from './data.js';



if(!localStorage.getItem("voitures")){
    localStorage.setItem("voitures",JSON.stringify(voituresInitiales));
}

const tbody =  document.getElementById("liste-voitures");
const btn_validation = document.getElementById("bouton-enregistrer");
const marque = document.getElementById("marque");
const erreur_marque = document.getElementById("erreur-marque");
const modele = document.getElementById("modele");
const erreur_modele = document.getElementById("erreur-modele");
const immatriculation = document.getElementById("immatriculation");
const erreur_immatriculation = document.getElementById("erreur-immatriculation");
const categorie = document.getElementById("categorie");
const erreur_categorie = document.getElementById("erreur-categorie");
const prix_jour = document.getElementById("prix-jour");
const erreur_prix_jour = document.getElementById("erreur-prix-jour");
const statut = document.getElementById("statut");
const erreur_statut = document.getElementById("erreur-statut");
const message_formulaire = document.getElementById("message-formulaire");
const annuler_modification = document.getElementById("annuler-modification");


let ajout_modif = 0 ;
let id = 7;
let modification_ouvert;

let voitures_storage = JSON.parse(localStorage.getItem("voitures")) || [] ;


if(voitures_storage){
    afficher();
}


btn_validation.addEventListener( "click", (e)=>{
    e.preventDefault();
    if(!ajout_modif){
         ajouter();
    }else{
        edit(ajout_modif);
    }
} )

annuler_modification.addEventListener("click" , ()=>{
    const confirmation = confirm("etes vous sure d'annuler cette modification");

    if(confirmation){
        modification_ouvert = false
        annuler_modification.setAttribute("hidden","");
        ajout_modif = 0;
        document.getElementById("formulaire-voiture").reset();
    }
})




function validateForm(){
    let verif_marque ;
    let verif_modele;
    let verif_immatriculation;
    let verif_categorie;
    let verif_erreur_prix_jour;
    let verif_statut;

    if(marque.value == "" || marque.value == " "){
        erreur_marque.textContent = "le champ marque est vide";
        verif_marque = true ;
    }else{
        erreur_marque.textContent = "";
    }


    if(modele.value == "" || modele.value == " "){
        erreur_modele.textContent = "le champ modele est vide";
        verif_modele = true ;
    }else{
        erreur_modele.textContent = "";
    }


    if(immatriculation.value == "" || immatriculation.value == " "){
        erreur_immatriculation.textContent = "le champ immatriculation est vide";
        verif_immatriculation = true ;
    }

    if(ajout_modif == 0){
        const cherch_immatriculation = voituresInitiales.find((e)=>e.immatriculation == immatriculation.value);
        if(cherch_immatriculation != undefined){
            erreur_immatriculation.textContent = "cet immatricule est deja existe";
            verif_immatriculation = true ;
        }
    }
    

    const regex = /^[A-Z]{4}-[0-9]{3}$/ ;
    if( regex.test(immatriculation.value) == false ){
        erreur_immatriculation.textContent = "cet immatricule ne respect pas le patterne";
        verif_immatriculation = true ;
    } 

    if(!verif_immatriculation){
        erreur_immatriculation.textContent = "";
    }


    if(categorie.value == ""){
        erreur_categorie.textContent = "ce champ categorie est vide";
        verif_categorie = true;
    }else{
        erreur_categorie.textContent = "";
    }


    if(prix_jour.value == 0 ){
        document.getElementById("erreur-prix-jour").textContent = "ce champ doit etre strictement positif";
        verif_categorie = true;
    }else{
        erreur_prix_jour.textContent = "";
    }
    


    if(statut.value == ""){
        erreur_statut.textContent = "ce champ categorie est vide";
        verif_statut = true;
    }else{
        erreur_statut.textContent = "";
    }


    if(verif_categorie || verif_erreur_prix_jour || verif_immatriculation || verif_marque || verif_modele || verif_statut){
        message_formulaire.textContent = "remplir tous les champs ";
        return false ;
    }else{
        message_formulaire.textContent = "";
        return true;
    }
}

function afficher(tab){
    let afficher_tab = [] ;
    if(tab == undefined){
        afficher_tab = voitures_storage;
    }else{
        afficher_tab = tab;
    }
    tbody.textContent = "";
    afficher_tab.forEach(element => {
        const tr = document.createElement("tr");
        tbody.append(tr);
       

        const td = document.createElement("td");
        tr.append(td);

        const strong = document.createElement("strong");
        td.append(strong);
        strong.textContent = element.marque ;

        const td2 = document.createElement("td");
        tr.append(td2);
        td2.textContent = element.modele ;




        const td3 = document.createElement("td");
        tr.append(td3);

        const span = document.createElement("span");
        td3.append(span);
        span.classList.add("registration");
        span.textContent = element.immatriculation



        const td4 = document.createElement("td");
        tr.append(td4);
        td4.textContent = element.categorie ;



        const td5 = document.createElement("td");
        tr.append(td5);
        td5.classList.add("price");
        td5.textContent = element.prixJour

        const span2 = document.createElement("span");
        td5.append(span2);
        span2.textContent = "DH / jour";



        const td6 = document.createElement("td");
        tr.append(td6);

        const span3 = document.createElement("span");
        td6.append(span3);
        span3.classList.add("badge")
        span3.textContent = element.statut;
        switch(element.statut){
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


        const td7 = document.createElement("td");
        tr.append(td7);

        const div = document.createElement("div");
        td7.append(div);
        div.classList.add("row-actions");

        const btn_modif = document.createElement("button");
        div.append(btn_modif);
        btn_modif.setAttribute("type" , "button");
        btn_modif.classList.add("button" , "button-edit");
        btn_modif.setAttribute("data-action","modifier");
        btn_modif.setAttribute("data-id" , element.id);
        btn_modif.setAttribute("aria-label" , `modifier ${element.marque}  ${element.modele} , ${element.immatriculation} `);
        btn_modif.textContent = "Modifier";
        btn_modif.addEventListener("click" , ()=>{modifier(element.id)});


        const btn_sup = document.createElement("button");
        div.append(btn_sup);
        btn_sup.setAttribute("type" , "button");
        btn_sup.classList.add("button" , "button-delete");
        btn_sup.setAttribute("data-action","supprimer");
        btn_sup.setAttribute("data-id" , "1");
        btn_sup.setAttribute("aria-label" , `supprimer ${element.marque}  ${element.modele} , ${element.immatriculation} `);
        btn_sup.textContent = "Supprimer";
        btn_sup.addEventListener("click" , ()=>{supprimer(element.id , tab)});
    });
}



function ajouter(){
    if(!validateForm()){
        return; 
    }
    const voiture = {
        "id": id++,
        "marque": marque.value,
        "modele": modele.value,
        "immatriculation": immatriculation.value,
        "categorie": categorie.value,
        "prixJour": prix_jour.value,
        "statut": statut.value
    }

    voitures_storage.push(voiture);
    localStorage.setItem("voitures",JSON.stringify(voitures_storage));
    afficher(voitures_storage);
    document.getElementById("formulaire-voiture").reset();
}

function supprimer (id , tab){
    const confirmation = confirm("etes vous sure de supprimer cette voiture")
    if(!confirmation){
        return;
    }
    if(modification_ouvert){
        alert("terminer la modification");
        return;
    }
    const trouvé = voitures_storage.find(e=>e.id == id);
    if(trouvé == undefined){
        return
    }
    const index = voitures_storage.findIndex(e=>e.id == id);
    tab = tab.filter((e)=>e.id == id);
    
    voitures_storage.splice(index,1);
    localStorage.setItem("voitures" , JSON.stringify(voitures_storage));
    if(tab == undefined){
        afficher();
    }else{
        afficher(tab)
    }
    
}

function modifier (id){
    ajout_modif = id ;
    modification_ouvert = true ;
    annuler_modification.removeAttribute("hidden");
    const voiture = voitures_storage.find(e=>e.id == id);
    if(voiture == undefined){
        return
    }
    const index = voitures_storage.findIndex(e=>e.id == id);
    marque.value = voiture.marque;
    modele.value = voiture.modele;
    immatriculation.value = voiture.immatriculation;
    prix_jour.value = voiture.prixJour;
    categorie.value = voiture.categorie;
    statut.value = voiture.statut;

    btn_validation.textContent = "modifier";

}

// function save_modification
function edit (id){
    
    const index = voitures_storage.findIndex((e)=>e.id == id);
    voitures_storage[index].marque = marque.value ; 
    voitures_storage[index].modele = modele.value ; 
    voitures_storage[index].immatriculation = immatriculation.value ; 
    voitures_storage[index].categorie = categorie.value ; 
    voitures_storage[index].statut = statut.value ; 
    
    localStorage.setItem("voitures",JSON.stringify(voitures_storage));
    
    afficher();
    ajout_modif = 0;
    btn_validation.textContent = "Ajouter la voiture";

    document.getElementById("formulaire-voiture").reset();
    annuler_modification.setAttribute("hidden" , "");
    modification_ouvert = false;
}


const search = document.getElementById("recherche");
const filtre_statut = document.getElementById("filtre-statut");
const filtre_categorie = document.getElementById("filtre-categorie");
const tri_prix = document.getElementById("tri-prix");
const reinitialiser_filtres = document.getElementById("reinitialiser-filtres");





search.addEventListener("input" , ()=>{
    let tab = JSON.parse(localStorage.getItem("voitures")) || [] ;
    tab = chercher(tab);
    tab = f_filtrer_categorie(tab);
    tab = f_filtrer_statut(tab);
    tab = tri(tab);
    afficher(tab);
} )

filtre_statut.addEventListener("input" , ()=>{
    let tab = JSON.parse(localStorage.getItem("voitures")) || [] ;
    tab = chercher(tab);
    tab = f_filtrer_categorie(tab);
    tab = f_filtrer_statut(tab);
    tab = tri(tab);
    afficher(tab);

} )


filtre_categorie.addEventListener("input" , ()=>{
    let tab = JSON.parse(localStorage.getItem("voitures")) || [] ;
    tab = chercher(tab);
    tab = f_filtrer_categorie(tab);
    tab = f_filtrer_statut(tab);
    tab = tri(tab);
    afficher(tab);
})

tri_prix.addEventListener("input" , ()=>{
    let tab = JSON.parse(localStorage.getItem("voitures")) || [] ;
    tab = chercher(tab);
    tab = f_filtrer_categorie(tab);
    tab = f_filtrer_statut(tab);
    tab = tri(tab);
    afficher(tab);
})


function chercher(tab){
    if(search.value == ""){
        return tab
    }
    tab = tab.filter(e=>e.marque == search.value || e.modele == search.value || e.immatriculation == search.value || e.categorie == search.value || e.prix_jour == search.value || e.statut == search.value );
    return tab
}

function f_filtrer_statut (tab){
    if(filtre_statut.value == ""){
        return tab
    }
    tab = tab.filter(e=> e.statut == filtre_statut.value );
    return tab;
}


function f_filtrer_categorie (tab){
    if(filtre_categorie.value == ""){
        return tab
    }
    tab = tab.filter(e=> e.categorie == filtre_categorie.value );
    return tab ;
}

function tri (tab){
    if(tri_prix.value == "croissant"){
        tri_croissant(tab);
        return tab
    }else if(tri_prix.value == "decroissant"){
        tri_decroissant(tab);
        return tab
    }else{
        tri_order_initiale(tab);
        return tab
    }
}
function tri_croissant (tab){
    for(let i = 0 ; i < tab.length ; i++){
        let temp;
        for(let j = 0 ; j < tab.length-1 ; j++){
            if(tab[i].prixJour < tab[j].prixJour){
                temp = tab[i];
                tab[i] = tab[j];
                tab[j] = temp;
            }
        }
    }
    return tab
}

function tri_decroissant (tab){
    for(let i = 0 ; i < tab.length ; i++){
        let temp;
        for(let j = 0 ; j < tab.length-1 ; j++){
            if(tab[i].prixJour > tab[j].prixJour){
                temp = tab[i];
                tab[i] = tab[j];
                tab[j] = temp;
            }
        }
    }
    return tab
}

function tri_order_initiale (tab){
    for(let i = 0 ; i < tab.length ; i++){
        let temp;
        for(let j = 0 ; j < tab.length-1 ; j++){
            if(tab[i].id > tab[j].id){
                temp = tab[i];
                tab[i] = tab[j];
                tab[j] = temp;
            }
        }
    }
    return tab
}

reinitialiser_filtres.addEventListener("click",()=>{
    search.value = "";
    filtre_statut.value = "";
    filtre_categorie.value = "";
    tri_prix.value = "";
    afficher();
})