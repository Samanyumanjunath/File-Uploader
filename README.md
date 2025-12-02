# 🚀 File Uploader Web Application

This project is a React-based solution for the Frontend Developer Assignment requiring a robust, multi-file uploader with progress tracking and status notifications.

The application successfully handles multiple files simultaneously, simulates large file uploads via progress tracking.

## ✨ Core Features Implemented

* **Multi-File Upload:** Users can select or drop multiple files simultaneously.
* **Parallel Processing:** Each file upload is managed independently and concurrently.
* **Simulated Progress:** Utilizes an `async/await` loop to simulate chunked upload progress (0-100%) for each file.
* **Error Handling:** A random 25% failure rate is built into the mock API to test error notification and status updates.
* **Toast Notifications:** Uses `react-toastify` to display clear success or detailed error messages.
* **LIFO Ordering:** New files are added to the top of the upload queue for immediate visibility.
* **Clean UI:** Styled using Tailwind CSS for a modern, responsive, and clear interface.



---

## 🏗️ Architecture & Approach

The application follows the **Container/Presentational Component Pattern** (CBA) for clean separation of concerns:

| Component | Role | Logic Used |
| :--- | :--- | :--- |
| **`FileUploader.jsx`** | **Container/Orchestrator.** Holds the central `files` state, triggers `startUpload` using `async/await`, and handles global toasts. | `useState`, `useCallback`, `async/await`, `try/catch` |
| **`FileItem.jsx`** | **Presentational.** Renders the progress bar, percentage, status icons, and cancel button based purely on props (`fileObj`). | Tailwind CSS, Props |
| **`mockApi.js`** | **Service Layer.** Simulates network latency and data transfer using a simple `while` loop, an internal `sleep` utility, and random error injection. | Promises, `async/await`, `Math.random()` |

This structure ensures that the UI (`FileItem`) is dumb and reusable, while the logic (`FileUploader`) is smart and manageable.

---

## 🛠️ Setup and Installation

This project was built with React (JavaScript) and uses Tailwind CSS.

### Prerequisites

* Node.js (LTS version recommended)
* npm or yarn

### Steps to Run

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPO_LINK_HERE]
    cd file-uploader
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the application:**
    ```bash
    npm start
    # or
    yarn start
    ```

The application will open in your browser at `http://localhost:3000`.
