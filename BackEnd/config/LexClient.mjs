import dotenv from 'dotenv';
import { LexRuntimeV2Client } from '@aws-sdk/client-lex-runtime-v2';

dotenv.config();

const lexClient = new LexRuntimeV2Client({
    region: process.env.AWS_LEX_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

export default lexClient;