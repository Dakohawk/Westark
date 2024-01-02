import {
    Form
} from "react-router-dom";

export default function Login() {
    return (
        <>
            <div id="sub-header">
                <h2>Admin Login</h2>
            </div>
            <div id="username">
                <span>Username:</span>
                <input
                    type="text"
                    name="first"
                    defaultValue={null}
                />
            </div>
            <div id="password">
                <span>Password:</span>
                <input
                    type="text"
                    name="password"
                    defaultValue={null}
                />
            </div>
            <div id="submit">
                <Form action="/admin">
                    <button type="submit">Login</button>
                </Form>
            </div>
            <div id="back-to-home-page">
                <Form action="/">
                    <button type="submit">Back to Home Page</button>
                </Form>
            </div>
        </>
    );
  }