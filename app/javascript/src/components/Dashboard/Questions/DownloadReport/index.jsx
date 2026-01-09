import React, { useState, useEffect } from "react";

import reportsApi from "apis/reports";
import { Toastr, Typography } from "neetoui";
import { Container } from "neetoui/layouts";
import { useParams, useHistory } from "react-router-dom";

const DownloadReport = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const generatePdf = async () => {
    try {
      await reportsApi.generatePdf(slug);
      Toastr.success("Report generation started...");
    } catch {
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
    let attempts = 0;
    const maxAttempts = 15;

    while (!isReady && attempts < maxAttempts) {
      try {
        const response = await reportsApi.download(slug);

        saveAs({
          blob: response.data,
          fileName: "quiz_submissions_report.pdf",
        });
        isReady = true;
        history.goBack();
      } catch {
        attempts += 1;
        await new Promise(res => setTimeout(res, 2000));
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    generatePdf();
    setTimeout(downloadPdf, 2000);
  }, []);

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <Typography title="Download report" />
        <h1>
          {isLoading ? "Report is being generated..." : "Report downloaded!"}
        </h1>
      </div>
    </Container>
  );
};

export default DownloadReport;
