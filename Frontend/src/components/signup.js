import React from 'react';
import { Helmet } from 'react-helmet';
export default class Signup extends React.Component{
constructor(props) {
    super(props);
    this.state = {
        em:"",
        us:"",
        pass:""
    };
}
componentDidMount(){
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
  const newLocal = '#';
  const submitform=(event)=>{
    event.preventDefault();
    var data={"username":this.state.us,"password":this.state.pass,"email":this.state.em};
    var headers = {
      "Content-Type": "application/json",                                                                                                
   }   
    fetch("http://localhost:3000/auth/register", {
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
          window.location='/login';
        }else{
          console.log("Error");
        }
    });
    }
  return (
    <>
    { <Helmet>
      <link rel="stylesheet" href="./css/signup.module.css" /> 
    </Helmet> } 
    <div className="App">
      <div className="form-container">
        <img src="./images/logo.jpg" alt="Connectify Logo" className="logo" />
        <h1 className="app-name">Connectify</h1>
        <div className='container'>
          <h2>Signup</h2>
          <form onSubmit={submitform}>
            <div className="txt_field"><input type="email" name="email" onChange={(event)=>{this.state.em=event.currentTarget.value}} required /><label> Email </label></div>
            <div className="txt_field"><input type="text" name="text" onChange={(event)=>{this.state.us=event.currentTarget.value}} required /><label>Username</label></div>
            <div className="txt_field"><input type="password" name="password" onChange={(event)=>{this.state.pass=event.currentTarget.value}} required /><label>Password</label></div>
            <input name="submit" type="Submit" value="Sign Up" />
          </form>
          <button className="login-button"> <a href="./login"> Go to Login</a></button>
        </div>
      </div>
    </div>
    </>
  );
    }
}
