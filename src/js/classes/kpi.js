class KPI {
    constructor (options) {        
        this.model = options.model
        this.elementId = options.elementId
        this.attached = true
        this.model.on('changed', this.render.bind(this))
        this.render()
    }
    render () {
        if (this.attached === false) {
            return
        }    
        this.model.getLayout().then(layout => {
            document.getElementById(this.elementId).innerHTML = `
                <div class='text-center'>
                    <h3>${layout.title}</h3>
                    <h1>${layout.value}</h1>
                </div>
            `
        })
    }
}

export default KPI