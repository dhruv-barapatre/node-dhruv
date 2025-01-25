import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UserCard  from "./UserCard"

const User = () => {
    const [state, setstate] = useState({})
    const [statedata,setstatedata]=useState([])
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const fetchData = () => {
        if (role == "user") {
            axios.get(`${import.meta.env.VITE_URL}/User/${id}`).then((res) => {
                setstate(res.data.rest)
                console.log(res)
            })
                .catch((err) => {
                    console.log(err)
                })
        }
         if(role =="admin") {
            axios.get(`${import.meta.env.VITE_URL}/User`,{
                headers: {
                    'Content-Type':"application/json",
                    token:`Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                setstatedata(res.data.UserData)
            })
                .catch((err) => {
                    console.log(err)
                })

        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
        <h1>User Details</h1>

            {
                role=="admin"?
                    
                        statedata.map((el, index) => {
                             return  (  <UserCard  id={el._id} username={el.username} email={el.email}  role={role} dateOfBirth={el.dateOfBirth} location={el.location}   />)
                        })
                    
                :<UserCard id={state._id} username={state.username} email={state.email}  role={role} dateOfBirth={state.dateOfBirth} location={state.location} />
            }
        </div>
    )
}

export default User
