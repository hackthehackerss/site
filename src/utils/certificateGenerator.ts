import { jsPDF } from 'jspdf';
import { UserProfile } from '../types/user';

export interface CertificateData {
  userName: string;
  courseName: string;
  completionDate: Date;
  certificateId: string;
}

export const generateCertificate = async (data: CertificateData): Promise<Blob> => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Set background color
  doc.setFillColor(15, 23, 42); // bg-background
  doc.rect(0, 0, 297, 210, 'F');

  // Add certificate border
  doc.setDrawColor(0, 240, 255); // primary-blue
  doc.setLineWidth(1);
  doc.rect(10, 10, 277, 190);

  // Add logo
  const logoWidth = 30;
  const logoHeight = 30;
  const logoX = (297 - logoWidth) / 2;
  doc.addImage('/logo-shield.png', 'PNG', logoX, 20, logoWidth, logoHeight);

  // Set title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(40);
  doc.setFont('helvetica', 'bold');
  doc.text('Certificate of Completion', 297/2, 80, { align: 'center' });

  // Add recipient name
  doc.setFontSize(24);
  doc.text('This is to certify that', 297/2, 100, { align: 'center' });
  doc.setFontSize(32);
  doc.setTextColor(0, 240, 255); // primary-blue
  doc.text(data.userName, 297/2, 120, { align: 'center' });

  // Add course details
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('has successfully completed', 297/2, 140, { align: 'center' });
  doc.setFontSize(28);
  doc.setTextColor(0, 240, 255); // primary-blue
  doc.text(data.courseName, 297/2, 160, { align: 'center' });

  // Add date and certificate ID
  doc.setTextColor(180, 180, 180);
  doc.setFontSize(12);
  const dateStr = data.completionDate.toLocaleDateString();
  doc.text(`Completion Date: ${dateStr}`, 20, 190);
  doc.text(`Certificate ID: ${data.certificateId}`, 200, 190);

  return doc.output('blob');
};