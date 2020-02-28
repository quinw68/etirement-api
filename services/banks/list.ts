import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import * as _ from 'lodash';
import * as request from 'superagent';
import * as xml2js from 'xml2js';

interface Bank {
    name: string;
    id: string;
}

export const search = async (event: APIGatewayEvent, context: Context, callback: Callback): Promise<any> => {
    const query = event.queryStringParameters.searchTerm ? {search: event.queryStringParameters.searchTerm} : {all: 'yes'};
    console.log("Query:", query);
    try {
        const searchResults = await request.get('http://www.ofxhome.com/api.php')
            .query(query);

        let banks : Bank[] = [];
        xml2js.parseString(searchResults.text, (error, result) => {
            if (!_.get(result, 'institutionlist.institutionid')) {
                throw ("Invalid Search");
            }
            banks = result.institutionlist.institutionid.map(bank => ({
                name: bank.$.name,
                id: bank.$.id
            }));
        });
        
        return {
            body: JSON.stringify(banks),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            statusCode: 200
        }
    } catch (error) {
        return {
            statusCode: 400,
            headers: {},
            body: 'Invalid request: ' + error
        }
    }
}