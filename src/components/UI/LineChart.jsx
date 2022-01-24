import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import {Line} from 'react-chartjs-2';
import {Col, Row, Typography} from 'antd';

import millify from 'millify';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
);

const {Title} = Typography;

const LineChart = ({coinHistory, coinPrice, coinName}) => {
  if (!coinHistory) return <div>Loading</div>;
  const coinPriceHistory = coinHistory?.data?.history.map((history) => history.price);
  const coinTimeStamp = coinHistory?.data?.history.map((history) => new Date(history.timestamp).toLocaleDateString());

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPriceHistory,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    responsive: true,

  };

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>{coinName} Price Chart </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
          <Title level={5} className='current-price'>Current {coinName} Price: $ {millify(coinPrice)}</Title>
        </Col>
      </Row>
      <Line data={data} options={options}/>
    </>
  );
};

export default LineChart;
