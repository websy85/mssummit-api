class ValueList {
    constructor (options) {        
        this.model = options.model
        this.elementId = options.elementId
        this.model.on('changed', this.render.bind(this))
        this.render()
    }
    render () {
        this.model.getLayout().then(layout => {            
            document.getElementById(this.elementId).innerHTML = layout.things.map(item => `<li class='list-group-item'>${item}</li>`).join('')
        })
    }
}

export default ValueList