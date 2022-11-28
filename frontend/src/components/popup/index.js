import './index.css'

 const Popup = ({ setVisibility, title, content }) => {
    return <div className='base-popup-wrapper'>
        <div className="base-popup-container">
            <div className="popup-nav">
                <span className="pop-nav-title">{title}</span>
                <span style={{cursor: 'pointer'}} onClick={() => setVisibility(false)}>Close</span>
            </div>
            <div className="popup-content">
                {content}
            </div>
        </div>
    </div>
}

export default Popup;