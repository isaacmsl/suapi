export default interface ITurmaVirtualLiteV2 {
    id: string,
    sigla: string,
    descricao: string,
    observacao: string | null,
    locais_de_aula: Array<string | null>,
    horarios_de_aula: string
}