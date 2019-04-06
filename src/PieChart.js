import React, {Component} from 'react';
import { VictoryPie, VictoryTooltip} from "victory";

class PieChart extends Component{

    render()
    {
        const {data, title} = this.props;

        return (
                <div className="br3 ba b--black-10 mv4 mw10 shadow-5 center">
                    <h2>{title}</h2>
                    <div style={{maxWidth: 400, minWidth: 300}}>
                        <VictoryPie
                        style={{ labels: { fill: "white" } }}
                        labelRadius={60}
                        labels={(d) => d.x + '\n' + (100*d.percent).toFixed(2) + " %\n" + d.y}
                        labelComponent={<VictoryTooltip flyoutStyle={{color: "white", fill:"black"}}/>}
                        data={data}
                        colorScale="qualitative"
                        />                        
                    </div>

                </div>               
        );
    }
}

export default PieChart;