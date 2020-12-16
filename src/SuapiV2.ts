import axios from 'axios'

import IDadosAlunoV2 from './models/IDadosAlunoV2'
import ITurmaVirtualLiteV2 from './models/ITurmaVirtualLiteV2'
import ITurmaVirtualV2 from './models/ITurmaVirtualV2'
import IHorarioV2 from './models/IHorarioV2'
import IPeriodoLetivo from './models/IPeriodoLetivo'
import IBoletim from './models/IBoletim'

import PERIODOS_HORARIOS from './PeriodosHorarios'

export class SuapiV2 {
    public static BASE_URL: string = 'https://suap.ifrn.edu.br/api/v2/'
    public static RESOURCES_DADOS_PESSOAIS_URL: string = 'minhas-informacoes/meus-dados/'
    public static RESOURCES_TURMAS_VIRTUAIS_URL: string = 'minhas-informacoes/turmas-virtuais'
    public static RESOURCES_TURMA_VIRTUAL_URL: string = 'minhas-informacoes/turma-virtual'
    public static RESOURCES_PERIODOS_LETIVOS_URL: string = 'minhas-informacoes/meus-periodos-letivos'
    public static RESOURCES_BOLETIM_URL: string = 'minhas-informacoes/boletim'

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

    public static async getPeriodosLetivos(authToken: string): Promise<Array<IPeriodoLetivo>> {
        try {
            const PERIODOS_LETIVOS_URL = `${SuapiV2.RESOURCES_PERIODOS_LETIVOS_URL}`
            return await SuapiV2.getByAuthorization(
                PERIODOS_LETIVOS_URL,
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

                    let posHorario = 0
                    for (let i = 2; i < indexes.length; i++) {
                        posHorario = Number(indexes[i]) - 1
                        horarios.push({
                            disciplina: turmaVirtual.descricao,
                            dia,
                            horario: PERIODOS_HORARIOS[periodo][posHorario]
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
