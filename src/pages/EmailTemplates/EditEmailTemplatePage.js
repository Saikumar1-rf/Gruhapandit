import { useEffect, useRef, useState } from 'react';
import { EmailEditor } from 'react-email-editor';
import {
	Braces,
	ChevronLeft,
	CloudUpload,
	CodeXml,
	PaintRoller,
	PenTool,
	RefreshCcw,
	Trash2,
	WandSparkles,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import {getTemplateById, updateFullTemplate} from '../../services/EmailTemplatesService';
import {useForm} from "react-hook-form";

function EditEmailTemplatePage() {
	const { templateId } = useParams();
	const [template, setTemplate] = useState(null);
	const [eventNames, setEventNames] = useState([]);
	const emailEditorRef = useRef();

    const { getValues, register, handleSubmit, control, reset, watch, setValue, setError } = useForm({
        defaultValues: {
            templateName: "",
            eventName: "",
            subject: "",
            design: {
                html: "",
                json: "",
            },
            active: true,
            deleted: false,
        },
    });


	const watchAllFields = watch();

	const fetchTemplate = async () => {
		try {
			const templateData = await getTemplateById(templateId);
			setTemplate(templateData.data);
			reset(templateData.data)
		} catch (err) {
			console.error('Error fetching template:', err);
		}
	};

	const fetchEventNames = async () => {
		try {
			const eventsData = await fetchEventNames();
			setEventNames(eventsData.data);
			console.log(eventsData)
		} catch (err) {
			console.error('Error fetching template:', err);
		}
	};

	const saveTemplate =  async() => {
		try {
			emailEditorRef.current.editor.exportHtml(({design, html}) => {
				console.log(design)

				setValue('design.html', html)
				setValue('design.json', JSON.stringify(JSON.stringify(design)));
				console.log(watchAllFields)
			})

			const result = await updateFullTemplate(templateId,watchAllFields);

		} catch (err) {

		}
	}

	const onEditorLoad = async (editor) => {
		await fetchTemplate();
		// console.log(editor);
	};

	useEffect(() => {
		if (template) {
			console.log(template);
			console.log(emailEditorRef);

				try {
					emailEditorRef.current.editor.loadDesign(
						JSON.parse(JSON.parse(template.design.json))
					);

				} catch (err) {
					emailEditorRef.current.editor.loadBlank()
				}

		}
	}, [template]);

	// Fetch template data by ID

	const exportDesignToHtml = async () => {
		console.log(emailEditorRef.current.editor);
		emailEditorRef.current.editor.exportHtml(
			async ({ design, html }) => {
				console.log(JSON.stringify(JSON.stringify(design)));
			},
			{ minify: true, cleanup: true }
		);
	};
	const exportDesignToJson = async () => {
		console.log(emailEditorRef.current.editor);
		emailEditorRef.current.editor.exportJson(async ({ json }) => {
			console.log(json);
		});
	};


	return (
		<>
			<div className="h-screen w-screen overflow-hidden bg-stone-100 flex flex-row">
				<div className="flex-1 flex-col flex">
					<div className="py-3 flex-shrink-0 flex flex-row justify-between px-2 items-center bg-white border-b">
						<div className="flex flex-row gap-2 items-center">
							<button className=" flex flex-col justify-center items-center ">
								<ChevronLeft size={24} />
							</button>
							<h1 className="text-lg font-medium">
								{template && template.templateName}
							</h1>
							<span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font- border border-green-300 bg-green-100 text-green-700  ">
								{template && template.active ? 'Active' : 'Inactive'}
							</span>
						</div>
						<div className="flex flex-row items-center gap-1.5">
							{/* <button className="bg-stone-100 flex flex-row items-center gap-1.5 hover:bg-stone-200/80 px-4 py-2.5 rounded-md font-medium  text-sm">
								<Braces size={16} />
								Export JSON
							</button> */}
							{/*<button className="border border-stone-300  flex flex-row items-center gap-2 hover:bg-stone-50 px-3 py-2.5 rounded-md font-medium  text-sm">*/}
							{/*	<WandSparkles size={18} />*/}
							{/*	Sample Template Designs*/}
							{/*</button>*/}
							<button className="bg-red-600 text-white flex flex-row items-center gap-2 hover:bg-red-700 px-3 py-2.5 rounded-md font-medium  text-sm">
								<Trash2 size={18} />
								Delete Template
							</button>
						</div>
					</div>
					<div className="flex-1 overflow-hidden flex-row  flex ">
						<div className="flex-1 overflow-hidden flex-row p-4 gap-2 flex ">
							<div className="flex  flex-col self-start border items-center">
								{/*<button className="bg-stone-900 text-white  size-10 border-b flex flex-row items-center gap-1.5 hover:bg-stone-800 justify-center rounded-lgs">*/}
								{/*	<PenTool size={18} />*/}
								{/*</button>*/}
								{/* <button className="bg-white  size-11 border-b flex flex-row items-center gap-1.5 hover:bg-stone-200/55 justify-center rounded-lgs">
                  <FileJson size={18} />
                </button>
                <button className="bg-white  size-11 border-b flex flex-row items-center gap-1.5 hover:bg-stone-200/55 justify-center rounded-lgs">
                  <CodeXml size={18} />
                </button> */}
							</div>

							<EmailEditor
								onLoad={onEditorLoad}
								ref={emailEditorRef}
								style={{
									flex: 1,
									margin: '0px',
									border: '1px solid #E1E1E1FF',
								}}
								options={{
									version: 'latest',
									features: {
										undoRedo: true,
										stockImages: true,
									},
									devices: ['mobile', 'desktop', 'tablet'],
									appearance: {
										actionBar: { placement: 'bottom' },
										panels: {
											tools: {
												dock: 'right',
												collapsible: true,
											},
										},
									},
								}}
							/>
							{/* <div className="flex-1 overflow-y-scroll  w-1">
								<MDEditor.Markdown
									source={codeString}
									style={{ whiteSpace: 'pre-wrap' }}
								/>
							</div> */}
						</div>

						{/* <SyntaxHighlighter
							customStyle={{ flex: 1 }}
							language="javascript"
							style={darcula}
						>
							{codeString}
						</SyntaxHighlighter> */}
						{/* <div className="w flex flex-row justify-end items-center">
							<button className="bg-stone-200 px-4 py-2.5 rounded-md text-white text-sm">
								Save Changes
							</button>
						</div> */}
						<div className="w-[300px] flex-shrink-0 bg-white border-l  justify-between flex flex-col gap-4 px-4 py-4 ">
							<h1 className="font-semibold text-lg">Template Configuration</h1>
							<div className="flex flex-1  flex-col gap-3">
								<div className="flex flex-col gap-2">
									<label className="text-xs font-semibold ">
										Name For Template
									</label>
									<input
										{...register("templateName", { required: true })}
										placeholder="Type here"
										className="h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-xs"
										type="text"
									></input>
								</div>
								<div className="flex flex-col gap-2">
									<label className="text-xs font-semibold ">Email Subject</label>
									<input
										{...register("subject", { required: true })}
										placeholder="Type here"
										className="h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-xs"
										type="text"
									></input>
								</div>
								<div className="flex flex-col gap-2">
									<label className="text-xs font-semibold ">Event To Choose</label>
									<input
										{...register("eventName", { required: true })}
										placeholder="Type here"
										className="h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-xs"
										type="text"
									></input>
								</div>
							</div>

							<div className="flex flex-col  gap-2">
								{/*<button className="bg-stone-100 flex justify-center flex-row items-center gap-2 hover:bg-stone-200/60 px-4 py-2.5 rounded font-medium  text-sm">*/}
								{/*	<RefreshCcw size={18} />*/}
								{/*	Reset Changes*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={exportDesignToJson}*/}
								{/*	className="bg-stone-100 flex justify-center flex-row items-center gap-2 hover:bg-stone-200/60 px-4 py-2.5 rounded font-medium  text-sm"*/}
								{/*>*/}
								{/*	<Braces size={18} />*/}
								{/*	Export JSON*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={exportDesignToHtml}*/}
								{/*	className="bg-stone-100 flex justify-center flex-row items-center gap-2 hover:bg-stone-200/60 px-4 py-2.5 rounded font-medium  text-sm"*/}
								{/*>*/}
								{/*	<CodeXml size={18} />*/}
								{/*	Export HTML*/}
								{/*</button>*/}

								{/*<button className="bg-stone-100 flex justify-center flex-row items-center gap-2 hover:bg-stone-200/60 px-4 py-2.5 rounded font-medium  text-sm">*/}
								{/*	<PaintRoller size={18} />*/}
								{/*	Update Design*/}
								{/*</button>*/}
								<button onClick={saveTemplate} className="bg-stone-950 text-white flex justify-center flex-row items-center gap-2 px-4 py-2.5 rounded font-medium  text-sm">
									<CloudUpload size={18} />
									Save Template
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default EditEmailTemplatePage;
