import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('forms');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  const [forms, setforms]=useState(getDatafromLS());

  // input field states
  const [id, setid]=useState('');
  const [email, setEmail]=useState('');
  const [username, setUsername]=useState('');
  const [age, setAge]=useState('');

  // form submit event
  const handleAddformSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let form={
      id,
      email,
      username,
      age
    }
    setforms([...forms,form]);
    setid('');
    setEmail('');
    setUsername('');
    setAge('');
  }

  // delete form from LS
  const deleteform=(id)=>{
    const filteredforms=forms.filter((element,index)=>{
      return element.id !== id
    })
    setforms(filteredforms);
  }

  const handleasesort = () => {
    const sortedData = [...forms].sort((a,b)=>{
      return a.id > b.id ? 1 : -1
    })
    setforms(sortedData)
  }
  const handledecsort = () => {
    const sortedData = [...forms].sort((a,b)=>{
      return b.id > a.id ? 1 : -1
    })
    setforms(sortedData)
  }
  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('forms',JSON.stringify(forms));
  },[forms])

  return (
    <div className='mb-1 mx-5'>
      <h1>FormList App</h1>
      <p>Add and view your forms using local storage</p>
      <div className='main'>

        <div className='form-container'>
        <form className="row g-3" onSubmit={handleAddformSubmit}>
        <div className="mb-1 mx-5">
    <label htmlFor="inputId" className="form-label">ID</label>
    <input type="text" onChange={(e)=>setid(e.target.value)} value={id} className="form-control" id="inputId"/>
  </div>
  <div className="mb-1 mx-5">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control" id="inputEmail4"/>
  </div>
  <div className="mb-1 mx-5">
    <label htmlFor="inputUserName4" className="form-label">UserName</label>
    <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username} className="form-control" id="inputUserName4"/>
  </div>

  <div className="mb-1 mx-5">
    <label htmlFor="inputAge" className="form-label">Age</label>
    <input type="text" onChange={(e)=>setAge(e.target.value)} value={age} className="form-control" id="inputAge" />
  </div>
 
  <div className="mb-1 mx-5">
    <label htmlFor="inputState" className="form-label">City</label>
    <select id="inputState" className="form-select">
      <option value="1">Surat</option>
      <option value="2">Vapi</option>
    </select>
  </div>
  <div className="mb-1 mx-5">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" htmlFor="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div className="mb-1 mx-5">
    <button type="submit" className="btn btn-primary">Add</button>
  </div>
</form>
<div className="mb-3 mx-5">
    <button onClick={handleasesort} className="btn btn-primary">Sort Asending </button>
  </div>
  <div className="mb-3 mx-5">
    <button onClick={handledecsort} className="btn btn-primary">Sort Desending </button>
  </div>

        </div>

        <div className='view-container'>
          {forms.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  <View forms={forms} deleteform={deleteform}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>setforms([])}>Remove All</button>
          </>}
          {forms.length < 1 && <div>No Forms are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App
