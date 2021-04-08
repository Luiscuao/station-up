export interface ITile{
    title: string;
    subtitle?: string;
    id?:string;
    isDelete?:boolean;
    onDelete:(id:string) => void;
}