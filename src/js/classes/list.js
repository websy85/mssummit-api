class List {
    constructor (options) {        
        this.model = options.model
        this.elementId = options.elementId
        this.model.on('changed', this.render.bind(this))
        this.render()
    }
    render () {
        this.model.getLayout().then(layout => {
            let html = `
                <div class='list-object'>
                    <h5>${layout.qListObject.qDimensionInfo.qFallbackTitle}</h5>
                    <ul class='list-group'>                    
                `
            layout.qListObject.qDataPages[0].qMatrix.forEach(row => {                
                html += `
                    <li class='list-group-item'>${row[0].qText || 'Unknown'}</li>
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

export default List