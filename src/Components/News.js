import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  
   static defaultProps={
    country:'in',
    pageSize:'8',
    category:'general'

   }
   static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
   }
    constructor(){
        super();
        this.state={
             articles:[],
             loading:false,
             page:1
        }
    }
   async componentDidMount(){
        let url=`https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/${this.props.country}.json`
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({
          articles:parsedData.articles,
          totalResults:parsedData.totalResults,
          loading:false
        })
      
      }
      handleNextClick=async()=>{
        if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

        }
        else
        {
        let url=`https://saurav.tech/NewsAPI/top-headlines/category/science/us.json`;
        this.setState({loading:true});
        let data=await fetch(url);
          let parsedData=await data.json();
          this.setState({loading:false});
         this.setState({
          page:this.state.page+1,
          articles:parsedData.articles
            })
        }

      }
      handlePrevClick=async()=>{
        let url=`https://saurav.tech/NewsAPI/top-headlines/category/sports/us.json`
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({loading:false});
        console.log(parsedData);
        this.setState({
        page:this.state.page-1,
        articles:parsedData.articles
        
      })
    
      }

  render() {

    return (
      <div className='container my-3 '>
         <h1 className='text-center' style={{margin:'35px 0px'}}>NewsApp-Top Headlines</h1>
        {this.state.loading&&<Spinner />}
         <div className="row">
         {!this.state.loading&&this.state.articles.map((element)=>{
           return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} />
          </div>
         })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
