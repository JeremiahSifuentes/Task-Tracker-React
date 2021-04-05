import {useState} from 'react'

// Logic for adding task to show on ui
const AddTask = ({onAdd}) => {
    //Setting State of AddTask
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    //Updating state when form is submitted
    // We dont call on add directly
    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert('Please Add Task')
            return
        }
        // OnAdd grabs value being typed in and sends it as props to App.js
        onAdd({text, day, reminder})

        // Resets input fields after onSubmit
        setText('')
        setDay('')
        setReminder(false)

    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                {/* onChange tracks changes happening in input field 
                    Value is the prop I created
                    setText sets what is being changed in the input as the value onSubmit */}
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add a Day & Time' value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input type='submit' value='save task' className='btn btn-block'></input>
        </form>
    )
}

export default AddTask
