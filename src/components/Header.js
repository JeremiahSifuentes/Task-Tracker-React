import PropTypes from 'prop-types'
import Button from './Button'

//Bringing logic from onAdd and state showAdd to make visual changes
const Header = ({title, onAdd, showAdd}) => {
    
    return (
        <header className='header'>
            <h1>{title}</h1>
            {/* brought show add as prop  to be boolean for if statements changing tect and color onclick or when onAdd is fired from AddTask.js*/}
            <Button color={showAdd ? 'red' : 'green' } text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
