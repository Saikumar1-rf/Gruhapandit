import React, { useEffect, useState } from 'react';
import {
	getAllTemplates,
	createTemplate,
	deleteTemplate,
	restoreTemplate,
	enableTemplate,
	disableTemplate,
} from '../../services/EmailTemplatesService'; // Adjust path if needed
import { ChevronLeft, RefreshCcw } from 'lucide-react';
import EmailTemplateCard from './EmailTemplateCard';

const AllTemplatesPage = () => {
	const [templates, setTemplates] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	// Fetch templates on component mount
	useEffect(() => {
		fetchTemplates();
	}, []);

	const fetchTemplates = async () => {
		setLoading(true);
		setError('');
		try {
			const data = await getAllTemplates();
			setTemplates(data.data);
		} catch (err) {
			setError('Failed to fetch templates. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	

	return (
		

		<div className="h-screen w-screen overflow-hidden bg-stone-100 py-4 gap-4 flex flex-col">
			<div className="flex flex-col  overflow-hidden gap-4 px-48 ">
				<div className="flex flex-row justify-between items-center text-xl font-medium">
					<h1 className="font-semibold text-2xl">Email Campaigns</h1>
					<div className="flex flex-row items-center gap-2">
						<button className="border border-stone-300 bg-white  flex flex-row justify-center items-center gap-2 hover:bg-stone-50 px-3 py-2.5 rounded font-medium  text-sm">
							<RefreshCcw size={18} />
							Refresh Templates
						</button>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-4 overflow-auto no-scrollbar flex-1 px-48 gap-4">
				{templates.length > 0 &&
					templates.map((template, index) => (
						<EmailTemplateCard key={template.id} template={template} />
					))}
			</div>
		</div>
	);
};

export default AllTemplatesPage;
