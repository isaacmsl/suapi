require('dotenv').config()
import Debug from 'debug'
const debug = new Debug('spec:periodos-letivos')

import { SuapiV2 } from '../src/index'
import { expect } from '@jest/globals'

const { MATRICULA, SENHA } = process.env

test('deve retornar os periodos letivos', async () => {
    const authToken: string = await SuapiV2.getAuthToken(String(MATRICULA), String(SENHA))

    const periodosLetivos = await SuapiV2.getPeriodosLetivos(authToken)
    debug(periodosLetivos)

    expect(periodosLetivos).toBeDefined()
})