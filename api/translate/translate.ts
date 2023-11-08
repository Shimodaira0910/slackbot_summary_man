import { load } from 'ts-dotenv';
import Constants from '../../constants/const';

class Translate{
    private source: string;
    private target: string;
    private uri: string;
    private requestOptions: RequestInit;
    
    constructor(){
        const constInstance = new Constants();
        this.source = constInstance.source;
        this.target = constInstance.target;

        const env = load({
            TRANSLATE_API_URI: String,
        });
        this.uri = env.TRANSLATE_API_URI;

        this.requestOptions = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        }
    }

    fetchApiData = (text: string): string =>{
        const apiUri: string = this.uri + "?text=" + text + "&source=" + this.source + "&target=" + this.target;
        return apiUri;
    }
}

export default Translate;