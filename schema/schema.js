const Artists = require("../db/model").artists;
const Users = require("../db/model").users;

const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLID,
    GraphQLSchema
} = graphql;



/**
 * @description TO hold booking data for artist
 */
const BookingType = new GraphQLObjectType({
    name:"BookingType",
    fields:()=>({
        user:{type:GraphQLString},
        description:{type:GraphQLString},
        date:{type:GraphQLString},
        time:{type:GraphQLString},
        address:{type:GraphQLString}
    })
})




/**
 * @description To hold artist type data and query
 */
const ArtistType = new GraphQLObjectType({
    name:"ArtistType",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        passwd:{type:GraphQLString},
        type:{type:GraphQLString},
        location:{type:GraphQLString},
        rate:{type:GraphQLFloat},
        rating:{type:GraphQLFloat},
        rated_users:{type:GraphQLInt},
        bookings:{
            type:new GraphQLList(BookingType),
            resolve(parent,args){
                let bookings = Artists.findById(parent.id);
                return bookings.bookings;
            }
        }
    })
})




/**
 * @description
 * 
 * User graph
 */

 const EventType = new GraphQLObjectType({
     name:"EventType",
     fields:()=>({
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        artist:{type:GraphQLString},
        date:{type:GraphQLString},
        time:{type:GraphQLString},
        address:{type:GraphQLString},
        id:{type:GraphQLID}
     })
 });



 const UserType = new GraphQLObjectType({
     name:"UserType",
     fields:()=>({
        name:{type:GraphQLString},
        passwd:{type:GraphQLString},
        id:{type:GraphQLID},
        events:{
            type:new GraphQLList(EventType),
            resolve(parent,args){
                let events = Users.findById(parent.id);
                return events.events;
            }
        },
        cart:{
            type:new GraphQLList(EventType),
            resolve(parent,args){
                let events = Users.findById(parent.id);
                return events.cart;
            }
        }
     })
 })







/**
 * @description Root queries-
 * 
 * 1. All Artists
 * 
 * 2. All Users
 * 
 * 3. Artists according to ID
 * 
 * 4. Users according to ID
 */


 const RootQuery = new GraphQLObjectType({
     name:"RootQuery",
     fields:()=>({
         artists:{
             type: new GraphQLList(ArtistType),
             resolve(parent,args){
                 return Artists.find({});
             }
         },
         users:{
             type: new GraphQLList(UserType),
             resolve(parent,args){
                 return Users.find({});
             }
         },
         artist:{
             type:ArtistType,
             args:{id:{type:GraphQLID}},
             resolve(parent,args){
                 return Artists.findById(args.id);
             }
         },
         user:{
            type: UserType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Users.findById(args.id);
            }
        }
     })
 })


 module.exports = new GraphQLSchema({
    query:RootQuery
 });