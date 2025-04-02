import { intentNPacientes } from './controller/querys.mjs';

export const handler = async (event) => {
    var intent = event.sessionState.intent.name;

    const response = {
        sessionState: {
            dialogAction: {
                type: "Close"
            },
            intent: {
                name: intent,
                state: "Fulfilled"
            }
        },
    };

    if(intent == "NPacientes") {
        var cantidad = event.sessionState.intent.slots.CantidadPacientes.value.originalValue
        var orden = event.sessionState.intent.slots.Orden.value.originalValue

        response.messages = [
            {
                contentType: "PlainText",
                content: `<p>Estos son los datos de los ${orden} pacientes:</p>`
            },
            ...(await intentNPacientes(cantidad, orden))]
    }
    else {
        response.messages = [
            {
                contentType: "PlainText",
                content: "<p>¡No te he entendido, lo siento!</p>"
            }
        ]
    }

    return response;
};