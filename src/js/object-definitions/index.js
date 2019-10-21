import { def as expressionsDef } from './expressions'
import { def as listobjectsDef } from './listobjects'
import { def as hypercubeDef } from './hypercubes'
import { def1 as selecting_listobjectDef, def2 as selecting_hypercubeDef } from './selecting'
import { def as currentselectionsDef } from './currentselections'
import { def as multihypercubeDef } from './multihypercubes'
import { def as cyclicgroupDef } from './cyclicgroup'
import { def as d3Def } from './d3'

const Defs = {
    expressions: {
        expressionsDef
    },
    listobjects: {
        listobjectsDef
    },
    hypercubes: {
        hypercubeDef
    },
    selecting: {
        selecting_listobjectDef,
        selecting_hypercubeDef
    },
    currentselections: {
        currentselectionsDef
    },
    multihypercubes: {
        multihypercubeDef
    },
    cyclicgroup: {
        cyclicgroupDef
    },
    d3: {
        d3Def
    }
}

export default Defs