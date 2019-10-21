class CyclicTable {
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
            this.model.selectHyperCubeValues('/qHyperCubeDef', +col, [+eNum], true)
        }
        if (event.target.classList.contains('btn')) {
            this.cyclePos < this.cycleCount - 1 ? this.cyclePos++ : this.cyclePos = 0            
            this.model.applyPatches([{
                qOp: 'replace',
                qPath: '/qHyperCubeDef/qDimensions/0/qDef/qActiveField',
                qValue: JSON.stringify(this.cyclePos)
            }])
        }
    }
    render () {
        if (this.attached === false) {
            return
        }
        this.model.getLayout().then(layout => {
            this.cyclePos = layout.qHyperCube.qDimensionInfo[0].qGroupPos
		    this.cycleCount = layout.qHyperCube.qDimensionInfo[0].qGroupFieldDefs.length
            let html = `
                <button class="btn btn-success">Cycle</button>
                <table class='table'>
                    <tr>
            `
            layout.qHyperCube.qDimensionInfo.concat(layout.qHyperCube.qMeasureInfo).forEach(h => {
                html += `<th>${h.qFallbackTitle}</th>`
            })
            html += `</tr>`
            layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {
                html += `<tr>`
                r.forEach((c, i) => {
                    html += `<td class='table-cell' data-enum='${c.qElemNumber}' data-col='${i}'>${c.qText}</td>`
                })
                html += `</tr>`
            })
            html += `</table>`
            document.getElementById(this.elementId).innerHTML = html
        })
    }
}

export default CyclicTable