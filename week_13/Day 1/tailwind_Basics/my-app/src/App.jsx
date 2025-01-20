import React from 'react';
import { Button } from './Components/Button'; // Adjust the path to where Button is located.
import { Input } from './Components/Input'; // Adjust the path to where Input is located.

export default function App() {
  return (
    <div className="h-screen bg-blue-600 flex flex-col justify-center items-center space-y-4">
      <Input type="text" placeholder="Username" className="bg-blue-200 outline-none px-8 py-3 " />
      <Button intialText={"sign-in"} finalText={"continue"}>
      </Button>
    </div>
  );
}
