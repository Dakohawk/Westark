// Displays a Show by id and edits on submit.

import {
  Form,
  useLoaderData,
  NavLink,
  redirect,
  useParams,
} from 'react-router-dom';
import type { LoaderFunction, ActionFunction } from 'react-router';
import { useState } from 'react';

// Returns the Show object with the id in url paramaters.
const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await fetch(
      'http://localhost:3001/api/show/' + params.show,
    );
    if (!response.ok) throw new Error();
    const data = await response.json();

    return data[0];
  } catch (error) {
    throw new Error('Failed to retrieve Show from database.');
  }
};

// Updates Show if method is POST or delete if method is DELETE.
const action: ActionFunction = async ({ params, request }) => {
  console.log('header ' + JSON.stringify(request.method));
  switch (request.method) {
    case 'POST': {
      try {
        const formData = await request.formData();
        const data: Show = {
          start_date: formData.get('start_date') as string,
          identifier: formData.get('identifier') as string,
        };

        const response = await fetch(
          'http://localhost:3001/api/show/' + params.show,
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
        throw new Error('Failed to update Show.');
      }
    }
    case 'DELETE': {
      try {
        const response = await fetch(
          'http://localhost:3001/api/show/' + params.show,
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
        throw new Error('Failed to delete Show.');
      }
    }
    default: {
      throw new Response('', { status: 405 });
    }
  }
};

export default function Show() {
  const show: Show = useLoaderData() as Show;
  const params = useParams();

  const [identifier, setIdentifier] = useState(show.identifier);
  const [showid, setShowID] = useState(params.show);

  const [startDate, setStartDate] = useState(show.start_date.substring(0, 10));

  if (params.show !== showid) {
    setIdentifier(show.identifier);
    setShowID(params.show);
    setStartDate(show.start_date.substring(0, 10));
  }

  return (
    <>
      <span>
        {show.start_date.substring(0, 10)} {show.identifier}
      </span>
      <Form method="post" id="show-form">
        Start Date:
        <input
          type="date"
          name="start_date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
        Identifier:
        <input
          type="text"
          name="identifier"
          value={identifier}
          onChange={(e) => {
            if (e.target.value.length < 2) {
              setIdentifier(e.target.value);
            }
          }}
        />
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

Show.loader = loader;
Show.action = action;
