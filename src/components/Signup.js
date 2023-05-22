import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"" ,email: "", password: "" ,cpassword:""})
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const{name,email,password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        
        if (json.success){
          props.showAlert("Account Created Successfully" , "success")
            // Save the auth token and redirecd
            localStorage.setItem('token' , json.authToken);
            navigate("/");
        }
        else{
            props.showAlert("Email address already exists" , "danger")
        }
    }

    const onchange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className="container">
      <h2>Create an Account to use BIT Notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onchange}
            name="name"
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onchange}
            name="email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        
     <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            name="password"
            required
            minLength={5}
            onChange={onchange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="cpassword"
            name="cpassword"
            required
            minLength={5}
            onChange={onchange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
