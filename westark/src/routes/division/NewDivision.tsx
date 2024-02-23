// This Page is for entering the info for a new division object and submiting it to the api.

import { Form, NavLink, redirect } from 'react-router-dom';
import type { ActionFunction } from 'react-router';

// Create a new division in database and return to the list of divisions.
const action: ActionFunction = async ({ params, request }) => {
  try {
    const formData: FormData = await request.formData();

    const data: Division = {
      season: params.season as string,
      description: formData.get('description') as string,
      start_age: formData.get('start_age') as string,
      end_age: formData.get('end_age') as string,
    };

    const response = await fetch('http://localhost:3001/api/division', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error();

    return redirect(`..`);
  } catch (error) {
    throw new Error('Failed to create Division into database.');
  }
};

export default function NewDivision() {
  return (
    <>
      <Form method="post" id="show-form">
        <input type="text" name="description" />
        <input type="text" name="start_age" />
        <input type="text" name="end_age" />
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

NewDivision.action = action;
