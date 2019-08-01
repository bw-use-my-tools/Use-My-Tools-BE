** POST requests
1. Add a user and receive token
https://usemytools.herokuapp.com/api/auth/register

Upon receiving a token it's recommended to save it in local storage.

Example
All fields required except thumbnail_url

{
"first_name":"Test",
"last_name":"Test,
"username":"Test",
"password":"Test234",
"thumbnail_url" : "http://whatever.com"
}

1. Login an existing user and receive token
https://usemytools.herokuapp.com/api/auth/login

Upon receiving a token it's recommended to save it in local storage.

Example
all fields required
{
    username:"Test",
    password:"Test"
}

1. Add a tool
https://usemytools.herokuapp.com/api/tools

<h2>Example</h2>
userId, toolName, and price are required fields. If one of these is not specified in the request object, the tool will NOT be added to the database.

<code>
{ 
 "userId":"11", 
 "toolName":"saw", 
 "price":"10.50",
 "description":"see saw, slicin' and dicin'", 
 "imageUrl":"http://imgurl.com", 
 "isRented": 0
}
</code>


1. Add a tool to rented list
https://usemytools.herokuapp.com/api/toolrental

Example
All fields required (renter_id === user_id)

{
    renter_id:"1",
    tool_id:"1"
}

**Get requests

1. Get All Tools
http://https://usemytools.herokuapp.com/api/tools

1. Get tool by ID
(:id === toolId)
http://https://usemytools.herokuapp.com/api/tools/:id

1. Get all users
http://https://usemytools.herokuapp.com/api/users


1. Get user by ID
http://https://usemytools.herokuapp.com/api/users/:id

1. Get all rented tools
http://https://usemytools.herokuapp.com/api/toolrental

**Delete requests

1. Delete a user
http://https://usemytools.herokuapp.com/api/users/:id

1. Delete a tool
http://https://usemytools.herokuapp.com/api/tools/:id

1. Delete a rental from rented list
http://https://usemytools.herokuapp.com/api/toolrental/:id


**Update Requests

1. Update a user
https://usemytools.herokuapp.com/api/users/:id
Example
All fields required
{
first_name:"Test",
last_name:"Test,
username:"Test",
password:"Test234",
thumbnail_url:"http://test.com"
}

1. Update a tool
https://usemytools.herokuapp.com/api/tools/:id

Example
user_id, tool, and price are required fields

{
    user_id:1,
    tool:"hammer",
    price:"10.50",
    description:"Ya hit stuff, it gets nailed",
    image_url:"http://imgurl.com",
    is_rented:false
}