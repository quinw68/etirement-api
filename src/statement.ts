import { APIGatewayEvent } from 'aws-lambda';
const Banking = require('banking');

export const handler = async (event: APIGatewayEvent): Promise<any> => {
    const bank = Banking({

    });
    console.log('statement handler');
    console.log(event);
    
    return {
        statusCode: 200,
        body: 'statement'
    }
}