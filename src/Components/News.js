import React, { useEffect, useState, useCallback } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News= (props)=> {
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    // document.title = `${props.category}- NewsNation`;

    const updatenews = useCallback(async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setloading(false);
    }, [page, props.country, props.category, props.apikey, props.pageSize]);
    
    useEffect(() => {
        updatenews();
    }, [updatenews]);

    // handleNextClick = async () => {
    //     console.log("next");
    //     this.setState({ page: this.state.page + 1 })
    //     this.updatenews();
    // }


    // handlePreviousClick = async () => {
    //     console.log("Previous");
    //     this.setState({ page: this.state.page - 1 });
    //     this.updatenews();
    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setpage(page + 1);
        setloading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
    };
        return (
            <div className='container my-3'>
                <h1 className="text-center" style={{ margin: '35px, 0px', marginTop: '90px' }}>NewsNation - Top {props.category} Headlines</h1>
                {/* {loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className='row'>
                            {articles.map((element) => {
                                return <div className='col-md-3' key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://cdn.wionews.com/sites/default/files/2023/07/28/369966-adital1.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
