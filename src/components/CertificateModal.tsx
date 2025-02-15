import React, { useState } from 'react';
import { X } from 'lucide-react';
import { generateCertificate, CertificateData } from '../utils/certificateGenerator';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseData: {
    courseName: string;
    certificateId: string;
  };
  userName: string;
}

function CertificateModal({ isOpen, onClose, courseData, userName }: CertificateModalProps) {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const certificateData: CertificateData = {
        userName,
        courseName: courseData.courseName,
        completionDate: new Date(),
        certificateId: courseData.certificateId
      };

      const pdfBlob = await generateCertificate(certificateData);
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${courseData.courseName.replace(/\s+/g, '_')}_Certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      onClose();
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-primary-dark/90 rounded-lg p-8 max-w-md w-full border border-primary-blue/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Course Completed!</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-300 mb-6">
          Congratulations on completing {courseData.courseName}! You can now download your certificate of completion.
        </p>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full bg-primary-blue text-background py-3 rounded-md hover:bg-secondary-blue transition flex items-center justify-center"
        >
          {downloading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generating Certificate...
            </>
          ) : (
            'Download Certificate'
          )}
        </button>
      </div>
    </div>
  );
}

export default CertificateModal;