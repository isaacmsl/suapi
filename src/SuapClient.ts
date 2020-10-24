import axios from 'axios'

export class SuapClient {
    #token: string
    #matricula: string
    #senha: string
    
    static BASE_URL: string = 'https://suap.ifrn.edu.br/api/v2/'

    constructor(matricula: string, senha: string) {
        this.#matricula = matricula
        this.#senha = senha
    }

    async autenticar(): Promise<string> {
        try {
            const response = await axios({
                method: 'POST',
                baseURL: SuapClient.BASE_URL,
                url: 'autenticacao/token/',
                params: { format: 'json' },
                data: {
                    username: this.#matricula,
                    password: this.#senha
                }
            })

            return response.data.token
        } catch (error) {
            return error
        }   
    }

    getToken() { return this.#token }
    setToken(token: string) { this.#token = token }
}