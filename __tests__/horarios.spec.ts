require('dotenv').config()
import Debug from 'debug'
const debug = new Debug('spec:horarios')

import { SuapiV2 } from '../src/index'
import { expect } from '@jest/globals'

const { MATRICULA, SENHA } = process.env

test('deve retornar os horarios', async () => {
    const authToken: string = await SuapiV2.getAuthToken(String(MATRICULA), String(SENHA))

    const horarios = await SuapiV2.getHorarios(authToken)
    debug(horarios)

    expect(horarios).toBeDefined()
})