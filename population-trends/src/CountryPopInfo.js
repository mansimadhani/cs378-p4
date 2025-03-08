import React, { useEffect, useState } from 'react';
import {
    LineChart,
    ResponsiveContainer,
    Legend,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

function CountryPopInfo ({countryID}) {
    const [countryName, setCountryName] = useState('');
    const [pops, setPops] = useState(new Array (10).fill(0));

    useEffect(() => {
        const BASE_URL = 'https://api.worldbank.org/v2/country/' + countryID + '/indicator/SP.POP.TOTL?date=2013:2023&format=json';
        fetch (BASE_URL)
        .then (data => data.json())
        .then (json =>{

            setCountryName(json[1][0].country.value);
            const newPops = json[1].map(year => ({
                year: year.date,
                population: year.value,
            })).reverse();

            setPops (newPops)

        })
        .catch (error => console.log(error));
    }, [countryID]);
    
    return (
        <div>

            <div className="row">
                <div className="pop-desc col">
                    <p>2023 Population:</p>
                </div>
            </div>

            <div className='row'></div>
            
            <div className="row">
                <p className="pop-number col">{[...pops].reverse()[0].population}</p>
            </div>

            <div className='row'>
                <div className='col'></div>
                
                <div className="col-10">
                    <ResponsiveContainer className="graph" width="100%" height="100%" aspect={1}>
                        <LineChart data={pops}>
                            <CartesianGrid />
                            <XAxis className="x-axis" dataKey="year" interval={"preserveStartEnd"}>
                            </XAxis>
                            <YAxis className="y-axis">
                            </YAxis>
                            <Tooltip />
                            <Line
                                dataKey="population"
                                stroke="black"
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className='col'></div>

            </div>


            <div className="table row">

                <div className="col"></div>

                <div className="table-col col">
                    <div className="table-heading row">
                        <p className="col">Year</p>
                    </div>
                    {[...pops].reverse().slice(1).map((pop, index) => (
                        <div className="row data" key={index}>
                            <p className="col data-year">{pop.year}</p>
                        </div>
                    ))}
                </div>

                <div className="table-col col">
                    <div className="table-heading row">
                        <p className="col">Population</p>
                    </div>
                    {[...pops].reverse().slice(1).map((pop, index) => (
                        <div className="row" key={index}>
                            <p className="col data-pop">{pop.population}</p>
                        </div>
                    ))}
                </div>

                <div className="col"></div>


            </div>

            
        </div>
    )
};

export default CountryPopInfo;