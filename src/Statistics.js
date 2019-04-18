import React, {Component} from 'react';
import PieChart from "./PieChart";
import BarChart from "./BarChart";

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
            lang.push({x: key, y: value, percent: value / fetchData.length, name: key});
        });
        
        lang.sort((a,b) => a.y - b.y);

        return lang;
    }

    getSuccessData(){
        const {fetchData} = this.props;
        const count = new Map();
        for(let val of fetchData)
        if(val.testset === 'TESTS')
        {
            if(!count.has(val.verdict))
            count.set(val.verdict,1);
            else
            count.set(val.verdict,count.get(val.verdict) + 1);
        }
        
        let succ = [];
        count.forEach((value,key) => {
            succ.push({x: key, y: value, percent: value / fetchData.length, name: key});
        });

        succ.sort((a,b) => a.y - b.y);

        return succ;
    }

    getTagData(){
        const {fetchData} = this.props;
        const count = new Map();
        let totalSolved = 0;

        for(let val of fetchData)
        if(val.testset === 'TESTS' && val.verdict.toLowerCase() === 'ok')
        {
            totalSolved++;

            for(let tag of val.problem.tags)
            if(!count.has(tag))
                count.set(tag,1);
            else
                count.set(tag,count.get(tag) + 1);
        }
        
        let tags = [];
        count.forEach((value,key) => {
            tags.push({x: key, y: value, percent: value / totalSolved, name: key});
        });

        tags.sort((a,b) => a.y - b.y);

        return tags;
    }

    getProblemsTypeSolvedData()
    {
        const {fetchData} = this.props;
        const data = [...new Set(fetchData.filter(x=>x.verdict.toLowerCase()==='ok' && x.testset==='TESTS')
        .map(x=>x.problem.index + x.problem.contestId))];
        const count = new Map();

        for(let i=0; i<26; i++)
        {
            let ch = String.fromCharCode(65 + i);
            count.set(ch,0);
        }

        for(let val of data)
            count.set(val[0],count.get(val[0]) + 1);
        
        let A = [];
        count.forEach((value,key) => {
            A.push({x: key, y: value, percent: value / data.length});
        });

        A.sort((a,b) => a.x - b.x);
        console.log(A);
        return A;
    }

    getProblemsRatingSolvedData()
    {
        const {fetchData} = this.props;
        const data = [...new Set(fetchData.filter(x=>x.verdict.toLowerCase()==='ok' && x.testset==='TESTS' && x.problem.hasOwnProperty('rating'))
        .map(x=> {return {key: x.problem.index + x.problem.contestId, value: x.problem.rating}}))];
        const count = new Map();

        for(let x of data)
            count.set(x.value,0);

        for(let x of data)
            count.set(x.value,count.get(x.value) + 1);
        
        let A = [];
        count.forEach((value,key) => {
            A.push({x: key, y: value, percent: value / data.length});
        });

        A.sort((a,b) => a.x - b.x);
        console.log(A);
        return A;
    }

    render()
    {
        return (
            <div>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    <PieChart title="Languages" data={this.getLangueagesData()}/>
                    <PieChart title="Submissions" data={this.getSuccessData()}/>
                    <PieChart title="Types of problems solved" data={this.getTagData()}/>
                </div>

                <div style={{display: "flex", flexWrap: "wrap"}}>
                    <BarChart title="Problems by type" data={this.getProblemsTypeSolvedData()}/>
                    <BarChart title="Problems by rating" data={this.getProblemsRatingSolvedData()}/>
                </div>
            </div>
        );
    }
}

export default Statistics;