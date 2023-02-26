
export class TodoModel {

    id : string

    name : string

    description : string

    dateCreation : Date

    statut : TodoStatus



}

export enum TodoStatus{
    actif = "En Cours",
    waiting = "En attente",
    done = "Finalisé"
}