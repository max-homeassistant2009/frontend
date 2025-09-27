interface ButtonProps {
    children?: React.ReactNode;
}

const Button = ({children}: ButtonProps) => {
    return <button>{children === undefined ? "Test" : children }</button>;
}

export default Button;