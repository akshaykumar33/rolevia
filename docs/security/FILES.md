# File Upload Security

Uploaded files represent a primary external attack vector.

---

## Upload Validation Pipeline

1. **MIME-Type & Magic Byte Verification**: Ensure file headers match claimed extension (PDF, DOCX).
2. **File Size Caps**: 10MB maximum file size.
3. **Malware / Antivirus Scanning**: Asynchronous scan before document enters the extraction pipeline.
4. **Isolated Storage**: Objects stored in non-public S3 buckets with pre-signed URL access.
