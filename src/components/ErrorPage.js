import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Ha habido un error</h1>
      <p>Lo sentimos, vuelva a acceder desde la página principal</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}