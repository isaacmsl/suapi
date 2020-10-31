require('dotenv').config()

import { SuapiV2 } from '../src/index'
import { expect } from '@jest/globals'

const { MATRICULA, SENHA } = process.env

test('deve retornar um token de autorização', async () => {
    const authToken = await SuapiV2.getAuthToken(String(MATRICULA), String(SENHA))
    expect(authToken).toBeDefined()
})