class CurrentSelections {
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
            document.getElementById(this.elementId).innerHTML = 
                layout.qSelectionObject.qSelections.map(s => `
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body">
                                <h5>${s.qField}</h5><h6>${s.qSelected}</h6>
                            </div>
                        </div>
                    </div>                    
                `).join('')		 
        })
    }
}

export default CurrentSelections