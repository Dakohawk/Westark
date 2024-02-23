// This Page is for entering the info for a new class object and submiting it to the api.

import { Form, NavLink, redirect } from 'react-router-dom';
import type { ActionFunction } from 'react-router';

// Create a new class in database and return to the list of classes.
const action: ActionFunction = async ({ params, request }) => {
  try {
    const formData: FormData = await request.formData();

    const data: ShowClass = {
      season: params.season as string,
      ride_order: formData.get('ride_order') as string,
      description: formData.get('description') as string,
      is_timed: formData.get('is_timed') as string,
      division: formData.get('division') as string,
    };

    const response = await fetch('http://localhost:3001/api/class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error();

    return redirect(`..`);
  } catch (error) {
    throw new Error('Failed to create ShowClass into database.');
  }
};

export default function NewDivision() {
  return (
    <>
      <Form method="post" id="show-form">
        <span>Ride Order:</span>
        <input type="text" name="ride_order" />
        <span>Description:</span>
        <input type="text" name="description" />
        <span>Type</span>
        <select name="is_timed">
          <option value="true">Timed</option>
          <option value="false">Judged</option>
        </select>
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
