"use client"
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {SetStateAction, useEffect, useState} from "react";
import socket from "socket.io-client";
import {useAuth} from "@/services/auth";

export default function DashboardPage() {
    const {getUser, getToken} = useAuth();
    const user = getUser();
    const username = user?.username;
    const token = getToken();
    const [messages, setMessages] = useState<any>([]);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const io = socket("http://localhost:1337");//Connecting to Socket.io backend
    useEffect(() => {
        let welcome: any;
        io.emit("join", {username, token}, (error: any) => { //Sending the username to the backend as the user connects.
            if (error) return alert(error);
        });
        io.on("welcome", async (data, error) => {//Getting the welcome message from the backend
            let welcomeMessage = {
                user: data.user,
                message: data.text,
            };
            welcome = welcomeMessage;
            setMessages([welcomeMessage]);//Storing the Welcome Message
            await fetch("http://localhost:1337/api/messages", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })//Fetching all messages from Strapi
                .then(async (res) => {
                    const response = await res.json();
                    let arr = [welcome];
                    response.data.map((one: any) => {
                        arr = [...arr, one.attributes];
                        setMessages((messages: any) => arr);// Storing all Messages in a state variable
                    });
                })
                .catch((e) => console.log(e.message));
        });
        io.on("message", async (data, error) => {//Listening for a message connection
            await fetch("http://localhost:1337/api/messages", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
                .then(async (res) => {
                    const response = await res.json();
                    let arr = [welcome];
                    response.data.map((one: any) => {
                        arr = [...arr, one.attributes];
                        setMessages((messages: any) => arr);
                    });
                })
                .catch((e) => console.log(e.message));
        });
    }, [username]);
    const sendMessage = (message: string) => {
       
        if (message) {
            io.emit("sendMessage", {message, user: username, token}, (error: any) => {// Sending the message to the backend
                if (error) {
                    alert(error);
                }
            });
            setMessage("");
        } else {
            alert("Message can't be empty");
        }
    };
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setMessage(e.target.value);
    };
    const handleClick = (event: any) => {
        event.stopPropagation();
        sendMessage(message);
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-90">
                <Card style={{ width: '400px', height: '600px' }}>
                    <Card.Header className="text-center">
                        <strong>Chat App</strong>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column justify-content-between p-0">
                        <ListGroup variant="flush" className="flex-grow-1 overflow-auto" style={{ height: '400px' }}>
                            {messages.map((attributes: any, index: number) => (
                                <ListGroup.Item key={`msg-${index}`}>
                                    <strong>{attributes.user}</strong> {attributes.message}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <div className="p-3">
                            <Form onSubmit={handleClick}>
                                <Form.Group className="d-flex">
                                    <Form.Control type="text" name="message" placeholder="Type a message..." value={message} onChange={handleChange}/>
                                    <Button variant="primary" className="ml-2">Send</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
