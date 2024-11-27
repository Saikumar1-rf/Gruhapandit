import axios from "axios";

const API_BASE_URL =
  "https://tution-application-testenv.onrender.com/tuition-application"; // Replace with the actual API base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
});

// 1. Create Template
export const createTemplate = async (templateData) => {
  try {
    const response = await apiClient.post(
      `${API_BASE_URL}/email-template/create`,
      templateData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 2. Get All Templates
export const getAllTemplates = async () => {
  try {
    const response = await apiClient.get(
      `${API_BASE_URL}/email-template/getAllTemplates`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 3. Update Template Design
export const updateTemplateDesign = async (templateId, designData) => {
  try {
    const response = await apiClient.patch(
      `${API_BASE_URL}/api/email-templates/${templateId}/design`,
      designData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 4. Update Full Template
export const updateFullTemplate = async (templateId, templateData) => {
  try {
    const response = await apiClient.patch(
      `${API_BASE_URL}/email-template/fullUpdate/${templateId}`,
      templateData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 4. Update Full Template
export const getEmailTemplateNames = async () => {
  try {
    const response = await apiClient.get(
      `${API_BASE_URL}/email-template/getEventNames`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 5. Soft Delete Template
export const softDeleteTemplate = async (templateId) => {
  try {
    const response = await apiClient.delete(
      `${API_BASE_URL}/email-template/delete/${templateId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 6. Restore Template
export const restoreTemplate = async (templateId) => {
  try {
    const response = await apiClient.patch(
      `${API_BASE_URL}/api/email-templates/${templateId}/restore`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 7. Get Template by ID
export const getTemplateById = async (templateId) => {
  try {
    const response = await apiClient.get(
      `${API_BASE_URL}/email-template/${templateId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEventNames = async () => {
  try {
    const response = await apiClient.get(
      `${API_BASE_URL}/email-template/getEventNames`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 8. Disable Template
export const disableTemplate = async (templateId) => {
  try {
    const response = await apiClient.patch(
      `${API_BASE_URL}/api/email-templates/${templateId}/disable`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
