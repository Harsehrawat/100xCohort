import Link from "next/link";

export default function Home(){
    return(
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div>
                    ToDo Application
                </div>
                <div>
                    <Link href="/signup"> Sign-up ToDo App</Link>
                </div>
                <div>
                    <Link href="/signin"> Sign-in ToDo App</Link>
                </div>
            </div>

        </div>
    )
}