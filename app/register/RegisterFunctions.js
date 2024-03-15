'use client'
import "./RegisterFunctions.css"
import {useState} from "react";
import crypto from "crypto"

export function RegisterSign(){
    return(
        <div>
            <h1 className="RegisterSign">Register Here</h1>
        </div>
    );
}

export function RegisterInputs(){
    const [username,changedUsername] = useState("")
    const [password,changedPassword] = useState("")
    const [email,changedEmail] = useState("")
    const [firstName,changedFirstName] = useState("")
    const [confirmPassword,changedConfirmPassword] = useState("")
    const [age,changedAge] = useState("")
    const [dontMatch, ChangedDontMatch] = useState("")

    return(
        <div className="MainFlex">
            <div className="InnerFlex">

             <div className="Left">
                <div className="Flex">
                    <label>Username</label>
                    <input type="text" className="Input" value={username}
                           onChange ={event => onChangeFunctionUsername(event,changedUsername)}/>
                </div>
                 <div className="Flex">
                     <label>Email</label>
                     <input type="text" className="Input" value={email}
                            onChange ={event => onChangeFunction(event,changedEmail)}/>
                 </div>
                 <div className="Flex">
                     <label>Password</label>
                     <input type="text" className="Input" value={password}
                            onChange ={event => onChangeFunction(event,changedPassword)}/>
                 </div>
            </div>

            <div className="Right">
                <div className="Flex">
                    <label>First Name</label>
                    <input type="text" className="Input" value={firstName}
                           onChange ={event => onChangeFunction(event,changedFirstName)}/>
                </div>
                <div className="Flex">
                    <label>Age</label>
                    <input type="text" className="Input" value={age}
                           onChange ={event => onChangeFunction(event,changedAge)}/>
                </div>
                <div className="Flex">
                    <label>Confirm Password</label>
                    <input type="text" className="Input" value={confirmPassword}
                           onChange ={event => onChangeFunction(event,changedConfirmPassword)}/>
                </div>
            </div>
        </div>
            <div className="passwordsDontMatch"><h5>{dontMatch}</h5></div>
       <input type="submit" onClick={async function inside (){
           var value = await registerInformation(username,password,confirmPassword,age,firstName,email,ChangedDontMatch);
           switch (value) {
               case 0:
                   ChangedDontMatch("Your passwords do not match")
                   break;
               case 10:
                   ChangedDontMatch("Username is empty");
                   break;
               case 20:
                   ChangedDontMatch("Password is empty");
                   break;
               case 30:
                   ChangedDontMatch("Your Confirmed Password is empty");
                   break;
               case 40:
                   ChangedDontMatch("Age is empty");
                   break;
               case 50:
                   ChangedDontMatch("First name is empty");
                   break;
               case 60:
                   ChangedDontMatch("email is empty");
                   break;
           }
       }}
              className="Submit" value="Submit"/>
    </div>
    );
}

function onChangeFunction(event, inputState){
    inputState(event.target.value)
}
function onChangeFunctionUsername(event, inputState){
    let x = event.target.value
    inputState(x)
    var matches = x.match(/\d+/g);
    if (matches != null) {
        
    }
}
async function registerInformation(username,password,confirmPassword,age,firstName,email,ChangedDontMatch){
    if(username === ""){
        return 10
    }
    if(password === ""){
        return 20
    }
    if(confirmPassword === ""){
        return 30
    }
    if(age === ""){
        return 40
    }
    if(firstName === ""){
        return 50
    }
    if(email === ""){
        return 60
    }

    var response;
    if (password !== confirmPassword){
        return 0;
    } else{
        ChangedDontMatch("")
        let hashedPassword = crypto.createHash("sha256").update(password).digest('hex')
            try{
                response =  await fetch('/api/register', {
                    method: 'POST', // Adjust the method as needed (GET, POST, etc.)
                    'Content-Type': 'application/json',
                    body: JSON.stringify({username : username,
                                                password : hashedPassword,
                                                age : age,
                                                firstName : firstName,
                                                email : email})
                });
            }
            catch (error){
                console.log(error);
            }
        }
    }