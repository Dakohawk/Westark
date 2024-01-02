import {
    Form
} from "react-router-dom";

export default function Login() {
    return (
        <>
            <div id="sub-header">
                <h2>Create Year Database Entry</h2>
            </div>
            <div id="username">
                <span>Year:</span>
                <input
                    type="text"
                    name="first"
                    defaultValue={null}
                />
            </div>
            <div id="password">
                <span>Import From:</span>
                <input
                    type="text"
                    name="password"
                    defaultValue={null}
                />
            </div>
            <div id="submit">
                <button type="submit">Create</button>
            </div>
            <div id="back-to-home-page">
                <Form action="../admin">
                    <button type="submit">Back</button>
                </Form>
            </div>
        </>
    );
  }