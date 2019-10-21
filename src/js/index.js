import config from './config'
import schema from './qlikSchema'
import { loadView, hideView } from './views'
import { qix } from './classes/qix'
import * as styles from '../less/main.less'

window.navController

const selections = [
    {
        field: 'Style',
        values: ['Bar', 'Box', 'Pack', 'Bowl']
    },
    {
        field: 'Country',
        values: ['Japan', 'Taiwan', 'USA', 'India', 'Malaysia']
    }
]
qix.connect(selections).then(() => {
    const options = {    
        defaultView: 'hub'
    }
    window.navController = new WebsyNavigator(options)
    let globalSession
    window.navController.subscribe('show', (view, params) => {  
        loadView(view, params)        
    })
    window.navController.subscribe('hide', view => {
        
    })
    window.navController.init()            
})

function getRequest (url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {				
				resolve(xhr.responseText)
			}			
		}
		xhr.open('GET', url, true)
		xhr.send()
	})
}