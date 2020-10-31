require('dotenv').config()

import { SuapiV2 } from '../src/index'
import { expect } from '@jest/globals'

const { MATRICULA, SENHA } = process.env

test('deve retornar os dados pessoais', async () => {
    const authToken: string = await SuapiV2.getAuthToken(String(MATRICULA), String(SENHA))
    const dadosPessoais = await SuapiV2.getDadosPessoais(authToken)
    expect(dadosPessoais).toBeDefined()
})