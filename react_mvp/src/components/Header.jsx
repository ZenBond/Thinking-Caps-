function Header({onHomeClick, onAddBookClick}) {
    function handleClick() {
        onHomeClick()
    }
    function handleAddClick() {
        onAddBookClick()
    }
     return (
        <header className="header">
            <button onClick={handleClick}>Home</button>
            <h3>Half Booked</h3>
            <button onClick={handleAddClick}>Add Book</button>
        </header>
    )
}

export default Header