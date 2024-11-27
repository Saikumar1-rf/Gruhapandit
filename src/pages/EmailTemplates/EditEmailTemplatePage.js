import React, { useEffect, useRef, useState } from "react";
import { EmailEditor } from "react-email-editor";
import {
  Braces,
  ChevronLeft,
  CloudUpload,
  CodeXml,
  Inbox,
  Info,
  PaintRoller,
  PenTool,
  RefreshCcw,
  Trash2,
  WandSparkles,
} from "lucide-react";
import { useParams } from "react-router-dom";
import {
  getAllTemplates,
  getEventNames,
  getTemplateById,
  updateFullTemplate,
} from "../../services/EmailTemplatesService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DeleteTemplateDialog from "./DeleteTemplateDialog";

function EditEmailTemplatePage() {
  const { templateId } = useParams();
  const [eventNames, setEventNames] = useState([]);
  const emailEditorRef = useRef();
  const navigate = useNavigate();
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const {
    getValues,
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm({});

  const watchAllFields = watch();

  const fetchTemplates = async () => {
    setLoading(true);
    setApiError(false);
    try {
      const templateData = await getTemplateById(templateId);
      reset(templateData.data);
      setLoading(false);
    } catch (err) {
      setApiError(true);
      setLoading(false);
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
    setSavingTemplate(true);
    emailEditorRef.current.editor.exportHtml(async ({ design, html }) => {
      console.log(design);

      setValue("design.html", html);
      setValue("design.json", JSON.stringify(JSON.stringify(design)));
      console.log(watchAllFields);
      try {
        const result = await updateFullTemplate(templateId, watchAllFields);
        setSavingTemplate(false);
      } catch (error) {
        setSavingTemplate(false);
      }
    });
  };

  const onEditorLoad = async (editor) => {
    if (watchAllFields.design.json) {
      try {
        const parsedJsonDesign = JSON.parse(
          JSON.parse(getValues().design.json)
        );
        editor.loadDesign(parsedJsonDesign);
      } catch (error) {
        editor.loadBlank();
      }
    }
  };

  useEffect(() => {
    fetchEventNames();
    fetchTemplates();
  }, []);

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

  const renderLoadingState = () => (
    <div className="flex  rounded-lg mx-44 flex-col gap-2 flex-1 justify-center items-center">
      <div
        className="animate-spin-fast inline-block size-6 border-[2px] border-current border-t-transparent text-stone-900 rounded-full "
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-xs text-stone-900">Fetching Templates</p>
    </div>
  );
  const renderErrorState = () => (
    <div className="flex  rounded-lg  flex-col gap-4  justify-center items-center">
      <Info size={36} strokeWidth={0.8} className="text-stone-900" />
      <div className=" text-center">
        <p className="text-md font-medium text-stone-900">Network Failed</p>
        <p className="text-xs font-light text-stone-500">
          Looks like the network request got failed.Please try again.
        </p>
      </div>
      <div className="flex gap-1 flex-row">
        <button
          onClick={() => navigate(-1)}
          className="bg-white border font-grostek flex flex-row justify-center items-center gap-1.5 hover:bg-stone-50 px-2.5 py-2 rounded font-medium text-xs"
        >
          <ChevronLeft size={14} />
          Back To Templates
        </button>
        <button
          onClick={fetchTemplates}
          className="bg-white border font-grostek flex flex-row justify-center items-center gap-1.5 hover:bg-stone-50 px-2.5 py-2 rounded font-medium text-xs"
        >
          <RefreshCcw size={14} />
          Retry Fetching Again
        </button>
      </div>
    </div>
  );
  if (loading && !apiError) {
    return (
      <div className="h-screen w-screen font-grostek overflow-hidden bg-stone-100 flex flex-row">
        {renderLoadingState()}
      </div>
    );
  }

  if (!loading && apiError) {
    return (
      <div className="h-screen w-screen font-grostek overflow-hidden justify-center items-center bg-stone-100 flex flex-row">
        {renderErrorState()}
      </div>
    );
  }

  if (!loading && !apiError) {
    return (
      <>
        <div className="h-screen w-screen font-grostek overflow-hidden bg-stone-200/70 flex flex-row">
          <div className="flex-1 flex-col flex">
            <div className="h-[64px] flex-shrink-0 flex flex-row justify-between px-4 items-center bg-white border-b">
              <div className="flex flex-row gap-2  justify-center items-center">
                <button
                  onClick={() => navigate(-1)}
                  className=" flex flex-col justify-center items-center "
                >
                  <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-medium">
                  {watchAllFields.templateName && watchAllFields.templateName}
                </h1>
                {watchAllFields && watchAllFields.active && (
                  <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded text-xs font-  border-green-300 bg-green-100 text-green-800  ">
                    Active
                  </span>
                )}
                {watchAllFields && !watchAllFields.active && (
                  <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded text-xs font-  border-red-300 bg-red-100 text-red-800  ">
                    Inactive
                  </span>
                )}
              </div>
              <div className="flex flex-row items-center gap-1.5"></div>
            </div>
            <div className="flex-1 overflow-hidden flex-row p-2 gap-2 flex ">
              <div className="flex-1 overflow-hidden flex-row     flex ">
                <div className="flex  flex-col self-start border items-center"></div>

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
              </div>

              <div className="w-[280px]  border border-stone-200 flex-shrink-0 bg-white   justify-between flex flex-col gap-4 px-5 py-4 ">
                <h1 className="font-semibold text-lg">
                  Template Configuration
                </h1>
                <div className="flex flex-1  flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="block text-xs font-mediums text-stone-700">
                      Name For Template
                    </label>
                    <input
                      {...register("templateName", {
                        required: "Template name is required",
                      })}
                      placeholder="Type here"
                      className={`h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-xs ${
                        errors.templateName ? "border-red-500" : ""
                      }`}
                      type="text"
                    />
                    {errors.templateName && (
                      <span className="text-xs text-red-500">
                        {errors.templateName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-xs font-mediums text-stone-700">
                      Email Subject
                    </label>
                    <input
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      placeholder="Type here"
                      className={`h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-xs ${
                        errors.subject ? "border-red-500" : ""
                      }`}
                      type="text"
                    />
                    {errors.subject && (
                      <span className="text-xs text-red-500">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-xs font-mediums text-stone-700">
                      Event To Choose
                    </label>
                    <select
                      {...register("eventName", {
                        required: "Event name is required",
                      })}
                      className={`h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-xs ${
                        errors.eventName ? "border-red-500" : ""
                      }`}
                      defaultValue={eventNames.length > 0 ? eventNames[0] : ""}
                    >
                      {eventNames.length > 0 &&
                        eventNames.map((event) => (
                          <option key={event}>{event}</option>
                        ))}
                    </select>
                    {errors.eventName && (
                      <span className="text-xs text-red-500">
                        {errors.eventName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-xs font-mediums text-stone-700">
                      Make Template Active
                    </label>
                    <select
                      {...register("active", {
                        required: "Template active status is required",
                      })}
                      className={`h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-xs ${
                        errors.active ? "border-red-500" : ""
                      }`}
                      defaultValue={false}
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                    {errors.active && (
                      <span className="text-xs text-red-500">
                        {errors.active.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="block text-xs font-mediums text-stone-700">
                      Delete Template
                    </label>
                    <select
                      {...register("deleted", {
                        required: "Template deleted status is required",
                      })}
                      className={`h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-xs ${
                        errors.deleted ? "border-red-500" : ""
                      }`}
                      defaultValue={false}
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                    {errors.deleted && (
                      <span className="text-xs text-red-500">
                        {errors.deleted.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-xs font-mediums text-stone-700">
                      Load JSON
                    </label>
                    <input
                      onKeyUp={({ target }) => {
                        emailEditorRef.current.editor.loadDesign(
                          JSON.parse(target.value)
                        );
                      }}
                      placeholder="Paste Json and tap button below"
                      className={`h-10 px-3 bg-stone-1000 border outline-none ring-0 rounded text-stone-800 text-xs ${
                        errors.subject ? "border-red-500" : ""
                      }`}
                      type="text"
                    />
                  </div>
                </div>

                <div className="flex flex-col  gap-2">
                  {/*<button className="bg-stone-100 flex justify-center flex-row items-center gap-2 hover:bg-stone-200/60 px-4 py-2.5 rounded font-medium  text-xs">*/}
                  {/*	<RefreshCcw size={18} />*/}
                  {/*	Reset Changes*/}
                  {/*</button>*/}
                  {/*<button*/}
                  {/*	onClick={exportDesignToJson}*/}
                  {/*	className="bg-stone-100 flex justify-center flex-row items-center gap-2 hover:bg-stone-200/60 px-4 py-2.5 rounded font-medium  text-xs"*/}
                  {/*>*/}
                  {/*	<Braces size={18} />*/}
                  {/*	Export JSON*/}
                  {/*</button>*/}
                  {/*<button*/}
                  {/*	onClick={exportDesignToHtml}*/}
                  {/*	className="bg-stone-100 flex justify-center flex-row items-center gap-2 hover:bg-stone-200/60 px-4 py-2.5 rounded font-medium  text-xs"*/}
                  {/*>*/}
                  {/*	<CodeXml size={18} />*/}
                  {/*	Export HTML*/}
                  {/*</button>*/}

                  <button className="bg-stone-100 flex justify-center border flex-row items-center gap-2 hover:bg-stone-200/60 px-4 py-2.5 rounded font-medium  text-sm">
                    <Braces size={18} />
                    Load From JSON
                  </button>
                  <button
                    onClick={saveTemplate}
                    disabled={savingTemplate}
                    className="bg-stone-950 disabled:bg-stone-700 text-white flex justify-center flex-row items-center gap-2 px-4 py-3 rounded font-medium  text-sm"
                  >
                    <CloudUpload size={18} />
                    {savingTemplate ? "Saving Template..." : "Save Template"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditEmailTemplatePage;
