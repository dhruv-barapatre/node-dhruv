import React, { useEffect, useState } from "react";
import { FaPlus, FaTowerBroadcast } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdCancel, MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  const [data, setdata] = useState([]);
  const [isedit, setisedit] = useState("");
  const [istodo, setistodo] = useState([]);
  const [title, settitle] = useState("");
  const getdata = () => {
    axios
      .get("http://localhost:8080/todo/get")
      .then((data) => {
        setdata(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletetodo = (id) => {
    axios
      .delete(`http://localhost:8080/todo/delete/${id}`)
      .then((data) => {
        console.log(data.data);
        getdata();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addData = () => {
    if (!title) {
      alert("Please enter a task title!");
      return;
    }
    axios
      .post("http://localhost:8080/todo/create", { title })
      .then((data) => {
        console.log(data.data.message);
        toast.success(data.data.message);
        getdata();
        settitle("")
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const edittodo = (id) => {
    axios
      .put(`http://localhost:8080/todo/update/${id}`,{title:istodo})
      .then((data) => {
        getdata()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="center">
      <h1>To Do List</h1>
      <div className="add">
        <input
          type="text"
          placeholder="Enter a task here"
          className="addInput"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <button onClick={addData}>
          <FaPlus />
        </button>
      </div>
      <hr />
      {data.length > 0 ? (
        <table>
          <tbody>
            {data.map((el) => (
              <tr key={el._id}>
                <td className="t1">
                  {isedit == el._id ? (
                    <input
                      onChange={(e) => setistodo(e.target.value)}
                      type="text"
                      value={istodo}
                    />
                  ) : (
                    <p>{el.title}</p>
                  )}
                </td>
                <td className="t2">
                  {isedit == el._id ? (
                    <div>
                      <FaCheck onClick={() => {
                        setisedit("")
                        edittodo(el._id)
                      }} />
                      <MdCancel onClick={() => setisedit("")} />
                    </div>
                  ) : (
                    <div>
                      <MdModeEdit
                        onClick={() => {
                          setisedit(el._id);
                          setistodo(el.title);
                        }}
                      />
                      <MdDelete
                        onClick={() => {
                          deletetodo(el._id);
                        }}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center" }}>Data Not found...</p>
      )}
      <div className="lists"></div>
    </div>
  );
};

export default App;
