import './home.css';

import * as _ from 'lodash';

import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import React, { Component } from 'react';

import { Link } from 'react-router-dom'

interface Confirmed{
    Country: string,
    TotalConfirmed: number,
    TotalDeaths: number,
    TotalRecovered: number,
    Slug: string


}

class  HomeComponent extends Component{
   

    state = {
        totals: new Array<Confirmed>()
    }

    componentDidMount() {
        const header = new Headers({"x-access-token":"5cf9dfd5-3449-485e-b5ae-70a60e997864" , "Content-Type":"application/json"}); // as specified by the API
        fetch('https://api.covid19api.com/summary' , {method: 'GET' , headers: header} ).then(res => res.json()).then((data)=> {
            this.setState({totals: data.Countries})
        }).catch(console.log);
    }
    

    render(){
        return(
            <div>
                {this.highestDailyCases().map((e , idx) => {
                    return(  
                    
                        <Card className="card" key={idx} variant="elevation">
                            <CardHeader className="header" title={<Typography color="textPrimary" gutterBottom>{e.Country}</Typography>}> Testing
                            </CardHeader>
                            <CardContent className="container" id={e.Slug}>
                                <Typography color="secondary">Total Confirmed: {e.TotalConfirmed}</Typography>
                                <Typography color="secondary" >Total Death: {e.TotalDeaths}</Typography>
                                <Typography color="secondary">Total Recovered: {e.TotalRecovered}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained">
                                    <Link to={`/${e.Slug}`}> Details </Link>
                                </Button>    
                            </CardActions>
                        </Card>
                        
                    );
                })}
            </div>
        );
    }

    /**
     * The routine computes the country with the highest number of cases in descending order and returns the top ten countries with the most cases
     */
    public highestDailyCases(){
        const highestCases = _.orderBy(this.state.totals, ['TotalConfirmed'], ['desc']).splice(0 , 9);
        return highestCases;
    }
}

export default HomeComponent;
