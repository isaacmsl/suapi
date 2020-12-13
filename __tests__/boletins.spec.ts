require('dotenv').config()
import Debug from 'debug'
const debug = new Debug('spec:boletins')

import { SuapiV2 } from '../src/index'
import { expect } from '@jest/globals'

const { MATRICULA, SENHA } = process.env

test('deve retornar os boletins', async () => {
    const authToken: string = await SuapiV2.getAuthToken(String(MATRICULA), String(SENHA))

    const boletins = await SuapiV2.getBoletins(authToken)
    debug(boletins)

    expect(boletins).toBeDefined()
})