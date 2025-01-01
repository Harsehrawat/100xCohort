import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PostComponent } from './post'


function App() {

  const [posts,setPosts] = useState([]);
  // loaded posts into posts array.
  function addPost(){
    setPosts([...posts,{
      name : "Harsh",
      image : "https://images.unsplash.com/photo-1497899236524-c79659901d7c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGFuaW1hbHN8ZW58MHx8MHx8fDA%3D",
      subtitle : "128 Followers",
      time : "2 min ago",
      description : "Harsh is the youngest brother out of 4"
      }
    ])
  };

  // 2nd part is to create a postComponent out of postObject

  const postComponent = posts.map(post => <PostComponent 
    name={ post.name}
    image = {post.image}
    subtitle={ post.subtitle}
    time={ post.time}
    description={ post.description}
    />
  );

  return (
    // Apply inline styles to the div element
    
    <div style={ {background : "#dfe6e9"}}>
      <button onClick={addPost}>Add Post</button>
      <div style={{display : "flex", justifyContent : "center" , flexDirection : 'column'}}>
        <div>
          {postComponent}
        </div>
        <div>
          <PostComponent
          name={"Akash"}
          image= {"https://media.istockphoto.com/id/1341341634/photo/cute-baby-chimpanzee-portrait.jpg?s=612x612&w=0&k=20&c=UK7b8hsMQL30ma_6XEL7MN6khgUyDXKRxTpkY_JaSek="}
          subtitle={"1293 Followers"}
          time={"active now"}
          description={"Akash is second youngest brother"}
          />
        </div>
        <div>
          <PostComponent
          name={"Sumit"}
          image= {"https://images.ctfassets.net/hrltx12pl8hq/1D85eAdM0IhXrEYsoOt7Ut/107424ea3e7e10ab3203446dae175cf7/3_jungle_animals.webp"}
          subtitle={"Promoted"}
          // here time is missing n i've to handle this case .
          description={"Sumit is only younger to Ravi"}
          />
        </div>
        <div>
          <PostComponent
          name={"Ravi"}
          image= {"https://cdn.britannica.com/71/149571-050-C33E9F0F/Brown-bear-Finland.jpg?w=920&h=518&c=crop"}
          subtitle={"600 Followers"}
          time={"1 hr ago"}
          description={"Ravi is the oldest brother"}
          />
        </div>
      </div>
    </div>
    
);
}

export default App
