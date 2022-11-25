import React, { useEffect, useState, useMemo } from 'react'
import ReactEcharts from "echarts-for-react";
export default function CompareEcharts({ report }) {

  localStorage.clear();
  window.localStorage.clear();
  const generateOptions = (report) => {
   
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
      }



    }
  }

  const [options, setOptions] = useState({});
  const [reportType, setreportType] = useState('all');
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

