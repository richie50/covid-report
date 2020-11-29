import './details.css';

import * as _ from 'lodash';

import { Component } from "react";

//const Detail = ({ match }) => <p>{match.params.id}</p>
interface Props {
  history: History;
  location: Location;
  match: any;
}

interface Details{
    country: string,
    lat:number,
    lng:number,
    confirmed: number,
    deaths: number,
    recovered: number,
    active: number,
    date: Date
}
interface State {
  stats: Details[];
}

class CountryDetails extends Component<Props, State> {
  state = { stats: [] };

  componentDidMount() {
    fetch(
      `https://api.covid19api.com/live/country/${this.props.match.params.id}`
    )
      .then((res) => res.json())
      .then((data) => {
    
        data =  _.map(data , function(mapped){
            return {
                country: mapped.Country,
                lat: mapped.Lat,
                lng: mapped.Lon,
                confirmed: mapped.Confirmed,
                deaths: mapped.Deaths,
                recovered: mapped.Recovered,
                active: mapped.Active,
                date: mapped.Date

            };
        });
        this.setState({ stats: data });
      });
  }

  render() {
    const headers =
      this.state.stats.length > 0
        ? Object.keys(this.state.stats[0]).map((r) => r.toUpperCase())
        : [];
    return (
      <table>
          <caption>
              <h2 id="table-header" className="table-header">Details of Countries with the highest number of COVID Cases</h2>
            </caption>
          <thead>
          <tr>
            {headers.map((header) => {
                return <th scope="col" key={header}>{header}</th>;
            })}
             </tr>
          </thead>
          <tbody>
        {this.state.stats.length > 0
          ? this.state.stats.map((stat, index) => {
              return (
                  
                      <tr key={index}>
                        {
                        headers.map((h) => {return h.toLowerCase() === 'date' ? <td key={index + h.toLowerCase()}>{new Date(stat[h.toLowerCase()]).toDateString()}</td> : <td key={index +  h.toLowerCase()}>{stat[h.toLowerCase()]}</td>}
                        )}
                     </tr>
                 
              );
            })
          : null}
           </tbody>
      </table>
    );
  }
}

export default CountryDetails;
