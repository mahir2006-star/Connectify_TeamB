import React from 'react';
import { Helmet } from 'react-helmet';
export default class Login extends React.Component{
constructor(props) {
    super(props);
    this.state = {
        us:"",
        pass:""
    };
}
componentDidMount() { 
  fetch("http://localhost:3000/user/profile",{
    credentials:'include'
  }) 
  .then(res => res.json()) 
  .then( 
    (response) => { 
      if(response.status!=0){
        window.location='/profile';
      }
    }, 
    (error) => { 
      console.log(error);
    } 
  ) 
}
  render(){
    const submitform=(event)=>{
    event.preventDefault();
    var data={"username":this.state.us,"password":this.state.pass};
    var headers = {
      "Content-Type": "application/json",                                                                                                
   }   
    fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        credentials:'include',
        headers: headers,
    })
    .then(function(response){ 
        return response.json(); 
    })
    .then(function(data){ 
        if(data.status==1){
          window.location='/profile';
        }else{
          console.log("Error");
        }
    });
    }
  return (
    <>
    { <Helmet>
      <link rel="stylesheet" href="./css/login.module.css" /> 
    </Helmet> } 
    <div className="login-container">
      <img src="./images/logo.jpg" alt="Logo" className="logo" />
      <h1 className="app-name">Connectify</h1>
      <div className='container'>
      <h2>Login</h2>
      <form onSubmit={submitform}>
            <div className="txt_field"><input type="text" name="text" onChange={(event)=>{this.state.us=event.currentTarget.value}} required /><label>Username</label></div>
            <div className="txt_field"><input type="password" name="password" onChange={(event)=>{this.state.pass=event.currentTarget.value}} required /><label>Password</label></div>
            <input name="submit" type="Submit" value="Login" />
      </form>
      <p>Not a Member? <a href="/signup">SignUp</a></p>
      <p><a href="#">Forget Password</a></p>
    </div>
    </div>
    </>
  );
    }
}
