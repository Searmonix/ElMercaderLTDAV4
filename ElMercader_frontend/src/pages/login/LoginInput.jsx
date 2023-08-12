function LoginInput({ name, value, onChangeHandler }) {
    return (
        <div className="FormField">
            <label className="form-label">
                <h4><b>{(name && name[0].toUpperCase() + name.slice(1)) || ""}:</b></h4>
            </label>
            <input name={name} value={value} onChange={onChangeHandler}/>
            <span className="invalid-feedback" id={"ErrLog" + name[0].toUpperCase() + name.slice(1)} aria-live="polite"></span>
        </div>
    )
}

export default LoginInput;