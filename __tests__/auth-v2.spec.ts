require('dotenv').config()
import Debug from 'debug'
const debug = new Debug('spec:auth-v2')

import { SuapiV2 } from '../src/index'
import { expect } from '@jest/globals'

const { MATRICULA, SENHA } = process.env

test('deve retornar um token de autorização', async () => {
    const authToken = await SuapiV2.getAuthToken(String(MATRICULA), String(SENHA))
    debug(authToken)
    expect(authToken).toBeDefined()
})