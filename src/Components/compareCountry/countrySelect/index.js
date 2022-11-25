
import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";



export default function CompareSelectUI({ report }) {
  const generateOptions = (report) => {
    const categories = report.map((item) => item.last_updated_date);
    const total_cases
      = report.map((item) => item.total_cases
      );
    const new_cases = report.map((item) => item.new_cases);
    const new_deaths = report.map((item) => item.new_deaths);
    const total_deaths = report.map((item) => item.total_deaths);
    const value = report.map((item) => item.value);
    return {
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: {
            readOnly: false
          },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      animationDuration: 10000,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        data: value,
        min: 0,
        interval: 50,
        type: 'category',
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: [{
        type: 'value',
        scale: true,
        alignTicks: true,
        min: 0,
      },
      {
        type: 'value',
        scale: true,
        alignTicks: true,
        min: 0,
      }],
      legend: {},

      series: [
        {
          name: "total_cases",
          type: 'bar',
          barGap: 0,
          label: {
            show: true,
            position: 'top'
          },
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          }
          ,
          data: total_cases
        },
        {
          name: "total_deaths",
          type: 'bar',
          barGap: 0,
          label: {
            show: true,
            position: 'top'

          },
          stack: 'total_deaths',
          emphasis: {
            focus: 'series'
          },
          data: total_deaths
        },
        {
          name: 'new_cases',
          type: 'bar',
          data: new_cases,
          yAxisIndex: 1,
          label: {
            show: true,
            position: 'top'

          }
        },
        {
          name: 'new_deaths',
          type: 'bar',
          data: new_deaths,
          yAxisIndex: 1,
          label: {
            show: true,
            position: 'top'

          }
        },


      ]

    }
  }

  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('all');
  useEffect(() => {
    setOptions(generateOptions(report));

  }, [report]);
  return (
    <div className="h-[600px]">

      <ReactEcharts option={(options)} data={report} style={{
        minHeight: '600px',
        width: '100%',
      }} ></ReactEcharts>
    </div>
  );
}

