import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div id="error-page">
      <h1>An Error has occured.</h1>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
}
