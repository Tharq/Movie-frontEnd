import {React,useState} from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

function Register() {
    const[username,setUsername] = useState("");
    const[name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const[navigate,setNavigate] = useState(false);

    const handleSubmit = async e =>{
        e.preventDefault();
        const user = {
            "name" : name,
            "userName" : username,
            "email" : email,
            "password" : password
        }
        console.log(user);
        const {data}= await axios.post("http://localhost:8080/api/v1/auth/register",user);

        console.log(data);

        axios.defaults.headers.common['Authorization'] = `Bearer ${data['accessToken']}`

        setNavigate(true);

    }

    if(navigate){
        return <Navigate to='/' />
    }
  return (
    <div className='d-flex justify-content-center mt-5 '>
    <form className='w-50  mt-5 bg-dark p-5 rounded-5' onSubmit={handleSubmit}>
    <div class="mb-3">
    <label for="exampleInputEmail1" class=" form-label text-white">Name</label>
    <input  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={e=>setName(e.target.value)}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class=" form-label text-white">Username</label>
    <input  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username} onChange={e=>setUsername(e.target.value)}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class=" form-label text-white">Email</label>
    <input  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e=>setEmail(e.target.value)}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class=" form-label text-white">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={e=>setPassword(e.target.value)} />
  </div>
  <div className='text-center'>
  <button type="submit" class="btn btn-primary btn-lg mt-3">SignUp</button>
  </div>
</form>
</div>
  )
}

export default Register
