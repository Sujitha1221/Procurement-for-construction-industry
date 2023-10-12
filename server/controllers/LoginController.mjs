import User from "../models/User.mjs"
import logger from "../utils/logger.mjs";
import bcrypt from "bcrypt";


const LoginController = {
Login:async (req,res) => {
    const{empId,password} = req.body;

    try{
        const user = await User.findOne({empId:empId})
        console.log(user);

        if(user){
            bcrypt.compare(password,user.password,(err,response) => {
                if(response){

                    if(user.role == "procurement")
                        res.json({type:"procurement",user})
                    else if(user.role == "accountant")
                    res.json({type:"accountant",user})
                    else if(user.role == "senior")
                    res.json({type:"senior",user})
                }
            else{
                res.json("Invalid Password")

            }})
         
                
        }
    }catch(e){
        res.json("No")
    }

}

};


export default LoginController;