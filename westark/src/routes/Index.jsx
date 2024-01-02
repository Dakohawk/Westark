import {
    Form
} from "react-router-dom";

export default function Index() {
    return (
        <>
           <div id="anouncements">
                <p>Anouncements</p>
            </div> 
            <div id="show-year-list">
                <button type="submit">Year 2023-2024</button>
            </div>
            <div id="admin-portal">
                <Form action="login">
                    <button type="submit">Admin Login</button>
                </Form>
            </div>
        </>
    );
  }


  

