
            import React, { useState } from "react";
            import * as Dialog from "@radix-ui/react-dialog";
            import { useForm } from "react-hook-form";
            import { createTemplate } from "../../services/EmailTemplatesService";
            import { useNavigate } from "react-router-dom";
            import {FilePlus, Plus, PlusCircle} from "lucide-react";

            const CreateTemplateDialog = ({ onCreate }) => {
              const [isOpen, setIsOpen] = useState(false);
              const [loading, setLoading] = useState(false);
              const [apiError, setApiError] = useState(""); // State for API errors
              const {
                register,
                handleSubmit,
                reset,
                watch,
                formState: { errors },
              } = useForm({
                defaultValues: {
                  templateName: "",
                  eventName: "",
                  subject: "",
                  design: {
                    "html": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional //EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n<head>\n<!--[if gte mso 9]>\n<xml>\n  <o:OfficeDocumentSettings>\n    <o:AllowPNG/>\n    <o:PixelsPerInch>96</o:PixelsPerInch>\n  </o:OfficeDocumentSettings>\n</xml>\n<![endif]-->\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"x-apple-disable-message-reformatting\">\n  <!--[if !mso]><!--><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><!--<![endif]-->\n  <title></title>\n  \n    <style type=\"text/css\">\n      \n      @media only screen and (min-width: 520px) {\n        .u-row {\n          width: 500px !important;\n        }\n\n        .u-row .u-col {\n          vertical-align: top;\n        }\n\n        \n            .u-row .u-col-100 {\n              width: 500px !important;\n            }\n          \n      }\n\n      @media only screen and (max-width: 520px) {\n        .u-row-container {\n          max-width: 100% !important;\n          padding-left: 0px !important;\n          padding-right: 0px !important;\n        }\n\n        .u-row {\n          width: 100% !important;\n        }\n\n        .u-row .u-col {\n          display: block !important;\n          width: 100% !important;\n          min-width: 320px !important;\n          max-width: 100% !important;\n        }\n\n        .u-row .u-col > div {\n          margin: 0 auto;\n        }\n\n\n}\n    \nbody{margin:0;padding:0}table,td,tr{border-collapse:collapse;vertical-align:top}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}\n\n\ntable, td { color: #000000; } </style>\n  \n  \n\n</head>\n\n<body class=\"clean-body u_body\" style=\"margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e0e0e0;color: #000000\">\n  <!--[if IE]><div class=\"ie-container\"><![endif]-->\n  <!--[if mso]><div class=\"mso-container\"><![endif]-->\n  <table style=\"border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e0e0e0;width:100%\" cellpadding=\"0\" cellspacing=\"0\">\n  <tbody>\n  <tr style=\"vertical-align: top\">\n    <td style=\"word-break: break-word;border-collapse: collapse !important;vertical-align: top\">\n    <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"center\" style=\"background-color: #e0e0e0;\"><![endif]-->\n    \n  \n  \n<div class=\"u-row-container\" style=\"padding: 0px;background-color: transparent\">\n  <div class=\"u-row\" style=\"margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;\">\n    <div style=\"border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;\">\n      <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding: 0px;background-color: transparent;\" align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:500px;\"><tr style=\"background-color: transparent;\"><![endif]-->\n      \n<!--[if (mso)|(IE)]><td align=\"center\" width=\"500\" style=\"width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;\" valign=\"top\"><![endif]-->\n<div class=\"u-col u-col-100\" style=\"max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;\">\n  <div style=\"height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;\">\n  <!--[if (!mso)&(!IE)]><!--><div style=\"box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;\"><!--<![endif]-->\n  \n  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->\n  </div>\n</div>\n<!--[if (mso)|(IE)]></td><![endif]-->\n      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->\n    </div>\n  </div>\n  </div>\n  \n\n\n    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->\n    </td>\n  </tr>\n  </tbody>\n  </table>\n  <!--[if mso]></div><![endif]-->\n  <!--[if IE]></div><![endif]-->\n</body>\n\n</html>\n",
                    "json": "\"{\\\"counters\\\":{\\\"u_column\\\":1,\\\"u_row\\\":1},\\\"body\\\":{\\\"id\\\":\\\"LL7g1uJQYB\\\",\\\"rows\\\":[{\\\"id\\\":\\\"UDUM4xbg8R\\\",\\\"cells\\\":[1],\\\"columns\\\":[{\\\"id\\\":\\\"CrEx1Tk7t-\\\",\\\"contents\\\":[],\\\"values\\\":{\\\"backgroundColor\\\":\\\"\\\",\\\"padding\\\":\\\"0px\\\",\\\"border\\\":{},\\\"borderRadius\\\":\\\"0px\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_column_1\\\",\\\"htmlClassNames\\\":\\\"u_column\\\"}}}],\\\"values\\\":{\\\"displayCondition\\\":null,\\\"columns\\\":false,\\\"_styleGuide\\\":null,\\\"backgroundColor\\\":\\\"\\\",\\\"columnsBackgroundColor\\\":\\\"\\\",\\\"backgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"repeat\\\":\\\"no-repeat\\\",\\\"size\\\":\\\"custom\\\",\\\"position\\\":\\\"center\\\",\\\"customPosition\\\":[\\\"50%\\\",\\\"50%\\\"]},\\\"padding\\\":\\\"0px\\\",\\\"anchor\\\":\\\"\\\",\\\"hideDesktop\\\":false,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_row_1\\\",\\\"htmlClassNames\\\":\\\"u_row\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}}],\\\"headers\\\":[],\\\"footers\\\":[],\\\"values\\\":{\\\"_styleGuide\\\":null,\\\"popupPosition\\\":\\\"center\\\",\\\"popupWidth\\\":\\\"600px\\\",\\\"popupHeight\\\":\\\"auto\\\",\\\"borderRadius\\\":\\\"10px\\\",\\\"contentAlign\\\":\\\"center\\\",\\\"contentVerticalAlign\\\":\\\"center\\\",\\\"contentWidth\\\":\\\"500px\\\",\\\"fontFamily\\\":{\\\"label\\\":\\\"Arial\\\",\\\"value\\\":\\\"arial,helvetica,sans-serif\\\"},\\\"textColor\\\":\\\"#000000\\\",\\\"popupBackgroundColor\\\":\\\"#FFFFFF\\\",\\\"popupBackgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"repeat\\\":\\\"no-repeat\\\",\\\"size\\\":\\\"cover\\\",\\\"position\\\":\\\"center\\\"},\\\"popupOverlay_backgroundColor\\\":\\\"rgba(0, 0, 0, 0.1)\\\",\\\"popupCloseButton_position\\\":\\\"top-right\\\",\\\"popupCloseButton_backgroundColor\\\":\\\"#DDDDDD\\\",\\\"popupCloseButton_iconColor\\\":\\\"#000000\\\",\\\"popupCloseButton_borderRadius\\\":\\\"0px\\\",\\\"popupCloseButton_margin\\\":\\\"0px\\\",\\\"popupCloseButton_action\\\":{\\\"name\\\":\\\"close_popup\\\",\\\"attrs\\\":{\\\"onClick\\\":\\\"document.querySelector('.u-popup-container').style.display = 'none';\\\"}},\\\"language\\\":{},\\\"backgroundColor\\\":\\\"#e0e0e0\\\",\\\"preheaderText\\\":\\\"\\\",\\\"linkStyle\\\":{\\\"body\\\":true,\\\"linkColor\\\":\\\"#0000ee\\\",\\\"linkHoverColor\\\":\\\"#0000ee\\\",\\\"linkUnderline\\\":true,\\\"linkHoverUnderline\\\":true},\\\"backgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"repeat\\\":\\\"no-repeat\\\",\\\"size\\\":\\\"custom\\\",\\\"position\\\":\\\"center\\\"},\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_body\\\",\\\"htmlClassNames\\\":\\\"u_body\\\"}}},\\\"schemaVersion\\\":17}\""
                },
                  active: false,
                  deleted: false,
                },
              });
              const navigate = useNavigate();

              const createNewTemplate = async (data) => {
                try {
                  setLoading(true);
                  setApiError(""); // Reset API error message
                  const res = await createTemplate(data);
                  if (res.data && res.data.id) {
                    setLoading(false);
                    navigate(`/edit-email-template/${res.data.id}`);
                  }
                } catch (error) {
                  setLoading(false);
                  setApiError("Failed to create template. Please try again."); // Set API error message
                  console.error(error);
                }
              };

              return (
                <Dialog.Root open={isOpen} modal={true} onOpenChange={setIsOpen}>
                  <Dialog.Trigger asChild>
                    <button className="bg-stone-900 text-white font-grostek flex flex-row justify-center items-center gap-1.5 hover:bg-stone-700 px-3 py-2.5 rounded font-medium text-sm">
                      <PlusCircle size={16}/>
                      Create New Template
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/50 fixed font-grostek inset-0 data-[state=open]:animate-overlayShow" />
                    <Dialog.Content className="fixed bg-white font-grostek p-6 rounded-lg shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
                      <Dialog.Title className="text-lg font-semibold mb-4">
                        Create New Template
                      </Dialog.Title>
                      <form onSubmit={handleSubmit(createNewTemplate)}>
                        <div className="mb-4">
                          <label
                            htmlFor="templateName"
                            className="block text-sm font-medium text-stone-700"
                          >
                            Template Name
                          </label>
                          <input
                            {...register("templateName", {
                              required: "Template Name is required",
                            })}
                            type="text"
                            id="templateName"
                            className="mt-1 px-3 py-2 border border-stone-300 outline-none ring-0 rounded w-full"
                            placeholder="Enter template name"
                          />
                          {errors.templateName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.templateName.message}
                            </p>
                          )}
                        </div>
                        {apiError && (
                          <p className="text-red-500 text-sm mb-4">{apiError}</p>
                        )}
                        <div className="flex justify-end gap-2">
                          <Dialog.Close asChild>
                            <button
                              type="button"
                              className="bg-stone-200 px-4 py-2 rounded text-sm"
                            >
                              Cancel
                            </button>
                          </Dialog.Close>
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-stone-900 disabled:bg-stone-700  text-white px-4 py-2 rounded text-sm"
                          >
                            {loading ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </form>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              );
            };

            export default CreateTemplateDialog;
