
export interface ITile{
    title: string;
    subtitle?: string;
    id?: string;
}

export interface IpropsListTile{
    list : ITile []
    onDelete: (id:string) => void;
}