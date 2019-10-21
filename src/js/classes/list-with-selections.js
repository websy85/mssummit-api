class ListWithSelections {
    constructor (options) {        
        this.model = options.model
        this.elementId = options.elementId
        this.model.on('changed', this.render.bind(this))
        this.attached = true
        const el = document.getElementById(this.elementId)
        el.addEventListener('click', this.handleClick.bind(this))
        this.render()
    }
    handleClick (event) {
        if (event.target.classList.contains('list-group-item')) {
            const eNum = event.target.getAttribute('data-enum')
            this.model.selectListObjectValues('/qListObjectDef', [+eNum], true)
        }
    }
    render () {
        if (this.attached === false) {
            return
        }    
        this.model.getLayout().then(layout => {
            let html = `
                <div class='list-object'>
                    <h5>${layout.qListObject.qDimensionInfo.qFallbackTitle}</h4>
                    <ul class='list-group'>                    
                `
            layout.qListObject.qDataPages[0].qMatrix.forEach(row => {                
                html += `
                    <li class='list-group-item state-${row[0].qState}' data-enum='${row[0].qElemNumber}'>${row[0].qText || 'Unknown'}</li>
                `
            })
            html += `
                    <ul>
                </div>
            `
            document.getElementById(this.elementId).innerHTML = html
        })
    }
}

export default ListWithSelections