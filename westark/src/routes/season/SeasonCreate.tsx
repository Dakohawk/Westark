import { Form, redirect } from 'react-router-dom';

export async function action({ request }: any) {
  try {
    const formData = await request.formData();
    request.formData();
    const data = { year: formData.get('year') };
    const response = await fetch('http://localhost:3001/api/season', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error();
    }

    return redirect(`/admin`);
  } catch (error) {
    throw new Error('Failed to create Season into Database.');
  }
}

export default function SeasonCreate() {
  return (
    <>
      <h3>Create A New Show Year</h3>
      <div id="season-create2">
        <Form method="post">
          <div id="year-input">
            <span>Year:</span>
            <input type="text" name="year" />
          </div>
          <button type="submit">Submit</button>
        </Form>
        <div id="back-to-home-page">
          <Form action="/admin">
            <button type="submit">Back</button>
          </Form>
        </div>
      </div>
    </>
  );
}
