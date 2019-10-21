const def = {
	qInfo: {
		qType: 'MultiTable'
    },
    tables: [
        {
            qHyperCubeDef: {
                qDimensions: [
                    { qDef: { qFieldDefs: ['Country'] } },            
                ],
                qMeasures: [
                    { qDef: { qDef: 'avg(Stars)', qLabel: 'Average Rating' }, qSortBy: { qSortByNumeric: -1 } }
                ],    
                qInitialDataFetch: [
                    { qTop: 0, qLeft: 0, qWidth: 2, qHeight: 10 }
                ],
                qInterColumnSortOrder: [1]
            }
        },
        {
            qHyperCubeDef: {
                qDimensions: [
                    { qDef: { qFieldDefs: ['Style'] } },            
                ],
                qMeasures: [
                    { qDef: { qDef: 'avg(Stars)', qLabel: 'Average Rating' }, qSortBy: { qSortByNumeric: -1 } }
                ],    
                qInitialDataFetch: [
                    { qTop: 0, qLeft: 0, qWidth: 2, qHeight: 10 }
                ],
                qInterColumnSortOrder: [1]
            }
        }
    ]	
}

export {
    def
}