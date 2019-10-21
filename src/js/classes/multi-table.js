class MultiTable {
    constructor (options) {        
        this.model = options.model
        this.elementId = options.elementId
        this.attached = true
        this.model.on('changed', this.render.bind(this))
        const el = document.getElementById(this.elementId)
        el.addEventListener('click', this.handleClick.bind(this))
        this.render()
    }
    handleClick (event) {
        if (event.target.classList.contains('table-cell')) {
            const eNum = event.target.getAttribute('data-enum')
            const col = event.target.getAttribute('data-col')
            const tableIndex = event.target.getAttribute('data-table')
            this.model.selectHyperCubeValues(`/tables/${+tableIndex}/qHyperCubeDef`, +col, [+eNum], true)
        }
    }
    render () {
        if (this.attached === false) {
            return
        }    
        this.model.getLayout().then(layout => {
            let html = '<div class="row">'
            layout.tables.forEach((t, tIndex) => {
                html += `
                    <div class="col">
                        <table class='table'>
                            <tr>
                `
                t.qHyperCube.qDimensionInfo.concat(t.qHyperCube.qMeasureInfo).forEach(h => {
                    html += `<th>${h.qFallbackTitle}</th>`
                })
                html += `</tr>`
                t.qHyperCube.qDataPages[0].qMatrix.forEach(r => {
                    html += `<tr>`
                    r.forEach((c, i) => {
                        html += `<td class='table-cell' data-enum='${c.qElemNumber}' data-col='${i}' data-table='${tIndex}'>${c.qText}</td>`
                    })
                    html += `</tr>`
                })
                html += `
                        </table>
                    </div>
                `
            })    
            html += "</div>"        
            document.getElementById(this.elementId).innerHTML = html
        })
    }
}

export default MultiTable