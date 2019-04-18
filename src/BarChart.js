import React, {Component} from 'react';
import {VictoryBar, VictoryChart, VictoryTooltip} from 'victory';

class PieChart extends Component{

    render()
    {
        const {data, title} = this.props;

        return (
                <div className="br3 ba b--black-10 mv4 mw10 shadow-5 center">
                    <h2>{title}</h2>
                    <div style={{maxWidth: 600, minWidth: 300}}>
                        <VictoryChart>
                            <VictoryBar
                                data={data}
                                labels={(d) => d.x + '\n' + (100*d.percent).toFixed(2) + " %\n" + d.y}
                                labelComponent={<VictoryTooltip flyoutStyle={{color: "white", fill:"white"}}/>}
                            />
                        </VictoryChart>                   
                    </div>

                </div>               
        );
    }
}

export default PieChart;