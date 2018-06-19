# Event Manager

<br />

## Request and response table

___

<br />


|  Route    |  Type of request  |       Data              |  Response  |
| --------- |:-----------------:|:-----------------------:|:----------:|
| /| GET | - | Welcome message |
| /user/login | POST | {name:String,passwd:String} | {token:String,name:String}|
| /user/signup | POST | {name:String,passwd:String,confirm:String} | {token:String,name:String}|
| /artist/login | POST | {name:String,passwd:String} | {token:String,name:String}|
| /artist/signup | POST | {name:String,passwd:String,confirm:String} | {token:String,name:String}|
| /artist/main | GET | - | {bookings:{user:String,description:String,date:String,time:String,address:String}} | 
| /user/search | POST | {name:String} | {name:String,passwd:String,type:String} | 
| /user/book | POST | {name:String,description:String,artist:String,id:String,date:dd/mm/yy,time:String,address:String} | {message:"Event has been booked"}|
| /user/delete/:id | GET |  id of artist as GET parameter | {message:"Event booking is cancelled"} |