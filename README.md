## 🛠️ Technology Stack

| Frontend | Backend | Database |
|---------|---------|---------|
| React + Vite | FastAPI (Python) | PostgreSQL |
| Tailwind CSS | Uvicorn server | |

---

## 📂 Project Directory Structure

Peer2PeerU/ ├── backend/ │ └── app/ │ ├── main.py (FastAPI backend) │ └── (future) database/ ├── src/ │ ├── components/ │ │ ├── Navbar/ │ │ │ ├── Navbar.jsx │ │ │ └── Navbar.css │ │ ├── Footer/ │ │ │ ├── Footer.jsx │ │ │ └── Footer.css │ ├── pages/ │ │ ├── Login/ │ │ │ ├── Login.jsx │ │ │ └── Login.css │ │ ├── Register/ │ │ │ ├── Register.jsx │ │ │ └── Register.css │ │ ├── Home/ │ │ │ ├── Home.jsx │ │ │ └── Home.css │ ├── App.jsx │ ├── index.jsx │ └── assets/ (images like logos, covers, etc.) └── README.md

yaml
Copy
Edit

---

## 🖥️ How to Run the Project Locally

1. Clone the repository:

            git clone https://github.com/yourusername/Peer2PeerU.git
            
            cd Peer2PeerU

2. Install frontend dependencies:

            cd src
            
            yarn install
            
            (or if you use npm)
            
            npm install
 3. Setup Python Virtual Environment
            
            cd backend
            python -m venv venv
            .\venv\Scripts\activate  # Windows
            # source venv/bin/activate  # macOS/Linux

4. Install backend dependencies

            pip install -r requirements.txt
If requirements.txt doesn't exist yet, install manually:

            pip install fastapi uvicorn psycopg2-binary passlib[bcrypt] python-multipart
            pip freeze > requirements.txt

 5. Start the backend server
            
            cd backend
            uvicorn app.main:app --reload
API will run at: http://localhost:8000

Swagger UI: http://localhost:8000/docs

6. Start the frontend development server:

            cd src
            
            yarn run dev
            
            Frontend will be running at:
            
            http://localhost:5173


🔥 Features Built So Far

      Clean Login and Register pages
      
      Deep purple premium theme
      
      Responsive Home page design
      
      Dynamic Featured Listings pulled from backend
      
      Structured folder setup for scalability
      
      Professional gradient Footer
      
      Navbar with Logo and search bar

What's Next (Planned Features)

      Connect FastAPI backend to PostgreSQL Database
      
      Make Register page actually save users to database
      
      Allow posting new listings (Create)
      
      Make search bar dynamic (search from database)
