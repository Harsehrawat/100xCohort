import { Button } from "../Components/ui/Button";
import { Input } from "../Components/ui/Input";

export function LogIn(){
    return <div className="h-100 w-full flex justify-center items-center">
        <div className="bg-white rounded-md text-black border p-2">
            <Input placeholder="username"/>
            <Input placeholder="password"/>
            <div className="flex justify-center">
                <Button variant="primary" text="log in" italic/>
            </div>
        </div>

    </div>
}