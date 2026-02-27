var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./App.css";
function App() {
    const [formData, setFormData] = useState({
        name: "",
        length: 8,
        include_uppercase: false,
        include_lowercase: false,
        include_numbers: false,
        include_special: false,
    });
    const [generatedPassword, setGeneratedPassword] = useState("");
    // Event type for input/checkbox changes
    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [name]: type === "checkbox" ? checked : value })));
    };
    // Event type for form submission
    const handleSubmit = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const response = yield fetch("http://127.0.0.1:8000/generate-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Object.assign(Object.assign({}, formData), { length: Number(formData.length) })),
            });
            const data = yield response.json();
            if (data.success) {
                setGeneratedPassword(data.data.password);
            }
            else {
                console.error("Failed to generate a password");
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
    return (_jsxs("div", { className: "container", children: [_jsx("h1", { children: "Password Generator" }), _jsxs("form", { onSubmit: handleSubmit, className: "form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Name" }), _jsx("input", { type: "text", name: "name", value: formData.name, onChange: handleChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Password Length" }), _jsx("input", { type: "number", name: "length", min: 6, max: 64, value: formData.length, onChange: handleChange })] }), _jsxs("div", { className: "checkbox-group", children: [_jsxs("label", { children: [_jsx("input", { type: "checkbox", name: "include_uppercase", checked: formData.include_uppercase, onChange: handleChange }), "Uppercase"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox", name: "include_lowercase", checked: formData.include_lowercase, onChange: handleChange }), "Lowercase"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox", name: "include_numbers", checked: formData.include_numbers, onChange: handleChange }), "Numbers"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox", name: "include_special", checked: formData.include_special, onChange: handleChange }), "Special Characters"] })] }), _jsx("button", { type: "submit", children: "Generate" })] }), generatedPassword && (_jsxs("div", { style: { marginTop: "20px" }, children: [_jsx("h3", { children: "Generated Password:" }), _jsx("p", { children: generatedPassword })] }))] }));
}
export default App;
