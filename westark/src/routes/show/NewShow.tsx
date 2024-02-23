// This Page is for entering the info for a new show object and submiting it to the api.

import { Form, NavLink, redirect } from 'react-router-dom';
import type { ActionFunction } from 'react-router';

// Create a show in database and return to the list of shows.
const action: ActionFunction = async ({ params, request }) => {
  try {
    const formData: FormData = await request.formData();

    const data: Show = {
      season: params.season as string,
      start_date: formData.get('start_date') as string,
      identifier: formData.get('identifier') as string,
    };

    const response = await fetch('http://localhost:3001/api/show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error();

    return redirect(`..`);
  } catch (error) {
    throw new Error('Failed to create Show into database.');
  }
};

export default function NewShow() {
  return (
    <>
      <Form method="post" id="show-form">
        <input type="date" name="start_date" />
        <input type="text" name="identifier" />
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

NewShow.action = action;
