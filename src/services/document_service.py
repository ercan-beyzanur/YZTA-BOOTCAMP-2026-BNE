# src/services/document_service.py
import os
import docx2txt
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter

class DocumentService:
    @staticmethod
    def read_pdf(file_path: str) -> str:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        return text

    @staticmethod
    def read_docx(file_path: str) -> str:
        return docx2txt.process(file_path)

    @staticmethod
    def read_markdown(file_path: str) -> str:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    def extract_text_from_file(self, file_path: str) -> str:
        ext = os.path.splitext(file_path)[1].lower()
        
        if ext == ".pdf":
            return self.read_pdf(file_path)
        elif ext == ".docx":
            return self.read_docx(file_path)
        elif ext in [".md", ".txt"]:
            return self.read_markdown(file_path)
        else:
            raise ValueError(
                f"Desteklenmeyen dosya formatı: {ext}. "
                f"Lütfen .pdf, .docx, .md veya .txt kullanın."
            )

    def split_text_into_chunks(self, text: str, chunk_size: int = 500, chunk_overlap: int = 50) -> list[str]:
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )
        
        return text_splitter.split_text(text)