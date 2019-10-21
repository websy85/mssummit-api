const def1 = {
	qInfo: {
		qType: 'ListWithSelections'
	},
	qListObjectDef: {
        qDef: { qFieldDefs: ['Style'] },        
        qInitialDataFetch: [
			{ qTop: 0, qLeft: 0, qWidth: 1, qHeight: 100 }
		]
    }
}

const def2 = {
	qInfo: {
		qType: 'TableWithSelections'
	},
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
}

export {
    def1,
    def2
}