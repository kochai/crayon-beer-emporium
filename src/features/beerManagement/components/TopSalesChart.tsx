import {FC} from 'react';
import {Bar} from '@visx/shape';
import {Group} from '@visx/group';
import {scaleBand, scaleLinear} from '@visx/scale';
import {AxisLeft, AxisBottom} from '@visx/axis';
import {useTooltip, TooltipWithBounds, defaultStyles} from '@visx/tooltip';
import {ParentSize} from '@visx/responsive';
import {localPoint} from '@visx/event';
import {BeerWithSales} from '../../../shared/types/Beer';

interface TopSalesChartProps {
    data: BeerWithSales[];
}

const TopSalesChart: FC<TopSalesChartProps> = ({data}) => {
    const Chart = ({width, height}: { width: number; height: number }) => {
        const margin = {top: 40, right: 30, bottom: 30, left: 30};
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        const x = (d: BeerWithSales) => `${d.name.substring(0, Math.min(d.name.length, 6))}...`;
        const y = (d: BeerWithSales) => d.salesCount;

        const xScale = scaleBand<string>({
            range: [0, xMax],
            round: true,
            domain: data.map(x),
            padding: 0.4,
        });
        const yScale = scaleLinear<number>({
            range: [yMax, 0],
            round: true,
            domain: [0, Math.max(...data.map(y))],
        });

        const {
            tooltipData,
            tooltipLeft,
            tooltipTop,
            tooltipOpen,
            showTooltip,
            hideTooltip,
        } = useTooltip();

        return (
            <div style={{position: 'relative', width, height}}>
                <svg width={width} height={height}>
                    <Group left={margin.left} top={margin.top}>
                        <AxisBottom
                            top={yMax}
                            scale={xScale}
                            tickLabelProps={() => ({
                                fill: '#000',
                                fontSize: 10,
                                textAnchor: 'end',
                            })}
                            tickLength={4}
                        />
                        <AxisLeft
                            scale={yScale}
                            tickLabelProps={() => ({
                                fill: '#000',
                                fontSize: 11,
                                textAnchor: 'end',
                                dx: '-0.25em',
                                dy: '0.25em',
                            })}
                            tickLength={4}
                            stroke="#000"
                            strokeWidth={1}
                        />
                        {data.map((d, index) => {
                            const barWidth = xScale.bandwidth();
                            const barHeight = yMax - (yScale(y(d)) ?? 0);
                            const barX = xScale(x(d));
                            const barY = yMax - barHeight;
                            return (
                                <Bar
                                    key={`bar-${d.id || `${d.name}-${index}`}`}
                                    x={barX}
                                    y={barY}
                                    width={barWidth}
                                    height={barHeight}
                                    fill="rgba(23, 233, 217, .5)"
                                    onMouseMove={(event) => {
                                        const coords = localPoint(event);
                                        if (coords) {
                                            showTooltip({
                                                tooltipData: d,
                                                tooltipTop: coords.y,
                                                tooltipLeft: coords.x,
                                            });
                                        }
                                    }}
                                    onMouseLeave={() => hideTooltip()}
                                />
                            );
                        })}
                    </Group>
                </svg>
                {tooltipOpen && tooltipData && (
                    <TooltipWithBounds
                        key={Math.random()}
                        top={tooltipTop}
                        left={tooltipLeft}
                        style={defaultStyles}
                    >
                        <div>
                            <strong>{(tooltipData as BeerWithSales).name}</strong>
                        </div>
                        <div>Sales: {(tooltipData as BeerWithSales).salesCount}</div>
                    </TooltipWithBounds>
                )}
            </div>
        );
    };

    return (
        <div style={{height: '400px', width: '100%'}}>
            <ParentSize>
                {({width, height}) => <Chart width={width} height={height}/>}
            </ParentSize>
        </div>
    );
};

export default TopSalesChart;