const def = {
	qInfo: {
		qType: 'CyclicTable'
	},
	qHyperCubeDef: {
        qDimensions: [
            { qDef: { qFieldDefs: ['Brand', 'Style', 'Country'], qGrouping: 'C' } },            
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
    def
}