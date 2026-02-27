import { useState, ChangeEvent, FormEvent } from "react";
import "./App.css";

// Define the type for your form state
interface FormData {
  name: string;
  length: number;
  include_uppercase: boolean;
  include_lowercase: boolean;
  include_numbers: boolean;
  include_special: boolean;
}

// Define the type for your API response
interface ApiResponse {
  success: boolean;
  data: {
    password: string;
  };
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    length: 8,
    include_uppercase: false,
    include_lowercase: false,
    include_numbers: false,
    include_special: false,
  });

  const [generatedPassword, setGeneratedPassword] = useState<string>("");

  // Event type for input/checkbox changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Event type for form submission
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          length: Number(formData.length),
        }),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setGeneratedPassword(data.data.password);
      } else {
        console.error("Failed to generate a password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password Length</label>
          <input
            type="number"
            name="length"
            min={6}
            max={64}
            value={formData.length}
            onChange={handleChange}
          />
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="include_uppercase"
              checked={formData.include_uppercase}
              onChange={handleChange}
            />
            Uppercase
          </label>

          <label>
            <input
              type="checkbox"
              name="include_lowercase"
              checked={formData.include_lowercase}
              onChange={handleChange}
            />
            Lowercase
          </label>

          <label>
            <input
              type="checkbox"
              name="include_numbers"
              checked={formData.include_numbers}
              onChange={handleChange}
            />
            Numbers
          </label>

          <label>
            <input
              type="checkbox"
              name="include_special"
              checked={formData.include_special}
              onChange={handleChange}
            />
            Special Characters
          </label>
        </div>

        <button type="submit">Generate</button>
      </form>

      {generatedPassword && (
        <div style={{ marginTop: "20px" }}>
          <h3>Generated Password:</h3>
          <p>{generatedPassword}</p>
        </div>
      )}
    </div>
  );
}

export default App;
