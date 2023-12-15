function SingleBook({singleBook}) {
    return (
        <div>
            <img className='book-img' src={singleBook.picture} alt={singleBook.title} />
            <h3>{singleBook.title}</h3>
            <p>{singleBook.author}</p>
            <div>
                <p>{singleBook.summary}</p>
                <p>${singleBook.price}</p>
            </div>
        </div>
    )
}

export default SingleBook