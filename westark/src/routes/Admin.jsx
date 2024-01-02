import {
    Form
} from "react-router-dom";

export default function Index() {
    return (
        <>
            <div id="sub-header">
                <h2>Admin Tools</h2>
            </div>
            <div id="year-list">
                <h3>Edit Years</h3>
            </div>
            <div id="add-year">
                <Form action="year">
                    <button type="submit">Add Year</button>
                </Form>
            </div>
        </>
    );
  }

