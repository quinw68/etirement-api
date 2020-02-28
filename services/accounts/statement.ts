import { APIGatewayEvent } from 'aws-lambda';
import * as banking from 'banking';

export const handler = async (event: APIGatewayEvent): Promise<any> => {
    const bank = banking({

    });
    console.log('statement handler');
    console.log(event);
    
    return {
        statusCode: 200,
        body: 'statement'
    }
}