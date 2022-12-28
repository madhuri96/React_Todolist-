import { useState, useEffect} from 'react';
import axios from "axios";       //import axios to make HTTP requests

// const todo = {
//   id: 10,
//   title: 'go to gym',
//   body: 'practicing sport is very important',
//   userId: 2,
// };

function App() {
  const [todos, setTodos] = useState([]);

  const [title,setTitle] = useState('');

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos")          //get request
    .then((result)=>{
      setTodos(result.data);
      console.table(result.data);
      // console.log(result.data);
    }).catch(err => console.log(err));
  },[]);                       //[] only fires one time when the component loads

  const postData = (e) => {
    e.preventDefault();
    axios.post("https://jsonplaceholder.typicode.com/todos",{        //post request
      title
    }).then((result)=>{
       console.log("Posting data",result);
    }).catch(err => console.log(err));
  }

  // const putData = (e) => {
  //   e.preventDefault();
  //   axios.put("https://jsonplaceholder.typicode.com/todos/10", todo)
  //           .then((response) => {
  //               console.log(response.status);
  //               console.log(response.data);
  //           })
  //           .catch(err => console.log(err));
  //   }

  const putData = (e) => {
    e.preventDefault();
    axios.put("https://jsonplaceholder.typicode.com/todos/10",{        //put request
      title
    }).then((result)=>{
       console.log("Puting data",result);
    }).catch(err => console.log(err));
  }

  const postDelete = (id,e) => {
    e.preventDefault();
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)      //delete request
    .then((result)=>{
       console.log("Deleted!",result);
    }).catch(err => console.log(err));
  }

  const arr = todos.map((data,index)=>{
    return(
    <tr>
      <td>{data.id}</td>
      <td>{data.title}</td>
      <td> <input type="checkbox" checked={data.completed} /></td>
      <td><button type="button" className="btn text-dark bg-danger" onClick={(e) => postDelete(data.id,e)}>Delete</button></td>
    </tr>
    )
  });

  return (
  <div>
    <h1 className="text-primary text-center">TodoList</h1>

    <hr/>

    <form className="text-center">
      <label className='text-dark h4'>Title:- </label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <br/><br/>
      <button type="button" className="btn btn-lg text-dark bg-success h3 " onClick={postData}>Post</button>
      <br/>
      <button type="button" className="btn btn-lg text-dark bg-info h3" onClick={putData}>Put</button>
      <hr/>
    </form>
    
    <table className="table table-bordered">
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Completed</th>
      <th>Delete</th>
    </tr>
    {arr}
    </table>
   
  </div>
  ); 
}

export default App;
