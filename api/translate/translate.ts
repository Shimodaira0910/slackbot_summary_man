import { load } from 'ts-dotenv';
import Constants from '../../constants/const';
import { error } from 'console';

class Translate{
    private source: string;
    private target: string;
    private uri: string;
    private requestOptions: RequestInit;
    private resultText: string;
    
    constructor(){
        const constInstance = new Constants();
        this.source = constInstance.source;
        this.target = constInstance.target;
        this.resultText = 'このメッセージが出るのはおかしいヨ';

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

    fetchApiData = async (text: any): Promise<string> =>{
        const apiUri: string = `${this.uri}?text=${text}&source=${this.source}&target=${this.target}`;

        try{
            const response:Response = await fetch(apiUri, this.requestOptions);
            if (!response.ok) {
                console.error(response.status);
                this.resultText = 'APIリクエストがうまくいかなかったみたいです...。';
                return this.resultText;  
            }

            const data = await response.json();
            this.resultText = data.text;

            if(text === ''){
                console.error(error);
                this.resultText = 'テキストが返ってきませんでした...。';
            }
            return this.resultText;

        } catch(error) { 
            console.error(error);
            this.resultText = 'fetchに失敗しました!!';
            return this.resultText;
        }   
    }
}

export default Translate;