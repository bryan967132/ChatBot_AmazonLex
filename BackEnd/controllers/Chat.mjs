import { RecognizeTextCommand } from '@aws-sdk/client-lex-runtime-v2';
import lexClient from '../config/LexClient.mjs';

export const chatWithLex = async (req, res) => {
    try {
        const { message } = req.body;

        const params = {
            botId: process.env.AWS_LEX_ID,
            botAliasId: process.env.AWS_LEX_ALIAS_ID,
            localeId: process.env.AWS_LEX_LOCALEID,
            sessionId: 'defaultSession',
            text: message
        };

        const command = new RecognizeTextCommand(params);
        const response = await lexClient.send(command);

        const { sessionState, messages } = response;

        res.json({ sessionState, messages });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error comunicándose con Lex' });
    }
};