import axios from 'axios'

import IDadosAlunoV2 from './models/IDadosAlunoV2'

export class SuapiV2 {
    public static BASE_URL: string = 'https://suap.ifrn.edu.br/api/v2/'
    public static RESOURCES_DADOS_PESSOAIS_URL: string = 'minhas-informacoes/meus-dados/'

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
            const response = await axios({
                baseURL: SuapiV2.BASE_URL,
                url: SuapiV2.RESOURCES_DADOS_PESSOAIS_URL,
                params: { format: 'json' },
                headers: {
                    Authorization: authToken
                }
            })

            return response.data
        } catch (error) {
            throw error
        }
    }
}