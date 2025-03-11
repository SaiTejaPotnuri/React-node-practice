exports.AuthController = (req, res) => {
    const { userName, password } = req.body;
    const token = JSON.stringify(userName);
    console.log("Came here in bussiness logic")
    if(isValidUser(userName, password)){     
        res.json({ 
            success : true,
            token : token,
            message : "login successfull",
            user : {
                name : userName
            }
        });
    }else{
        res.status(400).json({
            success : false,
            message : "Bad request",
        })
    }
}

let isValidUser = (userName, password) => userName == "testing@yopmail.com" && password == "Test@1234";
