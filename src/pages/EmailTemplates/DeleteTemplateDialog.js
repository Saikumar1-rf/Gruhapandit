import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { softDeleteTemplate } from "../../services/EmailTemplatesService";
import {Trash, Trash2} from "lucide-react";

const DeleteTemplateDialog = ({ templateId, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(""); // State for API errors

  const handleDelete = async () => {
    try {
      setLoading(true);
      setApiError(""); // Reset API error
      const response = await softDeleteTemplate(templateId); // Call delete API
        setLoading(false);
        setIsOpen(false);
        onDelete(); // Notify parent about deletion
    } catch (error) {
      setLoading(false);
      setApiError("Failed to delete template. Please try again."); // Display error
      console.error(error);
    }
  };

  return (
    <Dialog.Root open={isOpen} modal={true} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
         <button className="bg-stone-1000 border  justify-center font-grostek  flex flex-row items-center gap-2 hover:bg-stone-100 px-2 flex-1 py-1.5 rounded font-medium  text-sm">
							<Trash size={14} />
							Delete
						</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0 font-grostek data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed bg-white font-grostek p-6 rounded-lg shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
          <Dialog.Title className="text-lg font-semibold mb-4 text-red-600">
            Confirm Deletion
          </Dialog.Title>
          <p className="text-sm text-gray-700 mb-4">
            Are you sure you want to delete this template? This action cannot be
            undone.
          </p>
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
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 disabled:bg-stone-100 disabled:text-black text-white px-4 py-2 rounded text-sm"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteTemplateDialog;
