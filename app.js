const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MySQLAdapter = require('@bot-whatsapp/database/mysql')

const MYSQL_DB_HOST = 'localhost'
const MYSQL_DB_USER = 'root'
const MYSQL_DB_PASSWORD = ''
const MYSQL_DB_NAME = 'bot'
const MYSQL_DB_PORT = '3306'


const flowAdios = addKeyword(
    ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
    ).addAnswer(
    '❤ Gracias por contactarte, te brindaremos una respuesta dentro de las próximas 24hs.',
    'Tu salud nos interesa❤.'
)

const barrio = addKeyword(['1', 'uno','2','dos','3','tres','4','cuatro']).addAnswer(
    ['🏠 ¿En que barrio y calle vivis?'],
    null,
    null,
    [flowAdios]
)

const flowHorario = addKeyword(['1', 'uno','2','dos','3','tres','4','cuatro']).addAnswer(
    [
        '🕐¿En que horario te podemos contactar? \n',
        '🌅 *1*.  Cualquier hora',
        '⏰ *2*.   Mañana',
        '🌞 *3*.   Tarde',
        '🌜 *4*.   Noche',
    ],    
    null,
    null,
    [barrio]
)

const flowFiebre = addKeyword(['1', 'uno', 'Siento Fiebre']).addAnswer(
    [
        '🌡 ¿Desde Cuando tenes Fiebre? \n',
        '✍🏼 *1*.  24hs',
        '✍🏼 *2*.  2 dias',
        '✍🏼 *3*.  3 dias',
        '✍🏼 *4*.  Mas de 5 dias',
    ],    
    null,
    null,
    [flowHorario]
)

const flowSecundario = addKeyword('Menu').addAnswer(
    [
        'Escribe el numero: \n',
        '🌡 *1*.  Siento Fiebre',
        '💧 *2*.  Me Siento Triste',
        '💊 *3*.  Necesito Medicamentos'
    ],
    null,
    null,
    [flowFiebre]
)


const flowPrincipal = addKeyword(['hola', 'buen dia', 'hol', 'holis']).addAnswer(
    [
        'Hola! Soy tu guía virtual de salud? 🩺',
        'Contame, En que Podemos ayudarte?',
        '\n ✍🏼 Si queres conocer las Opciones de consultas escribi *Menu*'
    ],
    null,
    null,
    [flowSecundario]   
)


const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
