export interface ITile{
    title: string;
    subtitle?: string;
    id?:string;
    onDelete:(id:string) => void;
}