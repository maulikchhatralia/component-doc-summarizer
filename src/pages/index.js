import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectItem } from "../components/ui/select";

const components = ["Login Module", "Payment Gateway", "User Profile"];

const TVComponent = ({ show }) => (
  <div className="mt-6 flex justify-center">
    <div className="w-[300px] h-[250px] bg-black border-8 border-gray-700 rounded-xl relative shadow-lg overflow-hidden">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white text-sm">AI TV</div>
      {show && (
        <img
          src="/ai-speaking.gif"
          alt="AI speaking"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  </div>
);

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState(components[0]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showGIF, setShowGIF] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const askQuestion = async () => {
    setLoading(true);
    setShowGIF(false);

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ component: selectedComponent, question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
    setChatLog([...chatLog, { role: "user", text: question }, { role: "assistant", text: data.answer }]);
    setQuestion("");
    setLoading(false);
  };

  const playAnswer = async () => {
    setShowGIF(true);

    const res = await fetch("/api/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: answer }),
    });

    const blob = await res.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();

    setTimeout(() => setShowGIF(false), 6000);
  };

  return (
     


<div className={darkMode ? "dark" : ""}>
  <h1 className="text-4xl font-bold text-red-600">Tailwind is working</h1>
    <div className="min-h-screen p-6 bg-white text-black dark:bg-gray-900 dark:text-white">    
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Sidebar Form */}
        <aside className="bg-gray-700 rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Component Config</h2>
          <p>Theme: {darkMode ? "Dark" : "Light"}</p>
          <Button onClick={toggleDarkMode} className="w-full bg-yellow-500 mb-4">
            🌓 Toggle Theme
          </Button>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Select Component</label>
              <Select
                value={selectedComponent}
                onValueChange={setSelectedComponent}
                className="text-black w-full"
              >
                {components.map((comp) => (
                  <SelectItem key={comp} value={comp}>
                    {comp}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm mb-1">Your Question</label>
              <Textarea
                rows={3}
                placeholder="Ask about the component..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="text-black w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={askQuestion} type="button" className="w-full bg-blue-600">
                {loading ? "Loading..." : "Ask"}
              </Button>
              <Button onClick={playAnswer} type="button" className="w-full bg-green-600" disabled={!answer}>
                ▶️ Play
              </Button>
            </div>
          </form>
        </aside>

        {/* Main Chat Area */}
        <main className="bg-gray-800 rounded-xl p-6 shadow-lg h-[80vh] overflow-y-auto flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {chatLog.map((entry, index) => (
              <div key={index} className={`p-3 rounded-lg max-w-xl ${entry.role === "user" ? "bg-blue-600 self-end" : "bg-gray-700 self-start"}`}>
                <p>{entry.text}</p>
              </div>
            ))}
          </div>
          <TVComponent show={showGIF} />
        </main>
      </div>
    </div>
    </div>    
  );
}
