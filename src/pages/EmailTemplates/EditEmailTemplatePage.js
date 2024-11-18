import { useEffect, useRef, useState } from "react";
import { EmailEditor } from "react-email-editor";
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
} from "lucide-react";
import { useParams } from "react-router-dom";
import {
  getEventNames,
  getTemplateById,
  updateFullTemplate,
} from "../../services/EmailTemplatesService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DeleteTemplateDialog from "./DeleteTemplateDialog";

function EditEmailTemplatePage() {
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);
  const [eventNames, setEventNames] = useState([]);
  const emailEditorRef = useRef();
  const navigate = useNavigate();

  const {
    getValues,
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    setError,
	formState:{errors}
  } = useForm({
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
      reset(templateData.data);
    } catch (err) {
      console.error("Error fetching template:", err);
    }
  };

  const fetchEventNames = async () => {
    try {
      const eventsData = await getEventNames();
      setEventNames(eventsData);
      console.log(eventsData);
    } catch (err) {
      console.error("Error fetching template:", err);
    }
  };

  const saveTemplate = () => {
    emailEditorRef.current.editor.exportHtml(async ({ design, html }) => {
      console.log(design);

      setValue("design.html", html);
      setValue("design.json", JSON.stringify(JSON.stringify(design)));
      console.log(watchAllFields);
      try {
        const result = await updateFullTemplate(templateId, watchAllFields);
        console.log(result);
		reset(watchAllFields)
		setTemplate(watchAllFields)
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onEditorLoad = async (editor) => {
    await fetchTemplate();
    // console.log(editor);
  };

  useEffect(() => {
    fetchEventNames();
    if (template) {
      console.log(template);
      console.log(emailEditorRef);

      emailEditorRef.current.editor.loadDesign(
        JSON.parse(template.design.json)
      );
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
            <div className="flex flex-row gap-2  justify-center items-center">
              <button
                onClick={() => navigate(-1)}
                className=" flex flex-col justify-center items-center "
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-xl font-medium">
                {template && template.templateName}
              </h1>
              {template && template.active && (
                <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded text-xs font-  border-green-300 bg-green-100 text-green-800  ">
                  Active
                </span>
              )}
              {template && !template.active && (
                <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded text-xs font-  border-red-300 bg-red-100 text-red-800  ">
                  Inactive
                </span>
              )}
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
             <DeleteTemplateDialog templateId={templateId} onDelete={null}/>
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
                  margin: "0px",
                  border: "1px solid #E1E1E1FF",
                }}
                options={{
                  version: "latest",
                  features: {
                    undoRedo: true,
                    stockImages: true,
                  },
                  devices: ["mobile", "desktop", "tablet"],
                  appearance: {
                    actionBar: { placement: "bottom" },
                    panels: {
                      tools: {
                        dock: "right",
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
                <label className="block text-sm font-medium text-stone-700">Name For Template</label>
                <input
                  {...register("templateName", { required: "Template name is required" })}
                  placeholder="Type here"
                  className={`h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-sm ${errors.templateName ? "border-red-500" : ""}`}
                  type="text"
                />
                {errors.templateName && <span className="text-sm text-red-500">{errors.templateName.message}</span>}
              </div>
			  <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-stone-700">Email Subject</label>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="Type here"
                  className={`h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-sm ${errors.subject ? "border-red-500" : ""}`}
                  type="text"
                />
                {errors.subject && <span className="text-sm text-red-500">{errors.subject.message}</span>}
              </div>
			  <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-stone-700">Event To Choose</label>
                <select
                  {...register("eventName", { required: "Event name is required" })}
                  className={`h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-sm ${errors.eventName ? "border-red-500" : ""}`}
                  defaultValue={eventNames.length > 0 ? eventNames[0] : ""}
                >
                  {eventNames.length > 0 && eventNames.map((event) => <option key={event}>{event}</option>)}
                </select>
                {errors.eventName && <span className="text-sm text-red-500">{errors.eventName.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-stone-700">Template Active</label>
                <select
                  {...register("active", { required: "Template active status is required" })}
                  className={`h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-sm ${errors.active ? "border-red-500" : ""}`}
                  defaultValue={false}
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
                {errors.active && <span className="text-sm text-red-500">{errors.active.message}</span>}
              </div>

			  <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-stone-700">Template Deleted</label>
                <select
                  {...register("deleted", { required: "Template deleted status is required" })}
                  className={`h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-sm ${errors.deleted ? "border-red-500" : ""}`}
                  defaultValue={false}
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
                {errors.deleted && <span className="text-sm text-red-500">{errors.deleted.message}</span>}
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
                <button
                  onClick={saveTemplate}
                  className="bg-stone-950 text-white flex justify-center flex-row items-center gap-2 px-4 py-2.5 rounded font-medium  text-sm"
                >
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
