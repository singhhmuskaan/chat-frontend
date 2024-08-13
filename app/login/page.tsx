"use client"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Link from "next/link";
import {useAuth} from "@/services/auth";

export default function Login() {
    const {loginOrSignup} = useAuth('login');
    function handleLogin(event: any) {
        event.preventDefault();
        const formData = event.target;
        const data = {
            identifier: formData.identifier.value,
            password: formData.password.value
        };
        loginOrSignup(data);
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-90 ">
                <div className="shadow p-5 mb-5 bg-white rounded">
                    <h2 className="text-center">Login</h2>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="identifier">
                            <Form.Label>Email / username</Form.Label>
                            <Form.Control type="text" placeholder="Enter email or username"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                        <p>New? <Link href={'signup'}>Register</Link></p>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}
