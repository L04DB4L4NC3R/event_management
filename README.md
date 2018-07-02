# Event Manager

<br />

## Request and response table

___

<br />


|  Route    |        Headers           | Type of request  |       Data              |  Response  |
| --------- |:---------------:|:-----------------:|:-----------------------:|:----------:|
| /| - | GET |        -          |     Welcome message |
| /user/login | - | GET | - | {message:"please login to continue"} | 
| /user/login |        -         | POST | {name:String,passwd:String} | {token:String,name:String}|
| /user/signup |        -        |POST | {name:String,passwd:String,confirm:String} | {token:String,name:String}|
| /artist/login |        -        | POST | {name:String,passwd:String} | {token:String,name:String}|
| /artist/signup |        -      | POST | {name:String,passwd:String,type:String,rate:Number,location:String} | {token:String,name:String}|
| /artist/main |        Authorization    | GET | - | {bookings:{user:String,description:String,date:String,time:String,address:String}} | 
| /user/search |         Authorization       | POST | {query:String} | {name:String,type:String,bookings:[booking]rate:Number,location:String} | 
| /user/book |        Authorization      | POST | {name:String,description:String,artist:String,id:String,date:dd/mm/yy,time:String,address:String} | {message:"Event has been booked"}|
| /user/delete/:id |        Authorization|        GET |  id of artist as GET parameter | {message:"Event booking is cancelled"} |
| /user/unregister | Authorization | GET |  -  | redirected to welcome page |
| /artist/unregister | Authorization | GET |  -  | redirected to welcome page  |
| /user/main | - | POST | optional {rate:"1000-2000",rating:5} |  { data: [ {name:String,type:String,bookings:[booking]rate:Number,location:String,rating:Number,city:String} ]  }|
| /user/cart | Authorization | POST | {name:String,description:String,artist:String,id:String,date:dd/mm/yy,time:String,address:String} | {message:"artist has been added to cart"}|
| /user/cart | Authorization | GET | - | {data:[ {name:String,description:String,artist:String,id:String,date:dd/mm/yy,time:String,address:String}, ]} |
| /user/rate | Authorization | POST | {id:"Artist ID,rating:Number} | {rating:User rating Number} | 
| /user/search/:city | - | GET | city as GET parameter |  { data: [ {name:String,type:String,rate:Number,location:String,rating:Number,city:String} ]  }|