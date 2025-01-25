import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInput: "",
            list: [], // Ensure it's always initialized as an array
        };
    }

    // Fetch all items from the backend on component mount
    componentDidMount() {
        this.getAllTodos();
    }

    // Fetch all todos
    getAllTodos = async () => {
        try {
            const response = await axios.get("http://localhost:8080/todo/get");
            if (Array.isArray(response.data)) {
                this.setState({ list: response.data });
                if (response.data.length === 0) {
                    toast.info("Notes not found");
                }
            } else {
                throw new Error("Invalid response: Expected an array");
            }
        } catch (error) {
            toast.error("Error fetching notes");
            console.error(error);
            this.setState({ list: [] }); // Ensure the list is an array even if the API call fails
        }
    };

    // Add a new todo
    addItem = async () => {
        if (this.state.userInput.trim() === "") {
            toast.warning("Please enter a valid note");
            return;
        }

        const newTodo = { value: this.state.userInput };
        try {
            const response = await axios.post("http://localhost:8080/todo/create", newTodo);
            this.setState((prevState) => ({
                list: [...prevState.list, response.data],
                userInput: "",
            }));
            toast.success("Note added successfully");
        } catch (error) {
            toast.error("Error adding note");
        }
    };

    // Delete a todo
    deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/todo/delete/${id}`);
            this.setState((prevState) => ({
                list: prevState.list.filter((item) => item.id !== id),
            }));
            toast.success("Note deleted successfully");
        } catch (error) {
            toast.error("Error deleting note");
        }
    };

    // Edit a todo
    editItem = async (id) => {
        const editedTodo = prompt("Edit the todo:");
        if (editedTodo === null || editedTodo.trim() === "") {
            toast.warning("Edit canceled or empty input");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/todo/update/${id}`, {
                value: editedTodo,
            });
            this.setState((prevState) => ({
                list: prevState.list.map((item) =>
                    item.id === id ? { ...item, value: response.data.value } : item
                ),
            }));
            toast.success("Note updated successfully");
        } catch (error) {
            toast.error("Error updating note");
        }
    };

    render() {
        return (
            <Container>
                {/* Toast Container for notifications */}
                <ToastContainer />
                <Row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "3rem",
                        fontWeight: "bolder",
                    }}
                >
                    TODO LIST
                </Row>

                <hr />
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Add item . . ."
                                size="lg"
                                value={this.state.userInput}
                                onChange={(item) =>
                                    this.setState({ userInput: item.target.value })
                                }
                                aria-label="Add something"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup>
                                <Button
                                    variant="dark"
                                    className="mt-2"
                                    onClick={this.addItem}
                                >
                                    ADD
                                </Button>
                            </InputGroup>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        {this.state.list.length === 0 ? (
                            <p style={{ textAlign: "center", fontSize: "1.2rem", color: "gray" }}>
                                Notes not found
                            </p>
                        ) : (
                            <ListGroup>
                                {this.state.list.map((item) => (
                                    <ListGroup.Item
                                        key={item.id}
                                        variant="dark"
                                        action
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        {item.value}
                                        <span>
                                            <Button
                                                style={{ marginRight: "10px" }}
                                                variant="light"
                                                onClick={() => this.deleteItem(item.id)}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="light"
                                                onClick={() => this.editItem(item.id)}
                                            >
                                                Edit
                                            </Button>
                                        </span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
