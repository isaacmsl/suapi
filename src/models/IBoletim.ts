import INotaEtapa from './INotaEtapa'

export default interface IBoletim {
    codigo_diario: string,
    disciplina: string,
    segundo_semestre: number,
    carga_horaria: number,
    carga_horaria_cumprida: number,
    numero_faltas: number,
    percentual_carga_horaria_frequentada: number,
    situacao: string,
    quantidade_avaliacoes: number,
    nota_etapa_1: INotaEtapa,
    nota_etapa_2: INotaEtapa,
    nota_etapa_3: INotaEtapa,
    nota_etapa_4: INotaEtapa,
    media_disciplina: number | null,
    nota_avaliacao_final: INotaEtapa,
    media_final_disciplina: string | null
}