import axios from "axios";

const LAMBDA1_URL = "https://k2zfme7fl0.execute-api.ap-south-1.amazonaws.com/dev/upload"; // replace with your API Gateway URL
const LAMBDA2_URL = "https://6u05jvk4vj.execute-api.ap-south-1.amazonaws.com/dev/response"; // replace with your API Gateway URL

export const callLambda1 = async (pdfFile, question) => {
  const formData = new FormData();
  formData.append("file", pdfFile);
  formData.append("Question", question);

  const res = await axios.post(LAMBDA1_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const callLambda2 = async (payload) => {
  const res = await axios.post(LAMBDA2_URL, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
