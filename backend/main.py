# requirements.txt: pip install extract-msg python-magic
import os
import extract_msg
from pathlib import Path
from gemini_agent import run_full_pipeline

def parse_eml_file(eml_path: str) -> str:
    """Parse .eml file and extract plain text body."""
    try:
        msg = extract_msg.Message(eml_path)
        body = msg.body if msg.body else msg.htmlBody or ""
        msg.close()
        return body
    except:
        # Fallback: read as raw text
        with open(eml_path, 'r', encoding='utf-8', errors='ignore') as f:
            return f.read()
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class EmailHandler(FileSystemEventHandler):
    def __init__(self, process_callback, email_folder="emails"):
        self.process_callback = process_callback
        self.email_folder = email_folder
        self.processed_files = set()
    
    def on_created(self, event):
        if not event.is_directory and event.src_path.endswith('.eml'):
            time.sleep(1)  # Wait for file write completion
            self.process_email(event.src_path)
    
    def process_email(self, eml_path):
        if eml_path in self.processed_files:
            return
        print(f"🔥 New email detected: {eml_path}")
        
        # Parse and process
        email_text = parse_eml_file(eml_path)
        result = process_supply_chain_pipeline(email_text)  # Your existing pipeline
        
        # ✅ ONLY SAVE TO MOCKDATA.TS - NO DASHBOARD
        print(f"✅ Saved assessment ID {result.get('id', 'N/A')} to mockdata.ts")
        
        
        # Mark as processed
        self.processed_files.add(eml_path)
        print(f"✅ Processed: {Path(eml_path).name}")

from watchdog.observers import Observer
import requests
import httpx

# async def send_to_dashboard(assessment):
#     """Send result to FastAPI /dashboard endpoint."""
#     async with httpx.AsyncClient() as client:
#         await client.post(
#             "http://localhost:8000/dashboard", 
#             json=assessment
#         )


def process_supply_chain_pipeline(email_text: str) -> dict:
    return run_full_pipeline(email_text, os.environ["GEMINI_API_KEY"])

# Start monitoring
def start_monitoring():
    event_handler = EmailHandler(process_supply_chain_pipeline)
    observer = Observer()
    observer.schedule(event_handler, ".//data//emails", recursive=False)
    observer.start()
    print("👀 Monitoring emails/ folder → saving to mockdata.ts...")
    print("📱 Frontend: import mockData from './data/mockdata.ts'")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == "__main__":
    start_monitoring()