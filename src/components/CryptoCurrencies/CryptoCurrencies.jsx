import React, {useState, useEffect} from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';

import {Card, Row, Col, Input} from 'antd';

import {useGetCryptosQuery} from '../../services/cryptoApi';

import Loader from '../UI/Loader';

const CryptoCurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;

  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  const searchRender = simplified ? null : <div className='search-crypto'>
    <Input
      placeholder='Search Cryptocurrency'
      onChange={(e) => setSearchTerm(e.target.value)} />
  </div>;
  const cryptoCardsRender = cryptos?.map((crypto) => (
    <Col xs={24} lg={6} className='crypto-card' key={crypto.uuid}>
      <Link to={`/crypto/${crypto.uuid}`}>
        <Card
          title={`${crypto.rank}, ${crypto.name}`}
          extra={<img src={crypto.iconUrl} className='crypto-image' />}
          hoverable>
          <p>Price: {millify(crypto.price)}</p>
          <p>Market Cap: {millify(crypto.marketCap)}</p>
          <p>Daily Exchange: {millify(crypto.change)}%</p>
        </Card>
      </Link>
    </Col>
  ));

  if (isFetching) return <Loader />;
  return (
    <>
      {searchRender}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptoCardsRender}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
