
export interface ITile{
    title: string;
    subtitle?: string;
    id?: string;
    isDelete?:boolean;
}

export interface IpropsListTile{
    list : ITile []
    onDelete: (id:string) => void;
    isDelete?:boolean;
}