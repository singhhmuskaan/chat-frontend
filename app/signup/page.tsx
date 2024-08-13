"use client"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useAuth} from "@/services/auth";

export default function Signup() {
    const {loginOrSignup} = useAuth('register');
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = event.target;
        const data = {
            username: formData.username.value,
            email: formData.email.value,
            password: formData.password.value
        };
        loginOrSignup(data);
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-90">
                <div className="shadow p-5 mb-5 bg-white rounded">
                    <h2 className="text-center">Signup</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}
