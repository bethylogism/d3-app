import React from 'react';
import { extent as d3ArrayExtent } from 'd3-array';
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
} from 'd3-scale';
import { line as d3Line } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis'; // d3-axis does mutate the DOM.
import { select } from 'd3-selection';

type NumberValue = number | { valueOf(): string };

type Datum = {
  day: Date;
  productPerceivedQuality: NumberValue;
};

// type Data = Datum[]; // durt
type Data = NumberValue[]; // I think it's gon have to be a Map/ arr of nums. Cause it need length

type Props = {
  data: Data; // this actually needs to be like the VALUES
  height: number;
  selectX: (datum: Pick<Datum, 'day'>) => Date;
  selectY: (datum: Pick<Datum, 'productPerceivedQuality'>) => NumberValue; // not happy about this any type
  width: number;
};

export const PlotContainer = ({
  data,
  height,
  selectX,
  selectY,
  width,
}: Props) => {
  // sets the domain. Extent returns the ([min, max]) of x (time) values (AKA dates) in the data.
  // range will be from x=0 to x=width (so this is why width is not pixels.)
  const xScale = d3ScaleTime()
    .domain(d3ArrayExtent(data, selectX))
    .range([0, width]);

  const yScale = d3ScaleLinear() // a classic linear scale
    .domain(d3ArrayExtent(data, selectY))
    .range([height, 0]);

  const selectScaledX = datum => xScale(selectX(datum));
  const selectScaledY = datum => yScale(selectY(datum));

  // x axis should have half as many ticks as rows in the data
  const xAxis = axisBottom(xScale).ticks(data.length / 2);

  const yAxis = axisLeft(yScale).ticks(3);

  // a line factor...
  const sparkLine = d3Line().x(selectScaledX).y(selectScaledY);

  const linePath = sparkLine(data); // Data needs to be [number, number][] | Iterable<[number, number]>

  return (
    <svg className="container" height={height} width={width}>
      {/* g is a group node, for convenient styling */}

      {/* Axes won't re-render if data updates because we're rendering them directly into the groups. */}
      <g className="xAxis" ref={node => select(node).call(xAxis)} />
      <g className="yAxis" ref={node => select(node).call(yAxis)} />

      <g className="line">
        <path d={linePath} />
      </g>
    </svg>
  );
};
