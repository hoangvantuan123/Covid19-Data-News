import React, { useEffect, useState, useCallback } from 'react';
import * as Realm from "realm-web";
import Highcharts from "highcharts/highmaps";
//import worldMap from "@highcharts/map-collection/custom/world.topo.json";
import HighchartsReact from "highcharts-react-official"
import proj4 from "proj4";

// Load Highcharts modules
require("highcharts/modules/map")(Highcharts);



// Render app with demo chart
export default function MapsWorld({ downloadMap }) {

    // console.log('khong loi', downloadMap)
    const worldMap = require('@highcharts/map-collection/custom/world.topo.json');
    const options = {
        chart: {
            map: worldMap,
            proj4,
            height: 1000,
            style: {
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer'
            },
            borderRadius: 8,
        },

        title: {
            text: ''
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'top'
            }
        },
        tooltip: {
            backgroundColor: '#F1F1F2',
            borderWidth: 0,
            shadow: false,
            useHTML: true,
            width: 600,
            padding: 15,
            marginLeft: 2,
            borderRadius: 25,
            fontFamily: "'Inter', sans-serif",
            pointFormat: '<span class="f32; " style="font-size:20px; " ><span <div class="textContainer" style="font-size:16px; " class="flag {point.properties.hc-key}">' +
                '</span></span>  <span style="font-size:25px; font-weight: bold;" >{point.location}</span> <br>' +
                '</span></span>  <span style="font-size:10px; font-weight: bold;" >{point.last_updated_date}</span><br> <br>' +
                '<span style="font-size:14px; color:Tomato;  font-weight: bold;">Tổng ca nhiễm: </span> <br> <span style="font-size:23px; font-weight: 600; opacity: 0.7;"> {point.total_cases} </span> <br> <br>' +
                '<span style="font-size:14px; color:Orange; font-weight: bold;">Ca nhiễm mới: </span><br> <span style="font-size:23px; font-weight: 600;opacity: 0.7;">  {point.new_cases}  </span> <br> <br>' +
                '<span style="font-size:14px; color:Gray; font-weight: bold;">Tổng ca tử vong: </span><br> <span style="font-size:23px; font-weight: 600;opacity: 0.7; ">{point.total_deaths} </span> <br> <br>' +
                '<span style="font-size:14px; color:MediumSeaGreen; font-weight: bold;">Tổng người tiêm chủng: </span> <br> <span style="font-size:23px; font-weight: 600; opacity: 0.7;">{point.people_vaccinated}</span>'
        },

        colorAxis: {
            min: 1,
            max: 1000,
            type: 'logarithmic',

        },
        plotOptions: {
            series: {
                cursor: 'pointer'
            }
        },
        series: [
            {
                nullColor: '#fad3cf',
                data: downloadMap,
                name: 'Bản đồ vùng dịch',
                minSize: '5%',
                maxSize: '12.5%',

                joinBy: ['iso-a3', 'code3'],
                states: {
                    hover: {
                        color: '#a4edba'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.location}'
                }
            }
        ]
    }
    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={"mapChart"}
            options={(options)}
        />
    );
}




