
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BookDetails = () => {

    const [bookDetails, setBookDetails] = useState({});
    const { id } = useParams();
    async function getBookDetails() {
        try {
            const getBookDetailsWithId = await axios.get(`http://localhost:8080/book/getBookById/${id}`);
            setBookDetails(getBookDetailsWithId.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBookDetails();
    }, [])
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card lg:card-side bg-base-100 shadow-xl h-96">
                <figure className='w-[50%]'>
                    <img
                        src={bookDetails.image}
                        alt="Album" className='h-full w-full' />
                </figure>
                <div className="card-body flex items-center justify-between">
                    <h2 className="card-title">Title: {bookDetails.title}</h2>
                    <h2 className="card-title">Author: {bookDetails.author}</h2>
                    <p><strong>Description</strong>: {bookDetails.description}</p>
                    <p><strong>Price</strong>: {bookDetails.price}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BookDetails