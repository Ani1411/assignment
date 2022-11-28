
import './index.css'

const Input = ({name, type, className, placeholder, value, onChange, style}) => {
    return <input
        className={'input ' + className} 
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        style={style}
        onChange={onChange}
    />
}

export default Input;