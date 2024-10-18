import axios from 'axios';
import React, { useEffect, useState } from 'react';

const From = () => {
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        number: '',
        add: ''
    });

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
        add: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/addUser', formData)
            .then(response => {
                console.log("User added:", response.data);
                fetchData();
                setFormData({
                    name: '',
                    email: '',
                    number: '',
                    add: ''
                });
            })
            .catch(error => console.log("Error adding user:", error));
    };

    const handleEditSubmit = (id) => {
        axios.put(`http://localhost:8000/editUser/${id}`, editFormData)
            .then(response => {
                console.log("User updated:", response.data);
                fetchData();
                setEditId(null); // Exit edit mode
            })
            .catch(error => console.log("Error updating user:", error));
    };

    const handleEditClick = (el) => {
        setEditId(el.id);
        setEditFormData({
            name: el.name,
            email: el.email,
            number: el.number,
            add: el.add
        });
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditFormData({
            name: '',
            email: '',
            number: '',
            add: ''
        });
    };

    const deleteUser = (id) => {
        axios.delete(`http://localhost:8000/deleteuser/${id}`)
            .then(() => {
                console.log(`User with id ${id} deleted`);
                alert("Data Deleted successfully");
                fetchData();
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
                        name="add"
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
                                    <td>
                                        {editId === el.id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editFormData.name}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            el.name
                                        )}
                                    </td>
                                    <td>
                                        {editId === el.id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editFormData.email}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            el.email
                                        )}
                                    </td>
                                    <td>
                                        {editId === el.id ? (
                                            <input
                                                type="text"
                                                name="number"
                                                value={editFormData.number}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            el.number
                                        )}
                                    </td>
                                    <td>
                                        {editId === el.id ? (
                                            <input
                                                type="text"
                                                name="add"
                                                value={editFormData.add}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            el.add
                                        )}
                                    </td>
                                    <td>
                                        {editId === el.id ? (
                                            <>
                                                <button type="button" onClick={() => handleEditSubmit(el.id)}>Save</button>
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
