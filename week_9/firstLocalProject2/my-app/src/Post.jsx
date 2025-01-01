const style = {
    width: 250,
  backgroundColor: "white",
  borderRadius: 10,
  borderColor: "gray",
  borderWidth: 1,
  padding: 20,
  margin: 10
};

export function PostComponent({name,image,subtitle,time,description}){
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