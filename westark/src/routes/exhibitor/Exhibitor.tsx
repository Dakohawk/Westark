// Displays a Exhibitor by id and edits on submit.

import {
  Form,
  useLoaderData,
  NavLink,
  redirect,
  useParams,
} from 'react-router-dom';
import type { LoaderFunction, ActionFunction } from 'react-router';
import { useState } from 'react';

// Returns the Exhibitor object with the id in url paramaters.
const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await fetch(
      'http://localhost:3001/api/exhibitor/' + params.exhibitor,
    );
    if (!response.ok) throw new Error();
    const data = await response.json();

    return data[0];
  } catch (error) {
    throw new Error('Failed to retrieve Exhibitor from database.');
  }
};

// Updates Exhibitor if method is POST or delete if method is DELETE.
const action: ActionFunction = async ({ params, request }) => {
  console.log('header ' + JSON.stringify(request.method));
  switch (request.method) {
    case 'POST': {
      try {
        const formData = await request.formData();
        const data: Exhibitor = {
          name: formData.get('name') as string,
          age: formData.get('age') as string,
        };

        const response = await fetch(
          'http://localhost:3001/api/exhibitor/' + params.exhibitor,
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
        throw new Error('Failed to update exhibitor.');
      }
    }
    case 'DELETE': {
      try {
        const response = await fetch(
          'http://localhost:3001/api/exhibitor/' + params.exhibitor,
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
        throw new Error('Failed to delete exhibitor.');
      }
    }
    default: {
      throw new Response('', { status: 405 });
    }
  }
};

export default function Exhibitor() {
  const exhibitor: Exhibitor = useLoaderData() as Exhibitor;
  const params = useParams();

  const [divid, setDivID] = useState(params.exhibitor);

  const [name, setName] = useState(exhibitor.name);
  const [age, setAge] = useState(exhibitor.age);

  if (params.exhibitor !== divid) {
    setDivID(params.exhibitor);
    setName(exhibitor.name);
    setAge(exhibitor.age);
  }

  return (
    <>
      <span>
        {exhibitor.name} {exhibitor.age}
      </span>
      <Form method="post" id="show-form">
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            if (e.target.value.length < 51) {
              setName(e.target.value);
            }
          }}
        />
        Ages:
        <input
          type="text"
          name="age"
          value={age}
          onChange={(e) => {
            if (e.target.value.length < 3) {
              setAge(e.target.value);
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

Exhibitor.loader = loader;
Exhibitor.action = action;
