import { redirect } from 'react-router-dom';

export async function action({ params }: any) {
  try {
    const response = await fetch('http://localhost:3001/api/season', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error();
    }

    return redirect(`/admin`);
  } catch (error) {
    throw new Error('Failed to Delete Season from Database.');
  }
}
