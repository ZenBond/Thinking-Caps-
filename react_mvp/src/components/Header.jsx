function Header({onHomeClick, onAddBookClick}) {
    function handleClick() {
        onHomeClick()
    }
    function handleAddClick() {
        onAddBookClick()
    }
     return (
        <header className="header">
            <button onClick={handleClick}><img src="home.png" alt="" /></button>
            <h3>Half Booked</h3>
            <button onClick={handleAddClick}>+</button>
        </header>
    )
}

export default Header