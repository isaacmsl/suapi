import axios from 'axios'

import IDadosAlunoV2 from './models/IDadosAlunoV2'
import ITurmaVirtualLiteV2 from './models/ITurmaVirtualLiteV2'
import ITurmaVirtualV2 from './models/ITurmaVirtualV2'

export class SuapiV2 {
    public static BASE_URL: string = 'https://suap.ifrn.edu.br/api/v2/'
    public static RESOURCES_DADOS_PESSOAIS_URL: string = 'minhas-informacoes/meus-dados/'
    public static RESOURCES_TURMAS_VIRTUAIS_URL: string = 'minhas-informacoes/turmas-virtuais'
    public static RESOURCES_TURMA_VIRTUAL_URL: string = 'minhas-informacoes/turma-virtual'


    /**
     * 
     * Tenta autenticar um usuário na API do SUAP V2 e retornar o token de autorização
     * 
     * @param matricula 
     * @param senha 
     */
    public static async getAuthToken(matricula: string, senha: string): Promise<string> {
        try {
            const response = await axios({
                method: 'POST',
                baseURL: SuapiV2.BASE_URL,
                url: 'autenticacao/token/',
                params: { format: 'json' },
                data: {
                    username: matricula,
                    password: senha
                }
            })

            return `JWT ${response.data.token}`
        } catch (error) {
            throw error
        }   
    }

    public static async getDadosPessoais(authToken: string): Promise<IDadosAlunoV2> {
        try {
            return await SuapiV2.getByAuthorization(
                SuapiV2.RESOURCES_DADOS_PESSOAIS_URL, 
                authToken
            )
        } catch (error) {
            throw error
        }
    }

    public static async getTurmasVirtuais(authToken: string, ano: number = 2020, periodo: number = 1): Promise<Array<ITurmaVirtualLiteV2>> {
        try {
            const TURMAS_VIRTUAIS_URL = `${SuapiV2.RESOURCES_TURMAS_VIRTUAIS_URL}/${ano}/${periodo}`
            return await SuapiV2.getByAuthorization(
                TURMAS_VIRTUAIS_URL,
                authToken
            )
        } catch (error) {
            throw error
        }
    }

    public static async getTurmaVirtualID(authToken: string, id: string): Promise<ITurmaVirtualV2> {
        try {
            const TURMA_VIRTUAL_URL = `${SuapiV2.RESOURCES_TURMA_VIRTUAL_URL}/${id}`
            return await SuapiV2.getByAuthorization(
                TURMA_VIRTUAL_URL,
                authToken
            )
        } catch (error) {
            throw error
        }
    }

    public static async getByAuthorization(url: string, authToken: string) {
        const response = await axios({
            baseURL: SuapiV2.BASE_URL,
            url: url,
            params: { format: 'json' },
            headers: {
                Authorization: authToken
            }
        })

        return response.data
    }
}