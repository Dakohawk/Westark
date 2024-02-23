// This Page is for entering the info for a new exhibitor object and submiting it to the api.

import { Form, NavLink, redirect } from 'react-router-dom';
import type { ActionFunction } from 'react-router';

// Create a new exhibitor in database and return to the list of exhibitors.
const action: ActionFunction = async ({ params, request }) => {
  try {
    const formData: FormData = await request.formData();

    const data: Exhibitor = {
      season: params.season as string,
      name: formData.get('name') as string,
      age: formData.get('age') as string,
    };

    const response = await fetch('http://localhost:3001/api/exhibitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error();

    return redirect(`..`);
  } catch (error) {
    throw new Error('Failed to create Exhibitor into database.');
  }
};

export default function NewExhibitor() {
  return (
    <>
      <Form method="post" id="show-form">
        <input type="text" name="name" />
        <input type="text" name="age" />
        <p>
          <button type="submit">Save</button>
          <NavLink to="..">
            <button type="button">Cancel</button>
          </NavLink>
        </p>
      </Form>
    </>
  );
}

NewExhibitor.action = action;
