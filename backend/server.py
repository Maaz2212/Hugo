from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data", "emails")
os.makedirs(DATA_DIR, exist_ok=True)

class EmailPayload(BaseModel):
    subject: str
    from_addr: str
    to_addr: str
    body: str

@app.post("/api/emails")
async def save_email(email: EmailPayload):
    try:
        # Generate a filename (simple timestamp based for now, or could use subject)
        # Using a format similar to existing files: email_XXX_Subject.eml would be ideal
        # but for simplicity/safety we'll use timestamp + sanitized subject
        
        timestamp = int(time.time())
        sanitized_subject = "".join(c for c in email.subject if c.isalnum() or c in (' ', '_', '-')).strip().replace(' ', '_')
        filename = f"email_{timestamp}_{sanitized_subject}.eml"
        filepath = os.path.join(DATA_DIR, filename)
        
        # Format the content to match the .eml style requested
        # From specific check of existing files:
        # From: ...
        # To: ...
        # Subject: ...
        # Date: ...
        #
        # Body...
        
        current_date_str = datetime.now().strftime("%Y-%m-%d %H:%M")
        
        content = f"""From: {email.from_addr}
To: {email.to_addr}
Subject: {email.subject}
Date: {current_date_str}

{email.body}"""

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
            
        return {"message": "Email saved successfully", "filename": filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
