import "./LoginSignUpInput.scss";

function LoginSignUpInput({ label, name, type }) {
    return (
        <div className="">
            <label htmlFor={name} className="">
                {label}
            </label>
            <input type={type} id={name} name={name} className="" />
        </div>
    );
}

export default LoginSignUpInput;