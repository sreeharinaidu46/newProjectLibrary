import React, { useState } from "react";
import {addOneBook} from "../actions/book_action"
import { useDispatch } from 'react-redux'
import {Toast} from "react-bootstrap"

const AddBook = () => {
    const[accession_no,setAccession] = useState("")
    const[call_no,setCallNo] = useState("")
    const[title,setTitle] = useState("")
    const[author,setAuthor] = useState("")
    const[publisher,setPublisher] = useState("")
    const[year,setYear] = useState("")
    const[copies,setCopies] = useState(null)
    const [show, setShow] = useState(false);
    const [correct,isCorrect]=useState(false);

    const dispatch = useDispatch()

      const PostData = () => {

        if(title==""||author===""||publisher===""||year===""||copies===null||copies==='e'||accession_no===""||call_no===""){
            isCorrect(true)
        }
        else{
            const book = { accession_no,call_no,title,author,publisher,year,copies };
        
        dispatch(addOneBook(book));
        setShow(true)
        setAccession("")
        setCallNo("")
        setTitle("")
        setAuthor("")
        setPublisher("")
        setCopies(null)
        setYear("")

        }
        
    };
    return (
        <div  className=" mt-5">
             

             <div className="card col-md-6 m-auto p-3" >
             <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                 <Toast.Body style={{backgroundColor:"green",color:"white",fontSize:"18px"}}>One Book Added</Toast.Body>
              </Toast>
              <Toast onClose={() => isCorrect(false)} show={correct} delay={3000} autohide>
                 <Toast.Body style={{backgroundColor:"red",color:"white",fontSize:"18px"}}>All fields are required</Toast.Body>
              </Toast>
                   <h2 style={{textAlign:"center",marginBottom:"20px"}}>Add a New Book</h2>
                   <div className="mb-3">
                        <input type="text" placeholder="Accession No" style={{height:"60px"}}
                         onChange={(e) => setAccession(e.target.value)} value={accession_no} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <input type="text" placeholder="Call No" value={call_no}  style={{height:"60px"}}
                        onChange={(e) => setCallNo(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Book title" style={{height:"60px"}}
                         onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <input type="text" placeholder="Author name" value={author}  style={{height:"60px"}}
                        onChange={(e) => setAuthor(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <input type="text" placeholder="Publisher" value={publisher}  style={{height:"60px"}}
                        onChange={(e) => setPublisher(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <input type="text" placeholder="Year" value={year} style={{height:"60px"}}
                         onChange={(e) => setYear(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <input type="number"
                         placeholder=" Number of Copies"  style={{height:"60px"}}
                         value={copies} onChange={(e) => setCopies(e.target.value)} className="form-control" min="1"/>
                    </div>
                   


                    <button className="btn btn-primary " onClick={() => PostData()}>
                        Add Book
                    </button>

                </div>
        </div>
    );
};

export default AddBook;