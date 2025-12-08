import React, { useState, useEffect } from "react";

import reportsApi from "apis/reports";
import { Toastr, Typography } from "neetoui";
import { Container } from "neetoui/layouts";
import { useParams, useHistory } from "react-router-dom";

const DownloadReport = () => {
  const { quizId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const generatePdf = async () => {
    try {
      await reportsApi.generatePdf(quizId);
      Toastr.success("Report generation started...");
    } catch (error) {
      logger.error(error);
      Toastr.error("Failed to start report generation.");
    }
  };

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
  };

  const downloadPdf = async () => {
    let isReady = false;

    while (!isReady) {
      try {
        const response = await reportsApi.download(quizId, {
          responseType: "blob",
        });

        saveAs({
          blob: response.data,
          fileName: `quiz_${quizId}_submissions_report.pdf`,
        });
        isReady = true;
        history.goBack();
      } catch {
        await new Promise(res => setTimeout(res, 2000));
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    generatePdf();
    setTimeout(() => {
      downloadPdf();
    }, 2000);
  }, []);

  const message = isLoading
    ? "Report is being generated..."
    : "Report downloaded!";

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <Typography title="Download report" />
        <h1>{message}</h1>
      </div>
    </Container>
  );
};

export default DownloadReport;
