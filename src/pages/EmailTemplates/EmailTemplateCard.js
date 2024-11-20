import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash } from 'lucide-react';
import DeleteTemplateDialog from './DeleteTemplateDialog';

const EmailTemplateCard = ({ template, onDelete }) => {
	const navigate = useNavigate();

	useEffect(() => {
		console.log('Template:', template);
	}, [template]);

	const handleEdit = () => {
		navigate(`/edit-email-template/${template.id}`, { state: { template } });
	};

	const renderStatus = () => {
		if (template?.active) {
			return (
				<span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded text-xs font-medium border-green-300 bg-green-100 text-green-800">
          Enabled
        </span>
			);
		}
		return (
			<span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded text-xs font-medium border-red-300 bg-red-100 text-red-800">
        Disabled
      </span>
		);
	};

	return (
		<div className="bg-white rounded border flex flex-col justify-between">
			<div className="h-[300px] p-1 flex flex-col justify-between">
				<iframe
					id="frame"
					className="flex-1"
					scrolling="no"
					title="Email Template Design"
					style={{ zoom: 0.5, borderRadius: '4px' }}
					srcDoc={template.design.html}
				></iframe>
			</div>

			<div className="p-2 pt-1 flex flex-col gap-2.5 justify-start">
				<div className="flex items-center justify-between px-1">
					<h1 className="text-md font-semibold leading-tight">{template.templateName}</h1>
					<div className="flex gap-1">{renderStatus()}</div>
				</div>

				<div className="flex flex-col gap-1.5 w-full">
					<div className="flex items-center gap-1.5">
						<DeleteTemplateDialog templateId={template.id} onDelete={onDelete} />
						<button
							className="bg-stone-1000 border flex items-center gap-2 px-2 py-1.5 rounded font-medium text-sm hover:bg-stone-100 flex-1 justify-center"
							onClick={handleEdit}
						>
							<Pencil size={14} />
							Edit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmailTemplateCard;
