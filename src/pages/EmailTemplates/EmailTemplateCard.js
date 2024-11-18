import { Pencil, Trash } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailTemplateCard = ({ template }) => {
	const navigate = useNavigate();
	useEffect(() => {
		console.log('template', template);
	}, [template]);

	const handleEdit = () => {
		navigate(`/edit-email-template/${template.id}`, { state: { template } });
	};

	return (
		<div className="bg-white flex flex-col justify-between  border ">
			<div className=" h-[300px] p-1  flex flex-col justify-between ">
				<iframe
					id="frame"
					className="flex-1 "
					scrolling="no"
					title="Email Template Design"
					style={{ zoom: 0.5 , }}
					srcDoc={template.design.html}
				></iframe>
			</div>
			<div className="px-3 pb-3 pt-1 flex  gap-4 items-start flex-col justify-between ">
				
				<div className="flex items-center gap-2 flex-row w-full justify-between">
					<div className='flex flex-col'>
					<h1 className="text-md font-semibold leading-tight ">
						{template.templateName}
					</h1>
					<p className="text-xs mt-1 font- leading-tight text-stone-400">
						Event: {template.eventName}
					</p>
						</div>
					<div className='flex gap-1 flex-row items-center'>
					{template && template.active && <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded text-xs font-  border-green-300 bg-green-100 text-green-800  ">
								Enabled
							</span>}
							{template && !template.active && <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded text-xs font-  border-red-300 bg-red-100 text-red-800  ">
								Disabled
							</span>}
						
							{template && !template.deleted && <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded text-xs font-  border-red-300 bg-red-100 text-red-800  ">
								Deleted
							</span>}
					</div>
					
				</div>

				{/* <h1 className="text-sm leading-snug font-">
          <span className="text-stone-500">User Registration</span>
        </h1> */}

				{/* <button className="bg-stone-900 border justify-center  text-white flex flex-row items-center gap-2 hover:bg-stone-700 px-3 flex-1 py-2.5 rounded font-medium  text-sm">
          <Pencil size={16} />
          Edit Template
        </button> */}
				<div className="flex flex-col gap-1.5 w-full">
					<div className="flex items-center gap-1.5 flex-row  justify-stretch">
						{/* <button className="bg-stone-1000 border  justify-center  flex flex-row items-center gap-2 hover:bg-stone-100 px-2 flex-1 py-1.5 rounded font-medium  text-sm">
							<Trash size={14} />
							Delete
						</button> */}
						<button
							className="bg-stone-1000 border justify-center  flex flex-row items-center gap-2 hover:bg-stone-100 px-2 flex-1 py-1.5 rounded font-medium  text-sm"
							onClick={handleEdit}
						>
							<Pencil size={14} />
							Edit Template
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmailTemplateCard;
