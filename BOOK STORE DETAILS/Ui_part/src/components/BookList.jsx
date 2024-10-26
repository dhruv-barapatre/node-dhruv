import { Disclosure } from '@headlessui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';


const BookList = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    console.log(books)
    const getBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/book/getBooks');
            if (response.status === 200) {
                setBooks(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteBook = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/book/deleteBook/${id}`);
            if (response.status === 200) {
                toast.success(response.data);
                getBooks();
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    }
    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-t-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* <div className="flex h-16 items-center justify-between">
                    </div> */}
                </div>
            </Disclosure>

            <header className="bg-gray-50 shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Book Store</h1>
                    <button className='btn' onClick={() => navigate('/book-form')}>Add Book</button>
                </div>
            </header>
            <main style={{width:"100%"}}>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center flex-wrap bg-white">
                    {books.length > 0 ? books.map((el, index) => (
                        <div className="card bg-gray-300 w-96 h-[400px] shadow-xl mt-3 me-3" key={el._id}>
                            <NavLink to={`/book-details/${el._id}`} className='overflow-hidden h-[350px]'>
                                <figure className='h-full w-full overflow-hidden rounded'>
                                    <img
                                        src={el.image}
                                        alt="Not Found" className='h-full ' />
                                </figure>
                            </NavLink>
                            <div className="card-body">
                                <h2 className="card-title">Book Title: {el.title}</h2>
                                <p><strong>Author</strong>: {el.author}</p>
                                <p>{el.description}</p>
                                <h3 className='card-title m-auto'>Price: &#8377; {el.price}</h3>
                                <div className="card-actions justify-center">
                                    <Link to={`/book-form/${el._id}`}><button className='btn btn-primary'>Edit</button></Link>
                                    <button className="btn btn-error text-white" onClick={() => deleteBook(el._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )) : <h1>No Any Book Available</h1>}
                </div>

            </main >
        </div >
    )
}


export default BookList