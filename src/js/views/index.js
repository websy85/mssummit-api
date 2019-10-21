import { qix, Qix } from '../classes/qix'
import config from '../config'
import schema from '../qlikSchema'
import objectStore from '../object-store'
import * as Classes from '../classes'
import Defs from '../object-definitions'

const views = {
    expressions: [
        {
            elementId: 'expressions',
            def: Defs.expressions.expressionsDef
        }
    ],
    listobjects: [
        {
            elementId: 'listobjects',
            def: Defs.listobjects.listobjectsDef
        }
    ],
    hypercubes: [
        {
            elementId: 'hypercubes',
            def: Defs.hypercubes.hypercubeDef
        }
    ],
    selecting: [
        {
            elementId: 'selecting_listobjects',
            def: Defs.selecting.selecting_listobjectDef
        },
        {
            elementId: 'selecting_hypercubes',
            def: Defs.selecting.selecting_hypercubeDef
        }
    ],
    currentselections: [
        {
            elementId: 'currentselections',
            def: Defs.currentselections.currentselectionsDef
        },
        {
            elementId: 'currentselections_listobjects',
            def: Defs.selecting.selecting_listobjectDef
        },
        {
            elementId: 'currentselections_hypercubes',
            def: Defs.selecting.selecting_hypercubeDef
        }
    ],
    multihypercubes: [
        {
            elementId: 'multihypercubes',
            def: Defs.multihypercubes.multihypercubeDef
        }
    ],
    cyclicgroup: [
        {
            elementId: 'cyclicgroup',
            def: Defs.cyclicgroup.cyclicgroupDef
        }
    ],
    d3: [
        {
            elementId: 'd3',
            def: Defs.d3.d3Def
        }
    ]
}

function loadView (view, params) {
    if (view === 'hub') {
        loadHub()
        return
    }
    if (view === 'gettablesandkeys') {
        loadgettablesandkeys(params)
        return
    }
    if (!objectStore[view]) {
        objectStore[view] = {}
    }
    if (views[view]) {
        views[view].forEach(o => {
            if (!objectStore[view][o.elementId]) {
                qix.app.createSessionObject(o.def).then(model => {
                    objectStore[view][o.elementId] = new Classes[o.def.qInfo.qType]({model, elementId: o.elementId})
                })
            }
            else {
                objectStore[view][o.elementId].attached = true
                objectStore[view][o.elementId].render()
            }
        })
    }    
}
function hideView (view) {
    if (views[view]) {
        views[view].forEach(o => {
            if (objectStore[view][o.elementId]) {
                objectStore[view][o.elementId].attached = false
            }
        })
    }    
}
function loadHub () {        
    qix.global.getDocList().then(docs => {
        const el = document.getElementById('docList')
        el.innerHTML = docs.map(d => `
            <div class="col-3">
                <div class="card">
                    <div class="card-body trigger-item" data-view="gettablesandkeys?app=${d.qDocName}">
                        ${d.qDocName}
                    </div>
                </div>
            </div>
        `).join('')
        window.navController.registerElements(el)                              
    })    
}
function loadgettablesandkeys (params) {
    console.log(params)
    
    const session = enigma.create({
        url: config.qlikUrl + params.items.app,
        schema
    })
    session.open().then(global => global.openDoc(params.items.app)).then(app => {
        console.log(app)        
        app.getTablesAndKeys({qcx: 1, qcy: 1}, {qcx: 1, qcy: 1}, 30, true, true).then(data => {
            console.log(data);
            
            let html = `
                <h3>${app.id}</h3>                
                <table class='table'>
            `
            data.qtr.forEach(r => {
                html += `<tr>                
                    <td>${r.qName}</td><td>${r.qNoOfRows} rows</td><td>                    
                `
                r.qFields.forEach(f => {                    
                    html += `<div>${f.qName}</div>`           
                })    
                html += `</td></tr>`            
            })
            html += `</table>`
            document.getElementById('gettablesandkeys').innerHTML = html
        })
    })    
}

export {
    loadView,
    hideView
}