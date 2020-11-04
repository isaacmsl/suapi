require('dotenv').config()
import Debug from 'debug'
const debug = new Debug('spec:turmas-virtuais')

import { SuapiV2 } from '../src/index'
import { expect } from '@jest/globals'

const { MATRICULA, SENHA } = process.env

test('deve retornar as turmas virtuais', async () => {
    const authToken: string = await SuapiV2.getAuthToken(String(MATRICULA), String(SENHA))

    const turmasVirtuais = await SuapiV2.getTurmasVirtuais(authToken)
    debug(turmasVirtuais)

    expect(turmasVirtuais).toBeDefined()
})