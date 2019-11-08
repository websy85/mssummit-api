import * as d3 from "d3";

class Bar {
  constructor(options) {
    /*
      model: enigma model with a HyperCube to render
      node: DOM element to render into
    */
    this.model = options.model;
    this.node = options.node;

    this.model.getLayout().then(layout => {
      this.render(layout);
    });

    this.model.on("changed", () => {
      this.model.getLayout().then(layout => {
        this.render(layout);
      });
    });
  }

  render(layout) {
    const model = this.model;
    const data = layout.qHyperCube.qDataPages[0].qMatrix;
    console.log(layout);
    console.log(data);
    const myNode = d3.select(this.node);

    myNode.html("");

    const width = 500;
    const height = 300;

    const margin = {
      top: 10,
      left: 50,
      bottom: 30,
      right: 0
    };

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const yScale = d3
      .scaleLinear()
      .domain([0, layout.qHyperCube.qMeasureInfo[0].qMax])
      .range([plotHeight, 0]);

    const yAxis = d3.axisLeft().scale(yScale);

    const dimensionValues = data.map(function(row) {
      const dimCell = row[0];
      return dimCell.qText;
    });

    const xScale = d3
      .scaleBand()
      .domain(dimensionValues)
      .range([0, plotWidth])
      .padding(0.2);

    const xAxis = d3.axisBottom().scale(xScale);

    const svg = myNode
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    // .style("border", "1px solid black");

    const plotG = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxisG = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top + plotHeight})`)
      .call(xAxis);

    const yAxisG = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    const bars = plotG
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", xScale.bandwidth())
      .attr("height", function(row) {
        const measureCell = row[1];
        const yOffset = yScale(measureCell.qNum);
        return plotHeight - yOffset;
      })
      .attr("y", function(row) {
        const measureCell = row[1];
        return yScale(measureCell.qNum);
      })
      .attr("x", function(d, i) {
        const dimCell = d[0];
        return xScale(dimCell.qText);
      })
      .attr("fill", "steelblue")
      .on("click", row => {
        const dimCell = row[0];
        const elemsToSelect = [dimCell.qElemNumber];

        this.model.selectHyperCubeValues(
          "/qHyperCubeDef",
          0,
          elemsToSelect,
          true
        );
      });
  }
}

export { Bar };
