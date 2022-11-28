
import './index.css'

const Button = ({ className, onClick, style, text, isDisabled }) => {
    return <button
        className={'btn ' + className}
        style={style}
        onClick={onClick}
        disabled={isDisabled}
    >
        {text}
    </button>
}

export default Button;