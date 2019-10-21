import * as d3 from '../../../node_modules/d3'

class BarChart {
    constructor (options) {        
        this.model = options.model
        this.elementId = options.elementId
        this.model.on('changed', this.render.bind(this))
        this.render()
    }
    render () {        
        this.model.getLayout().then(layout => {
            this.margin = { bottom: 100, left: 50 }
            let el = document.getElementById(this.elementId)
            el.innerHTML = ''
            if (el) {
                this.width = el.clientWidth
                this.height = el.clientHeight
                const svg = d3.select(el).append('svg').attr('width', this.width).attr('height', this.height)
                this.xArea = svg.append('g')                
                    .attr('transform', `translate(${this.margin.left},${this.height - this.margin.bottom})`)
                this.yArea = svg.append('g')                
                    .attr('transform', `translate(${this.margin.left},0)`)
                this.barArea = svg.append('g').attr('class', 'bar-chart')
                    .attr('transform', `translate(${this.margin.left},0)`)
                let xScale = d3.scaleBand()
                                .range([0, this.width - this.margin.left])
                                .domain(layout.qHyperCube.qDataPages[0].qMatrix.map(r => r[0].qText))
                let yScale = d3.scaleLinear()
                                .range([this.height - this.margin.bottom, 0]).domain([layout.qHyperCube.qMeasureInfo[0].qMin, layout.qHyperCube.qMeasureInfo[0].qMax])              
                this.xArea.call(d3.axisBottom(xScale))
                this.yArea.call(d3.axisLeft(yScale))
                this.barArea.selectAll('.bar')
                            .data(layout.qHyperCube.qDataPages[0].qMatrix)
                            .enter().append('rect').attr('class', 'bar')        
                            .attr('width', (this.width / layout.qHyperCube.qDataPages[0].qArea.qHeight) - 30)    
                            .attr('x', d => xScale(d[0].qText) + 15)
                            .attr('y', d => yScale(d[1].qNum))    
                            .attr('height', d => this.height - this.margin.bottom - yScale(d[1].qNum))
                            .style('fill', '#ffaa00')
                            .on('click', d => this.model.selectHyperCubeValues('/qHyperCubeDef', 0, [d[0].qElemNumber], true))
            }
        })
    }
}

export default BarChart
