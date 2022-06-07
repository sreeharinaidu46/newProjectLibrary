
import React,{useEffect} from 'react';
import {getAllIssuedBook,getEveryDayBook} from "../actions/Issue_action"
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';

const Issue_Return = () => {

    const dispatch = useDispatch();
      useEffect(()=>{
        // dispatch(getAllIssuedBook())
        dispatch(getEveryDayBook())
      },[])



    //const {all_IssuedBook} = useSelector(state => state.allIssuedBookReducer)
    const {allCounts} = useSelector(state => state.getEveryDayBookReducer)
    //console.log(all_IssuedBook);
    //var filterd;
    // const filterOut = ()=>{
    //     const todayDate = moment(new Date()).format('YYYY-MM-DD');
    //     //console.log(todayDate)
    //      //filterd = all_IssuedBook && all_IssuedBook.filter(item =>  (item.updatedAt.slice(0,10) == todayDate))
    //      console.log(allCounts);
    // }

    // filterOut()
    return (
        <div className="col-md-10 m-auto pt-4">
        {!allCounts && allCounts.length>0  ? <>
        <div className="bg-success p-2 text-center">
        <h4 style={{textAlign:"center",fontFamily:"sans-serif",color:"white"}}>Yet No booked Issued& Returned</h4>
        </div>
        
        </> : 
        <>
          <h4 style={{textAlign:"center",fontFamily:"sans-serif"}}>Total Issued & Returned Books</h4>
          <table  className='table table-bordered table-responsive-sm'>

<thead className='thead-dark bg-info'>
  <tr>
      <th style={{textAlign:"center"}}>Date</th>
      <th style={{textAlign:"center"}}>Issued Books</th>
      <th style={{textAlign:"center"}}>Received Books</th>
      {/* <th style={{textAlign:"center"}}>Student Name</th>
      <th style={{textAlign:"center"}}>Branch</th> */}
  </tr>
</thead>
<tbody>
  
{allCounts && allCounts.map(book=>{

 
 return <tr key={book._id}>
      <td style={{textAlign:"center"}}>{book.date}</td>
      <td style={{textAlign:"center"}}>
          {book.issued}
      </td >
      <td style={{textAlign:"center"}}>
          {book.returned}
      </td>
     
      {/* <td style={{textAlign:"center"}}>
         {book.userName}
      </td>
      <td style={{textAlign:"center"}}>
         {book.userBranch}
      </td> */}

  </tr>

})}
</tbody>

</table>
    
     </> }
      </div>
    );
};

export default Issue_Return;


