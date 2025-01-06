import { useState, Component } from "react";

function App() {
    return (
        <div>
            <ClassCounter />
            <FunctionalCounter />
        </div>
    );
}

// Create a class-based component ClassCounter that will render a div element with a count property
class ClassCounter extends Component {
    // Create a state object with a count property set to 0
    state = { count: 0 };

    increment = () => {
        // Set the state of the count property to the current count plus 1 using setState method
        this.setState({ count: this.state.count + 1 });
    };

    // Render the JSX that will be rendered in the browser
    render() {
        return (
            <div>
                {/* Render the count property from the state object */}
                <p>Count: {this.state.count}</p>

                <button onClick={this.increment}>Increment</button>
            </div>
        );
    }
}


const FunctionalCounter = () => {
    const [count, setCount] = useState(0);

    function increment() {
        setCount((count) => count + 1);
    }

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};

export default App;