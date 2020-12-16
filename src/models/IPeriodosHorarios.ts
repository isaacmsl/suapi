export interface IHorarioAula {
    inicial: Array<number>,
    final: Array<number>
}

export default interface IPeriodosHorariosV2 {
    M: Array<IHorarioAula>,
    V: Array<IHorarioAula>,
    N: Array<IHorarioAula>
}