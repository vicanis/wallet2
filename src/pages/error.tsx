import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="grid justify-center text-center h-screen items-center">
            {isRouteErrorResponse(error) ? (
                <div>
                    <div className="text-2xl">
                        {error.status} {error.statusText}
                    </div>

                    <div className="pt-2 text-red-500">
                        {typeof error.data === "string" && (
                            <span>{error.data}</span>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-2xl">
                    Oops! An unexpected error has occurred
                </div>
            )}
        </div>
    );
}
