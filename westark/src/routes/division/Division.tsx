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
      'http://localhost:3001/api/division/' + params.division,
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
        const data: Division = {
          description: formData.get('description') as string,
          start_age: formData.get('start_age') as string,
          end_age: formData.get('end_age') as string,
        };

        const response = await fetch(
          'http://localhost:3001/api/division/' + params.division,
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
        throw new Error('Failed to update division.');
      }
    }
    case 'DELETE': {
      try {
        const response = await fetch(
          'http://localhost:3001/api/division/' + params.division,
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

export default function Division() {
  const division: Division = useLoaderData() as Division;
  const params = useParams();

  const [divid, setDivID] = useState(params.division);

  const [description, setDescription] = useState(division.description);
  const [startAge, setStartAge] = useState(division.start_age);
  const [endAge, setEndAge] = useState(division.end_age);

  if (params.division !== divid) {
    setDivID(params.division);
    setDescription(division.description);
    setStartAge(division.start_age);
    setEndAge(division.end_age);
  }

  return (
    <>
      <span>
        {division.description} {division.start_age} - {division.end_age}
      </span>
      <Form method="post" id="show-form">
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
        Ages:
        <input
          type="text"
          name="start_age"
          value={startAge}
          onChange={(e) => {
            if (e.target.value.length < 3) {
              setStartAge(e.target.value);
            }
          }}
        />
        Through
        <input
          type="text"
          name="end_age"
          value={endAge}
          onChange={(e) => {
            if (e.target.value.length < 3) {
              setEndAge(e.target.value);
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

Division.loader = loader;
Division.action = action;

// <input
//     type="text"
//     name="description"
//     {...(create ? {} : {defaultValue: division.description})}
// />
// <span>Starting Age</span>
// <input
//       type="number"
//       name="start_age"
//       {...(create ? {} : {defaultValue: division.start_age})}
//   />
//   <span>Ending Age</span>
// <input
//       type="number"
//       name="end_age"
//       {...(create ? {} : {defaultValue: division.end_age})}
//   />
