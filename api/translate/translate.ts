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
        this.resultText = constInstance.defaultErrorMessage;

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
                throw new Error(`APIリクエストが失敗しました。ステータスコード: ${response.status}`);
            }

            const data = await response.json();
            this.resultText = data.text;

            if(this.resultText === ''){
                throw new Error('テキストが返ってきませんでした。');
            }
            return this.resultText;

        } catch(error: any) { 
            throw new Error(`エラーが発生しました: ${error.message}`);
        }   
    }
}

export default Translate;