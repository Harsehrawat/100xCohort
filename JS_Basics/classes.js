class rectangle{
    constructor(width , height){
        this.height = height;
        this.width = width;
    }
    
    area(){
        return this.height*this.width;
    }
}

// creating instant obj. for this class.

const rect  = new rectangle(2,4);
console.log(rect.area());

// let's dive into inheritance 
class Shape{
    constructor(colour){
        this.colour = colour;
    }
    area(){
        throw new Error("area can't be implemented into shape class, try calling inherited classes ");
    }
    paint(){
        console.log("painting with color : "+this.colour);
    }
}

class square extends Shape{
    constructor(side,colour){
        super(colour);
        this.side = side;
        
    }
    area(){
        console.log("area of square is : "+this.side*this.side);
    }
}

class circle extends Shape{
    constructor(radius,colour){
        super(colour);
        this.radius = radius;
        
    }
    area(){
        console.log("area of circle is : "+this.radius*this.radius+"pi");
    }
    paint(){
        console.log("this has paint : "+this.colour);
    }
}

// i want to get area of circle and color we are using to paint it 
let p = new circle(2,"red");
p.area();
p.paint();
