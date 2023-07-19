import { Link, useLocation } from "react-router-dom";

interface ErrorPageProps {
    code: number; // Or string, depending on your use case
    message: string;
  }

export const ErrorPage: React.FC<ErrorPageProps> = ({code, message}) => {
	const location = useLocation();
	const { code: locationCode = "404", message: locationMessage = "We can't find that page." } = location.state || {};

    const displayCode = code || locationCode;
    const displayMessage = message || locationMessage;

	return (
		<div className="flex justify-center items-center my-20 sm:my-24 md:my-32 xl:my-48 text-gray-950 dark:text-white">
			<div className="text-center">
				<h1 className="font-black text-gray-600 text-5xl sm:text-7xl md:text-9xl dark:text-blue-400">{displayCode}</h1>

				<p className="text-2xl md:text-4xl font-bold tracking-tight text-gray-500 dark:text-gray-400">Uh-oh!</p>

				<p className="my-4">{displayMessage}</p>

				<Link to="/" className="inline-flex items-center bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded text-white mt-4 md:mt-0">
					Go Back Home
				</Link>
			</div>
		</div>
	);
};
