class Table {
    constructor (options) {        
        this.model = options.model
        this.elementId = options.elementId
        this.model.on('changed', this.render.bind(this))
        this.render()
    }
    render () {
        this.model.getLayout().then(layout => {
            let html = `
                <table class='table'>
                    <tr>
            `
            layout.qHyperCube.qDimensionInfo.concat(layout.qHyperCube.qMeasureInfo).forEach(h => {
                html += `<th>${h.qFallbackTitle}</th>`
            })
            html += `</tr>`
            layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {
                html += `<tr>`
                r.forEach(c => {
                    html += `<td class='table-cell'>${c.qText}</td>`
                })
                html += `</tr>`
            })
            html += `</table>`
            document.getElementById(this.elementId).innerHTML = html
        })
    }
}

export default Table