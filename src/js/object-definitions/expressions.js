const def = {
	qInfo: {
		qType: 'ValueList'
	},
	things: [
		{qStringExpression: `='There are ' & Count(DISTINCT Style) & ' types of Ramen`},
		`from`,
		{qStringExpression: `=Count(DISTINCT Brand)`},
		`brands`,
		{qStringExpression: `=Count(DISTINCT Countries)`},
		`in`,
		{qValueExpression: `Count(DISTINCT Country)`},
		`countries`
	]
}

export {
    def
}