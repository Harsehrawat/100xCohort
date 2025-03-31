
interface InputProps{
    variant : "login/signin",
    placeholder : string,
    ref? : any
}

const variantStyle = {
    "login/signin" : "hover:border-orange-400 p-2 rounded-md"
}

const defaultStyle = "m-2";

export const Input=( props : InputProps)=>{
    return <div>
        <input type="text" placeholder={props.placeholder} ref={props.ref} className={`${variantStyle[props.variant]} ${defaultStyle}`} />
    </div>
}