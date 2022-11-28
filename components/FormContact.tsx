function FormContact(){
    return (
        <>
        <form>
            <div className="flex-row">
                <p>Un problème ?</p>
                <label>Name:
                <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </div>
        </form>
        </>
    )
}
export default FormContact