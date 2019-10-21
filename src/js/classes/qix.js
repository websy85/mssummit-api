import config from '../config'
import schema from '../qlikSchema'

class Qix {
    constructor (options) {        
        this.appId = options.app
        this.global
        this.app       
    }
    connect (selections) {
        return new Promise((resolve, reject) => {            
            const session = enigma.create({
                url: `${config.qlikUrl}/${this.appId ? this.appId : 'engineData'}`,
                schema
            })
            return session.open().then(global => {
                this.global = global
                if (this.appId) {
                    return global.openDoc(this.appId).then(app => {
                        this.app = app
                        if (selections) {
                            const selectionPromises = selections.map(s => {
                                return this.app.getField(s.field).then(f => f.selectValues(s.values.map(v => ({qText: v}))))
                            })
                            return Promise.all(selectionPromises).then(() => {
                                resolve()
                            })
                        }
                        else {
                            resolve()
                        }
                    })
                }
                else {
                    resolve()
                }
            })     
        })        
    }
}

const qix = new Qix({app: config.mainApp})

export {
    Qix,
    qix
}