export default interface IDadosAlunoV2 {
    id: string,
    matricula: string,
    nome_usual: string,
    cpf: string,
    rg: string,
    filiacao: Array<string | null>,
    data_nascimento: string,
    naturalidade: string,
    tipo_sanguineo: string,
    email: string,
    url_foto_75x100: string,
    url_foto_150x200: string,
    tipo_vinculo: string,
    vinculo: {
        matricula: string,
        nome: string,
        curso: string,
        campus: string,
        situacao: string,
        cota_sistec: string,
        cota_mec: string,
        situacao_sistemica: string,
        matricula_regular: Boolean,
        linha_pesquisa: string | null,
        curriculo_lattes: string | null
    }
}