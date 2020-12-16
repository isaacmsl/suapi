import IPeriodosHorarios from './models/IPeriodosHorarios'

const PERIODOS_HORARIOS: IPeriodosHorarios = {
    M: [
        { inicial: [7,0], final: [7,45] },
        { inicial: [7,45], final: [8,30] },
        { inicial: [8,50], final: [9,35] },
        { inicial: [9,35], final: [10,20] },
        { inicial: [10,30], final: [11,15] },
        { inicial: [11,15], final: [12,0] }
    ],
    V: [
        { inicial: [13,0], final: [13,45] },
        { inicial: [13,45], final: [14,30] },
        { inicial: [14,50], final: [15,35] },
        { inicial: [15,35], final: [16,20] },
        { inicial: [16,30], final: [17,15] },
        { inicial: [17,15], final: [18,0] }
    ],
    N: [
        { inicial: [19,0], final: [19,45] },
        { inicial: [19,45], final: [20,30] },
        { inicial: [20,40], final: [21,25] },
        { inicial: [21,25], final: [22,10] },
        { inicial: [17,15], final: [18,0] }
    ]
}

export default PERIODOS_HORARIOS