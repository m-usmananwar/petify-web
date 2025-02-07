import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const { statusText, message } = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gray text-white">
      <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-2xl tracking-tight font-extrabold">
            {statusText}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <p className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
            <Link to="/">Back to Homepage</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ErrorElement;
