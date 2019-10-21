class KPI {
    constructor (options) {        
        this.model = options.model
        this.elementId = options.elementId
        this.model.on('changed', this.render.bind(this))
        this.render()
    }
    render () {
        this.model.getLayout().then(layout => {
            
        })
    }
}

export default KPI