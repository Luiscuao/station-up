import { RouteComponentProps } from "react-router-dom";
interface Steps {
    title: string;
    onClick: (e:MouseEvent) => void;
}
export interface IPropsStepper extends RouteComponentProps<any> {
    current:number;
    steps: Steps[];
}