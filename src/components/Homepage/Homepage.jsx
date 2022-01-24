import React from 'react';
import millify from 'millify';
import {Typography, Row, Col, Statistic} from 'antd';
import {Link} from 'react-router-dom';

import {useGetCryptosQuery} from '../../services/cryptoApi';

import {CryptoCurrencies, News} from '../../components';

const {Title} = Typography;

const Homepage = () => {
  const {data, isFetching} = useGetCryptosQuery(10);

  if (isFetching) return 'Loading ....';

  const globalStats = data?.data?.stats;

  const {
    total,
    total24hVolume,
    totalCoins,
    totalExchanges,
    totalMarketCap,
    totalMarkets} = globalStats;

  return (
    <div>
      <>
        <Title level={2} className='heading'>
        Golbal Crypto Stats
        </Title>
        <Row>
          <Col span={12}>
            <Statistic title='Total CryptoCurrencies' value={total} />
          </Col>
          <Col span={12}>
            <Statistic title='Total Coins' value={millify(totalCoins)} />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total Exchanges'
              value={millify(totalExchanges)} />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total Market Cap'
              value={millify(totalMarketCap)} />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total 24h Volume'
              value={millify(total24hVolume)} />
          </Col>
          <Col span={12}>
            <Statistic title='Total Markets' value={millify(totalMarkets)} />
          </Col>
        </Row>

        <div className='home-heading-container'>
          <Title level={3} className='home-title'>
            Top 10 CryptoCurrencies in the world
          </Title>
          <Title level={3} className='show-more'>
            <Link to='/cryptocurrencies'>Show More</Link>
          </Title>
        </div>
        <CryptoCurrencies simplified />

        <div className='home-heading-container'>
          <Title level={3} className='home-title'>
            Latest Crypto News
          </Title>
          <Title level={3} className='show-more'>
            <Link to='/news'>Show More</Link>
          </Title>
        </div>
        <News simplified />
      </>
    </div>
  );
};

export default Homepage;
