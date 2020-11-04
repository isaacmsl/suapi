require('dotenv').config()
import Debug from 'debug'
const debug = new Debug('spec:turma-virtual')

import { SuapiV2 } from '../src/index'
import { expect } from '@jest/globals'

const { MATRICULA, SENHA } = process.env

test('deve retornar as turmas virtuais', async () => {
    const authToken: string = await SuapiV2.getAuthToken(String(MATRICULA), String(SENHA))

    const turmaVirtual = await SuapiV2.getTurmaVirtualID(authToken, '68411')
    debug(turmaVirtual)

    expect(turmaVirtual).toBeDefined()
})