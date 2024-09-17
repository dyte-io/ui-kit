// import { Component, h, Host, Element, Prop, State } from '@stencil/core';
// import { select } from 'd3-selection';
// import { scaleLinear as scale, scaleTime } from 'd3-scale';
// import { area } from 'd3-shape';
// import * as d3 from 'd3';

// export interface ChartConfig {
//   height: number;
//   width: number;
//   marginTop: number;
//   marginBottom: number;
//   marginLeft: number;
//   marginRight: number;
//   maxX?: number;
//   minX?: number;
//   maxY?: number;
//   minY?: number;
// }

// @Component({
//   tag: 'dyte-line-chart',
//   styleUrl: 'dyte-line-chart.css',
//   shadow: true,
// })
// export class DyteLineChart {
//   private svg: any;
//   private graphSvg: any;

//   @Element() element: HTMLDyteLineChartElement;

//   /** Chart Title */
//   @Prop() chartTitle: string = 'Connection Delay';

//   /** Chart Config */
//   @Prop() chartConfig: ChartConfig = {
//     height: 110,
//     width: 460,
//     marginTop: 20,
//     marginBottom: 20,
//     marginLeft: 30,
//     marginRight: 10,
//     maxX: 19,
//     minX: 100000000000000,
//     maxY: 600,
//     minY: 0,
//   };

//   @State() xScale: any;

//   @State() yScale: any;

//   @State() data = [];

//   componentDidLoad() {
//     // setup svg
//     this.setupSvg();

//     // initialise data and render plot
//     this.initialiseData();
//     this.plotChart();

//     // shift the graph whenever new data arrives
//     setInterval(() => {
//       this.data?.shift();
//       this.data.push({ x: new Date(), y: Math.round(Math.random() * 100) });
//       this.plotChart();
//     }, 1000);
//   }

//   disconnectedCallback() {
//     this.svg.removeListener('mouseenter', this.mouseenter);
//     this.svg.removeListener('mouseleave', this.mouseleave);
//     this.svg.removeListener('mousemove', this.mousemove);
//   }

//   private setupSvg() {
//     this.svg = select(this.element.shadowRoot.querySelectorAll('.chart')[0]);
//     const { height, width, marginLeft, marginRight, marginTop, marginBottom } = this.chartConfig;
//     // setup svg
//     this.svg
//       .attr('width', width)
//       .attr('height', height)
//       .style('padding', `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`)
//       .style('overflow', 'visible');
//     // setup mouse events
//     this.svg
//       .on('mouseenter', this.mouseenter.bind(this))
//       .on('mouseleave', this.mouseleave.bind(this))
//       .on('mousemove', this.mousemove.bind(this));
//     // setup clip container for graph
//     this.graphSvg = this.svg
//       .append('svg')
//       .attr('width', width)
//       .attr('height', height)
//       .style('overflow', 'hidden')
//       .append('g');
//   }

//   private initialiseData() {
//     for (let i = 0; i < 59; i++) {
//       const d = new Date();
//       d.setSeconds(d.getSeconds() - i);
//       this.data = [{ x: d, y: 0 }, ...this.data];
//     }
//   }

//   private plotChart() {
//     let { height, width, minX, maxX, minY, maxY } = this.chartConfig;

//     // get ranges
//     this.data.map((d) => {
//       maxX = Math.max(d.x.getTime(), maxX);
//       minX = Math.min(d.x.getTime(), minX);
//       maxY = Math.max(d.y, maxY);
//       minY = Math.min(d.y, minY);
//     });

//     // setup scale
//     this.xScale = scaleTime().domain([minX, maxX]).rangeRound([0, width]);
//     this.yScale = scale().domain([minY, maxY]).range([height, 0]);

//     // create line function
//     const l = area()
//       .curve(d3.curveBasis)
//       .x((d) => this.xScale(d.x))
//       .y0(() => height)
//       .y1((d) => this.yScale(d.y));

//     // define axes
//     const xAxis = d3
//       .axisBottom(this.xScale)
//       .ticks(this.data.length / 12)
//       .tickFormat(d3.timeFormat('%H:%M:%S'));
//     const yAxis = d3.axisLeft(this.yScale).ticks(4).tickSize(-width);

//     // remove old graph
//     this.svg.selectAll('.x').remove();
//     this.svg.selectAll('.y').remove();
//     this.graphSvg.selectAll('.chart-line').remove();

//     // draw axes and graph
//     this.svg.append('g').attr('class', 'y').call(yAxis);
//     this.graphSvg
//       .selectAll('.line')
//       .attr('width', width)
//       .attr('height', height)
//       .data([this.data])
//       .join('path')
//       .attr('d', (d) => {
//         return l(d);
//       })
//       .attr('class', 'chart-line');
//     this.svg
//       .append('g')
//       .attr('class', 'x')
//       .call(xAxis)
//       .attr('transform', `translate(0, ${height})`);
//   }

//   private mouseenter() {
//     const { height } = this.chartConfig;
//     this.graphSvg
//       .append('line')
//       .attr('class', 'tooltip-pointer')
//       .attr('x1', 0)
//       .attr('y1', 0)
//       .attr('x2', 1)
//       .attr('y2', height)
//       .attr('stroke-dasharray', '5, 5');
//   }
//   private mouseleave() {
//     this.graphSvg.selectAll('.tooltip-pointer').remove();
//     this.graphSvg.selectAll('.chart-tooltip').remove();
//   }
//   private mousemove(e) {
//     // clear old tooltip
//     this.graphSvg.selectAll('.chart-tooltip').remove();
//     this.graphSvg.selectAll('.chart-tooltip-text').remove();
//     // get point closest to cursor
//     const [x] = d3.pointer(e);
//     const xValue = this.xScale.invert(x);
//     const bisect = d3.bisector((d) => d.x).left;
//     const dataIndex = bisect(this.data, xValue, 1);
//     const coord = this.xScale(this.data[dataIndex]?.x);

//     if (!coord) {
//       this.graphSvg.selectAll('.chart-tooltip').remove();
//       this.graphSvg.selectAll('.chart-tooltip-text').remove();
//       return;
//     }

//     this.generateTooltipContainer(coord);
//     this.graphSvg
//       .selectAll('.tooltip-pointer')
//       .attr('transform', `translate(${coord}, 0)`)
//       .style('display', 'block');
//   }

//   private generateTooltipContainer(x: number) {
//     const { height } = this.chartConfig;

//     let translation = -104;
//     if (x < 120) translation = 4;

//     this.graphSvg
//       .append('rect')
//       .attr('class', 'chart-tooltip')
//       .attr('x', x)
//       .attr('y', height / 2 - 25)
//       .attr('height', 50)
//       .attr('width', 100)
//       .attr('rx', 8)
//       .attr('ry', 8)
//       .attr('transform', `translate(${translation}, 0)`);
//   }

//   render() {
//     return (
//       <Host>
//         <div class="title">{this.chartTitle}</div>
//         <svg class="chart"></svg>
//       </Host>
//     );
//   }
// }

// /**
//  * TODO:
//  * 1. modularize code and make it customisable
//  * 3. translate tooltip at a specified interval
//  * 5. add data to the tooltip
//  */
