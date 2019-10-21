class Hub {
    constructor () {

    }
    connect () {

    }
    render () {

    }
}

function loadHub () {    
    const session = enigma.create({
        url: `${config.qlikUrl}/engineData`,
        schema
    })
    session.open().then(global => {
        global.getDocList().then(docs => {
            document.getElementById('docList').innerHTML = `
                <ul>
                    <li>
                        ${docs.map(d => d.qDocName).join('</li><li>')}
                    </li>
                </ul>
            `
        })        
    })
}