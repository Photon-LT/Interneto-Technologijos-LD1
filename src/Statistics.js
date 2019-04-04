import React, {Component} from 'react';
import {RadialChart} from 'react-vis';

class Statistics extends Component{

    getLangueagesData(){
        const {fetchData} = this.props;
        const count = new Map();
        for(let val of fetchData)
        {
            if(!count.has(val.programmingLanguage))
            count.set(val.programmingLanguage,1);
            else
            count.set(val.programmingLanguage,count.get(val.programmingLanguage) + 1);
        }
        
        let lang = [];
        count.forEach((value,key) => {
            lang.push({angle: value, label: key});
        });

        return lang;
    }

    render()
    {
        this.getLangueagesData();
        return (
            <div>                
            <RadialChart data={this.getLangueagesData()} width={300} height={300}/>
            </div>
        );
    }
}

export default Statistics;