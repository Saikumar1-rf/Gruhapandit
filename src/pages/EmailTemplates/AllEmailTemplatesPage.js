import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ChevronLeft, Inbox, Info, Plus, RefreshCcw} from 'lucide-react';

import {
    getAllTemplates,
} from '../../services/EmailTemplatesService'; // Adjust path if needed

import EmailTemplateCard from './EmailTemplateCard';
import CreateTemplateDialog from './createTemplateDialog';

const AllTemplatesPage = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // Fetch templates on component mount
    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await getAllTemplates();
            const filteredTemplates = response.data.filter((template) => !template.deleted);
            setTemplates(filteredTemplates);
        } catch (err) {
            setError('Failed to fetch templates. Please try again later.');
        } finally {
            setLoading(false);
            setError(true);
        }
    };

    const renderLoadingState = () => (
        <div className="flex  rounded-lg mx-44 flex-col gap-2 flex-1 justify-center items-center">
            <div
                className="animate-spin-fast inline-block size-6 border-[2px] border-current border-t-transparent text-stone-900 rounded-full "
                role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
            <p className="text-sm text-stone-900">Fetching Templates</p>
        </div>
    );

    const renderEmptyState = () => (
        <div className="flex  rounded-lg mx-44 flex-col gap-1 flex-1 justify-center items-center">
            <Inbox size={40} strokeWidth={0.8} className="text-stone-900"/>
            <div className=" text-center">
                <p className="text-sm font-medium text-stone-900">No Templates Found</p>
                <p className="text-xs font-light text-stone-500">Click create new template button to get started</p>
            </div>

        </div>
    );

    const renderTemplates = () => (
        <div className="grid grid-cols-4 overflow-auto px-48 gap-4 scrollbar-hide">
            {templates.map((template) => (
                <EmailTemplateCard key={template.id} template={template} onDelete={fetchTemplates} />
            ))}
        </div>
    );

    const renderErrorState = () => (
        <div className="flex flex-1  rounded-lg  flex-col gap-4  justify-center items-center">
            <Info size={36} strokeWidth={0.8} className="text-stone-900"/>
            <div className=" text-center">
                <p className="text-md font-medium text-stone-900">Network Failed</p>
                <p className="text-xs font-light text-stone-500">Looks like the network request got failed.Please try again.
                </p>
            </div>
            <div className="flex gap-1 flex-row">

                <button
                    onClick={fetchTemplates}
                    className="bg-white border font-grostek flex flex-row justify-center items-center gap-1.5 hover:bg-stone-50 px-2.5 py-2 rounded font-medium text-xs">
                    <RefreshCcw size={14}/>
                    Retry Fetching
                </button>
            </div>

        </div>
    );

    return (
        <div className="h-screen w-screen font-grostek overflow-hidden bg-stone-200/80 py-8 flex flex-col gap-4">
            {/* Header Section */}
            <div className="flex flex-col shrink-0 gap-4 px-44">
                <div className="flex flex-row justify-between items-center text-xl font-medium">
                    <h1 className="flex items-center gap-4 font-semibold text-2xl">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex justify-center items-center"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        Email Templates
                    </h1>
                    <div className="flex flex-row items-center gap-2">
                        <CreateTemplateDialog onCreate={null}/>
                        {!error && !loading && <button
                            onClick={fetchTemplates}
                            className="bg-white border font-grostek flex flex-row justify-center items-center gap-1.5 hover:bg-stone-100 px-3 py-2.5 rounded font-medium text-sm">
                            <RefreshCcw size={16}/>
                            Reload Templates
                        </button>}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            {loading && renderLoadingState()}
            {!loading && error && renderErrorState()}
            {!loading && templates.length === 0 && !error && renderEmptyState()}
            {!loading && templates.length > 0 && !error && renderTemplates()}
        </div>
    );
};

export default AllTemplatesPage;
