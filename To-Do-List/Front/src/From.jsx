import axios from 'axios';
import React, { useEffect, useState } from 'react';

const From = () => {
    const [data, setData] = useState([]);
    const [edit, setedit] = useState(false)
    const fetchData = () => {
        axios.get("http://localhost:8000/getdata")
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(err => console.log(err));
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        add: '' // Changed 'address' to 'add'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/addUser', formData)
            .then(response => {
                console.log("User added:", response.data);
                fetchData(); // Refresh the table data
                setFormData({
                    name: '',
                    email: '',
                    number: '',
                    add: '' // Reset 'add'
                });
            })
            .catch(error => console.log("Error adding user:", error));
    };

    const deleteUser = (id) => {
        axios.delete(`http://localhost:8000/deleteuser/${id}`)
            .then(() => {
                console.log(`User with id ${id} deleted`);
                alert("Data Deleted successfully");
                fetchData(); // Refresh the table data
            })
            .catch(error => console.log('Error deleting user:', error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>CRUD Operation</h1>
            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="add" // Changed 'address' to 'add'
                        value={formData.add}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            {/* Table */}
            <div>
                <h2>Data Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((el) => (
                                <tr key={el.id}>
                                    <td>{edit ? <input type="text" /> : el.name}</td>
                                    <td>{edit ? <input type="text" /> : el.email}</td>
                                    <td>{edit ? <input type="text" /> : el.number}</td>
                                    <td>{edit ? <input type="text" /> : el.add}</td> {/* Changed 'address' to 'add' */}
                                    <td>
                                        {editId === el.id ? (
                                            <>
                                                <button type="button" onClick={handleSubmit}>Save</button>
                                                <button type="button" onClick={handleCancelEdit} style={{ marginLeft: "10px" }}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditClick(el)}>Edit</button>
                                                <button onClick={() => deleteUser(el.id)} style={{ marginLeft: "10px" }}>Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default From;
