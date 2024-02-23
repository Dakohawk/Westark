// Displays a Division by id and edits on submit.

import {
  Form,
  useLoaderData,
  NavLink,
  redirect,
  useParams,
} from 'react-router-dom';
import type { LoaderFunction, ActionFunction } from 'react-router';
import { useState } from 'react';

// Returns the Division object with the id in url paramaters.
const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await fetch(
      'http://localhost:3001/api/class/' + params.class,
    );
    if (!response.ok) throw new Error();
    const data = await response.json();

    return data[0];
  } catch (error) {
    throw new Error('Failed to retrieve Division from database.');
  }
};

// Updates Division if method is POST or delete if method is DELETE.
const action: ActionFunction = async ({ params, request }) => {
  console.log('header ' + JSON.stringify(request.method));
  switch (request.method) {
    case 'POST': {
      try {
        const formData = await request.formData();
        const data: ShowClass = {
          description: formData.get('description') as string,
          ride_order: formData.get('ride_order') as string,
          is_timed: formData.get('is_timed') as string,
        };

        const response = await fetch(
          'http://localhost:3001/api/class/' + params.class,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          },
        );

        if (!response.ok) throw new Error();

        return redirect(`..`);
      } catch (error) {
        throw new Error('Failed to update class.');
      }
    }
    case 'DELETE': {
      try {
        const response = await fetch(
          'http://localhost:3001/api/class/' + params.class,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          },
        );

        if (!response.ok) throw new Error();

        return redirect(`..`);
      } catch (error) {
        throw new Error('Failed to delete division.');
      }
    }
    default: {
      throw new Response('', { status: 405 });
    }
  }
};

export default function ShowClass() {
  const showClass: ShowClass = useLoaderData() as ShowClass;
  const params = useParams();

  const [divid, setDivID] = useState(params.class);

  const [description, setDescription] = useState(showClass.description);
  const [ride_order, setRideOrder] = useState(showClass.ride_order);
  const [is_timed, setIsTimed] = useState(showClass.is_timed);

  if (params.class !== divid) {
    setDivID(params.class);
    setDescription(showClass.description);
    setRideOrder(showClass.ride_order);
    setIsTimed(showClass.is_timed);
  }

  let typeDescription = 'Timed';
  if (showClass.is_timed) {
    typeDescription = 'Judged';
  }

  return (
    <>
      <span>
        {showClass.ride_order}. {showClass.description} - {typeDescription}
      </span>
      <Form method="post" id="show-form">
        Ride Order:
        <input
          type="text"
          name="ride_order"
          value={ride_order}
          onChange={(e) => {
            if (e.target.value.length < 3) {
              setRideOrder(e.target.value);
            }
          }}
        />
        Description:
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => {
            if (e.target.value.length < 51) {
              setDescription(e.target.value);
            }
          }}
        />
        Type
        <select
          name="is_timed"
          value={is_timed}
          onChange={(e) => {
            setIsTimed(e.target.value);
          }}
        >
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
      <Form
        method="delete"
        onSubmit={(event) => {
          if (!confirm('Please confirm you want to delete this record.')) {
            event.preventDefault();
          }
        }}
      >
        <button type="submit">Delete</button>
      </Form>
    </>
  );
}

ShowClass.loader = loader;
ShowClass.action = action;
