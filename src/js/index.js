import * as styles from '../less/main.less'
import { request } from 'http'

window.navController

const options = {    
    defaultView: 'hub'
}
window.navController = new WebsyNavigator(options)
window.navController.subscribe('show', (view, params) => {  
    
})
window.navController.subscribe('hide', view => {
    
})
window.navController.init()

function createApp () {
    const name = document.getElementById('newAppName').value
    getRequest(`/createapp/${name}`).then(response => {
        
    })
}

window.createApp = createApp

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