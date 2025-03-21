// Create a function component named App that will be rendered in the root element
function App() {
  // return JSX that will be rendered
  return (
      // Apply inline styles to the div element
      <div style={ {background : "#dfe6e9"}}>
        <div style={{display : "flex", justifyContent : "center" , flexDirection : 'column'}}>
          <div>
            <PostComponent 
            name={"Harsh"}
            image={"https://images.unsplash.com/photo-1497899236524-c79659901d7c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGFuaW1hbHN8ZW58MHx8MHx8fDA%3D"}
            subtitle={"128 Followers"}
            time={"2 min ago"}
            description={"Harsh is the youngest brother out of 4"}
            />
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

// Create a style object to apply styles to the div element in PostComponent
const style = {
  width: 250,
  backgroundColor: "white",
  borderRadius: 10,
  borderColor: "gray",
  borderWidth: 1,
  padding: 20,
  margin: 10
};

// Create a function component named PostComponent that will be rendered in the App component
function PostComponent({image ,name, subtitle, time,description}) {
  // return JSX that will be rendered
  return (
      // Apply style object to the div element
      <div style={style}>
        <div style={ {display : 'flex' , height: 70}}>
          <img src={image} alt="can't load" style={{height: '100%', width: 'auto', borderRadius: '5px'}}/>
          <div style={ {marginLeft : 10 , fontSize : 16}}>
            <b>{name}</b>
            <div>{subtitle}</div>
            {/* // now for time i've to opt for conditional rendering  */}
            {time !==undefined ? <div style={{display : "flex"}}>
              <div>{time}</div>
              <img src="https://media.istockphoto.com/id/1267200399/vector/clock-vector-icon-isolated-on-white-background-outline-thin-line-clock-icon-for-website.jpg?s=612x612&w=0&k=20&c=JabL97PMMJ6k0PtY2BmUWMBI5kjNCnu5fnAoAwByrQQ=" alt="clock icon" style={{width : 20, height : 20 , marginTop : 3}}/>
            </div> : null}
          </div>
        </div>
        <div style={{marginTop : 10}}>
          {description}
        </div>
      </div>
      
  );
}

// Export App Component to use it in other components
export default App;