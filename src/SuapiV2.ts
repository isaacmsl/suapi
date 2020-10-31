import axios from 'axios'

export class SuapiV2 {
    public static BASE_URL: string = 'https://suap.ifrn.edu.br/api/v2/'

    /**
     * 
     * Tenta autenticar um usuário na API do SUAP V2 e retornar o token de autorização
     * 
     * @param matricula 
     * @param senha 
     */
    public static async getAuthToken(matricula: string, senha: string): Promise<String> {
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

            return new String(response.data.token)
        } catch (error) {
            throw error
        }   
    }
}