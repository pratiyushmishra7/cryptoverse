import React, {useState} from 'react';
import {Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';

import {useGetCryptoNewsQuery} from '../../services/cryptoNewsApi';
import {useGetCryptosQuery} from '../../services/cryptoApi';

import Loader from '../UI/Loader';

const {Text, Title} = Typography;
const {Option} = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
  const count = simplified ? 6 : 12;
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery(
      {newsCategory,
        count});
  const {data: cryptosList} = useGetCryptosQuery(100);
  if (isFetching) return <Loader />;

  const selectComponentRender = simplified ? null : <Col span={24}>
    <Select
      showSearch
      className='select-news'
      placeholder={newsCategory}
      optionFilterProp='children'
      onChange={(value) => setNewsCategory(value)}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
      <Option value='Cryptocurrency'>Cryptocurrency</Option>
      {
        cryptosList?.data?.coins.map((coin) =>
          <Option value={coin.name} key={coin.id}>
            {coin.name}
          </Option>)
      }
    </Select>
  </Col>;

  const cryptoNewsRender = cryptoNews.value.map((news, index) => (
    <Col xs = {24} sm={12} lg={8} key = {index}>
      <Card hoverable className='news-card'>
        <a href={news.url} target='_blank' rel="noreferrer">
          <div className='news-image-container'>
            <Title level={5} className='news-title'>{news.name}</Title>
            <img
              style={{maxWidth: '200px', maxHeight: '100px'}}
              src={news?.image?.thumbnail?.contentUrl || demoImage}
              alt='news' />
          </div>
          <p>{news.description > 100 ?
          `${news.description.substring(0, 100)}...` : news.description}</p>
          <div className='provider-container'>
            <div>
              <Avatar
                src={
                  news.provider[0]?.image?.thumbnail?.contentUrl ||
                  demoImage}
                alt='news'/>
              <Text className='provider-name'>
                {news.provider[0]?.name}
              </Text>
            </div>
            <Text>
              {moment(news.datePublished).startOf('ss').fromNow()}
            </Text>
          </div>
        </a>
      </Card>
    </Col>
  ));
  return (
    <Row gutter={[24, 24]}>
      {selectComponentRender}
      {cryptoNewsRender}
    </Row>
  );
};

export default News;
