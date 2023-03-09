import {React, useState, useEffect} from 'react'
import './App.css';
import ReactPaginate from 'react-paginate';


function App() {




  const [data, setData] = useState([]);

 

    const fetchData = () => {
      fetch(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc`)
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          setData(actualData.items);
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  
    useEffect(() => {
      fetchData();
    }, []);


   


   const [pageNumber, setPageNumber] = useState(0);
   const perpage = 4;
   const pageclick = pageNumber * perpage;
   const countpage = Math.ceil(data.length/perpage);

   const changepage = ({selected}) => {
    setPageNumber(selected);
   }

  return (
    <div className="main" >
      <div className="container">
           <div className='heading'><p className='para'>Most Starred Repos</p></div>
           <div className='reposit'>


       {
        data.slice(pageclick,pageclick+perpage).map((item,index)=>(

            <div className='box' key={index}>

                <div className='for_repos'>
                   <img className='img' src={item.owner.avatar_url} alt="" height={100} />
                   <p className='names_of'>{item.full_name}</p>
                   <p className='description'>{item.description}</p>
                   <div className='btn_of'>
                      <button className='btns_of'>Stars :{item.stargazers_count}</button>
                      <button className='btns_of'>Issues: {item.open_issues}</button>
                   </div>
                   <p className='updates_of'>Last pushed <span style={{fontWeight:600}}>{item.updated_at}</span> By <span style={{fontWeight:600}}>{item.owner.login}</span> </p>
                   
                </div>


           </div> 

       ))}

              
       <div className="pagination">
         <ReactPaginate 
         previousLabel={"Previous"}
         nextLabel={"Next"}
         pageCount={countpage}
         onPageChange={changepage}
         containerClassName={"paginationBttns"}
         previousLinkClassName={"previousBttn"}
         nextLinkClassName={"nextBttn"}
         activeClassName={"paginationActive"}
         disabledClassName={"paginationDisabled"}
         />
       </div>
               
               
            </div>
       </div>
    </div>
  );
}

export default App;
