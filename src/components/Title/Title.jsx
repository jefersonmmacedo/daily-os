
import './title.css'

function Title({children, name}) {
    return (
        <div className="title">
            {children}
            <h1>{name}</h1>
        </div>
    )
}

export default Title;