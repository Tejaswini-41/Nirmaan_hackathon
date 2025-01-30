import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { CartContext } from "./CartContext"; // Import the CartContext

const NewPrintSection = () => {
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [ecoSuggestion, setEcoSuggestion] = useState("");
  const [file, setFile] = useState(null);
  const [copies, setCopies] = useState(1);
  const [size, setSize] = useState('A4');
  const [color, setColor] = useState('Black & White');
  const [sides, setSides] = useState('Single-sided');
  const [pages, setPages] = useState('');
  const [schedule, setSchedule] = useState('');
  const [message, setMessage] = useState('');
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const currentDateTime = new Date().toISOString().slice(0, 16);
    setSchedule(currentDateTime);
  }, []);

  const handlePrintOptionsChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'copies':
        setCopies(value);
        break;
      case 'size':
        setSize(value);
        break;
      case 'color':
        setColor(value);
        break;
      case 'sides':
        setSides(value);
        if (value === 'Single-sided') {
          setEcoSuggestion("Consider double-sided printing to save paper!");
        } else {
          setEcoSuggestion("");
        }
        break;
      case 'pages':
        setPages(value);
        break;
      case 'schedule':
        setSchedule(value);
        break;
      default:
        break;
    }

    // Implement real-time price estimation logic here
    setEstimatedPrice(1.5); // Placeholder value
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('copies', copies);
    formData.append('size', size);
    formData.append('color', color);
    formData.append('sides', sides);
    formData.append('pages', pages);
    formData.append('schedule', schedule);

    try {
      const response = await fetch('http://localhost:5000/api/print', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Print job created successfully. Print ID: ${data.printId}`);
        console.log("file uploaded successfully:", data);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };
  const addToCart = () => {
    const newPrintJob = {
      document: file ? file.name : "Sample Document",
      copies,
      size,
      color,
      sides,
      pages,
      schedule,
      price: estimatedPrice,
    };
    setCart([...cart, newPrintJob]);
    setMessage("Item added to cart");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">New Print Job</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
            Upload Document
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-amber-500 file:text-gray-900
              hover:file:bg-amber-400"
          />
        </div>
        <div>
          <label htmlFor="copies" className="block text-sm font-medium text-gray-300 mb-2">
            Number of Copies
          </label>
          <input
            type="number"
            id="copies"
            name="copies"
            value={copies}
            onChange={handlePrintOptionsChange}
            min="1"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-300 mb-2">
            Paper Size
          </label>
          <select
            id="size"
            name="size"
            value={size}
            onChange={handlePrintOptionsChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
          >
            <option value="A4">A4</option>
            <option value="A3">A3</option>
            <option value="Letter">Letter</option>
            <option value="Legal">Legal</option>
          </select>
        </div>
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-300 mb-2">
            Color Option
          </label>
          <select
            id="color"
            name="color"
            value={color}
            onChange={handlePrintOptionsChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
          >
            <option value="Black & White">Black & White</option>
            <option value="Color">Color</option>
          </select>
        </div>
        <div>
          <label htmlFor="sides" className="block text-sm font-medium text-gray-300 mb-2">
            Sides
          </label>
          <select
            id="sides"
            name="sides"
            value={sides}
            onChange={handlePrintOptionsChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
          >
            <option value="Single-sided">Single-sided</option>
            <option value="Double-sided">Double-sided</option>
          </select>
        </div>
        <div>
          <label htmlFor="pages" className="block text-sm font-medium text-gray-300 mb-2">
            Pages to Print
          </label>
          <input
            type="text"
            id="pages"
            name="pages"
            value={pages}
            onChange={handlePrintOptionsChange}
            placeholder="e.g., 1-5, 8, 11-13"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="schedule" className="block text-sm font-medium text-gray-300 mb-2">
            Schedule Print Time
          </label>
          <input
            type="datetime-local"
            id="schedule"
            name="schedule"
            value={schedule}
            onChange={handlePrintOptionsChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
          />
        </div>
        {ecoSuggestion && (
          <div className="bg-green-800 text-green-100 p-3 rounded-md">
            <p>{ecoSuggestion}</p>
          </div>
        )}
        <div className="bg-amber-800 text-amber-100 p-3 rounded-md">
          <p>Estimated Price: {estimatedPrice} RS</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={addToCart}
          className="w-full bg-amber-500 text-gray-900 py-2 px-4 rounded-md hover:bg-amber-400 transition duration-300 ease-in-out shadow-lg font-semibold"
        >
          Add to Cart
        </motion.button>
      </form>
      {message && <div className="mt-4 text-amber-400">{message}</div>}
    </div>
  );
};

export default NewPrintSection;