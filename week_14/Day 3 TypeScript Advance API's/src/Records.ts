// Records ->
interface User{
    name : string,
    age : number
}

type users = Record<string,User>;

const identify ={
    "id1" : {name : "Harsh" , age : 22},
    "id2" : {name : "uday" , age : 19}
}

console.log(identify['id1']);


// Maps ->
// interface User {
//     id: string;
//     name: string;
//   }
  
//   // Initialize an empty Map
//   const usersMap = new Map<string, User>();
  
//   // Add users to the map using .set
//   usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
//   usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });
  
//   // Accessing a value using .get
//   console.log(usersMap.get('abc123'));