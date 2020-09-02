import React , {useState}from 'react';
import {withRouter} from 'react-router'
import setAuthToken from '../../api/setAuthToken'
import {IPropsHome} from './interface'
import {validateKey} from '../../api/services/keysService'
import './styles.css';
const Home = (props:IPropsHome) => {
    const [apiKey, setApiKey] = useState("");
    const onChange = (event:any)=>{
        const {value}= event.target;
        setApiKey(value);
    }
    const submit = async ()=>{
        try {
            setAuthToken(apiKey)
            await validateKey();
            localStorage.setItem('api-key', apiKey);
            props.history.push('/station');
        } catch (error) {
            setAuthToken('')
            localStorage.setItem('api-key', '');
            console.log(error);
        }
        
    }
    return (
        <div className="container">
            <div className="key-form__container">  
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                                <label htmlFor="input_api-key">API-KEY</label>
                                <input type="text" 
                                    value={apiKey}
                                    placeholder="api-key" 
                                    onChange={onChange} 
                                    name='api-key' 
                                    className="form-control" 
                                    id="input_api-key"/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={submit}>Enviar</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default withRouter(Home);
