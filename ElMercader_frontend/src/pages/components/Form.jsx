import { useState } from "react"
import LoginInput from "../login/LoginInput";

function Form({ initialValues, onSubmitHandler, children }) {
    const [ person , setPerson ] = useState({...initialValues});
    

    function onChangeHandler({ target : { name, value } }) {
        setPerson((p) => {
            return {
                ...person,
                [name]: value
            }
        })
    }

    function onSubmit(event) {
        event.preventDefault();

        onSubmitHandler(person);
    }

    // const filled = Object.values(person).reduce((filled, value) => {
    //     return (filled && !!value)
    // }, true)

    return (
        <>
            <form id="LoginForm" onSubmit={onSubmit}>
                <div className="FormField">
                    {
                        Object.entries(person).map(
                            ([key, val]) => {
                                return <LoginInput key={key} name={key} value={val} onChangeHandler={onChangeHandler} />
                            }
                        )
                    }
                </div>
                {children}
            </form>
        </>
    )
}

export default Form;