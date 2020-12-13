import axios from 'axios'

import IDadosAlunoV2 from './models/IDadosAlunoV2'
import ITurmaVirtualLiteV2 from './models/ITurmaVirtualLiteV2'
import ITurmaVirtualV2 from './models/ITurmaVirtualV2'
import IPeriodosHorariosV2 from './models/IPeriodosHorariosV2'
import IHorarioV2 from './models/IHorarioV2'
import IBoletim from './models/IBoletim'

export class SuapiV2 {
    public static BASE_URL: string = 'https://suap.ifrn.edu.br/api/v2/'
    public static RESOURCES_DADOS_PESSOAIS_URL: string = 'minhas-informacoes/meus-dados/'
    public static RESOURCES_TURMAS_VIRTUAIS_URL: string = 'minhas-informacoes/turmas-virtuais'
    public static RESOURCES_TURMA_VIRTUAL_URL: string = 'minhas-informacoes/turma-virtual'
    public static RESOURCES_BOLETIM_URL: string = 'minhas-informacoes/boletim'

    public static PERIODOS_HORARIOS_V2: IPeriodosHorariosV2 = {
        M: [
            '07:00 - 07:45',
            '07:45 - 08:30',
            '08:50 - 09:35',
            '09:35 - 10:20',
            '10:30 - 11:15',
            '11:15 - 12:00'
        ],
        V: [
            '13:00 - 13:45',
            '13:45 - 14:30',
            '14:40 - 15:25',
            '15:25 - 16:10',
            '16:30 - 17:15',
            '17:15 - 18:00'
        ],
        N: [
            '19:00 - 19:45',
            '19:45 - 20:30',
            '20:40 - 21:25',
            '21:25 - 22:10'
        ]
    }


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

    public static async getHorarios(authToken: string, ano: Number = 2020, periodo: Number = 1): Promise<Array<IHorarioV2>> {
        try {
            const TURMAS_VIRTUAIS_URL = `${SuapiV2.RESOURCES_TURMAS_VIRTUAIS_URL}/${ano}/${periodo}`
            const turmasVirtuais: Array<ITurmaVirtualLiteV2> = await SuapiV2.getByAuthorization(
                TURMAS_VIRTUAIS_URL, 
                authToken
            )

            const horarios: Array<IHorarioV2> = []

            turmasVirtuais.forEach(turmaVirtual => {
                const { horarios_de_aula } = turmaVirtual

                const horariosSplitted: Array<string> = horarios_de_aula.split('/')

                horariosSplitted.forEach(horario => {
                    const indexes = horario.split('')
                    const dia = Number(indexes[0])
                    const periodo = indexes[1]

                    for (let i = 2; i < indexes.length; i++) {
                        horarios.push({
                            disciplina: turmaVirtual.descricao,
                            dia,
                            horario: SuapiV2.PERIODOS_HORARIOS_V2[periodo][i]
                        })
                    }
                })
            })

            return horarios
        } catch (error) {
            throw error
        }
    }

    public static async getBoletins(authToken: string, ano: Number = 2020, periodo: Number = 1): Promise<Array<IBoletim>> {
        try {
            const BOLETIM_URL = `${SuapiV2.RESOURCES_BOLETIM_URL}/${ano}/${periodo}`
            const boletins: Array<IBoletim> = await SuapiV2.getByAuthorization(
                BOLETIM_URL, 
                authToken
            )

            return boletins
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