
export interface ITile{
    title: string;
}

export interface IpropsListTile{
    list : ITile []
    onDelete: () => void;
}