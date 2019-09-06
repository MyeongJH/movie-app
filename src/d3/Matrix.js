import React, { Component } from 'react';
import * as d3 from "d3";
import MatrixData from "../data/MatrixData";

const data = d3.csvParse(MatrixData, d3.autoType)
    , columns = data.columns.filter(d => d !== "species")
    , width = 964
    , size = 236
    , padding = 20
    , x = columns.map(c => d3.scaleLinear()
        .domain(d3.extent(data, d => d[c]))
        .rangeRound([padding / 2, size - padding / 2]))
    , y = x.map(x => x.copy().range([size - padding / 2, padding / 2]))
    , z = d3.scaleOrdinal()
        .domain(data.map(d => d.species))
        .range(d3.schemeCategory10)
    ;

class Matrix extends Component {
    componentDidMount() {
        console.log(data);
        this.drawChart();

    }

    xAxis() {
        const axis = d3.axisBottom()
            .ticks(6)
            .tickSize(size * columns.length);
        return g => g.selectAll("g").data(x).join("g")
            .attr("transform", (d, i) => `translate(${i * size},0)`)
            .each(function (d) { return d3.select(this).call(axis.scale(d)); })
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
    }

    yAxis() {
        const axis = d3.axisLeft()
            .ticks(6)
            .tickSize(-size * columns.length);
        return g => g.selectAll("g").data(y).join("g")
            .attr("transform", (d, i) => `translate(0,${i * size})`)
            .each(function (d) { return d3.select(this).call(axis.scale(d)); })
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
    }

    drawChart() {
        const svg = d3.select("#matrix").append("svg")
            .attr("viewBox", `${-padding} 0 ${width} ${width}`)
            .style("max-width", "100%")
            .style("height", "auto");

        svg.append("g")
            .call(this.xAxis);

        svg.append("g")
            .call(this.yAxis);

        const cell = svg.append("g")
            .selectAll("g")
            .data(d3.cross(d3.range(columns.length), d3.range(columns.length)))
            .join("g")
            .attr("transform", ([i, j]) => `translate(${i * size},${j * size})`);

        cell.append("rect")
            .attr("fill", "none")
            .attr("stroke", "#aaa")
            .attr("x", padding / 2 + 0.5)
            .attr("y", padding / 2 + 0.5)
            .attr("width", size - padding)
            .attr("height", size - padding);

        cell.each(function ([i, j]) {
            d3.select(this).selectAll("circle")
                .data(data)
                .join("circle")
                .attr("cx", d => x[i](d[columns[i]]))
                .attr("cy", d => y[j](d[columns[j]]));
        });

        cell.selectAll("circle")
            .attr("r", 3.5)
            .attr("fill-opacity", 0.7)
            .attr("fill", d => z(d.species));

        svg.append("g")
            .style("font", "bold 10px D2Coding")
            .selectAll("text")
            .data(columns)
            .join("text")
            .attr("transform", (d, i) => `translate(${i * size},${i * size})`)
            .attr("x", padding)
            .attr("y", padding)
            .attr("dy", ".71em")
            .text(d => d);
    }

    render() {
        return <div id="matrix"></div>
    }
}

export default Matrix;