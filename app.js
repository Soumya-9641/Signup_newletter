const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.use(bodyParser.urlencoded({extended: true}));

app.post("/",function(req,res){
    const  firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
            email_address: email,
            status : "subscribed",
            merge_fields: {
                FNAME : firstname,
                LNAME: lastname
            }
            
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/a1d3f7c84a";
    const options = {
        method : "POST",
        auth: "soumya:870654f203a48c69909331f3e403498b-us18"
    }
     const request = https.request(url,options,function(response){
        if (response.statusCode ==200){
            res.sendFile(__dirname + "/success.html");
        } 
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
     })
     request.write(jsonData);
     request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 300,function(){
    console.log("Server is runnig on port 300");
});

//API KEY
//870654f203a48c69909331f3e403498b-us18

//app id 
//a1d3f7c84a
