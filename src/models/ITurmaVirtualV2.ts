export interface IParticipanteV2 {
    foto: string,
    nome: string,
    matricula: string,
    email: string
}

export interface IAulaV2 {
    data: string,
    etapa: Number,
    quantidade: Number,
    faltas: Number,
    professor: string,
    conteudo: string
}

export interface IMaterialAulaV2 {
    url: string,
    descricao: string,
    data_vinculacao: string
}

export default interface ITurmaVirtualV2 {
    id: Number,
    sigla: string,
    periodo_letivo: string,
    componente_curricular: string,
    professores: Array<IParticipanteV2 | null>
    locais_de_aula: Array<string | null>,
    data_inicio: string,
    data_fim: string,
    participantes: Array<IParticipanteV2 | null>
    aulas: Array<IAulaV2 | null>,
    materiais_de_aula: Array<IMaterialAulaV2 | null>,
}